"use client";

import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { LiaTimesSolid } from "react-icons/lia";
import { centroid } from "@turf/turf";
import { IoMdInformationCircleOutline } from "react-icons/io";

import Toggle from "./toggle";
import ibgeCities from "../../app/jsonData/ibge-cities.json";
import { CitiesIBGEProps } from "../interfaces/json";
import { useGeomapContext } from "../contexts/GeomapContext";
import { Feature } from "../interfaces/geojson";
import geojson from "../jsonData/geojson-pernambuco.json";
import Tooltip from "./tooltip";

export default function Filter() {
  const [displayFiltersBar, setDisplayFiltersBar] = useState(false);
  const [isMarquesActive, setIsMarquesActive] = useState(false);
  const [selectedIbgeCity, setSelectedIbgeCity] = useState<string>("");

  const { setSelectedPlace, fetchPlaces, setOpenCityCardInfo } =
    useGeomapContext();

  function handleApplyFilters(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (selectedIbgeCity) {
      const selectedGeoJsonCity = geojson.features.find(
        (city: any) => city.properties.id === selectedIbgeCity
      ) as Feature;

      const centerCoordinates = getCenterCoordinates(selectedGeoJsonCity);

      setSelectedPlace({
        latitude: centerCoordinates[1],
        longitude: centerCoordinates[0],
        razao_social: selectedGeoJsonCity.properties.name,
        marker_name: "",
      });

      setOpenCityCardInfo(false);
    } else {
      setSelectedPlace({} as any);
    }

    fetchPlaces({ onlyMarques: isMarquesActive });

    setDisplayFiltersBar(false);
  }

  function getCenterCoordinates(city: Feature) {
    const cityCentroid = centroid(city);
    return [
      cityCentroid.geometry.coordinates[0],
      cityCentroid.geometry.coordinates[1],
    ];
  }

  return (
    <>
      {!displayFiltersBar ? (
        <div
          onClick={() => setDisplayFiltersBar(true)}
          className="absolute top-4 right-4 bg-white rounded-full py-2 px-4 shadow-xl cursor-pointer z-[999] flex gap-3 items-center"
        >
          <FaFilter />
          Filtros
        </div>
      ) : (
        <div
          className={`top-0 right-0 h-[100vh] bg-white flex flex-col p-4 transition-all duration-300 ease-in-out w-[400px] z-[999]`}
        >
          <form onSubmit={handleApplyFilters} className="flex flex-col h-full">
            <div className="flex-grow">
              {/* Header */}
              <div className="flex justify-between w-full items-center">
                <div className="text-md font-bold">Filtros</div>
                <LiaTimesSolid
                  className="text-black cursor-pointer"
                  size={24}
                  onClick={() => setDisplayFiltersBar(false)}
                />
              </div>

              {/* City selection */}
              <div className="mt-8">
                <div className="text-md font-bold">Cidade</div>
                <select
                  onChange={(e) => setSelectedIbgeCity(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 mt-2"
                >
                  <option value="">Selecione</option>
                  {ibgeCities.map((city: CitiesIBGEProps) => (
                    <option key={city.value} value={city.value}>
                      {city.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Marques toggle */}
              <div className="mt-8 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="text-md font-bold">Marques</div>
                  <Tooltip content="Ao ativar essa opção, apenas os clientes Marques são exibidos">
                    <IoMdInformationCircleOutline />
                  </Tooltip>
                </div>

                <Toggle
                  isActive={isMarquesActive}
                  setIsActive={setIsMarquesActive}
                />
              </div>
            </div>

            <div className="mt-auto">
              <button className="bg-[--button-blue] text-white rounded-md p-2 w-full hover:opacity-90">
                Aplicar
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
