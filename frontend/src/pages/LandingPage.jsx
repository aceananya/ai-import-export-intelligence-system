import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ── SVG Icons (all with aria-hidden) ──────────────────────────────────────────
const IconDoc = ({ size = 28, color = "#2563eb" }) => (
  <svg aria-hidden="true" focusable="false" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
);
const IconHSN = ({ size = 28, color = "#2563eb" }) => (
  <svg aria-hidden="true" focusable="false" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
    <polyline points="2 17 12 22 22 17"/>
    <polyline points="2 12 12 17 22 12"/>
  </svg>
);
const IconDuty = ({ size = 28, color = "#2563eb" }) => (
  <svg aria-hidden="true" focusable="false" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
    <rect x="2" y="3" width="20" height="14" rx="2"/>
    <line x1="8" y1="21" x2="16" y2="21"/>
    <line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
);
const IconShip = ({ size = 28, color = "#2563eb" }) => (
  <svg aria-hidden="true" focusable="false" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
    <path d="M2 20h20M5 20V10l7-7 7 7v10"/>
    <path d="M9 20v-5h6v5"/>
  </svg>
);
const IconRisk = ({ size = 28, color = "#2563eb" }) => (
  <svg aria-hidden="true" focusable="false" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const IconAnalytics = ({ size = 28, color = "#2563eb" }) => (
  <svg aria-hidden="true" focusable="false" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
    <line x1="18" y1="20" x2="18" y2="10"/>
    <line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/>
  </svg>
);
const IconCompliance = ({ size = 28, color = "#2563eb" }) => (
  <svg aria-hidden="true" focusable="false" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
    <polyline points="9 11 12 14 22 4"/>
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
  </svg>
);
const IconImport = ({ size = 28, color = "#2563eb" }) => (
  <svg aria-hidden="true" focusable="false" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
    <rect x="1" y="3" width="15" height="13" rx="1"/>
    <path d="M16 8h4l3 3-3 3h-4"/>
    <line x1="8" y1="19" x2="8" y2="21"/>
    <line x1="5" y1="21" x2="11" y2="21"/>
  </svg>
);
const IconInvoice = ({ size = 28, color = "#2563eb" }) => (
  <svg aria-hidden="true" focusable="false" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="12" y1="18" x2="12" y2="12"/>
    <line x1="9" y1="15" x2="15" y2="15"/>
  </svg>
);
const IconAI = ({ size = 28, color = "#2563eb" }) => (
  <svg aria-hidden="true" focusable="false" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
  </svg>
);
const IconSecure = () => (
  <svg aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const IconFee = () => (
  <svg aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2">
    <line x1="12" y1="1" x2="12" y2="23"/>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);
const IconSupport = () => (
  <svg aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);
const StarIcon = () => (
  <svg aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
const IconRobot = ({ color }) => (
  <svg aria-hidden="true" focusable="false" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
    <rect x="3" y="8" width="18" height="12" rx="2"/>
    <path d="M12 8V4"/>
    <circle cx="12" cy="4" r="1"/>
    <line x1="8" y1="14" x2="8" y2="14" strokeWidth="3" strokeLinecap="round"/>
    <line x1="16" y1="14" x2="16" y2="14" strokeWidth="3" strokeLinecap="round"/>
    <line x1="9" y1="17" x2="15" y2="17"/>
  </svg>
);
const IconTarget = ({ color }) => (
  <svg aria-hidden="true" focusable="false" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
  </svg>
);
const IconEye = ({ color }) => (
  <svg aria-hidden="true" focusable="false" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);
const IconUsers = () => (
  <svg aria-hidden="true" focusable="false" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="1.8">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const IconFileText = () => (
  <svg aria-hidden="true" focusable="false" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="1.8">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
);
const IconCheckCircle = () => (
  <svg aria-hidden="true" focusable="false" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="1.8">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);
const IconShipLarge = () => (
  <svg aria-hidden="true" focusable="false" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="1.4">
    <path d="M3 17l2 2 4-4 4 4 4-4 2 2"/>
    <path d="M21 13l-1-8H4L3 13"/>
    <path d="M12 5V2"/>
    <path d="M9 2h6"/>
  </svg>
);
const IconMail = ({ color = "#94a3b8", size = 16 }) => (
  <svg aria-hidden="true" focusable="false" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);
const IconPhone = ({ color = "#94a3b8", size = 16 }) => (
  <svg aria-hidden="true" focusable="false" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const IconMapPin = ({ color = "#94a3b8", size = 16 }) => (
  <svg aria-hidden="true" focusable="false" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);
const IconLinkedIn = () => (
  <svg aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 24 24" fill="#94a3b8">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);
const IconTwitter = () => (
  <svg aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 24 24" fill="#94a3b8">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
  </svg>
);
const IconFacebook = () => (
  <svg aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 24 24" fill="#94a3b8">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const IconYoutube = () => (
  <svg aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 24 24" fill="#94a3b8">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#0f172a"/>
  </svg>
);
const IconMenu = () => (
  <svg aria-hidden="true" focusable="false" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2">
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);
const IconClose = () => (
  <svg aria-hidden="true" focusable="false" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const ShnoorLogo = ({ size = 32, light = false }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <svg aria-hidden="true" focusable="false" width={size} height={size} viewBox="0 0 40 40">
      <circle cx="20" cy="20" r="20" fill="#2563eb"/>
      <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold" fontFamily="sans-serif">S</text>
    </svg>
    <div>
      <div style={{ fontSize: size * 0.55, fontWeight: 800, color: light ? "#fff" : "#0f172a", letterSpacing: 1, lineHeight: 1 }}>SHNOOR</div>
      <div style={{ fontSize: size * 0.28, color: light ? "#93c5fd" : "#1d4ed8", letterSpacing: 0.5 }}>INTERNATIONAL LLC</div>
    </div>
  </div>
);

const features9 = [
  { icon: <IconDoc />, label: "Document Processing" },
  { icon: <IconHSN />, label: "HSN Classification" },
  { icon: <IconDuty />, label: "Duty Calculator" },
  { icon: <IconShip />, label: "Shipment Tracking" },
  { icon: <IconRisk />, label: "Risk Assessment" },
  { icon: <IconAnalytics />, label: "Trade Analytics" },
  { icon: <IconCompliance />, label: "Compliance Check" },
  { icon: <IconImport />, label: "Import & Export Management" },
  { icon: <IconInvoice />, label: "Invoice Validation" },
  { icon: <IconAI />, label: "AI Powered Recommendations" },
];

const whyCards = [
  { icon: <IconRobot color="#1d4ed8" />, bg: "#eff6ff", title: "Smarter Automation", desc: "Automate repetitive tasks, reduce manual effort and minimize errors." },
  { icon: <IconTarget color="#15803d" />, bg: "#f0fdf4", title: "Accurate & Reliable", desc: "AI models trained for trade data to deliver accurate results you can trust." },
  { icon: <IconEye color="#b45309" />, bg: "#fffbeb", title: "Real-Time Visibility", desc: "Track shipments and get instant insights to make better decisions." },
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
  { icon: <IconDoc />, label: "Document Intelligence" },
  { icon: <IconHSN />, label: "HSN Classification" },
  { icon: <IconDuty />, label: "Duty Calculator" },
  { icon: <IconShip />, label: "Shipment Tracking" },
  { icon: <IconRisk />, label: "Risk Assessment" },
  { icon: <IconAnalytics />, label: "Trade Analytics" },
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
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", color: "#0f172a", background: "#fff", overflowX: "hidden" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }

        /* Skip link for keyboard users */
        .skip-link { position:absolute;top:-100px;left:16px;background:#2563eb;color:#fff;padding:8px 16px;border-radius:6px;font-weight:700;font-size:14px;z-index:9999;text-decoration:none;transition:top .15s; }
        .skip-link:focus { top:8px; }

        /* Focus styles — visible on keyboard nav */
        :focus-visible { outline:3px solid #2563eb !important; outline-offset:3px !important; border-radius:4px; }

        .nav-link { cursor:pointer;color:#1e293b;font-size:15px;font-weight:500;display:flex;align-items:center;gap:4px;transition:color .2s;white-space:nowrap;background:none;border:none;padding:4px 0;text-decoration:none; }
        .nav-link:hover { color:#2563eb; }

        /* Buttons — min 44×44 touch target */
        .btn-primary { background:#1d4ed8;color:#fff;border:none;padding:12px 28px;border-radius:10px;font-size:15px;font-weight:700;cursor:pointer;display:inline-flex;align-items:center;gap:8px;transition:background .2s;min-height:44px; }
        .btn-primary:hover { background:#1e40af; }
        .btn-outline { background:transparent;color:#1d4ed8;border:2px solid #1d4ed8;padding:10px 24px;border-radius:10px;font-size:15px;font-weight:700;cursor:pointer;display:inline-flex;align-items:center;gap:8px;transition:background .2s;min-height:44px; }
        .btn-outline:hover { background:#eff6ff; }

        .feature-icon-card { display:flex;flex-direction:column;align-items:center;gap:10px;padding:16px 10px;background:#fff;border-radius:16px;border:2px solid #e2e8f0;text-align:center;transition:border-color .2s,box-shadow .2s;cursor:pointer; }
        .feature-icon-card:hover,.feature-icon-card:focus { border-color:#2563eb;box-shadow:0 4px 16px #2563eb18; }

        .section-divider { display:flex;align-items:center;gap:12px;justify-content:center;margin-bottom:12px; }
        .section-divider::before,.section-divider::after { content:'';flex:1;height:1px;background:#e2e8f0;max-width:120px; }

        .partner-card { background:#fff;border:2px solid #e2e8f0;border-radius:14px;padding:16px 20px;display:flex;align-items:center;justify-content:center;font-weight:700;letter-spacing:1px; }
        .why-card { border-radius:20px;padding:28px 24px; }
        .testimonial-card { background:#fff;border:2px solid #e2e8f0;border-radius:20px;padding:24px; }

        .footer-link { color:#94a3b8;font-size:14px;cursor:pointer;line-height:2.4;background:none;border:none;display:block;text-align:left;padding:0; }
        .footer-link:hover { color:#fff;text-decoration:underline; }

        .social-btn { width:44px;height:44px;border-radius:50%;border:1px solid #475569;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:border-color .2s;background:none; }
        .social-btn:hover { border-color:#60a5fa; }

        .email-input { border:2px solid #cbd5e1;border-radius:10px;padding:12px 16px;font-size:15px;outline:none;flex:1;min-width:0;min-height:44px; }
        .email-input:focus { border-color:#2563eb;box-shadow:0 0 0 3px #2563eb33; }

        .mobile-nav-link { display:block;padding:14px 0;font-size:16px;font-weight:600;color:#1e293b;border-bottom:1px solid #f1f5f9;cursor:pointer;background:none;border-left:none;border-right:none;border-top:none;width:100%;text-align:left;min-height:44px; }
        .mobile-nav-link:hover { color:#2563eb; }

        /* ── Responsive grid layout ── */
        .hero-grid { display:grid;grid-template-columns:1fr 1.1fr;gap:48px;align-items:center; }
        .hero-card-grid { display:grid;grid-template-columns:160px 1fr;gap:16px; }
        .features-grid-inner { display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px; }
        .why-grid { display:grid;grid-template-columns:300px 1fr;gap:48px;align-items:start; }
        .why-cards-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:20px; }
        .testimonials-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:24px; }
        .partners-grid { display:grid;grid-template-columns:repeat(5,1fr);gap:16px; }
        .cta-grid { display:grid;grid-template-columns:1fr auto;gap:40px;align-items:center; }
        .cta-stats { display:flex;gap:40px;flex-wrap:wrap; }
        .footer-grid { display:grid;grid-template-columns:2fr 1fr 1fr;gap:48px; }
        .nav-desktop { display:flex; }
        .nav-mobile-btn { display:none; }
        .nav-buttons-desktop { display:flex; }

        @media (max-width:1024px) {
          .hero-grid { grid-template-columns:1fr;gap:40px; }
          .hero-card-grid { grid-template-columns:140px 1fr; }
          .why-grid { grid-template-columns:1fr;gap:32px; }
          .why-cards-grid { grid-template-columns:repeat(3,1fr); }
          .footer-grid { grid-template-columns:1fr 1fr; }
        }

        @media (max-width:768px) {
          .nav-desktop { display:none !important; }
          .nav-buttons-desktop { display:none !important; }
          .nav-mobile-btn { display:flex !important; }
          .hero-grid { grid-template-columns:1fr;gap:32px; }
          .hero-card { display:none; }
          .partners-grid { grid-template-columns:repeat(3,1fr);gap:10px; }
          .features-grid-inner { grid-template-columns:1fr 1fr;gap:8px; }
          .why-cards-grid { grid-template-columns:1fr;gap:16px; }
          .testimonials-grid { grid-template-columns:1fr;gap:16px; }
          .cta-grid { grid-template-columns:1fr;gap:28px; }
          .cta-stats { gap:20px; }
          .cta-email-row { flex-direction:column;width:100%; }
          .cta-email-row .email-input { width:100% !important; }
          .footer-grid { grid-template-columns:1fr;gap:32px; }
          h1.hero-title { font-size:38px !important; }
          h2.section-title { font-size:26px !important; }
          .section-pad { padding:48px 20px !important; }
          .hero-section { padding:40px 20px 32px !important; }
          .nav-pad { padding:0 20px !important; }
          .footer-pad { padding:0 20px !important; }
        }

        @media (max-width:480px) {
          .partners-grid { grid-template-columns:repeat(2,1fr); }
          h1.hero-title { font-size:32px !important; }
          .btn-primary, .btn-outline { font-size:14px;padding:11px 18px; }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion:reduce) {
          * { transition:none !important;animation:none !important; }
        }
      `}</style>

      {/* Skip navigation link */}
      <a href="#main-content" className="skip-link">Skip to main content</a>

      {/* ── Navbar ── */}
      <header>
        <nav aria-label="Main navigation" style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", position: "sticky", top: 0, zIndex: 100 }}>
          <div className="nav-pad" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", height: 70, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

            <a href="/" aria-label="SHNOOR — go to homepage" style={{ textDecoration: "none" }} onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
              <ShnoorLogo size={34} />
            </a>

            {/* Desktop nav */}
            <ul className="nav-desktop" style={{ gap: 32, listStyle: "none" }} role="list">
              <li><button className="nav-link" style={{ color: "#1d4ed8", fontWeight: 700 }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Home</button></li>
              <li><button className="nav-link" onClick={() => scrollTo("solutions")}>Reviews</button></li>
              <li><button className="nav-link" onClick={() => scrollTo("features")}>Features</button></li>
              <li><button className="nav-link" onClick={() => navigate("/contact")}>Contact</button></li>
            </ul>

            <div className="nav-buttons-desktop" style={{ gap: 10 }}>
              <button className="btn-outline" style={{ padding: "10px 22px" }} onClick={() => navigate("/login")}>Sign Up</button>
              <button className="btn-primary" style={{ padding: "10px 28px" }} onClick={() => navigate("/login")}>Login</button>
            </div>

            {/* Mobile hamburger */}
            <button
              className="nav-mobile-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 8, minHeight: 44, minWidth: 44, display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              {menuOpen ? <IconClose /> : <IconMenu />}
            </button>
          </div>

          {/* Mobile menu */}
          <div id="mobile-menu" hidden={!menuOpen} aria-label="Mobile navigation" style={{ background: "#fff", borderTop: "1px solid #f1f5f9", padding: "8px 20px 20px" }}>
            <button className="mobile-nav-link" onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); setMenuOpen(false); }}>Home</button>
            <button className="mobile-nav-link" onClick={() => scrollTo("solutions")}>Reviews</button>
            <button className="mobile-nav-link" onClick={() => scrollTo("features")}>Features</button>
            <button className="mobile-nav-link" onClick={() => { navigate("/contact"); setMenuOpen(false); }}>Contact</button>
            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <button className="btn-outline" style={{ flex: 1, justifyContent: "center" }} onClick={() => { navigate("/login"); setMenuOpen(false); }}>Sign Up</button>
              <button className="btn-primary" style={{ flex: 1, justifyContent: "center" }} onClick={() => { navigate("/login"); setMenuOpen(false); }}>Login</button>
            </div>
          </div>
        </nav>
      </header>

      <main id="main-content">

        {/* ── Hero ── */}
        <section aria-labelledby="hero-heading" className="hero-section" style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 32px 40px" }}>
          <div className="hero-grid">
            <div>
              <p style={{ background: "#eff6ff", color: "#1d4ed8", padding: "6px 16px", borderRadius: 999, fontSize: 12, fontWeight: 700, letterSpacing: 1.2, display: "inline-block" }}>
                AI DRIVEN • DATA SMART • TRADE BETTER
              </p>
              <h1 id="hero-heading" className="hero-title" style={{ fontSize: 52, fontWeight: 900, lineHeight: 1.13, marginTop: 20, color: "#0f172a" }}>
                Intelligent Trade<br />Solutions for a<br />
                <span style={{ color: "#2563eb" }}>Global Future</span>
              </h1>
              <p style={{ marginTop: 20, fontSize: 16, color: "#374151", lineHeight: 1.8, maxWidth: 420 }}>
                Automate documentation, classify products, calculate duties, track shipments and get real-time insights — all in one AI-powered platform.
              </p>
              <div style={{ display: "flex", gap: 14, marginTop: 32, flexWrap: "wrap" }}>
                <button className="btn-primary" onClick={() => navigate("/login")}>Get Started →</button>
                <button className="btn-outline" onClick={() => scrollTo("features")}>
                  <svg aria-hidden="true" focusable="false" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
                  See How It Works
                </button>
              </div>
              <ul style={{ display: "flex", gap: 20, marginTop: 28, flexWrap: "wrap", listStyle: "none" }} role="list" aria-label="Platform features">
                <li style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#374151" }}><IconSecure /> Secure &amp; Compliant</li>
                <li style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#374151" }}><IconFee /> Zero Hidden Fees</li>
                <li style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#374151" }}><IconSupport /> 24/7 Assistance</li>
              </ul>
            </div>

            {/* Hero card — hidden on mobile via CSS, also aria-hidden */}
            <div className="hero-card" aria-hidden="true" style={{ background: "#fff", border: "2px solid #e2e8f0", borderRadius: 24, padding: 24, boxShadow: "0 8px 40px #0f172a0a" }}>
              <div className="hero-card-grid">
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {sidebarItems.map((item, i) => (
                    <div key={i} style={{ padding: "14px", borderRadius: 12, background: i === 0 ? "#fff" : "transparent", border: i === 0 ? "2px solid #e2e8f0" : "none" }}>
                      <div style={{ fontSize: 11, color: "#64748b", marginBottom: 2 }}>{item.num}</div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: i === 0 ? "#2563eb" : "#1e293b" }}>{item.label}</div>
                      <div style={{ fontSize: 12, color: "#64748b", marginTop: 4, lineHeight: 1.4 }}>{item.desc}</div>
                    </div>
                  ))}
                </div>
                <div className="features-grid-inner">
                  {heroFeatures.map((f, i) => (
                    <div key={i} className="feature-icon-card" style={{ padding: "14px 8px" }}>
                      {f.icon}
                      <span style={{ fontSize: 11, fontWeight: 600, color: "#1e293b", textAlign: "center", lineHeight: 1.4 }}>{f.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Trusted by ── */}
        <section aria-label="Trusted by businesses worldwide" style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 32px 48px" }}>
          <div className="section-divider">
            <span style={{ fontSize: 15, fontWeight: 600, color: "#374151" }}>Trusted by Businesses Worldwide</span>
          </div>
          <ul className="partners-grid" style={{ marginTop: 24, listStyle: "none" }} role="list" aria-label="Partner companies">
            {["DP WORLD", "MAERSK", "FedEx", "Hapag-Lloyd", "CMA CGM"].map((name, i) => (
              <li key={i} className="partner-card" style={{ fontSize: i === 2 ? 18 : 14, color: i === 2 ? "#c2410c" : i === 3 ? "#1e3a5f" : i === 4 ? "#991b1b" : "#1e293b" }}>
                {name}
              </li>
            ))}
          </ul>
        </section>

        {/* ── Features ── */}
        <section id="features" aria-labelledby="features-heading" className="section-pad" style={{ background: "#f8fafc", padding: "64px 32px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <h2 id="features-heading" className="section-title" style={{ fontSize: 36, fontWeight: 800, textAlign: "center", marginBottom: 8, color: "#0f172a" }}>
              Everything You Need To Simplify Global Trade
            </h2>
            <div aria-hidden="true" style={{ width: 48, height: 3, background: "#2563eb", borderRadius: 99, margin: "0 auto 48px" }} />
            <ul style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center", listStyle: "none" }} role="list" aria-label="Platform features list">
              {features9.map((f, i) => (
                <li key={i} className="feature-icon-card" style={{ minWidth: 90, flex: "0 0 auto" }} tabIndex="0" aria-label={f.label}>
                  {f.icon}
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#1e293b", textAlign: "center", lineHeight: 1.4 }}>{f.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Why Choose SHNOOR ── */}
        <section aria-labelledby="why-heading" className="section-pad" style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 32px" }}>
          <div className="why-grid">
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#1d4ed8", letterSpacing: 1, marginBottom: 10 }}>WHY CHOOSE SHNOOR?</p>
              <h2 id="why-heading" className="section-title" style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.2, marginBottom: 20, color: "#0f172a" }}>
                Built for Modern Trade Businesses
              </h2>
              <p style={{ color: "#374151", fontSize: 15, lineHeight: 1.8 }}>
                We combine AI, automation and domain expertise to help you reduce costs, save time and stay compliant in global markets.
              </p>
            </div>
            <ul className="why-cards-grid" style={{ listStyle: "none" }} role="list">
              {whyCards.map((c, i) => (
                <li key={i} className="why-card" style={{ background: c.bg }}>
                  <div style={{ marginBottom: 14 }}>{c.icon}</div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, color: "#0f172a" }}>{c.title}</h3>
                  <p style={{ color: "#374151", fontSize: 14, lineHeight: 1.7 }}>{c.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section id="solutions" aria-labelledby="reviews-heading" className="section-pad" style={{ background: "#f8fafc", padding: "64px 32px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <h2 id="reviews-heading" className="section-title" style={{ fontSize: 36, fontWeight: 800, textAlign: "center", marginBottom: 8, color: "#0f172a" }}>
              What Our Clients Say
            </h2>
            <div aria-hidden="true" style={{ width: 48, height: 3, background: "#2563eb", borderRadius: 99, margin: "0 auto 48px" }} />
            <ul className="testimonials-grid" style={{ listStyle: "none" }} role="list" aria-label="Customer testimonials">
              {testimonials.map((t, i) => (
                <li key={i} className="testimonial-card">
                  <p aria-hidden="true" style={{ fontSize: 36, color: "#2563eb", lineHeight: 1, marginBottom: 12 }}>"</p>
                  <blockquote style={{ color: "#374151", fontSize: 15, lineHeight: 1.75, marginBottom: 24, fontStyle: "normal" }}>
                    {t.quote}
                  </blockquote>
                  <footer style={{ display: "flex", alignItems: "center", gap: 14, background: "none", padding: 0 }}>
                    <div
                      aria-hidden="true"
                      style={{ width: 44, height: 44, borderRadius: "50%", background: t.avatarBg, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 15, color: "#1e293b", flexShrink: 0 }}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <cite style={{ fontWeight: 700, fontSize: 15, color: "#0f172a", fontStyle: "normal" }}>{t.name}</cite>
                      <p style={{ fontSize: 13, color: "#64748b" }}>{t.role}</p>
                    </div>
                  </footer>
                  <div role="img" aria-label="5 out of 5 stars" style={{ display: "flex", gap: 2, marginTop: 14 }}>
                    {[...Array(5)].map((_, j) => <StarIcon key={j} />)}
                  </div>
                </li>
              ))}
            </ul>
            <div aria-hidden="true" style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 32 }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{ width: i === activeTestimonial ? 24 : 8, height: 8, borderRadius: 99, background: i === activeTestimonial ? "#2563eb" : "#94a3b8", transition: "width .3s" }} />
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section id="contact" aria-labelledby="cta-heading" className="section-pad" style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 32px" }}>
          <div style={{ background: "#f1f5f9", borderRadius: 24, padding: "40px 40px", border: "1px solid #e2e8f0" }}>
            <div className="cta-grid">
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap", marginBottom: 28 }}>
                  <div aria-hidden="true" style={{ width: 90, height: 72, background: "#dbeafe", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <IconShipLarge />
                  </div>
                  <div>
                    <h2 id="cta-heading" className="section-title" style={{ fontSize: 26, fontWeight: 800, marginBottom: 8, color: "#0f172a" }}>
                      Start Your Smart Trade Journey Today
                    </h2>
                    <p style={{ color: "#374151", fontSize: 15 }}>Join hundreds of businesses using AI to simplify import export operations.</p>
                  </div>
                </div>
                <ul className="cta-stats" style={{ listStyle: "none" }} role="list" aria-label="Platform statistics">
                  {ctaStats.map((s, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      {s.icon}
                      <div>
                        <p style={{ fontWeight: 800, fontSize: 20, color: "#0f172a" }}>{s.val}</p>
                        <p style={{ fontSize: 13, color: "#64748b" }}>{s.label}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="cta-email-row" style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <label htmlFor="cta-email" className="skip-link" style={{ position: "absolute" }}>Email address</label>
                <input
                  id="cta-email"
                  className="email-input"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  aria-label="Email address"
                  style={{ width: 200 }}
                />
                <button className="btn-primary" onClick={() => navigate("/login")}>Get Started</button>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer style={{ background: "#0f172a", color: "#fff", padding: "56px 0 24px" }}>
        <div className="footer-pad" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <div className="footer-grid" style={{ paddingBottom: 40, borderBottom: "1px solid #1e293b" }}>
            <div>
              <a href="/" aria-label="SHNOOR homepage" style={{ textDecoration: "none", display: "inline-block" }} onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                <ShnoorLogo size={34} light />
              </a>
              <p style={{ color: "#94a3b8", marginTop: 16, fontSize: 14, lineHeight: 1.8, maxWidth: 280 }}>
                Empowering global trade with AI-driven solutions for a smarter, faster and compliant tomorrow.
              </p>
              <div style={{ display: "flex", gap: 10, marginTop: 20 }} role="list" aria-label="Social media links">
                {[
                  { icon: <IconLinkedIn />, label: "LinkedIn" },
                  { icon: <IconTwitter />, label: "Twitter" },
                  { icon: <IconFacebook />, label: "Facebook" },
                  { icon: <IconYoutube />, label: "YouTube" },
                ].map((s, i) => (
                  <button key={i} className="social-btn" aria-label={`Follow us on ${s.label}`}>{s.icon}</button>
                ))}
              </div>
            </div>
            <nav aria-label="Footer quick links">
              <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 16, color: "#fff" }}>Quick Links</h3>
              {[
                { label: "Home", action: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
                { label: "Reviews", action: () => scrollTo("solutions") },
                { label: "Features", action: () => scrollTo("features") },
                { label: "Contact", action: () => navigate("/contact") },
              ].map(l => (
                <button key={l.label} className="footer-link" onClick={l.action}>{l.label}</button>
              ))}
            </nav>
            <address style={{ fontStyle: "normal" }}>
              <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 16, color: "#fff" }}>Contact Us</h3>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                <li style={{ display: "flex", alignItems: "center", gap: 8, color: "#94a3b8", fontSize: 14 }}>
                  <IconMail /><a href="mailto:support@shnoor.com" style={{ color: "#94a3b8", textDecoration: "none" }} className="footer-link">support@shnoor.com</a>
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: 8, color: "#94a3b8", fontSize: 14 }}>
                  <IconPhone /><a href="tel:+919876543210" style={{ color: "#94a3b8", textDecoration: "none" }} className="footer-link">+91 98765 43210</a>
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: 8, color: "#94a3b8", fontSize: 14 }}>
                  <IconMapPin />Mumbai, India
                </li>
              </ul>
            </address>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 24, flexWrap: "wrap", gap: 12 }}>
            <p style={{ color: "#64748b", fontSize: 13 }}>© 2026 SHNOOR International LLC. All rights reserved.</p>
            <nav aria-label="Legal links">
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <button className="footer-link" style={{ fontSize: 13 }}>Privacy Policy</button>
                <span aria-hidden="true" style={{ color: "#475569", fontSize: 13 }}>|</span>
                <button className="footer-link" style={{ fontSize: 13 }}>Terms of Service</button>
              </div>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
