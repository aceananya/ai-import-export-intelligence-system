import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ── SVG Icons ──────────────────────────────────────────────
const IconDoc = ({ size = 28, color = "#2563eb" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
);
const IconHSN = ({ size = 28, color = "#2563eb" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
    <polyline points="2 17 12 22 22 17"/>
    <polyline points="2 12 12 17 22 12"/>
  </svg>
);
const IconDuty = ({ size = 28, color = "#2563eb" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
    <rect x="2" y="3" width="20" height="14" rx="2"/>
    <line x1="8" y1="21" x2="16" y2="21"/>
    <line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
);
const IconShip = ({ size = 28, color = "#2563eb" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
    <path d="M2 20h20M5 20V10l7-7 7 7v10"/>
    <path d="M9 20v-5h6v5"/>
  </svg>
);
const IconRisk = ({ size = 28, color = "#2563eb" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const IconAnalytics = ({ size = 28, color = "#2563eb" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
    <line x1="18" y1="20" x2="18" y2="10"/>
    <line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/>
  </svg>
);
const IconCompliance = ({ size = 28, color = "#2563eb" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
    <polyline points="9 11 12 14 22 4"/>
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
  </svg>
);
const IconImport = ({ size = 28, color = "#2563eb" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
    <rect x="1" y="3" width="15" height="13" rx="1"/>
    <path d="M16 8h4l3 3-3 3h-4"/>
    <line x1="8" y1="19" x2="8" y2="21"/>
    <line x1="5" y1="21" x2="11" y2="21"/>
  </svg>
);
const IconInvoice = ({ size = 28, color = "#2563eb" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="12" y1="18" x2="12" y2="12"/>
    <line x1="9" y1="15" x2="15" y2="15"/>
  </svg>
);
const IconAI = ({ size = 28, color = "#2563eb" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
  </svg>
);
const IconSecure = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const IconFee = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
    <line x1="12" y1="1" x2="12" y2="23"/>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);
const IconSupport = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);
const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
// Why Choose icons (larger, colored bg)
const IconRobot = ({ color }) => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
    <rect x="3" y="8" width="18" height="12" rx="2"/>
    <path d="M12 8V4"/>
    <circle cx="12" cy="4" r="1"/>
    <line x1="8" y1="14" x2="8" y2="14" strokeWidth="3" strokeLinecap="round"/>
    <line x1="16" y1="14" x2="16" y2="14" strokeWidth="3" strokeLinecap="round"/>
    <line x1="9" y1="17" x2="15" y2="17"/>
  </svg>
);
const IconTarget = ({ color }) => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
  </svg>
);
const IconEye = ({ color }) => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);
// CTA stat icons
const IconUsers = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.8">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const IconFileText = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.8">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
);
const IconCheckCircle = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.8">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);
// Ship icon for CTA
const IconShipLarge = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.4">
    <path d="M3 17l2 2 4-4 4 4 4-4 2 2"/>
    <path d="M21 13l-1-8H4L3 13"/>
    <path d="M12 5V2"/>
    <path d="M9 2h6"/>
  </svg>
);
// Footer contact icons
const IconMail = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);
const IconPhone = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const IconMapPin = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);
// Social icons
const IconLinkedIn = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#94a3b8">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);
const IconTwitter = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#94a3b8">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
  </svg>
);
const IconFacebook = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#94a3b8">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const IconYoutube = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#94a3b8">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#0f172a"/>
  </svg>
);

const ShnoorLogo = ({ size = 32, light = false }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <svg width={size} height={size} viewBox="0 0 40 40">
      <circle cx="20" cy="20" r="20" fill="#2563eb"/>
      <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold" fontFamily="sans-serif">S</text>
    </svg>
    <div>
      <div style={{ fontSize: size * 0.55, fontWeight: 800, color: light ? "#fff" : "#0f172a", letterSpacing: 1, lineHeight: 1 }}>SHNOOR</div>
      <div style={{ fontSize: size * 0.28, color: light ? "#93c5fd" : "#2563eb", letterSpacing: 0.5 }}>INTERNATIONAL LLC</div>
    </div>
  </div>
);

const features9 = [
  { icon: <IconDoc />, label: "Document\nProcessing" },
  { icon: <IconHSN />, label: "HSN\nClassification" },
  { icon: <IconDuty />, label: "Duty\nCalculator" },
  { icon: <IconShip />, label: "Shipment\nTracking" },
  { icon: <IconRisk />, label: "Risk\nAssessment" },
  { icon: <IconAnalytics />, label: "Trade\nAnalytics" },
  { icon: <IconCompliance />, label: "Compliance\nCheck" },
  { icon: <IconImport />, label: "Import & Export\nManagement" },
  { icon: <IconInvoice />, label: "Invoice\nValidation" },
  { icon: <IconAI />, label: "AI Powered\nRecommendations" },
];

const whyCards = [
  { icon: <IconRobot color="#2563eb" />, bg: "#eff6ff", title: "Smarter Automation", desc: "Automate repetitive tasks, reduce manual effort and minimize errors." },
  { icon: <IconTarget color="#16a34a" />, bg: "#f0fdf4", title: "Accurate & Reliable", desc: "AI models trained for trade data to deliver accurate results you can trust." },
  { icon: <IconEye color="#d97706" />, bg: "#fffbeb", title: "Real-Time Visibility", desc: "Track shipments and get instant insights to make better decisions." },
];

const testimonials = [
  { quote: "The platform has reduced our documentation time by 60% and improved accuracy across our operations.", name: "Rohit Verma", role: "Operations Manager", avatar: "RV", avatarBg: "#fde68a" },
  { quote: "HSN classification is now effortless and duty calculations are extremely accurate. Great product!", name: "Neha Iyer", role: "Export Consultant", avatar: "NI", avatarBg: "#fbcfe8" },
  { quote: "Real-time shipment tracking and analytics give us complete visibility of our global trade.", name: "Arjun Mehta", role: "Logistics Head", avatar: "AM", avatarBg: "#a7f3d0" },
];

const sidebarItems = [
  { num: "01", label: "DOCUMENTS", desc: "Smart document extraction & management" },
  { num: "02", label: "CLASSIFICATION", desc: "AI based HSN classification" },
  { num: "03", label: "ANALYTICS", desc: "Real-time trade insights" },
];

const heroFeatures = [
  { icon: <IconDoc />, label: "Document\nIntelligence" },
  { icon: <IconHSN />, label: "HSN\nClassification" },
  { icon: <IconDuty />, label: "Duty\nCalculator" },
  { icon: <IconShip />, label: "Shipment\nTracking" },
  { icon: <IconRisk />, label: "Risk\nAssessment" },
  { icon: <IconAnalytics />, label: "Trade\nAnalytics" },
];

const ctaStats = [
  { val: "750+", label: "Happy Customers", icon: <IconUsers /> },
  { val: "25K+", label: "Documents Processed", icon: <IconFileText /> },
  { val: "99.5%", label: "Accuracy Rate", icon: <IconCheckCircle /> },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [activeTestimonial] = useState(0);
  const [email, setEmail] = useState("");

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", color: "#0f172a", background: "#fff", overflowX: "hidden" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .nav-link { cursor: pointer; color: #334155; font-size: 15px; font-weight: 500; display:flex;align-items:center;gap:4px; transition: color .2s; }
        .nav-link:hover { color: #2563eb; }
        .btn-primary { background: #2563eb; color: #fff; border: none; padding: 12px 28px; border-radius: 10px; font-size: 15px; font-weight: 600; cursor: pointer; display:inline-flex;align-items:center;gap:8px; transition: background .2s; }
        .btn-primary:hover { background: #1d4ed8; }
        .btn-outline { background: transparent; color: #2563eb; border: 1.5px solid #2563eb; padding: 11px 24px; border-radius: 10px; font-size: 15px; font-weight: 600; cursor: pointer; display:inline-flex;align-items:center;gap:8px; transition: background .2s; }
        .btn-outline:hover { background: #eff6ff; }
        .feature-icon-card { display:flex;flex-direction:column;align-items:center;gap:10px;padding:18px 10px;background:#fff;border-radius:16px;border:1.5px solid #e2e8f0;text-align:center;min-width:90px; transition: border-color .2s, box-shadow .2s; cursor:pointer; }
        .feature-icon-card:hover { border-color:#2563eb;box-shadow:0 4px 16px #2563eb18; }
        .section-divider { display:flex;align-items:center;gap:12px;justify-content:center;margin-bottom:12px; }
        .section-divider::before,.section-divider::after { content:'';flex:1;height:1px;background:#e2e8f0;max-width:120px; }
        .partner-card { background:#fff;border:1.5px solid #e2e8f0;border-radius:14px;padding:18px 24px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:15px;letter-spacing:1px; }
        .why-card { border-radius:20px;padding:32px 28px; }
        .testimonial-card { background:#fff;border:1.5px solid #e2e8f0;border-radius:20px;padding:28px; }
        .footer-link { color:#94a3b8;font-size:14px;cursor:pointer;line-height:2.2; }
        .footer-link:hover { color:#fff; }
        .social-btn { width:34px;height:34px;border-radius:50%;border:1px solid #334155;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:border-color .2s; }
        .social-btn:hover { border-color:#2563eb; }
        .email-input { border:1.5px solid #e2e8f0;border-radius:10px;padding:12px 16px;font-size:15px;outline:none;flex:1;min-width:0; }
        .email-input:focus { border-color:#2563eb; }
      `}</style>

      {/* ── Navbar ── */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #f1f5f9", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", height: 70, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <ShnoorLogo size={34} />
          <ul style={{ display: "flex", gap: 32, listStyle: "none" }}>
            <li className="nav-link" style={{ color: "#2563eb", fontWeight: 700 }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Home</li>
            <li className="nav-link" onClick={() => scrollTo("solutions")}>Reviews</li>
            <li className="nav-link" onClick={() => scrollTo("features")}>Features</li>
            <li className="nav-link" onClick={() => navigate("/contact")}>Contact</li>
          </ul>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn-outline" style={{ padding: "10px 22px" }} onClick={() => navigate("/login")}>Sign Up</button>
            <button className="btn-primary" style={{ padding: "10px 28px" }} onClick={() => navigate("/login")}>Login</button>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 32px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 48, alignItems: "center" }}>
          <div>
            <span style={{ background: "#eff6ff", color: "#2563eb", padding: "6px 16px", borderRadius: 999, fontSize: 12, fontWeight: 700, letterSpacing: 1.2 }}>
              AI DRIVEN • DATA SMART • TRADE BETTER
            </span>
            <h1 style={{ fontSize: 52, fontWeight: 900, lineHeight: 1.13, marginTop: 20, color: "#0f172a" }}>
              Intelligent Trade<br />Solutions for a<br />
              <span style={{ color: "#2563eb" }}>Global Future</span>
            </h1>
            <p style={{ marginTop: 20, fontSize: 16, color: "#64748b", lineHeight: 1.8, maxWidth: 420 }}>
              Automate documentation, classify products, calculate duties, track shipments and get real-time insights — all in one AI-powered platform.
            </p>
            <div style={{ display: "flex", gap: 14, marginTop: 32 }}>
              <button className="btn-primary" onClick={() => navigate("/login")}>Explore Platform →</button>
              <button className="btn-outline" onClick={() => scrollTo("features")}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
                See How It Works
              </button>
            </div>
            <div style={{ display: "flex", gap: 24, marginTop: 28, flexWrap: "wrap" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#64748b" }}><IconSecure /> Secure & Compliant</span>
              <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#64748b" }}><IconFee /> Zero Hidden Fees</span>
              <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#64748b" }}><IconSupport /> 24/7 Assistance</span>
            </div>
          </div>
          {/* Hero card */}
          <div style={{ background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 24, padding: 24, boxShadow: "0 8px 40px #0f172a0a" }}>
            <div style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: 16 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {sidebarItems.map((item, i) => (
                  <div key={i} style={{ padding: "14px", borderRadius: 12, background: i === 0 ? "#fff" : "transparent", border: i === 0 ? "1.5px solid #e2e8f0" : "none" }}>
                    <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 2 }}>{item.num}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: i === 0 ? "#2563eb" : "#334155" }}>{item.label}</div>
                    <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4, lineHeight: 1.4 }}>{item.desc}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                {heroFeatures.map((f, i) => (
                  <div key={i} className="feature-icon-card" style={{ padding: "16px 8px" }}>
                    {f.icon}
                    <span style={{ fontSize: 11, fontWeight: 600, color: "#334155", whiteSpace: "pre-line", textAlign: "center", lineHeight: 1.4 }}>{f.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trusted by ── */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 32px 48px" }}>
        <div className="section-divider">
          <span style={{ fontSize: 15, fontWeight: 600, color: "#475569" }}>Trusted by Businesses Worldwide</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 16, marginTop: 24 }}>
          {["DP WORLD", "MAERSK", "FedEx", "Hapag-Lloyd", "CMA CGM"].map((name, i) => (
            <div key={i} className="partner-card" style={{ fontSize: i === 2 ? 20 : 15, color: i === 2 ? "#f26522" : i === 3 ? "#003153" : i === 4 ? "#c00" : "#334155" }}>
              {name}
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" style={{ background: "#f8fafc", padding: "64px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, textAlign: "center", marginBottom: 8 }}>Everything You Need To Simplify Global Trade</h2>
          <div style={{ width: 48, height: 3, background: "#2563eb", borderRadius: 99, margin: "0 auto 48px" }} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
            {features9.map((f, i) => (
              <div key={i} className="feature-icon-card" style={{ minWidth: 100, flex: "0 0 auto" }}>
                {f.icon}
                <span style={{ fontSize: 12, fontWeight: 600, color: "#334155", whiteSpace: "pre-line", textAlign: "center", lineHeight: 1.4 }}>{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose SHNOOR ── */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 48, alignItems: "start" }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#2563eb", letterSpacing: 1, marginBottom: 10 }}>WHY CHOOSE SHNOOR?</div>
            <h2 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.2, marginBottom: 20 }}>Built for Modern Trade Businesses</h2>
            <p style={{ color: "#64748b", fontSize: 15, lineHeight: 1.8 }}>
              We combine AI, automation and domain expertise to help you reduce costs, save time and stay compliant in global markets.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {whyCards.map((c, i) => (
              <div key={i} className="why-card" style={{ background: c.bg }}>
                <div style={{ marginBottom: 14 }}>{c.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10 }}>{c.title}</h3>
                <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.7 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials / Solutions ── */}
      <section id="solutions" style={{ background: "#f8fafc", padding: "64px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, textAlign: "center", marginBottom: 8 }}>What Our Clients Say</h2>
          <div style={{ width: 48, height: 3, background: "#2563eb", borderRadius: 99, margin: "0 auto 48px" }} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card">
                <div style={{ fontSize: 36, color: "#2563eb", lineHeight: 1, marginBottom: 12 }}>"</div>
                <p style={{ color: "#475569", fontSize: 15, lineHeight: 1.75, marginBottom: 24 }}>{t.quote}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: t.avatarBg, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 15, color: "#334155" }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{t.name}</div>
                    <div style={{ fontSize: 13, color: "#94a3b8" }}>{t.role}</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 2, marginTop: 14 }}>
                  {[...Array(5)].map((_, j) => <StarIcon key={j} />)}
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 32 }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{ width: i === activeTestimonial ? 24 : 8, height: 8, borderRadius: 99, background: i === activeTestimonial ? "#2563eb" : "#cbd5e1", transition: "width .3s" }} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="contact" style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 32px" }}>
        <div style={{ background: "#f8fafc", borderRadius: 24, padding: "48px", display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "center" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 32, flexWrap: "wrap", marginBottom: 32 }}>
              <div style={{ width: 100, height: 80, background: "#dbeafe", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <IconShipLarge />
              </div>
              <div>
                <h2 style={{ fontSize: 30, fontWeight: 800, marginBottom: 8 }}>Start Your Smart Trade Journey Today</h2>
                <p style={{ color: "#64748b", fontSize: 15 }}>Join hundreds of businesses using AI to simplify import export operations.</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
              {ctaStats.map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  {s.icon}
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 22 }}>{s.val}</div>
                    <div style={{ fontSize: 13, color: "#94a3b8" }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <input className="email-input" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: 220 }} />
            <button className="btn-primary" onClick={() => navigate("/login")}>Get Started</button>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ background: "#0f172a", color: "#fff", padding: "56px 0 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 48, paddingBottom: 40, borderBottom: "1px solid #1e293b" }}>
            <div>
              <ShnoorLogo size={34} light />
              <p style={{ color: "#94a3b8", marginTop: 16, fontSize: 14, lineHeight: 1.8, maxWidth: 280 }}>
                Empowering global trade with AI-driven solutions for a smarter, faster and compliant tomorrow.
              </p>
              <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                {[<IconLinkedIn />, <IconTwitter />, <IconFacebook />, <IconYoutube />].map((icon, i) => (
                  <div key={i} className="social-btn">{icon}</div>
                ))}
              </div>
            </div>
            <div>
              <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 16 }}>Quick Links</h3>
              {[
                { label: "Home", action: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
                { label: "Reviews", action: () => scrollTo("solutions") },
                { label: "Features", action: () => scrollTo("features") },
                { label: "Contact", action: () => navigate("/contact") },
              ].map(l => (
                <div key={l.label} className="footer-link" onClick={l.action}>{l.label}</div>
              ))}
            </div>
            <div>
              <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 16 }}>Contact Us</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { icon: <IconMail />, text: "support@shnoor.com" },
                  { icon: <IconPhone />, text: "+91 98765 43210" },
                  { icon: <IconMapPin />, text: "Mumbai, India" },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, color: "#94a3b8", fontSize: 14 }}>
                    {item.icon} {item.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 24 }}>
            <p style={{ color: "#475569", fontSize: 13 }}>© 2026 SHNOOR International LLC. All rights reserved.</p>
            <div style={{ display: "flex", gap: 24 }}>
              <span style={{ color: "#475569", fontSize: 13, cursor: "pointer" }}>Privacy Policy</span>
              <span style={{ color: "#475569", fontSize: 13 }}>|</span>
              <span style={{ color: "#475569", fontSize: 13, cursor: "pointer" }}>Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

