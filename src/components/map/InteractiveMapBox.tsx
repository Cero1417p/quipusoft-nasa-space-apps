// src/components/map/InteractiveMap.tsx
"use client";

import type { FeatureCollection, Point } from "geojson";
import { useEffect, useRef } from "react";
import mapboxgl, { Map, Marker } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiYXlhYW56YXZlcmkiLCJhIjoiY2ttZHVwazJvMm95YzJvcXM3ZTdta21rZSJ9.WMpQsXd5ur2gP8kFjpBo8g";

if (!MAPBOX_TOKEN) {
  console.warn("Mapbox token is missing");
}

interface InteractiveMapProps {
  onLocationSelect?: (coords: [number, number]) => void;
}

export default function InteractiveMap({
  onLocationSelect,
}: InteractiveMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<Map | null>(null);
  const marker = useRef<Marker | null>(null);

  const CIRCLE_SOURCE_ID = "selected-location-source";
  const CIRCLE_LAYER_ID = "selected-location-circle";

  useEffect(() => {
    if (map.current) return;
    if (!mapContainer.current || !MAPBOX_TOKEN) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-78.50027, -7.16378], // [lng, lat] → Cajamarca
      zoom: 11,
      accessToken: MAPBOX_TOKEN,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    const handleMapLoad = () => {
      // Verificar que el mapa aún existe
      const currentMap = map.current;
      if (!currentMap) return;

      // Limpiar capa y fuente si existen
      if (currentMap.getLayer(CIRCLE_LAYER_ID)) {
        currentMap.removeLayer(CIRCLE_LAYER_ID);
      }
      if (currentMap.getSource(CIRCLE_SOURCE_ID)) {
        currentMap.removeSource(CIRCLE_SOURCE_ID);
      }

      // Añadir fuente vacía
      currentMap.addSource(CIRCLE_SOURCE_ID, {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      });

      // Añadir capa de círculo
      currentMap.addLayer({
        id: CIRCLE_LAYER_ID,
        type: "circle",
        source: CIRCLE_SOURCE_ID,
        paint: {
          "circle-radius": 50,
          "circle-color": "#bfdbfe",
          "circle-stroke-width": 2,
          "circle-stroke-color": "#1d4ed8",
          "circle-opacity": 0.6,
        },
      });
    };

    map.current.on("load", handleMapLoad);

    const handleClick = (e: mapboxgl.MapMouseEvent) => {
      const coords: [number, number] = [e.lngLat.lng, e.lngLat.lat];
      onLocationSelect?.(coords);

      const geojson: FeatureCollection<Point> = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [e.lngLat.lng, e.lngLat.lat],
            },
            properties: null,
          },
        ],
      };

      const currentMap = map.current;
      if (currentMap?.getSource(CIRCLE_SOURCE_ID)) {
        (
          currentMap.getSource(CIRCLE_SOURCE_ID) as mapboxgl.GeoJSONSource
        ).setData(geojson);
      }

      // Actualizar marcador
      if (marker.current) {
        marker.current.setLngLat(e.lngLat);
      } else {
        // color marker
        marker.current = new mapboxgl.Marker({ color: "#ef4444" })
          .setLngLat(e.lngLat)
          .addTo(currentMap!);
      }
    };

    map.current.on("click", handleClick);

    return () => {
      if (map.current) {
        map.current.off("load", handleMapLoad);
        map.current.off("click", handleClick);

        if (marker.current) {
          marker.current.remove();
          marker.current = null;
        }

        map.current.remove();
        map.current = null;
      }
    };
  }, [onLocationSelect]);

  return <div ref={mapContainer} className="w-full h-full" />;
}
