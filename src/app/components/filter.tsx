"use client";

import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { LiaTimesSolid } from "react-icons/lia";
import Toggle from "./toggle";

export default function Filter() {
  const [isFiltering, setIsFiltering] = useState(false);
  const [isMarquesActive, setIsMarquesActive] = useState(false);
  const [isRivalActive, setIsRivalActive] = useState(false);

  return (
    <>
      {!isFiltering ? (
        <div
          onClick={() => setIsFiltering(true)}
          className="absolute top-4 right-4 bg-white rounded-full py-2 px-4 shadow-xl cursor-pointer z-[999] flex gap-3 items-center"
        >
          <FaFilter />
          Filtros
        </div>
      ) : (
        <div
          className={`top-0 right-0 h-[100vh] bg-white flex flex-col p-4 transition-all duration-300 ease-in-out w-[400px] z-[999]`}
        >
          {/* Header */}
          <div className="flex justify-between w-full items-center">
            <div className="text-md font-bold">Filtros</div>
            <LiaTimesSolid
              className="text-black cursor-pointer"
              size={24}
              onClick={() => setIsFiltering(false)}
            />
          </div>

          {/* City selection */}
          <div className="mt-8">
            <div className="text-md font-bold">Cidade</div>
            <select className="w-full border border-gray-300 rounded-md p-2 mt-2">
              <option value="">Selecione</option>
              <option value="1">Cidade 1</option>
              <option value="2">Cidade 2</option>
              <option value="3">Cidade 3</option>
            </select>
          </div>

          {/* Marques toggle */}
          <div className="mt-8 flex flex-col gap-2">
            <div className="text-md font-bold">Marques</div>

            <Toggle
              isActive={isMarquesActive}
              setIsActive={setIsMarquesActive}
            />
          </div>

          {/* Rival toggle */}
          <div className="mt-8 flex flex-col gap-2">
            <div className="text-md font-bold">Concorrentes</div>
            <Toggle isActive={isRivalActive} setIsActive={setIsRivalActive} />
          </div>
        </div>
      )}
    </>
  );
}
