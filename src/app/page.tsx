"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [location, setLocation] = useState<any>(null);
  const [address, setAddress] = useState<string>("");
  const [tracking, setTracking] = useState(false);

  const getAddress = async (lat: number, lng: number) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      const data = await res.json();
      return data?.display_name || "Unknown Address";
    } catch (error) {
      console.log("Address error:", error);
      return "Address not found";
    }
  };

  const fetchLocation = async () => {
    if (!("geolocation" in navigator)) {
      alert("Geolocation not supported!");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          time: new Date().toISOString(),
        };

        setLocation(coords);
        localStorage.setItem("userLocation", JSON.stringify(coords));

        fetch("/api/location", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(coords),
        });

        // get full address
        const addr = await getAddress(coords.lat, coords.lng);
        setAddress(addr);
      },
      (err) => {
        console.log(err);
        alert("Location permission denied");
      },
      { enableHighAccuracy: true }
    );
  };

  useEffect(() => {
    let interval: any;

    if (tracking) {
      fetchLocation();
      interval = setInterval(fetchLocation, 30000);
    }

    return () => clearInterval(interval);
  }, [tracking]);

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">User GPS Tracking Demo</h1>

      {!tracking ? (
        <button
          onClick={() => setTracking(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          Start GPS Tracking
        </button>
      ) : (
        <button
          onClick={() => setTracking(false)}
          className="px-6 py-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
        >
          Stop Tracking
        </button>
      )}

      <div className="mt-8 w-full max-w-lg bg-white p-5 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-3">Current Location</h2>

        {location ? (
          <div className="space-y-2">
            <p>
              <b>Latitude:</b> {location.lat}
            </p>
            <p>
              <b>Longitude:</b> {location.lng}
            </p>
            <p>
              <b>Time:</b> {new Date(location.time).toLocaleTimeString()}
            </p>

            <div className="mt-4">
              <p className="font-bold mb-1">Full Address:</p>
              <p className="text-gray-700">{address}</p>
            </div>
          </div>
        ) : (
          <p className="text-gray-600">Location not fetched yet...</p>
        )}
      </div>
    </div>
  );
}
