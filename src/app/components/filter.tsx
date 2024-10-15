"use client";

import { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { LiaTimesSolid } from "react-icons/lia";
import { centroid } from "@turf/turf";
import { IoMdInformationCircleOutline } from "react-icons/io";

import Toggle from "./toggle";
import { useGeomapContext } from "../contexts/GeomapContext";
import { Feature } from "../interfaces/geojson";
import Tooltip from "./tooltip";

export default function Filter() {
  const [displayFiltersBar, setDisplayFiltersBar] = useState(false);
  const [isMarquesActive, setIsMarquesActive] = useState(false);

  const {
    fetchPlaces,
    displayMarkers,
    setDisplayMarkers,
  } = useGeomapContext();

  function getCenterCoordinates(city: Feature) {
    const cityCentroid = centroid(city);
    return [
      cityCentroid.geometry.coordinates[0],
      cityCentroid.geometry.coordinates[1],
    ];
  }

  useEffect(() => {
    fetchPlaces({ onlyMarques: isMarquesActive });
  }, [isMarquesActive]);

  return (
    <>
      <div
        onClick={() => setDisplayFiltersBar(true)}
        className="absolute top-5 right-4 bg-white rounded-full py-3 px-4 shadow-xl cursor-pointer z-[999] flex gap-3 items-center text-gray-600 hover:text-gray-800 transition-all"
      >
        <FaFilter />
        <p className="font-semibold text-sm"> Filtros </p>
      </div>

      <div
        className={`top-0 right-0 h-[100vh] bg-white flex-col p-4 transition-width duration-300 ease-in-out z-[999] ${
          displayFiltersBar ? "flex" : " hidden"
        } ${displayFiltersBar ? "w-[400px]" : "w-0"}`}
      >
        <div className="flex-grow">
          {/* Header */}
          <div className="flex justify-between w-full items-center">
            <div className="text-lg font-bold">Filtros</div>
            <LiaTimesSolid
              className="text-black cursor-pointer"
              size={24}
              onClick={() => setDisplayFiltersBar(false)}
            />
          </div>

          {/* Marques toggle */}
          <div className="mt-8 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="text-sm font-bold">Marques</div>
              <Tooltip content="Ao ativar essa opção, apenas os clientes Marques serão exibidos">
                <IoMdInformationCircleOutline />
              </Tooltip>
            </div>

            <Toggle
              isActive={isMarquesActive}
              setIsActive={setIsMarquesActive}
            />
          </div>

          {/* Display markers */}
          <div className="mt-8 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="text-sm font-bold">Exibir marcadores</div>
              <Tooltip content="Define se deve ou não exibir os marcadores no mapa">
                <IoMdInformationCircleOutline />
              </Tooltip>
            </div>

            <Toggle isActive={displayMarkers} setIsActive={setDisplayMarkers} />
          </div>
        </div>
      </div>
    </>
  );
}
