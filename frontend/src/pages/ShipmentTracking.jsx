
import { useState } from "react";

import {
  FiTruck,
  FiMapPin,
  FiClock,
} from "react-icons/fi";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

const LOCAL_URL = "http://127.0.0.1:8000";
const RENDER_URL =
  "https://ai-import-export-intelligence-system.onrender.com";

function ShipmentTracking() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(false);

  const routes = {
    TRK1001: {
      origin: [19.0760, 72.8777],
      destination: [40.7128, -74.0060],
    },
    TRK1002: {
      origin: [31.2304, 121.4737],
      destination: [19.0760, 72.8777],
    },
    TRK1003: {
      origin: [19.0760, 72.8777],
      destination: [25.2048, 55.2708],
    },
  };

  // Try localhost first, then Render.
  const fetchWithFallback = async (path, options = {}) => {
    try {
      const response = await fetch(`${LOCAL_URL}${path}`, options);

      if (!response.ok) {
        throw new Error(`Local backend returned ${response.status}`);
      }

      return response;
    } catch (localError) {
      console.warn(
        "Local backend unavailable. Trying Render.",
        localError
      );

      const response = await fetch(`${RENDER_URL}${path}`, options);

      if (!response.ok) {
        throw new Error(`Render backend returned ${response.status}`);
      }

      return response;
    }
  };

  const fetchShipment = async () => {
    const tracking = trackingNumber.trim();

    if (!tracking) {
      alert("Please enter Tracking Number.");
      return;
    }

    setLoading(true);
    setShipment(null);

    try {
      const response = await fetchWithFallback(
        `/shipment/${encodeURIComponent(tracking)}`
      );

      const data = await response.json();

      console.log("Shipment response:", data);

      if (data.error) {
        alert(data.error);
        return;
      }

      const latitude = Number(
        data.latitude ?? data.current_latitude
      );

      const longitude = Number(
        data.longitude ?? data.current_longitude
      );

      setShipment({
        tracking_number:
          data.tracking_number ?? data.trackingNumber ?? tracking,

        origin_country:
          data.origin_country ?? data.originCountry ?? "N/A",

        destination_country:
          data.destination_country ?? data.destinationCountry ?? "N/A",

        current_location:
          data.current_location ?? data.currentLocation ?? "Unknown",

        status: data.status ?? "Unknown",

        progress: Math.min(
          100,
          Math.max(0, Number(data.progress) || 0)
        ),

        latitude:
          Number.isFinite(latitude) ? latitude : null,

        longitude:
          Number.isFinite(longitude) ? longitude : null,
      });
    } catch (error) {
      console.error("Failed to fetch shipment:", error);
      alert(`Failed to fetch shipment: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const route =
    shipment && routes[shipment.tracking_number?.trim()];

  // Use real coordinates only when valid coordinates are returned.
  const hasCoordinates =
    shipment &&
    shipment.latitude !== null &&
    shipment.longitude !== null &&
    shipment.latitude >= -90 &&
    shipment.latitude <= 90 &&
    shipment.longitude >= -180 &&
    shipment.longitude <= 180;

  const mapCenter = hasCoordinates
    ? [shipment.latitude, shipment.longitude]
    : route
      ? route.origin
      : [20, 0];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Shipment Tracking
        </h1>

        <p className="text-gray-500 mt-2">
          Track shipments in real time.
        </p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="TRK1001"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") fetchShipment();
            }}
            className="flex-1 border p-3 rounded-lg"
          />

          <button
            onClick={fetchShipment}
            disabled={loading}
            className="bg-blue-600 text-white px-6 rounded-lg disabled:opacity-60"
          >
            {loading ? "Tracking..." : "Track"}
          </button>
        </div>
      </div>

      {shipment && (
        <>
          {/* Live Map */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
            <h2 className="text-xl font-semibold mb-4">
              Live Tracking Map
            </h2>

            <MapContainer
              key={`${shipment.tracking_number}-${mapCenter.join(",")}`}
              center={mapCenter}
              zoom={3}
              style={{
                height: "400px",
                width: "100%",
              }}
            >
              <TileLayer
  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
/>
              {hasCoordinates && (
                <Marker
                  position={[
                    shipment.latitude,
                    shipment.longitude,
                  ]}
                >
                  <Popup>
                    {shipment.current_location}
                  </Popup>
                </Marker>
              )}

              {route && (
                <>
                  <Marker position={route.origin}>
                    <Popup>Origin</Popup>
                  </Marker>

                  <Marker position={route.destination}>
                    <Popup>Destination</Popup>
                  </Marker>

                  <Polyline
                    positions={[
                      route.origin,
                      route.destination,
                    ]}
                    color="blue"
                    weight={5}
                  />
                </>
              )}
            </MapContainer>

            {!hasCoordinates && (
              <p className="text-sm text-gray-500 mt-3">
                Exact shipment coordinates are unavailable.
                The map shows the configured route when one exists.
              </p>
            )}
          </div>

          {/* Shipment Details */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-6">
              Shipment Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border rounded-xl p-5">
                <FiTruck className="text-blue-600 text-2xl mb-3" />

                <p className="text-gray-500">
                  Tracking Number
                </p>

                <h3 className="font-bold mt-1">
                  {shipment.tracking_number}
                </h3>
              </div>

              <div className="border rounded-xl p-5">
                <FiMapPin className="text-green-600 text-2xl mb-3" />

                <p className="text-gray-500">
                  Route
                </p>

                <h3 className="font-bold mt-1">
                  {shipment.origin_country}
                  {" → "}
                  {shipment.destination_country}
                </h3>
              </div>

              <div className="border rounded-xl p-5">
                <FiClock className="text-orange-500 text-2xl mb-3" />

                <p className="text-gray-500">
                  Status
                </p>

                <h3 className="font-bold mt-1 text-blue-600">
                  {shipment.status}
                </h3>
              </div>
            </div>
          </div>

          {/* Current Location */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mt-8">
            <h2 className="text-xl font-semibold mb-6">
              Current Shipment Status
            </h2>

            <div className="space-y-4">
              <div>
                <p className="text-gray-500">
                  Current Location
                </p>

                <h3 className="font-bold text-lg">
                  {shipment.current_location}
                </h3>
              </div>

              <div>
                <p className="text-gray-500 mb-2">
                  Progress
                </p>

                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-green-500 h-4 rounded-full transition-all"
                    style={{
                      width: `${shipment.progress}%`,
                    }}
                  />
                </div>

                <p className="mt-2 font-semibold">
                  {shipment.progress}%
                </p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mt-8">
            <h2 className="text-xl font-semibold mb-6">
              Tracking Timeline
            </h2>

            <div className="space-y-6">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold">
                  Shipment Created
                </h4>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold">
                  Customs Cleared
                </h4>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold">
                  {shipment.status}
                </h4>

                <p className="text-gray-500">
                  {shipment.current_location}
                </p>
              </div>

              <div className="border-l-4 border-gray-300 pl-4">
                <h4 className="font-semibold">
                  Destination
                </h4>

                <p className="text-gray-500">
                  {shipment.destination_country}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ShipmentTracking;
