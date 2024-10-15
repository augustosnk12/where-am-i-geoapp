"use client";

import { centroid } from "@turf/turf";
import Select, { SingleValue } from "react-select";

import ibgeCities from "../../app/jsonData/ibge-cities.json";
import { useGeomapContext } from "../contexts/GeomapContext";
import { Feature } from "../interfaces/geojson";
import geojson from "../jsonData/geojson-pernambuco.json";

export function SelectCity() {
  const { setSelectedPlace, setOpenCityCardInfo, handleClickCity } =
    useGeomapContext();

  function handleSelectCity(
    event: SingleValue<{
      value: string;
      label: string;
    }>
  ) {
    if (event?.value) {
      const selectedGeoJsonCity = geojson.features.find(
        (city: any) => city.properties.id === event?.value
      ) as Feature;

      const centerCoordinates = getCenterCoordinates(selectedGeoJsonCity);

      setSelectedPlace({
        latitude: centerCoordinates[1],
        longitude: centerCoordinates[0],
        razao_social: selectedGeoJsonCity.properties.name,
        marker_name: "",
      });

      setOpenCityCardInfo(false);
      handleClickCity(event?.value);
    } else {
      setSelectedPlace({} as any);
    }
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
      <div className="absolute top-4 right-40 py-1 px-4 cursor-pointer z-[999] flex gap-3 items-center text-gray-600 hover:text-gray-800 transition-all">
        {/* <div className="text-sm font-bold">Cidade</div> */}
        <Select
          className="w-full text-sm border-none outline-none rounded-full"
          styles={{
            control: (base) => ({
              ...base,
              borderRadius: "18px",
              padding: "0.2rem",
              border: "1px solid #E5E5E5",
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              minWidth: "150px",
            }),
          }}
          onChange={(event) => {
            handleSelectCity(event as any);
          }}
          options={ibgeCities}
          placeholder="Selecionar Município"
        ></Select>
      </div>
    </>
  );
}
