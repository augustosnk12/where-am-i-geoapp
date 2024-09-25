"use client";

import { GoogleMap, Marker } from "@react-google-maps/api";

export const defaultMapContainerStyle = {
  width: "100%",
  height: "80vh",
  borderRadius: "15px 0px 0px 15px",
};

const defaultMapCenter = {
  lat: -7.87959,
  lng: -35.447176,
};

const defaultMapZoom = 18;

const defaultMapOptions = {
  zoomControl: true,
  tilt: 0,
  gestureHandling: "auto",
  mapTypeId: "roadmap",
  styles: [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "transit",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
  ],
};

const markers = [
  { id: 1, position: { lat: -7.87959, lng: -35.447176 }, title: "Cliente 1" },
  { id: 2, position: { lat: -7.88059, lng: -35.448176 }, title: "Cliente 2" },
  {
    id: 3,
    position: { lat: -7.87859, lng: -35.446176 },
    title: "Concorrente 1",
  },
];

const MapComponent = () => {
  return (
    <div className="w-full">
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        center={defaultMapCenter}
        zoom={defaultMapZoom}
        options={defaultMapOptions}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.position}
            title={marker.title}
            label={{
              text: "Eu sou um cliente",
              color: "black", // Cor do texto da label
              fontSize: "12px", // Tamanho da fonte da label
            }}
            icon={{
              url: "logo-marques.png",
              scaledSize: new window.google.maps.Size(50, 50),
              labelOrigin: new window.google.maps.Point(25, -10), // Ajuste a posição da label
            }}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export { MapComponent };
