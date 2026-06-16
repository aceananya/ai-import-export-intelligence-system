import { useState } from "react";
import { useNavigate } from "react-router-dom";

const IconMail = ({ size = 22, color = "#2563eb" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);
const IconPhone = ({ size = 22, color = "#2563eb" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const IconMapPin = ({ size = 22, color = "#2563eb" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);
const IconClock = ({ size = 22, color = "#2563eb" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);
const IconSend = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);
const IconArrowLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="19" y1="12" x2="5" y2="12"/>
    <polyline points="12 19 5 12 12 5"/>
  </svg>
);
const IconCheck = () => (
  <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.6">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);
const IconChevron = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);
const IconDashboard = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
  </svg>
);

const ShnoorLogo = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
    <svg width={36} height={36} viewBox="0 0 40 40">
      <circle cx="20" cy="20" r="20" fill="#2563eb"/>
      <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold" fontFamily="sans-serif">S</text>
    </svg>
    <div>
      <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", letterSpacing: 1, lineHeight: 1 }}>SHNOOR</div>
      <div style={{ fontSize: 10, color: "#93c5fd", letterSpacing: 0.5 }}>INTERNATIONAL LLC</div>
    </div>
  </div>
);

const contactInfo = [
  { icon: <IconMail size={20} color="#2563eb" />, label: "Email", value: "support@shnoor.com", sub: "We reply within 24 hours", iconBg: "#eff6ff" },
  { icon: <IconPhone size={20} color="#16a34a" />, label: "Phone", value: "+91 98765 43210", sub: "Mon–Fri, 9 AM–6 PM IST", iconBg: "#f0fdf4" },
  { icon: <IconMapPin size={20} color="#7c3aed" />, label: "Location", value: "Mumbai, India", sub: "Headquarters", iconBg: "#f5f3ff" },
  { icon: <IconClock size={20} color="#d97706" />, label: "Working Hours", value: "Mon – Fri", sub: "9:00 AM – 6:00 PM IST", iconBg: "#fffbeb" },
];

const quickLinks = [
  { label: "Sales Inquiry", desc: "Interested in our platform?" },
  { label: "Technical Support", desc: "Need help with a feature?" },
  { label: "Partnership", desc: "Explore business opportunities" },
];

export default function ContactPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", company: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1200);
  };

  return (
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", display: "flex", minHeight: "100vh", background: "#f1f5f9", color: "#0f172a" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .input-field { width:100%;border:1.5px solid #e2e8f0;border-radius:10px;padding:12px 14px;font-size:14px;outline:none;font-family:inherit;background:#fff;color:#0f172a;transition:border-color .2s,box-shadow .2s; }
        .input-field:focus { border-color:#2563eb;box-shadow:0 0 0 3px #2563eb15; }
        .submit-btn { width:100%;background:#2563eb;color:#fff;border:none;padding:14px;border-radius:10px;font-size:15px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:9px;transition:background .2s; }
        .submit-btn:hover:not(:disabled) { background:#1d4ed8; }
        .submit-btn:disabled { opacity:.65;cursor:not-allowed; }
        .sidebar-link { display:flex;align-items:center;gap:12px;padding:11px 16px;border-radius:10px;color:#94a3b8;font-size:14px;font-weight:500;cursor:pointer;transition:background .2s,color .2s; }
        .sidebar-link:hover { background:#1e293b;color:#fff; }
        .sidebar-link.active { background:#2563eb;color:#fff; }
        .quick-row { display:flex;justify-content:space-between;align-items:center;padding:13px 0;border-bottom:1px solid #f1f5f9;cursor:pointer;transition:background .1s; }
        .quick-row:last-child { border-bottom:none; }
        .quick-row:hover .ql { color:#2563eb; }
        .label-sm { font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.8px;margin-bottom:6px; }
        @keyframes spin { to { transform:rotate(360deg); } }
      `}</style>

      {/* ── Sidebar ── */}
      <aside style={{ width: 220, background: "#0f172a", display: "flex", flexDirection: "column", padding: "28px 16px", position: "fixed", top: 0, left: 0, height: "100vh", zIndex: 50 }}>
        <div style={{ marginBottom: 36, paddingLeft: 6 }}>
          <ShnoorLogo />
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
          <div className="sidebar-link" onClick={() => navigate("/")}>
            <IconDashboard /> Dashboard
          </div>
          <div className="sidebar-link active">
            <IconMail size={18} color="currentColor" /> Contact
          </div>
        </nav>

        <div
          style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", borderRadius: 10, cursor: "pointer", color: "#ef4444", fontSize: 14, fontWeight: 500 }}
          onClick={() => navigate("/")}
        >
          <IconArrowLeft /> Back to Home
        </div>
      </aside>

      {/* ── Main ── */}
      <main style={{ marginLeft: 220, flex: 1, padding: "32px 36px", minHeight: "100vh" }}>

        {/* Top bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: "#0f172a" }}>Contact Us</h1>
            <p style={{ color: "#64748b", fontSize: 14, marginTop: 4 }}>Get in touch with our team for support and business inquiries.</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 15 }}>A</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>Administrator</div>
              <div style={{ fontSize: 12, color: "#94a3b8" }}>SHNOOR International</div>
            </div>
          </div>
        </div>

        {/* Info cards row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 28 }}>
          {contactInfo.map((c, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 16, padding: "20px 18px", border: "1px solid #e2e8f0", display: "flex", alignItems: "flex-start", gap: 14, boxShadow: "0 1px 4px #0f172a08" }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: c.iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {c.icon}
              </div>
              <div>
                <div className="label-sm">{c.label}</div>
                <div style={{ fontWeight: 700, fontSize: 13, color: "#0f172a" }}>{c.value}</div>
                <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>{c.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Two-col layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 24 }}>

          {/* Left panel */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Info card */}
            <div style={{ background: "#fff", borderRadius: 16, padding: 24, border: "1px solid #e2e8f0", boxShadow: "0 1px 4px #0f172a08" }}>
              <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 6 }}>We'd love to hear from you</h2>
              <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.7 }}>
                Whether it's about features, pricing, a demo, or anything else — our team is ready to help.
              </p>

              {/* Map visual */}
              <div style={{ background: "linear-gradient(135deg, #1e3a5f, #1e40af)", borderRadius: 14, height: 160, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: 20, marginBottom: 20 }}>
                <IconMapPin size={36} color="#93c5fd" />
                <div style={{ fontWeight: 700, fontSize: 15, color: "#fff", marginTop: 10 }}>Mumbai, India</div>
                <div style={{ fontSize: 12, color: "#93c5fd", marginTop: 4 }}>SHNOOR International LLC</div>
              </div>

              {/* Quick links */}
              <div className="label-sm" style={{ marginBottom: 8 }}>Quick Support</div>
              {quickLinks.map((item, i) => (
                <div key={i} className="quick-row">
                  <div>
                    <div className="ql" style={{ fontWeight: 600, fontSize: 14, color: "#0f172a", transition: "color .2s" }}>{item.label}</div>
                    <div style={{ fontSize: 12, color: "#94a3b8" }}>{item.desc}</div>
                  </div>
                  <IconChevron />
                </div>
              ))}
            </div>

          </div>

          {/* Right — form */}
          <div style={{ background: "#fff", borderRadius: 16, padding: 28, border: "1px solid #e2e8f0", boxShadow: "0 1px 4px #0f172a08" }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "56px 0" }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}><IconCheck /></div>
                <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 10 }}>Message Sent!</h3>
                <p style={{ color: "#64748b", fontSize: 15, marginBottom: 32 }}>
                  Thanks for reaching out. Our team will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  style={{ background: "#eff6ff", color: "#2563eb", border: "1.5px solid #bfdbfe", padding: "11px 28px", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: "pointer" }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h2 style={{ fontSize: 19, fontWeight: 800, marginBottom: 4 }}>Send Us a Message</h2>
                <p style={{ color: "#94a3b8", fontSize: 13, marginBottom: 24 }}>Fill in the form below and we'll be in touch shortly.</p>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <div>
                      <div className="label-sm">Full Name *</div>
                      <input className="input-field" name="name" placeholder="John Doe" value={form.name} onChange={handleChange} required />
                    </div>
                    <div>
                      <div className="label-sm">Email Address *</div>
                      <input className="input-field" name="email" type="email" placeholder="john@company.com" value={form.email} onChange={handleChange} required />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <div>
                      <div className="label-sm">Company Name</div>
                      <input className="input-field" name="company" placeholder="Your Company" value={form.company} onChange={handleChange} />
                    </div>
                    <div>
                      <div className="label-sm">Subject *</div>
                      <select className="input-field" name="subject" value={form.subject} onChange={handleChange} required style={{ cursor: "pointer" }}>
                        <option value="">Select a topic</option>
                        <option>Sales Inquiry</option>
                        <option>Technical Support</option>
                        <option>Partnership</option>
                        <option>General Question</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <div className="label-sm">Message *</div>
                    <textarea className="input-field" name="message" rows={5} placeholder="Tell us how we can help you..." value={form.message} onChange={handleChange} required style={{ resize: "vertical" }} />
                  </div>

                  <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? (
                      <>
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" style={{ animation: "spin 1s linear infinite" }}>
                          <circle cx="12" cy="12" r="10" strokeOpacity=".25"/><path d="M12 2a10 10 0 0 1 10 10"/>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <><IconSend /> Send Message</>
                    )}
                  </button>

                  <p style={{ fontSize: 12, color: "#94a3b8", textAlign: "center" }}>
                    By submitting this form you agree to our Privacy Policy.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
