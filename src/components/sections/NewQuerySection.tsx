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
  const [realLocation, setRealLocation] = useState<[lat: number, lng: number]>([
    0, 0,
  ]);

  const today = new Date().toISOString().split("T")[0]; // "2025-10-05"
  const [date, setDate] = useState(today);

  const [selected, setSelected] = useState<string[]>(["rain"]);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Estados para la API
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleMapClick = useCallback(([lng, lat]: [number, number]) => {
    const coords = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    setLocation(coords);
    setRealLocation([lat, lng]);
  }, []); // ← dependencias vacías, ya que solo usa setLocation (y setLocation nunca cambia)

  // const handleMapClick = ([lat, lng]: [number, number]) => {
  //   const coords = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
  //   setLocation(coords);
  // };

  const toggleVar = (v: string) =>
    setSelected((prev) =>
      prev.includes(v) ? prev.filter((i) => i !== v) : [...prev, v]
    );

  const handleRunQuery = async () => {
    const [lat, lon] = realLocation;

    // Validar que haya una ubicación válida
    if (lat === 0 && lon === 0) {
      alert("Please select a location on the map.");
      return;
    }

    // Solo ejecutamos si "rain" está seleccionado (por ahora la API solo da rain)
    if (!selected.includes("rain")) {
      alert("Please select 'rain' to run this query.");
      return;
    }

    setLoading(true);
    setError(null);
    setApiResponse(null);

    try {
      const res = await fetch(
        `/api/rain-prob?lat=${lat}&lon=${lon}&day=${date}`
      );
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to fetch weather data");
      }
      const data = await res.json();
      setApiResponse(data);
      setShowPopup(true);
    } catch (err: any) {
      setError(err.message || "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setApiResponse(null);
  };

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

            <button
              onClick={handleRunQuery}
              disabled={loading}
              className={`w-full py-2 px-4 rounded-lg font-medium transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              {loading ? "Running..." : "Run Query"}
            </button>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      {showPopup && apiResponse && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-gray-800">
                  Rain Forecast
                </h3>
                <button
                  onClick={closePopup}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="mt-4 space-y-3">
                <p>
                  <span className="font-medium">Location:</span>{" "}
                  {apiResponse.lat.toFixed(4)}, {apiResponse.lon.toFixed(4)}
                </p>
                <p>
                  <span className="font-medium">Date:</span> {apiResponse.day}
                </p>
                <p>
                  <span className="font-medium">Risk Level:</span>{" "}
                  <span className="font-bold">{apiResponse.label}</span>
                </p>
                <p>
                  <span className="font-medium">Rain Probability:</span>{" "}
                  {(apiResponse.prob_rain * 100).toFixed(0)}%
                </p>

                <div>
                  <h4 className="font-medium mt-3">Best Time Slots:</h4>
                  <ul className="mt-2 space-y-1">
                    {apiResponse.best_slots.map((slot: any, i: number) => (
                      <li key={i} className="text-sm">
                        • {slot.start} – {slot.end} →{" "}
                        <span className="font-medium">{slot.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={closePopup}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
