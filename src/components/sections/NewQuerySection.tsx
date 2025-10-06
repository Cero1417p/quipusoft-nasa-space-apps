"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { MapPin, Calendar, Zap } from "lucide-react";
import dynamic from "next/dynamic";

// Carga dinámica del mapa (solo en cliente, sin SSR)
const InteractiveMap = dynamic(
  () => import("./../map/InteractiveMapBox"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-xl">
        <span className="text-gray-400">Loading map...</span>
      </div>
    ),
  }
);

export function NewQuerySection() {
  const [location, setLocation] = useState("");
  const [realLocation, setRealLocation] = useState<[lat: number, lng: number]>([
    0, 0,
  ]);

  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);

  // Estados para la API
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleMapClick = useCallback(([lng, lat]: [number, number]) => {
    const coords = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    setLocation(coords);
    setRealLocation([lat, lng]);
  }, []);

  const handleRunQuery = async () => {
    const [lat, lon] = realLocation;

    if (lat === 0 && lon === 0) {
      alert("Please select a location on the map.");
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
    <section className="space-y-4">
      <h2 className="text-xl font-bold text-gray-700">
        Plan Your Weather Query
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Map Card */}
        <div className="bg-white p-5 rounded-xl shadow-md border-l-4 border-purple-500">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-5 h-5 text-purple-500" />
            <h3 className="font-semibold text-base text-gray-700">Select Location</h3>
          </div>
          <div className="h-96 rounded-xl overflow-hidden border-2 border-gray-100">
            <InteractiveMap onLocationSelect={handleMapClick} />
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white p-5 rounded-xl shadow-md border-l-4 border-orange-500">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-5 h-5 text-orange-500" />
            <h3 className="font-semibold text-base text-gray-700">Query Parameters</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                📍 Location Coordinates
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Click on map to select"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition"
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                📅 Event Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition"
              />
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
              <p className="text-sm text-blue-700 font-medium">
                💧 Analyzing Rain Probability
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Get accurate forecasts for your outdoor events
              </p>
            </div>

            <button
              onClick={handleRunQuery}
              disabled={loading}
              className={`w-full py-3 px-6 rounded-lg font-bold text-white transition transform hover:scale-105 flex items-center justify-center gap-2 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-pink-500 hover:bg-pink-600 shadow-lg"
              }`}
            >
              <Zap className="w-5 h-5" />
              {loading ? "Analyzing..." : "Run Forecast"}
            </button>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-lg">
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            )}
          </div>
        </div>
      </div>

     {/* Popup Modal Mejorado */}
{showPopup && apiResponse && (
  <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-md animate-fadeIn">
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl w-full max-w-2xl transform animate-slideUp overflow-hidden">
      
      {/* Header con gradiente */}
      <div className="relative bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white p-8">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mb-12"></div>
        
        <div className="relative flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-5xl">🌦️</span>
              <div>
                <h3 className="text-3xl font-black tracking-tight">Rain Forecast</h3>
                <p className="text-pink-100 text-sm font-medium mt-1">
                  Powered by NASA POWER Data
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={closePopup}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center transition-all duration-200 hover:scale-110"
          >
            <span className="text-white text-xl font-bold">✕</span>
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="p-8 space-y-5">
        
        {/* Location & Date - Grid destacado */}
        <div className="grid grid-cols-2 gap-4">
          <div className="group bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-2xl border-2 border-purple-300 hover:shadow-lg transition-all duration-200 hover:scale-105">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">📍</span>
              <p className="text-xs text-purple-600 font-bold uppercase tracking-wide">Location</p>
            </div>
            <p className="text-lg font-black text-gray-800">
              {apiResponse.lat.toFixed(4)}°, {apiResponse.lon.toFixed(4)}°
            </p>
          </div>
          
          <div className="group bg-gradient-to-br from-orange-50 to-orange-100 p-5 rounded-2xl border-2 border-orange-300 hover:shadow-lg transition-all duration-200 hover:scale-105">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">📅</span>
              <p className="text-xs text-orange-600 font-bold uppercase tracking-wide">Date</p>
            </div>
            <p className="text-lg font-black text-gray-800">{apiResponse.day}</p>
          </div>
        </div>

        {/* Risk Level - Card grande destacado */}
        <div className="relative bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-400 p-6 rounded-2xl shadow-xl overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full -mr-20 -mt-20"></div>
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-xs text-yellow-900 font-bold uppercase tracking-wider mb-2">
                ⚠️ Risk Assessment
              </p>
              <p className="text-4xl font-black text-white drop-shadow-lg">
                {apiResponse.label}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-yellow-900 font-bold uppercase tracking-wider mb-1">
                Probability
              </p>
              <p className="text-5xl font-black text-white drop-shadow-lg">
                {(apiResponse.prob_rain * 100).toFixed(0)}%
              </p>
            </div>
          </div>
        </div>

        {/* Rain Probability - Card interactivo */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border-2 border-blue-300 hover:shadow-xl transition-all duration-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-3xl">💧</span>
              <p className="text-sm text-blue-700 font-bold uppercase tracking-wide">
                Rain Analysis
              </p>
            </div>
          </div>
          
          {/* Barra de progreso visual */}
          <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${(apiResponse.prob_rain * 100)}%` }}
            ></div>
          </div>
          <p className="text-xs text-blue-600 mt-2 font-medium text-center">
            {(apiResponse.prob_rain * 100).toFixed(1)}% chance of rain
          </p>
        </div>

        {/* Best Time Slots - Lista mejorada */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border-2 border-green-300">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-3xl">⏰</span>
            <h4 className="text-base font-black text-green-700 uppercase tracking-wide">
              Recommended Time Slots
            </h4>
          </div>
          <div className="space-y-3">
            {apiResponse.best_slots.map((slot: any, i: number) => (
              <div
                key={i}
                className="group flex items-center justify-between bg-white p-4 rounded-xl border-2 border-green-200 hover:border-green-400 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {i + 1}
                  </div>
                  <span className="font-bold text-gray-700">
                    {slot.start} – {slot.end}
                  </span>
                </div>
                <span className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white font-black rounded-lg text-sm shadow-md group-hover:shadow-lg transition-all">
                  {slot.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer con botón mejorado */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-t-2 border-gray-200">
        <button
          onClick={closePopup}
          className="w-full px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-xl font-black text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 uppercase tracking-wide"
        >
          Close Forecast ✓
        </button>
      </div>
    </div>
  </div>
)}

<style jsx>{`
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(50px) scale(0.9);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
  }
  
  .animate-slideUp {
    animation: slideUp 0.4s ease-out;
  }
`}</style>



    </section>
  );
}
