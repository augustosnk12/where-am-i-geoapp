"use client";

import { Icon } from "leaflet";
import { useMapEvents } from "react-leaflet";

export function markerIconColor(companyName: string) {
  switch (companyName) {
    case "marques":
      return "blue";
    case "esus-host":
      return "red";
    case "biatic":
      return "green";
    default:
      return "black";
  }
}

// function to be used in case of clicking on the map. Place it
//as a child of the Map component
export function MyComponent() {
  const map = useMapEvents({
    locationfound: () => {},
    dblclick: () => {
      map.locate();
    },
  });

  return null;
}

//function to create a custom icon for the markers
export const createIcon = (companyName: string) => {
  const color = markerIconColor(companyName);

  return new Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
};
