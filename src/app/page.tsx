import Image from "next/image";
import { MapProvider } from "./providers/map-provider";
import { MapComponent } from "./components/map";
import LeafletMap from "./components/leaflet-map";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import Sidebar from "./components/sidebar";
import Filter from "./components/filter";

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
    <div className='flex'>
      <Sidebar />
      <div className="w-full h-[100vh]">
        <Map posix={[4.79029, -35.447176]} />
      </div>
      <Filter />
    </div>
  );
}
