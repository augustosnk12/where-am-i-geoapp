import React from "react";
import { useGeomapContext } from "../contexts/GeomapContext";

export default function Card() {
  const { openCityCardInfo, selectedCity } = useGeomapContext();

  return (
    openCityCardInfo && (
      <div className="absolute top-24 right-4 h-[80vh] p-6 bg-white border rounded-lg shadow-lg z-[888] over overflow-auto no-scrollbar">
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
