// src/components/CardWithImage.tsx
import React from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useGeomapContext } from "../contexts/GeomapContext";

type CardProps = {
  imageUrl: string;
  onClose: () => void;
};

export default function CardInformation({ imageUrl, onClose }: CardProps) {
  const { selectedPlace } = useGeomapContext();
  return (
    <div className="relative bg-black/50 max-w-screen h-screen mx-auto z-[1000]">
      <div className="relative h-[80vh] max-w-3xl inset-y-16 mx-auto bg-white rounded-xl shadow-lg overflow-hidden z-[999]">
        <button
          className="absolute top-2 right-2 text-white rounded-full p-1 hover:bg-red-500 transition"
          onClick={onClose}
        >
          <IoCloseCircleOutline className="size-10" />
        </button>

        <img
          className="w-full h-48 object-cover"
          src={imageUrl}
          alt={"Image of company" + selectedPlace.razao_social}
        />

        <div className="p-6">
          <h2 className="text-xl font-bold mb-2">
            {selectedPlace.razao_social}
          </h2>
          <p className="text-gray-700">{`${selectedPlace.logradouro}, 
          ${selectedPlace.numero}, ${selectedPlace.bairro}, 
          ${selectedPlace.cidade}-${selectedPlace.uf}`}</p>
          <p className="text-gray-700">{selectedPlace.telefone}</p>
        </div>

        {selectedPlace.marker_name !== "marques" && (
          <div className="px-6">
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
