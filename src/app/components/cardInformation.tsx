// src/components/CardWithImage.tsx
import React from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useGeomapContext } from "../contexts/GeomapContext";
import { Poppins } from "@next/font/google";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function CardInformation() {
  const { selectedPlace, setOpenPlaceInfoModal } = useGeomapContext();
  return (
    <div className={`relative bg-black/50 max-w-screen h-screen mx-auto z-[1000] ${poppins.className}`}>
      <div className="relative h-[80vh] max-w-3xl inset-y-16 mx-auto bg-white rounded-xl shadow-lg overflow-hidden z-[999]">
        <button
          className="absolute top-2 right-2 text-white rounded-full p-1 hover:opacity-70 transition"
          onClick={() => setOpenPlaceInfoModal(false)}
        >
          <IoCloseCircleOutline className="size-10" color="#000" />
        </button>

        <img
          className="w-full h-48 object-cover"
          src={"http://via.placeholder.com/600x400"}
          alt={"Image of company" + selectedPlace.razao_social}
        />

        <div className="p-6">
          <div className="text-xl font-bold">{selectedPlace.razao_social}</div>
          <div className="text-gray-700 text-base mb-2">{selectedPlace.nome_fantasia}</div>
          <div className="text-gray-700 text-base">{`${selectedPlace.logradouro}, 
          ${selectedPlace.numero}, ${selectedPlace.bairro}, 
          ${selectedPlace.cidade}-${selectedPlace.uf}`}</div>
          <p className="text-gray-700 text-base">{selectedPlace.telefone}</p>
        </div>

        {selectedPlace.marker_name !== "marques" && (
          <div className="px-6 text-base">
            <hr className="my-4" />

            <p className="text-gray-700">
              Início contrato: {selectedPlace.inicio_contrato}
            </p>
            <p className="text-gray-700">
              Fim contrato: {selectedPlace.fim_contrato}
            </p>
            <p className="text-gray-700">
              Valor: R$ {selectedPlace.valor_servico}
            </p>
            <p className="text-gray-700">
              Serviço: {selectedPlace.descricao_servico}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
