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
import L, { LatLngExpression, LatLngTuple, Icon } from "leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { useEffect } from "react";
import { Places, useGeomapContext } from "../../contexts/GeomapContext";
import { markerIconColor } from "./functions";

interface MarkerData {
  razao_social: string;
}

interface MapProps {
  posix: LatLngExpression | LatLngTuple;
  zoom?: number;
}

const defaults = {
  zoom: 10,
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

const createIcon = (companyName: string) => {
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

const Map = (Map: MapProps) => {
  const { zoom = defaults.zoom, posix } = Map;

  const { places, center, selectedPlace } = useGeomapContext();

  const RecenterAutomatically = ({
    latitude,
    longitude,
    razao_social,
  }: Places) => {
    const map = useMap();
    useEffect(() => {
      if (!latitude || !longitude) return;

      console.log({ zoom })
      map.setView([latitude, longitude], zoom);

      L.popup()
        .setLatLng([latitude, longitude])
        .setContent(`${razao_social}`)
        .openOn(map);
    }, [latitude, longitude]);
    return null;
  };

  return (
    <MapContainer
      center={center}
      zoom={10}
      scrollWheelZoom
      zoomControl
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {places.map((marker, index) => (
        <Marker
          key={index}
          position={[marker.latitude, marker.longitude]}
          icon={createIcon(marker.marker_name)}
        >
          <Popup>{marker.nome_fantasia}</Popup>
        </Marker>
      ))}

      <MyComponent />

      <RecenterAutomatically {...selectedPlace} />
    </MapContainer>
  );
};

export default Map;
