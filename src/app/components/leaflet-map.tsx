// src/components/map/index.tsx

"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
  ImageOverlay,
} from "react-leaflet";
import { LatLngExpression, LatLngTuple, Icon } from "leaflet";

/*  {markers.map((marker) => (
        <MarkerLayer key={marker.id}>
          <Marker position={[marker.lat, marker.lng]}>
            <Image src={'/logo-marques.png'} alt="" style={{ width: 32, height: 32 }} />
          </Marker>
        </MarkerLayer>
      ))} */

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { useEffect } from "react";

const markers = [
  //   { id: 1, position: [-7.87959, -35.447176], title: "Cliente 1" },
  { id: 2, lat: -7.88059, lng: -35.448176, title: "Cliente 2" },
  {
    id: 3,
    lat: -7.87859,
    lng: -35.446176,
    title: "Concorrente 1",
  },
];

interface MapProps {
  posix: LatLngExpression | LatLngTuple;
  zoom?: number;
}

const defaults = {
  zoom: 19,
};

function MyComponent() {
  const map = useMapEvents({
    locationfound: (location) => {
      console.log("location found:", location);
    },
    dblclick: () => {
      map.locate();
    },
  });

  return null;
}

// // import marker from "../../../public/logo.svg";
// const myIcon = new Icon({
//   iconUrl: marker,
//   iconRetinaUrl: marker,
//   popupAnchor: [-0, -0],
//   iconSize: [32, 45],
// });

const Map = (Map: MapProps) => {
  const { zoom = defaults.zoom, posix } = Map;

  return (
    <MapContainer
      center={[-7.87959, -35.447176]}
      zoom={10}
      scrollWheelZoom
      zoomControl
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((marker) => (
        <Marker key={marker.id} position={[marker.lat, marker.lng]} draggable>
          <Popup>{marker.title}</Popup>
        </Marker>
      ))}

      <MyComponent />
      {/* <Marker position={posix} draggable={false}>
        <Popup>Hey ! I study here</Popup>
      </Marker> */}
    </MapContainer>
  );
};

export default Map;
