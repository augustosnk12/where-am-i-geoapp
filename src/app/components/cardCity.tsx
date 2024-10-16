import React from "react";
import { LiaTimesSolid } from "react-icons/lia";

import { useGeomapContext } from "../contexts/GeomapContext";

export default function Card() {
  const { openCityCardInfo, selectedCity, setOpenCityCardInfo } = useGeomapContext();

  return (
    openCityCardInfo && (
      <div className="absolute bottom-6 right-4 sm:w-96 w-56 h-[40vh] p-8 m-4 bg-white border rounded-2xl shadow-lg z-[888] over overflow-auto no-scrollbar">
        <div className="absolute end-0 mr-6 top-3">
          <LiaTimesSolid
            className="text-black cursor-pointer hover:text-[--button-blue]"
            size={20}
            onClick={() => setOpenCityCardInfo(false)}
          />
        </div>
        <h1 className="text-2xl font-bold ">
          {selectedCity.city}
        </h1>
        {/* <p className="text-sm text-gray-400 mb-4">{selectedCity.state}</p> */}

        <div className="mt-4">
          <div className="text-sm">UBS: {selectedCity.ubs}</div>
          <div className="text-sm">População: {selectedCity.population}</div>
          <div className="text-sm">Secretário: {selectedCity.secretary}</div>
          <div className="text-sm">Contato: {selectedCity.secretary_phone}</div>
        </div>
      </div>
    )
  );
}
