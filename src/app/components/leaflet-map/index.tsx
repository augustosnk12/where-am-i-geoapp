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
  GeoJSON,
} from "react-leaflet";
import L, { LatLngExpression, LatLngTuple, Icon } from "leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { useEffect, useState } from "react";
import { Places, useGeomapContext } from "../../contexts/GeomapContext";
import { markerIconColor } from "./functions";
import geojson from "../../jsonData/geojson-pernambuco.json";
import {
  Feature,
  GeoJSON as GeoJSONProps,
  Properties,
} from "@/app/interfaces/geojson";
import CardInformation from "../cardInformation";

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

const onEachCity = (city: Feature, layer: any) => {
  const cityName = city.properties.name;
  layer.bindPopup(`<strong>${cityName}</strong>`);

  layer.on("click", () => {
    console.log(`City clicked: ${cityName}`);
  });
};

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

      map.setView([latitude, longitude], zoom);

      L.popup()
        .setLatLng([latitude, longitude])
        .setContent(`${razao_social}`)
        .openOn(map);
    }, [latitude, longitude]);
    return null;
  };

  const [showCard, setShowCard] = useState(false);

  const handleClose = () => {
    setShowCard(false);
  };

  const handleOpen = () => {
    setShowCard(true);
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
          <Popup>{marker.nome_fantasia}
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition"
              onClick={handleOpen}> More</button>
          </Popup>
        </Marker>
      ))
      }

      {
        showCard && (
          <CardInformation
            title="ADA"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dolor libero, mattis non gravida feugiat, ultrices egestas justo. Aenean quis nulla nisl."
            imageUrl="https://via.placeholder.com/600x400"  // Aqui você pode usar a URL da imagem que desejar
            onClose={handleClose}
          />
        )
      }

      <MyComponent />

      <GeoJSON
        data={geojson as GeoJSONProps}
        onEachFeature={onEachCity}
        style={() => ({
          weight: 1,
          fillOpacity: 0.1,
        })}
      />

      <RecenterAutomatically {...selectedPlace} />
    </MapContainer >
  );
};

export default Map;
