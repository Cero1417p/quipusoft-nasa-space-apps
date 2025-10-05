"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { Sliders, Download, Plus } from "lucide-react";
import dynamic from "next/dynamic";

const VARIABLES = ["temperature", "rain", "wind", "humidity", "snow", "dust"];

// Carga dinámica del mapa (solo en cliente, sin SSR)
const InteractiveMap = dynamic(
  () => import("./../map/InteractiveMapBox"), // Ajusta la ruta si es necesario
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
        <span className="text-gray-500">Loading map...</span>
      </div>
    ),
  }
);

export function NewQuerySection() {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);

  const handleMapClick = useCallback(([lat, lng]: [number, number]) => {
    const coords = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    setLocation(coords);
  }, []); // ← dependencias vacías, ya que solo usa setLocation (y setLocation nunca cambia)

  // const handleMapClick = ([lat, lng]: [number, number]) => {
  //   const coords = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
  //   setLocation(coords);
  // };

  const toggleVar = (v: string) =>
    setSelected((prev) =>
      prev.includes(v) ? prev.filter((i) => i !== v) : [...prev, v]
    );

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">
        Plan Your Weather Query
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Map */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-medium text-lg mb-3">Select Location</h3>
          <div className="h-96 rounded-lg overflow-hidden border">
            <InteractiveMap onLocationSelect={handleMapClick} />
          </div>
        </div>

        {/* Form */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-medium text-lg mb-3">Query Parameters</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location or coordinates"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weather Variables
              </label>
              <div className="grid grid-cols-2 gap-2">
                {VARIABLES.map((v) => (
                  <label key={v} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selected.includes(v)}
                      onChange={() => toggleVar(v)}
                      className="rounded text-blue-500"
                    />
                    <span className="capitalize">{v}</span>
                  </label>
                ))}
              </div>
            </div>

            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition">
              Run Query
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
