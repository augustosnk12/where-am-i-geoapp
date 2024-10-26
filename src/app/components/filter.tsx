"use client";

import Select, { SingleValue } from "react-select";
import places from "../../app/jsonData/places.json";
import { useEffect, useState } from "react";
import { useGeomapContext } from "../contexts/GeomapContext";

interface SelectInputPlacesProps {
  value: string;
  label: string;
}

export default function Filter() {
  const [selectInputPlaces, setSelectInputPlaces] =
    useState<SelectInputPlacesProps[]>();

  const {
    setSelectedPlace,
    setOpenPlaceInfoModal,
  } = useGeomapContext();

  function handleSelectCity(
    event: SingleValue<{
      value: string;
      label: string;
    }>
  ) {
    if (event?.value) {
      const place = places.find(
        (place) => place.cnpj === event.value
      );

      if (place) {
        setSelectedPlace(place);
        setOpenPlaceInfoModal(true);
      }
    } else {
      setSelectedPlace({} as any);
    }
  }

  useEffect(() => {
    const inputPlaces = places.map((place) => ({
      value: place.cnpj,
      label: place.company_name,
    }));

    setSelectInputPlaces(inputPlaces);
  }, []);

  return (
    <div className="absolute top-4 right-0 py-1 px-4 cursor-pointer z-[999] flex gap-3 items-center text-gray-600 hover:text-gray-800 transition-all">
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
        options={selectInputPlaces}
        placeholder="Selecionar empresa"
      ></Select>
    </div>
  );
}
