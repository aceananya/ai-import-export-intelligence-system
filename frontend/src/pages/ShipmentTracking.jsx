import { useMemo, useState } from "react";
import {
  FiAlertTriangle, FiBell, FiCheckCircle, FiClock, FiCloud,
  FiCompass, FiInfo, FiMapPin, FiNavigation, FiRefreshCw,
  FiSearch, FiShield, FiTruck,
} from "react-icons/fi";
import { MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

const LOCAL_URL = "http://127.0.0.1:8000";
const RENDER_URL = "https://ai-import-export-intelligence-system.onrender.com";

// ILLUSTRATIVE ONLY: Routes and transit times are illustrative, not carrier schedules.
// Coordinates are geographic checkpoints, not verified vessel/flight positions.
const ROUTE_TEMPLATES = {
  TRK1001: {
    mode: "Sea freight",
    durationDays: 27,
    points: [
      { name: "Mumbai", country: "India", region: "Nhava Sheva area", coords: [19.076, 72.8777], day: 0, stage: "Origin processing" },
      { name: "Arabian Sea", country: "International waters", region: "Arabian Sea", coords: [13.2, 66.1], day: 4, stage: "At sea" },
      { name: "Suez Canal", country: "Egypt", region: "Suez transit", coords: [30.4, 32.35], day: 11, stage: "Canal transit" },
      { name: "Mediterranean Sea", country: "International waters", region: "Mediterranean Sea", coords: [35.5, 18], day: 15, stage: "At sea" },
      { name: "Atlantic Ocean", country: "International waters", region: "North Atlantic", coords: [37, -38], day: 21, stage: "At sea" },
      { name: "New York", country: "United States", region: "Port of New York and New Jersey", coords: [40.7128, -74.006], day: 27, stage: "Destination port" },
    ],
  },
  TRK1002: {
    mode: "Sea freight",
    durationDays: 16,
    points: [
      { name: "Shanghai", country: "China", region: "Shanghai port", coords: [31.2304, 121.4737], day: 0, stage: "Origin processing" },
      { name: "South China Sea", country: "International waters", region: "South China Sea", coords: [16, 114], day: 4, stage: "At sea" },
      { name: "Singapore", country: "Singapore", region: "Singapore Strait", coords: [1.29, 103.85], day: 8, stage: "Transit checkpoint" },
      { name: "Bay of Bengal", country: "International waters", region: "Bay of Bengal", coords: [10, 87], day: 12, stage: "At sea" },
      { name: "Mumbai", country: "India", region: "Destination port", coords: [19.076, 72.8777], day: 16, stage: "Destination port" },
    ],
  },
  TRK1003: {
    mode: "Sea freight",
    durationDays: 7,
    points: [
      { name: "Mumbai", country: "India", region: "Origin port", coords: [19.076, 72.8777], day: 0, stage: "Origin processing" },
      { name: "Arabian Sea", country: "International waters", region: "Arabian Sea", coords: [20.8, 63.5], day: 3, stage: "At sea" },
      { name: "Gulf of Oman", country: "International waters", region: "Gulf of Oman", coords: [24.5, 59], day: 5, stage: "Approaching destination" },
      { name: "Dubai", country: "United Arab Emirates", region: "Jebel Ali area", coords: [25.2048, 55.2708], day: 7, stage: "Destination port" },
    ],
  },
};

// Distinct markers for origin, destination, and backend-reported location.
function makeColoredMarker(color) {
  return L.divIcon({
    className: "",
    html: `<div style="width:22px;height:22px;background:${color};border:3px solid white;border-radius:50%;box-shadow:0 1px 7px #0006;"></div>`,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
    popupAnchor: [0, -12],
  });
}
const ORIGIN_ICON = L.divIcon({
  className: "",
  html: '<div style="width:32px;height:32px;background:#16a34a;border:4px solid #fff;border-radius:50%;box-shadow:0 1px 8px #0007;"></div>',
  iconSize: [32, 32], iconAnchor: [16, 16], popupAnchor: [0, -17],
});
const DESTINATION_ICON = makeColoredMarker("#dc2626");
const CURRENT_ICON = L.divIcon({
  className: "",
  html: '<div style="width:17px;height:17px;background:#2563eb;border:2px solid white;border-radius:50%;box-shadow:0 1px 7px #0006;"></div>',
  iconSize: [17, 17], iconAnchor: [8, 8], popupAnchor: [0, -10],
});
const PASSED_ICON = makeColoredMarker("#94a3b8");
const UPCOMING_ICON = L.divIcon({
  className: "",
  html: '<div style="width:22px;height:22px;background:#ffffff;border:3px solid #64748b;border-radius:50%;box-shadow:0 1px 7px #0006;"></div>',
  iconSize: [22, 22], iconAnchor: [11, 11], popupAnchor: [0, -12],
});
const UPCOMING_DESTINATION_ICON = L.divIcon({
  className: "",
  html: '<div style="width:22px;height:22px;background:#ffffff;border:3px solid #dc2626;border-radius:50%;box-shadow:0 1px 7px #0006;"></div>',
  iconSize: [22, 22], iconAnchor: [11, 11], popupAnchor: [0, -12],
});

const MS_PER_DAY = 24 * 60 * 60 * 1000;

function validCoordinates(lat, lon) {
  return Number.isFinite(lat) && Number.isFinite(lon) && lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180;
}

function parseCoordinate(value) {
  if (value === null || value === undefined || value === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function formatDate(date) {
  if (!date || Number.isNaN(date.getTime())) return "Unavailable";
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "UTC", hour12: true,
  }).format(date) + " UTC";
}

function formatDay(day) {
  return `Day ${day + 1}`;
}

function statusTone(status) {
  const s = (status || "").toLowerCase();
  if (s.includes("deliver")) return "bg-emerald-50 text-emerald-700";
  if (s.includes("delay") || s.includes("hold")) return "bg-amber-50 text-amber-700";
  return "bg-blue-50 text-blue-700";
}

async function fetchWithFallback(path, options = {}) {
  let response;
  try {
    response = await fetch(`${LOCAL_URL}${path}`, options);
  } catch (error) {
    console.warn("Local backend unreachable; trying Render.", error);
  }
  if (!response) {
    response = await fetch(`${RENDER_URL}${path}`, options);
  }
  // A 404 is a meaningful shipment-not-found response; do not silently switch databases.
  return response;
}

function InfoCard({ icon, label, value, detail }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-center gap-2 text-slate-500 text-sm">{icon}{label}</div>
      <div className="mt-2 font-semibold text-slate-900 break-words">{value}</div>
      {detail && <p className="text-xs text-slate-500 mt-1">{detail}</p>}
    </div>
  );
}

function Panel({ title, icon, children, subtitle }) {
  return (
    <section className="rounded-2xl bg-white p-5 md:p-6 shadow-sm border border-slate-100">
      <div className="flex items-center gap-2 mb-1 text-slate-900 font-semibold text-lg">{icon}{title}</div>
      {subtitle && <p className="text-sm text-slate-500 mb-4">{subtitle}</p>}
      {!subtitle && <div className="mb-4" />}
      {children}
    </section>
  );
}

export default function ShipmentTracking() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loadedAt, setLoadedAt] = useState(null);
  const [modeOverride, setModeOverride] = useState("auto");

  const route = shipment ? ROUTE_TEMPLATES[shipment.tracking_number?.toUpperCase()] : null;
  const progress = shipment?.progress ?? 0;
  const hasCoordinates = shipment && validCoordinates(shipment.latitude, shipment.longitude);

  const selectedMode = modeOverride === "auto" ? (route?.mode || "Not provided") : modeOverride;
  const checkpoints = route?.points || [];
  const currentIndex = checkpoints.length
    ? Math.max(0, Math.min(checkpoints.length - 1, Math.floor((progress / 100) * (checkpoints.length - 1))))
    : -1;
  const nextCheckpoint = checkpoints[currentIndex + 1] || null;

  // Dates below are generated from the time the user fetched the record.
  // They are NOT historical carrier timestamps or operational ETAs.
  const estimatedSchedule = useMemo(() => {
    if (!route || !loadedAt) return null;
    const start = new Date(loadedAt.getTime() - (progress / 100) * route.durationDays * MS_PER_DAY);
    return {
      start,
      eta: new Date(start.getTime() + route.durationDays * MS_PER_DAY),
      items: route.points.map((point) => ({
        ...point,
        eta: new Date(start.getTime() + point.day * MS_PER_DAY),
      })),
    };
  }, [route, loadedAt, progress]);

  // Prevent the backend current-position marker from covering the origin marker.
  // Each shipment is compared against its own configured origin.
  const currentAtOrigin = Boolean(
    hasCoordinates && checkpoints.length &&
    Math.abs(shipment.latitude - checkpoints[0].coords[0]) < 0.001 &&
    Math.abs(shipment.longitude - checkpoints[0].coords[1]) < 0.001
  );

  const mapPositions = checkpoints.map((point) => point.coords);
  const mapCenter = hasCoordinates
    ? [shipment.latitude, shipment.longitude]
    : checkpoints.length ? checkpoints[0].coords : [20, 0];

  const fetchShipment = async () => {
    const tracking = trackingNumber.trim();
    if (!tracking) {
      setError("Please enter a tracking number.");
      return;
    }
    setLoading(true);
    setError("");
    setShipment(null);
    setLoadedAt(null);
    setModeOverride("auto");
    try {
      const response = await fetchWithFallback(`/shipment/${encodeURIComponent(tracking)}`);
      const data = await response.json();
      if (!response.ok || data.error) {
        throw new Error(data.error || data.detail || `Shipment request failed (${response.status}).`);
      }
      const latitude = parseCoordinate(data.latitude ?? data.current_latitude);
      const longitude = parseCoordinate(data.longitude ?? data.current_longitude);
      setShipment({
        tracking_number: String(data.tracking_number ?? data.trackingNumber ?? tracking),
        origin_country: data.origin_country ?? data.originCountry ?? "Not provided",
        destination_country: data.destination_country ?? data.destinationCountry ?? "Not provided",
        current_location: data.current_location ?? data.currentLocation ?? "Not provided",
        status: data.status ?? "Unknown",
        progress: Math.max(0, Math.min(100, Number(data.progress) || 0)),
        latitude, longitude,
      });
      setLoadedAt(new Date());
    } catch (err) {
      console.error("Shipment fetch failed:", err);
      setError(err.message || "Unable to load shipment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-6 bg-slate-100 min-h-screen">
      <header>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">AI-Powered Shipment Intelligence</h1>
          <span className="text-xs rounded-full bg-amber-100 text-amber-800 px-3 py-1 font-medium">Shipment intelligence</span>
        </div>
        <p className="mt-2 text-slate-500">Track shipments, explore journey checkpoints and preview route intelligence.</p>
      </header>

      <Panel title="Find a shipment" icon={<FiSearch className="text-blue-600" />} subtitle="Search an existing shipment record from your FastAPI backend.">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            value={trackingNumber}
            onChange={(event) => setTrackingNumber(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && fetchShipment()}
            placeholder="Enter tracking number, e.g. TRK1001"
            className="min-w-0 flex-1 border border-slate-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
          />
          <button
            onClick={fetchShipment}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-medium px-6 py-3 rounded-lg flex justify-center items-center gap-2"
          >
            {loading ? <FiRefreshCw className="animate-spin" /> : <FiSearch />}
            {loading ? "Searching..." : "Track shipment"}
          </button>
        </div>
        <p className="text-xs text-slate-500 mt-3">Route templates are available for TRK1001, TRK1002 and TRK1003, if those shipments exist in your backend.</p>
        {error && <p role="alert" className="mt-3 p-3 rounded-lg bg-red-50 text-red-700 text-sm">{error}</p>}
      </Panel>

      {!shipment && !loading && (
        <div className="text-center rounded-2xl bg-white p-10 border border-slate-100 shadow-sm">
          <FiNavigation className="mx-auto text-4xl text-blue-400 mb-3" />
          <p className="font-semibold text-slate-800">Your shipment journey will appear here</p>
          <p className="text-slate-500 text-sm mt-1">Enter a valid tracking number to load shipment details.</p>
        </div>
      )}

      {shipment && (
        <>
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 flex gap-2 items-start">
            <FiInfo className="shrink-0 mt-0.5" />
            <p><strong>Data transparency:</strong> Shipment status, progress and coordinates come from your backend. Route checkpoints, dates, ETA, weather and alerts below are illustrative estimates, not verified live information or AI predictions.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <InfoCard icon={<FiTruck className="text-blue-600" />} label="Tracking number" value={shipment.tracking_number} />
            <InfoCard icon={<FiMapPin className="text-blue-600" />} label="Route" value={`${shipment.origin_country} → ${shipment.destination_country}`} />
            <InfoCard icon={<FiCompass className="text-blue-600" />} label="Shipment status" value={<span className={`inline-block px-2 py-1 rounded-lg text-sm ${statusTone(shipment.status)}`}>{shipment.status}</span>} />
            <InfoCard icon={<FiClock className="text-blue-600" />} label="Estimated arrival" value={estimatedSchedule ? formatDate(estimatedSchedule.eta) : "Unavailable"} detail={estimatedSchedule ? "Illustrative; generated from progress" : "No journey schedule available"} />
          </div>

          <Panel title="Shipment journey and tracking" icon={<FiNavigation className="text-blue-600" />} subtitle="Current shipment location is sourced from the backend when coordinates are available.">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
              <InfoCard label="Current location (backend)" value={shipment.current_location} />
              <InfoCard label="Next checkpoint" value={nextCheckpoint ? `${nextCheckpoint.name}, ${nextCheckpoint.country}` : (route ? "Destination checkpoint" : "Unavailable")} />
              <InfoCard label="Transport mode" value={selectedMode} detail={route ? "Configured route mode" : "No carrier mode supplied"} />
            </div>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="font-medium text-slate-700">Shipment progress (backend)</span>
              <span className="font-semibold text-blue-700">{progress}%</span>
            </div>
            <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-2 text-xs text-slate-500">Checkpoint completion below is inferred from progress for visualization; it is not a carrier event history.</p>
            <div className="mt-5 overflow-hidden rounded-xl border border-slate-200">
              <MapContainer
                key={`${shipment.tracking_number}-${mapCenter.join(",")}`}
                center={mapCenter}
                zoom={3}
                scrollWheelZoom={false}
                style={{ width: "100%", height: "380px" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {checkpoints.map((point, index) => (
                  <Marker
                    key={`${point.name}-${index}`}
                    position={point.coords}
                    zIndexOffset={index === 0 ? 1000 : 0}
                    icon= {
                      index === 0 ? ORIGIN_ICON
                      : index === checkpoints.length - 1
                        ? (progress === 100 ? DESTINATION_ICON : UPCOMING_DESTINATION_ICON)
                      : index < currentIndex ? PASSED_ICON
                      : index === currentIndex ? (index === 0 ? ORIGIN_ICON : CURRENT_ICON)
                      : UPCOMING_ICON
                    }
                  >
                    <Popup><strong>{point.name}, {point.country}</strong><div>{point.region}</div><div>Planned checkpoint: {formatDay(point.day)}</div></Popup>
                  </Marker>
                ))}
                {mapPositions.length > 1 && <Polyline positions={mapPositions} pathOptions={{ color: "#2563eb", weight: 4, dashArray: "7 8" }} />}
                {hasCoordinates && !currentAtOrigin && (
                  <Marker position={[shipment.latitude, shipment.longitude]} icon={CURRENT_ICON}>
                    <Popup><strong>Backend reported location</strong><div>{shipment.current_location}</div></Popup>
                  </Marker>
                )}
              </MapContainer>
            </div>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-600">
              <span><span className="inline-block h-3 w-3 rounded-full bg-green-600 mr-1" /> Origin</span>
              <span><span className="inline-block h-3 w-3 rounded-full bg-red-600 mr-1" /> Destination</span>
              <span><span className="inline-block h-3 w-3 rounded-full bg-blue-600 mr-1" /> Current location</span>
              <span><span className="inline-block h-3 w-3 rounded-full bg-slate-400 mr-1" /> Passed checkpoint</span>
              <span><span className="inline-block h-3 w-3 rounded-full bg-white border-2 border-slate-500 mr-1" /> Not reached</span>
            </div>
            <p className="text-xs text-slate-500 mt-3">Green identifies the configured origin, while gray identifies previously passed checkpoints. White markers indicate checkpoints not yet reached based on backend progress, not verified checkpoint scans. The destination has a red outline until progress reaches 100%. Dashed line connects planned checkpoints and is not a navigable sea/air/road route. {hasCoordinates ? "The backend-reported position is blue unless it coincides with the green origin." : "No valid current coordinates were provided by the backend."}</p>
            {!route && <p className="mt-3 text-sm text-amber-700">No configured route is configured for this tracking number. Shipment details are still available.</p>}
          </Panel>

          <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
            <div className="xl:col-span-3">
              <Panel title="Checkpoint timeline" icon={<FiMapPin className="text-blue-600" />} subtitle="Illustrative checkpoint dates are calculated from the displayed progress and configured transit duration.">
                {estimatedSchedule ? (
                  <div className="space-y-1">
                    {estimatedSchedule.items.map((point, index) => {
                      const completed = index < currentIndex || progress === 100;
                      const active = index === currentIndex && progress < 100;
                      return (
                        <div key={`${point.name}-${index}`} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${completed ? "bg-emerald-100 text-emerald-700" : active ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-500"}`}>
                              {completed ? <FiCheckCircle /> : <FiMapPin />}
                            </div>
                            {index < estimatedSchedule.items.length - 1 && <div className="w-0.5 min-h-10 flex-1 bg-slate-200" />}
                          </div>
                          <div className="pb-6 flex-1 min-w-0">
                            <div className="flex justify-between gap-3 flex-wrap">
                              <p className="font-semibold text-slate-900">{point.name}, {point.country}</p>
                              <span className="text-xs text-slate-500">{formatDay(point.day)}</span>
                            </div>
                            <p className="text-sm text-slate-500">{point.region} · {point.stage}</p>
                            <p className="text-sm text-slate-600 mt-1">Planned arrival: {formatDate(point.eta)}</p>
                            <p className={`text-xs font-medium mt-1 ${completed ? "text-emerald-700" : active ? "text-blue-700" : "text-slate-500"}`}>
                              {completed ? "Passed (inferred from progress)" : active ? "Current estimated stage" : "Upcoming (estimated)"}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : <p className="text-sm text-slate-500">A detailed timeline requires a configured route or carrier tracking events.</p>}
              </Panel>
            </div>
            <div className="xl:col-span-2 space-y-6">
              <Panel title="Delivery prediction" icon={<FiClock className="text-blue-600" />} subtitle="Estimated ETA only — no prediction model is connected yet.">
                {estimatedSchedule ? (
                  <>
                    <p className="text-sm text-slate-500">Illustrative delivery estimate</p>
                    <p className="text-xl font-bold text-slate-900 mt-1">{formatDate(estimatedSchedule.eta)}</p>
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <InfoCard label="Estimated transit" value={`${route.durationDays} days`} />
                      <InfoCard label="Estimated remaining" value={`${Math.max(0, Math.ceil(route.durationDays * (1 - progress / 100)))} days`} />
                    </div>
                    <p className="text-xs text-slate-500 mt-3">Actual ETA, delays and confidence require carrier events and a validated prediction model.</p>
                  </>
                ) : <p className="text-sm text-slate-500">No ETA available for this shipment.</p>}
              </Panel>
              <Panel title="Weather intelligence" icon={<FiCloud className="text-blue-600" />} subtitle="Live forecast integration is not configured.">
                <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                  <p className="font-medium text-slate-800">Current area</p>
                  <p className="text-sm text-slate-500 mt-1">{shipment.current_location}</p>
                  <p className="text-sm text-slate-600 mt-3">Temperature, wind, rainfall and marine conditions will appear after a weather API is connected.</p>
                </div>
                {nextCheckpoint && <p className="text-sm text-slate-500 mt-3">Upcoming forecast area: <strong className="text-slate-700">{nextCheckpoint.name}, {nextCheckpoint.country}</strong></p>}
              </Panel>
              <Panel title="Nearby news and disruptions" icon={<FiAlertTriangle className="text-amber-600" />} subtitle="No live news or port advisory provider is connected.">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <FiShield className="text-slate-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-600">Disruptions have not been checked. No reported incidents here does <strong>not</strong> mean the route is clear.</p>
                </div>
              </Panel>
              <Panel title="Shipment alerts" icon={<FiBell className="text-blue-600" />} subtitle="Informational alerts generated locally from this shipment record.">
                <div className="flex gap-3 p-3 bg-blue-50 rounded-lg text-blue-800 text-sm">
                  <FiInfo className="shrink-0 mt-0.5" />
                  <span>Latest stored status: <strong>{shipment.status}</strong> — {shipment.current_location}.</span>
                </div>
                <p className="text-xs text-slate-500 mt-3">Automatic country-entry, weather, disruption and ETA-change notifications require event history, API integrations and a notification service.</p>
              </Panel>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

