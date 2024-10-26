"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import Filter from "./components/filter";
import CardCity from "./components/cardCity";
import { GeomapProvider } from "./contexts/GeomapContext";
import { SelectCity } from "./components/selectCity";

export default function Home() {
  const Map = useMemo(
    () =>
      dynamic(() => import("./components/leaflet-map"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  return (
    <div className="flex text-black">
      <GeomapProvider>
        <div className="w-full h-[100vh]">
          <Map posix={[4.79029, -35.447176]} />
        </div>
        <Filter />
        <SelectCity />
        <CardCity />
      </GeomapProvider>
    </div>
  );
}
