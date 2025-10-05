// components/InteractiveMap.tsx
"use client";

import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngTuple } from "leaflet";
import { useState } from "react";

interface InteractiveMapProps {
  onLocationSelect: (latlng: LatLngTuple) => void;
}

function LocationClickHandler({
  onLocationSelect,
}: {
  onLocationSelect: (latlng: LatLngTuple) => void;
}) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      onLocationSelect([lat, lng]);
    },
  });
  return null;
}

export default function InteractiveMap({
  onLocationSelect,
}: InteractiveMapProps) {
  const [position] = useState<LatLngTuple>([
    -7.1680274626539, -78.50421205070917,
  ]); // São Paulo por defecto

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={true}
      className="w-full h-full rounded-lg"
    >
      <TileLayer
        attribution={
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationClickHandler onLocationSelect={onLocationSelect} />
    </MapContainer>
  );
}
