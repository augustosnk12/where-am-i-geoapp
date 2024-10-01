import React from "react";
import { useGeomapContext } from "../contexts/GeomapContext";
import { LiaTimesSolid } from "react-icons/lia";

export default function Card() {
  const { openCityCardInfo, selectedCity, setOpenCityCardInfo } = useGeomapContext();

  return (
    openCityCardInfo && (
      <div className="absolute top-24 right-4 h-[80vh] p-6 bg-white border rounded-lg shadow-lg z-[888] over overflow-auto no-scrollbar">
        <div className="flex justify-end mr-[-15px] mt-[-15px]">
          <LiaTimesSolid
            className="text-black cursor-pointer"
            size={16}
            onClick={() => setOpenCityCardInfo(false)}
          />
        </div>
        <h1 className="text-2xl font-bold mb-4">
          {selectedCity.city} - {selectedCity.state}
        </h1>

        <div>
          <h2 className="text-lg font-semibold">Informações</h2>
          <div>UBS: {selectedCity.ubs}</div>
          <div>População: {selectedCity.population}</div>
          <div>Secretário: {selectedCity.secretary}</div>
          <div>Contato: {selectedCity.secretary_phone}</div>
        </div>
      </div>
    )
  );
}
