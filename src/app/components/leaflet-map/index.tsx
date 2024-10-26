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
import geojson from "../../jsonData/geojson-pernambuco.json";
import { Feature, GeoJSON as GeoJSONProps } from "@/app/interfaces/geojson";
import CardInformation from "../placeCardInformation";
import { Places } from "@/app/contexts/interfaces";

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
    setOpenPlaceInfoModal,
    openPlaceInfoModal,
    displayMarkers,
    handleClickCity,
  } = useGeomapContext();

  const RecenterAutomatically = ({
    latitude,
    longitude,
    company_name,
  }: Places) => {
    const map = useMap();
    useEffect(() => {
      if (!latitude || !longitude) return;

      map.setView([latitude, longitude], zoom);

      if (openPlaceInfoModal) {
        map.dragging.disable();
        map.scrollWheelZoom.disable();
        map.doubleClickZoom.disable();
      } else if (!openPlaceInfoModal) {
        map.dragging.enable();
        map.scrollWheelZoom.enable();
        map.doubleClickZoom.enable();
      }

      L.popup()
        .setLatLng([latitude, longitude])
        .setContent(`${company_name}`)
        .openOn(map);
    }, [latitude, longitude]);
    return null;
  };

  const handleOpenPlaceDetails = (place: Places) => {
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
      {displayMarkers &&
        places.map((place, index) => (
          <Marker
            key={index}
            position={[place.latitude, place.longitude]}
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
                {place.trade_name}
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition"
                  onClick={() => handleOpenPlaceDetails(place)}
                >
                  Ver mais
                </button>
              </div>
            </Popup>
          </Marker>
        ))}

      {openPlaceInfoModal && <CardInformation />}

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
