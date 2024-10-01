"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  GeoJSON,
} from "react-leaflet";
import L, { LatLngExpression, LatLngTuple } from "leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

import { useEffect } from "react";
import { useGeomapContext } from "../../contexts/GeomapContext";
import { createIcon, MyComponent } from "./functions";
import geojson from "../../jsonData/geojson-pernambuco.json";
import { Feature, GeoJSON as GeoJSONProps } from "@/app/interfaces/geojson";
import CardInformation from "../cardInformation";
import { Places, SelectedCityProps } from "@/app/contexts/interfaces";
import citiesInfo from "../../../app/jsonData/cities-info.json";

interface MapProps {
  posix: LatLngExpression | LatLngTuple;
  zoom?: number;
}

const DEFAULTS_MAP_CONFIG = {
  zoom: 10,
};

const Map = (Map: MapProps) => {
  const { zoom = DEFAULTS_MAP_CONFIG.zoom } = Map;

  const {
    places,
    center,
    selectedPlace,
    setSelectedPlace,
    setSelectedCity,
    setOpenCityCardInfo,
    setOpenPlaceInfoModal,
    openPlaceInfoModal,
    displayMarkers
  } = useGeomapContext();

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

  const handleOpen = (place: Places) => {
    setSelectedPlace(place);
    setOpenPlaceInfoModal(true);
  };

  const onEachCity = (city: Feature, layer: any) => {
    const cityName = city.properties.name;
    layer.bindPopup(`<strong>${cityName}</strong>`);

    layer.on("click", () => {
      handleClickCity(city.properties.id);
    });
  };

  function handleClickCity(codIbge: string) {
    const selectedMapCity = citiesInfo.find(
      (city: SelectedCityProps) => city.cod_ibge === codIbge
    );

    if (selectedMapCity) {
      setSelectedCity(selectedMapCity);
      setOpenCityCardInfo(true);
    } else {
      setOpenCityCardInfo(false);
    }
  }

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
      {displayMarkers && places.map((place, index) => (
        <Marker
          key={index}
          position={[place.latitude, place.longitude]}
          icon={createIcon(place.marker_name)}
          riseOnHover
          bubblingMouseEvents
          eventHandlers={{
            mouseover: (e) => {
              const marker = e.target;
              marker.openPopup();
            },
          }}
        >
          <Popup>
            <div className="flex flex-col gap-2">
              {place.nome_fantasia}
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition"
                onClick={() => handleOpen(place)}
              >
                Ver mais
              </button>
            </div>
          </Popup>
        </Marker>
      ))}

      {openPlaceInfoModal && <CardInformation />}

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
    </MapContainer>
  );
};

export default Map;
