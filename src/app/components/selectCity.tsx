"use client";

import Select, { SingleValue } from "react-select";

import ibgeCities from "../../app/jsonData/ibge-cities.json";
import { useGeomapContext } from "../contexts/GeomapContext";

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
      setOpenCityCardInfo(false);
      handleClickCity(event?.value);
    } else {
      setSelectedPlace({} as any);
    }
  }

  return (
    <>
      <div className="absolute sm:top-4 top-24 sm:right-40 right-0 py-1 px-4 cursor-pointer z-[999] flex gap-3 items-center text-gray-600 hover:text-gray-800 transition-all">
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
