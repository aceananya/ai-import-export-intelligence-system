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

function ShipmentTracking() {
  const [trackingNumber, setTrackingNumber] =
    useState("");

  const [shipment, setShipment] = useState(null);
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

  const fetchShipment = async () => {
    if (!trackingNumber) {
      alert("Please enter Tracking Number");
      return;
    }

    try {
      const response = await fetch(
        `https://ai-import-export-intelligence-system.onrender.com/track?tracking_number=${trackingNumber}`,
      );

      const data = await response.json();
      console.log(data);

      if (data.error) {
        alert(data.error);
        return;
      }

      console.log(data);

setShipment({
  tracking_number:
    data.tracking_number ||
    data.trackingNumber,

  origin_country:
    data.origin_country ||
    data.originCountry,

  destination_country:
    data.destination_country ||
    data.destinationCountry,

  current_location:
    data.current_location ||
    data.currentLocation,

  status: data.status,

  progress: data.progress,

  latitude: data.latitude,

  longitude: data.longitude,
});
    } catch (error) {
      console.error(error);
      alert("Failed to fetch shipment");
    }
  };
  const route =
  shipment &&
  routes[shipment.tracking_number?.trim()];

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
            onChange={(e) =>
              setTrackingNumber(
                e.target.value
              )
            }
            className="flex-1 border p-3 rounded-lg"
          />

          <button
            onClick={fetchShipment}
            className="bg-blue-600 text-white px-6 rounded-lg"
          >
            Track
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
  center={[
    Number(shipment.latitude || 0),
    Number(shipment.longitude || 0),
  ]}
              zoom={3}
              style={{
                height: "400px",
                width: "100%",
              }}
            >

             <TileLayer
  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
  attribution="© OpenStreetMap © CARTO"
/>

              <Marker
  position={[
    Number(shipment.latitude || 0),
    Number(shipment.longitude || 0),
  ]}
>
              

                <Popup>
                  {shipment.current_location}
                </Popup>

              </Marker>
              {route && (
  <>
    <Marker position={route.origin}>
      <Popup>
        Origin
      </Popup>
    </Marker>

    <Marker position={route.destination}>
      <Popup>
        Destination
      </Popup>
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

          </div>

          {/* Shipment Details */}

          <div className="bg-white rounded-2xl p-6 shadow-sm">

            <h2 className="text-xl font-semibold mb-6">
              Shipment Details
            </h2>

            <div className="grid grid-cols-3 gap-6">

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
                    className="bg-green-500 h-4 rounded-full"
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