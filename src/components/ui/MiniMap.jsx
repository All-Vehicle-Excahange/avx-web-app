"use client";

import { useEffect, useRef, useState } from "react";
import { Navigation, Search } from "lucide-react";

export default function MiniMap({
  initialLat,
  initialLng,
  onChangeLocation,
  readOnly = false,
}) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerInstanceRef = useRef(null);
  
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Default coordinate fallback: Gujarat, India (22.2587, 71.1924)
  const GUJARAT_LAT = 22.2587;
  const GUJARAT_LNG = 71.1924;

  // 1. Load Leaflet script and CSS dynamically
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.L) {
      setLeafletLoaded(true);
      return;
    }

    // Load CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
    link.crossOrigin = "";
    document.head.appendChild(link);

    // Load JS
    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
    script.crossOrigin = "";
    script.onload = () => {
      setLeafletLoaded(true);
    };
    script.onerror = () => {
      setError("Failed to load map libraries.");
    };
    document.head.appendChild(script);
  }, []);

  // 2. Initialize Map once leaflet is loaded
  useEffect(() => {
    if (!leafletLoaded || !mapRef.current || mapInstanceRef.current) return;

    const L = window.L;

    const initialLatNum = parseFloat(initialLat);
    const initialLngNum = parseFloat(initialLng);

    const isDefaultPlaceholder =
      Math.abs(initialLatNum - 12.12) < 0.001 &&
      Math.abs(initialLngNum - 12.12) < 0.001;

    const lat = (!isNaN(initialLatNum) && !isDefaultPlaceholder) ? initialLatNum : GUJARAT_LAT;
    const lng = (!isNaN(initialLngNum) && !isDefaultPlaceholder) ? initialLngNum : GUJARAT_LNG;

    // Create Map
    const map = L.map(mapRef.current, {
      zoomControl: true,
      attributionControl: false,
    }).setView([lat, lng], 10);
    mapInstanceRef.current = map;

    // Load Google Maps Tile Layer dynamically (m = roadmap, s = satellite, y = hybrid, p = terrain)
    // This loads Google Maps visual styles natively without requiring an API key or charging billing accounts!
    L.tileLayer("https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
      maxZoom: 20,
    }).addTo(map);

    // Custom CSS-based marker icon for a modern red pinpoint look
    const iconHtml = `
      <div class="relative flex items-center justify-center">
        <div class="absolute w-8 h-8 rounded-full bg-primary/35 animate-ping"></div>
        <div class="w-5.5 h-5.5 rounded-full bg-primary border-2 border-white shadow-xl flex items-center justify-center">
          <div class="w-1.5 h-1.5 rounded-full bg-white"></div>
        </div>
      </div>
    `;

    const customIcon = L.divIcon({
      html: iconHtml,
      className: "custom-map-marker-container",
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    const marker = L.marker([lat, lng], {
      draggable: !readOnly,
      icon: customIcon,
    }).addTo(map);
    markerInstanceRef.current = marker;

    // Handle marker drag / map clicks
    if (!readOnly) {
      const updateLocation = (newLat, newLng) => {
        onChangeLocation(newLat, newLng);
      };

      marker.on("dragend", () => {
        const position = marker.getLatLng();
        updateLocation(position.lat, position.lng);
      });

      map.on("click", (e) => {
        const { lat, lng } = e.latlng;
        marker.setLatLng([lat, lng]);
        updateLocation(lat, lng);
      });
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markerInstanceRef.current = null;
      }
    };
  }, [leafletLoaded, readOnly]);

  // 3. Keep coordinates synced with parent updates
  useEffect(() => {
    if (mapInstanceRef.current && markerInstanceRef.current) {
      const lat = parseFloat(initialLat);
      const lng = parseFloat(initialLng);

      if (!isNaN(lat) && !isNaN(lng)) {
        const currentPos = markerInstanceRef.current.getLatLng();
        if (
          Math.abs(currentPos.lat - lat) > 0.0001 ||
          Math.abs(currentPos.lng - lng) > 0.0001
        ) {
          markerInstanceRef.current.setLatLng([lat, lng]);
          mapInstanceRef.current.panTo([lat, lng]);
        }
      }
    }
  }, [initialLat, initialLng]);

  // 4. Geolocation helper
  const handleLocateUser = () => {
    if (typeof window === "undefined" || !navigator.geolocation) return;

    setIsLocating(true);

    const successCallback = (position) => {
      const { latitude, longitude } = position.coords;
      setIsLocating(false);

      if (mapInstanceRef.current && markerInstanceRef.current) {
        markerInstanceRef.current.setLatLng([latitude, longitude]);
        mapInstanceRef.current.setView([latitude, longitude], 16);
        onChangeLocation(latitude, longitude);
      }
    };

    const errorCallback = (err) => {
      console.warn("High accuracy geolocation failed, trying low accuracy...", err);

      if (err.code === 1) {
        // User explicitly denied permission
        setIsLocating(false);
        alert(
          "Location access was denied. Please click the icon in your browser's address bar to allow location permissions for this website."
        );
        return;
      }

      // Retry with low accuracy and a longer timeout (helps desktops / ethernet connections)
      navigator.geolocation.getCurrentPosition(
        successCallback,
        async (lowAccErr) => {
          console.warn("Low accuracy geolocation also failed, trying IP geocoding fallbacks...", lowAccErr);

          // Fallback 1: freeipapi.com
          try {
            const ipRes = await fetch("https://freeipapi.com/api/json");
            const ipData = await ipRes.json();
            if (ipData && !isNaN(ipData.latitude) && !isNaN(ipData.longitude)) {
              const { latitude, longitude } = ipData;
              setIsLocating(false);
              if (mapInstanceRef.current && markerInstanceRef.current) {
                markerInstanceRef.current.setLatLng([latitude, longitude]);
                mapInstanceRef.current.setView([latitude, longitude], 12);
                onChangeLocation(latitude, longitude);
              }
              return;
            }
          } catch (ipErr1) {
            console.warn("freeipapi fallback failed:", ipErr1);
          }

          // Fallback 2: ipapi.co
          try {
            const ipRes = await fetch("https://ipapi.co/json/");
            const ipData = await ipRes.json();
            if (ipData && !isNaN(ipData.latitude) && !isNaN(ipData.longitude)) {
              const { latitude, longitude } = ipData;
              setIsLocating(false);
              if (mapInstanceRef.current && markerInstanceRef.current) {
                markerInstanceRef.current.setLatLng([latitude, longitude]);
                mapInstanceRef.current.setView([latitude, longitude], 12);
                onChangeLocation(latitude, longitude);
              }
              return;
            }
          } catch (ipErr2) {
            console.warn("ipapi.co fallback failed:", ipErr2);
          }

          // Fallback 3: ipinfo.io
          try {
            const ipRes = await fetch("https://ipinfo.io/json");
            const ipData = await ipRes.json();
            if (ipData && ipData.loc) {
              const [latStr, lngStr] = ipData.loc.split(",");
              const latitude = parseFloat(latStr);
              const longitude = parseFloat(lngStr);
              if (!isNaN(latitude) && !isNaN(longitude)) {
                setIsLocating(false);
                if (mapInstanceRef.current && markerInstanceRef.current) {
                  markerInstanceRef.current.setLatLng([latitude, longitude]);
                  mapInstanceRef.current.setView([latitude, longitude], 12);
                  onChangeLocation(latitude, longitude);
                }
                return;
              }
            }
          } catch (ipErr3) {
            console.warn("ipinfo.io fallback failed:", ipErr3);
          }

          setIsLocating(false);
          alert(
            "Could not automatically detect location. Please search for your address or select it manually on the map."
          );
        },
        { enableHighAccuracy: false, timeout: 15000 }
      );
    };

    // First attempt with high accuracy (5s timeout)
    navigator.geolocation.getCurrentPosition(
      successCallback,
      errorCallback,
      { enableHighAccuracy: true, timeout: 5000 }
    );
  };

  // 5. Free geocoding search (OpenStreetMap Nominatim)
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery
        )}&countrycodes=in` // prioritize searches in India
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const result = data[0];
        const newLat = parseFloat(result.lat);
        const newLng = parseFloat(result.lon);

        if (mapInstanceRef.current && markerInstanceRef.current) {
          markerInstanceRef.current.setLatLng([newLat, newLng]);
          mapInstanceRef.current.setView([newLat, newLng], 15);
          onChangeLocation(newLat, newLng);
        }
      } else {
        alert("Location not found. Please try another term.");
      }
    } catch (err) {
      console.error("Search error:", err);
      alert("Failed to search location.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="w-full flex flex-col space-y-3">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 px-1">
        <span className="text-xs font-semibold uppercase tracking-wider text-third/80">
          Showroom Location on Google Maps
        </span>
        {!readOnly && leafletLoaded && (
          <button
            type="button"
            onClick={handleLocateUser}
            disabled={isLocating}
            className="flex items-center justify-center gap-1.5 text-[11px] font-medium text-primary hover:text-primary-hover transition-colors disabled:opacity-60 cursor-pointer bg-white/5 px-2.5 py-1.5 sm:py-1 rounded-lg border border-white/5 hover:border-white/10 w-full sm:w-auto"
          >
            <Navigation
              size={12}
              className={isLocating ? "animate-spin" : ""}
            />
            {isLocating ? "Locating..." : "Detect Location"}
          </button>
        )}
      </div>

      {/* Free Address Search Box */}
      {!readOnly && leafletLoaded && (
        <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full">
          <input
            type="text"
            placeholder="Search address or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-20 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-third/40 focus:outline-none focus:border-primary transition-all"
          />
          <Search size={14} className="absolute left-3 text-third/50" />
          <button
            type="submit"
            disabled={isSearching}
            className="absolute right-2.5 px-3 py-1 bg-primary text-secondary text-[10px] font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60 cursor-pointer"
          >
            {isSearching ? "Searching..." : "Search"}
          </button>
        </form>
      )}

      {/* Google Maps Styled Map Container */}
      <div
        ref={mapRef}
        className="w-full h-[220px] rounded-2xl border border-white/5 overflow-hidden relative shadow-inner"
        style={{ zIndex: 1 }}
      >
        {!leafletLoaded && (
          <div className="absolute inset-0 bg-secondary/80 backdrop-blur-sm flex items-center justify-center text-xs text-white/50 z-20">
            {error || (
              <div className="flex flex-col items-center gap-2">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                <span>Loading Map...</span>
              </div>
            )}
          </div>
        )}
      </div>
      {!readOnly && (
        <p className="text-[10px] text-third/50 px-1">
          * Drag the pin or click on the map to select your exact showroom location.
        </p>
      )}
    </div>
  );
}
