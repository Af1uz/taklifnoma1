import { useState, useEffect } from "react";

// ── CONFIG ──
const GUEST_NAME    = "Dilnoza";
const GROOM         = "Jasur";
const BRIDE         = "Malika";
const LOCATION      = "Grand Palace";
const LOCATION_CITY = "Toshkent shahar";
const LOCATION_ADDR = "Mirzo Ulug'bek ko'chasi, 45";
const RSVP_PHONE    = "+998 90 123 45 67";
// Countdown boshlash vaqti: hozirdan 19kun 6soat 32daqiqa 11soniya keyin
const START_MS = Date.now() + (19*86400 + 6*3600 + 32*60 + 11) * 1000;
// To'y sanasi (Countdown tugaydi shu yerda)
const WEDDING_DATE  = new Date(START_MS);
// ──────────────

const PROGRAM = [
  { time: "16:00", title: "Mehmonlarni kutib olish",  desc: "Registratsiya va dastlabki ziyofat" },
  { time: "17:00", title: "Nikoh marosimi",            desc: "Rasmiy qo'l qovushtiruv" },
  { time: "18:00", title: "Tantanali kechki ziyofat",  desc: "An'anaviy milliy taomlar" },
  { time: "19:30", title: "Musiqiy dastur",             desc: "Jonli musiqa va raqs" },
  { time: "21:00", title: "Tort kesish marosimi",       desc: "Bayram tadbiri yakunlanishi" },
];

// Toshkent — Grand Palace taxminiy koordinatalari
const MAP_LAT = 41.2995;
const MAP_LNG = 69.2401;

const PETALS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  delay: `${Math.random() * 10}s`,
  duration: `${7 + Math.random() * 8}s`,
  color: ["#FF4C71","#A10207","#FFE5E0","#ff8fa3","#c0394f"][Math.floor(Math.random()*5)],
}));

function pad(n) { return String(n).padStart(2,"0"); }

function useCountdown(target) {
  const calc = () => {
    const diff = Math.max(0, target - Date.now());
    return {
      d: pad(Math.floor(diff / 86400000)),
      h: pad(Math.floor((diff % 86400000) / 3600000)),
      m: pad(Math.floor((diff % 3600000) / 60000)),
      s: pad(Math.floor((diff % 60000) / 1000)),
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, [target]);
  return t;
}

// ── SVG MAP ──
function MapBlock() {
  return (
    <div style={{
      borderRadius: "3px", overflow: "hidden",
      border: "1px solid rgba(161,2,7,0.15)",
      background: "#fdf4f2",
    }}>
      {/* Custom SVG map illustration */}
      <svg viewBox="0 0 370 200" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",display:"block"}}>
        {/* background */}
        <rect width="370" height="200" fill="#f5ece9"/>

        {/* "roads" - horizontal */}
        <line x1="0" y1="100" x2="370" y2="100" stroke="#e8d5d0" strokeWidth="14"/>
        <line x1="0" y1="60"  x2="370" y2="60"  stroke="#ecddd9" strokeWidth="8"/>
        <line x1="0" y1="148" x2="370" y2="148" stroke="#ecddd9" strokeWidth="8"/>

        {/* "roads" - vertical */}
        <line x1="185" y1="0" x2="185" y2="200" stroke="#e8d5d0" strokeWidth="14"/>
        <line x1="100" y1="0" x2="100" y2="200" stroke="#ecddd9" strokeWidth="6"/>
        <line x1="270" y1="0" x2="270" y2="200" stroke="#ecddd9" strokeWidth="6"/>

        {/* road center lines */}
        <line x1="0" y1="100" x2="370" y2="100" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeDasharray="14 10"/>
        <line x1="185" y1="0" x2="185" y2="200" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeDasharray="14 10"/>

        {/* blocks */}
        <rect x="108" y="68" width="68" height="24" rx="2" fill="#edd8d4" opacity="0.7"/>
        <rect x="108" y="108" width="68" height="32" rx="2" fill="#edd8d4" opacity="0.7"/>
        <rect x="195" y="68" width="66" height="24" rx="2" fill="#edd8d4" opacity="0.7"/>
        <rect x="195" y="108" width="66" height="32" rx="2" fill="#edd8d4" opacity="0.7"/>
        <rect x="10"  y="68" width="80" height="56" rx="2" fill="#edd8d4" opacity="0.5"/>
        <rect x="280" y="68" width="80" height="56" rx="2" fill="#edd8d4" opacity="0.5"/>
        <rect x="108" y="12" width="68" height="40" rx="2" fill="#edd8d4" opacity="0.5"/>
        <rect x="195" y="12" width="66" height="40" rx="2" fill="#edd8d4" opacity="0.5"/>
        <rect x="108" y="148" width="68" height="42" rx="2" fill="#edd8d4" opacity="0.5"/>
        <rect x="195" y="148" width="66" height="42" rx="2" fill="#edd8d4" opacity="0.5"/>

        {/* venue highlight */}
        <rect x="142" y="75" width="86" height="50" rx="3" fill="rgba(161,2,7,0.12)" stroke="#A10207" strokeWidth="1.5"/>
        <text x="185" y="95" textAnchor="middle" fontFamily="Montserrat,sans-serif" fontSize="7" fontWeight="600" fill="#A10207" letterSpacing="1">GRAND</text>
        <text x="185" y="107" textAnchor="middle" fontFamily="Montserrat,sans-serif" fontSize="7" fontWeight="600" fill="#A10207" letterSpacing="1">PALACE</text>

        {/* pin shadow */}
        <ellipse cx="185" cy="78" rx="7" ry="3" fill="rgba(0,0,0,0.15)"/>
        {/* pin body */}
        <path d="M185,38 C174,38 166,46 166,56 C166,69 185,78 185,78 C185,78 204,69 204,56 C204,46 196,38 185,38 Z"
          fill="#A10207" stroke="#800105" strokeWidth="1"/>
        {/* pin inner circle */}
        <circle cx="185" cy="56" r="6" fill="white" opacity="0.85"/>
        <circle cx="185" cy="56" r="3" fill="#FF4C71"/>

        {/* street label */}
        <text x="185" y="133" textAnchor="middle" fontFamily="Montserrat,sans-serif" fontSize="6.5" fill="#9a5560" letterSpacing="0.5">
          Mirzo Ulug'bek ko'chasi
        </text>

        {/* compass rose — top right */}
        <g transform="translate(340,22)">
          <circle r="12" fill="rgba(255,255,255,0.5)" stroke="rgba(161,2,7,0.2)" strokeWidth="1"/>
          <text textAnchor="middle" y="-4" fontFamily="Montserrat,sans-serif" fontSize="6" fontWeight="600" fill="#A10207">N</text>
          <line x1="0" y1="-1" x2="0" y2="-8" stroke="#A10207" strokeWidth="1.5"/>
          <line x1="0" y1="1"  x2="0" y2="8"  stroke="#999" strokeWidth="1"/>
        </g>
      </svg>

      {/* Bottom address bar */}
      <div style={{
        background: "#A10207", padding: "12px 18px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div>
          <p style={{fontFamily:"Montserrat,sans-serif", fontSize:"7px", letterSpacing:"3px",
            textTransform:"uppercase", color:"rgba(255,228,224,0.55)", marginBottom:"4px"}}>
            To'y manzili
          </p>
          <p style={{fontFamily:"'Cormorant Garamond',serif", fontSize:"16px",
            fontWeight:"600", color:"#FFE5E0"}}>
            Grand Palace
          </p>
          <p style={{fontFamily:"'Cormorant Garamond',serif", fontSize:"12px",
            fontStyle:"italic", color:"rgba(255,228,224,0.6)", marginTop:"1px"}}>
            Mirzo Ulug'bek ko'chasi, 45 · Toshkent
          </p>
        </div>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${MAP_LAT},${MAP_LNG}`}
          target="_blank"
          rel="noreferrer"
          style={{
            display:"block", background:"rgba(255,228,224,0.15)",
            border:"1px solid rgba(255,228,224,0.25)",
            borderRadius:"2px", padding:"8px 14px",
            fontFamily:"Montserrat,sans-serif", fontSize:"7.5px",
            letterSpacing:"2px", textTransform:"uppercase",
            color:"#FFE5E0", textDecoration:"none",
            flexShrink: 0,
          }}
        >
          Yo'l&nbsp;ko'rsat
        </a>
      </div>
    </div>
  );
}

// ── STYLES ──
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Montserrat:wght@300;400;500;600&display=swap');

  *,*::before,*::after { margin:0; padding:0; box-sizing:border-box; }

  :root {
    --deep: #A10207;
    --rose: #FF4C71;
    --blush: #FFE5E0;
    --ink: #110406;
    --ivory: #fff8f6;
    --muted: #7a3540;
  }

  html { scroll-behavior:smooth; }
  body,html { background:var(--ink); }

  .scene {
    min-height:100vh;
    display:flex; align-items:center; justify-content:center;
    background:var(--ink);
    font-family:'Montserrat',sans-serif;
    overflow-x:hidden;
    position:relative;
    padding:24px 16px;
  }

  .petal {
    position:fixed; width:7px; height:11px;
    border-radius:50% 0 50% 0; opacity:0;
    pointer-events:none;
    animation:fall linear infinite; z-index:0;
  }
  @keyframes fall {
    0%   { transform:translateY(-20px) rotate(0deg); opacity:.65; }
    100% { transform:translateY(110vh) rotate(420deg); opacity:0; }
  }

  /* ENVELOPE */
  .env-page {
    display:flex; flex-direction:column; align-items:center; text-align:center;
    animation:fadeUp 1.1s ease both; position:relative; z-index:1;
  }
  @keyframes fadeUp {
    from { opacity:0; transform:translateY(36px); }
    to   { opacity:1; transform:translateY(0); }
  }
  .env-super {
    font-family:'Montserrat',sans-serif;
    font-size:8px; letter-spacing:5px; text-transform:uppercase;
    color:rgba(255,76,113,.45); margin-bottom:32px;
  }
  .envelope {
    width:310px; cursor:pointer;
    filter:drop-shadow(0 16px 50px rgba(161,2,7,.55));
    transition:transform .35s ease, filter .35s ease;
  }
  .envelope:hover { transform:translateY(-7px) scale(1.02); filter:drop-shadow(0 28px 70px rgba(255,76,113,.6)); }
  .envelope:active { transform:scale(.97); }
  .envelope svg { width:100%; display:block; }
  .env-pulse {
    width:9px; height:9px; background:var(--rose);
    border-radius:50%; margin:20px auto 8px;
    animation:pulse 1.9s ease-in-out infinite;
  }
  @keyframes pulse {
    0%,100% { transform:scale(1); box-shadow:0 0 0 0 rgba(255,76,113,.55); }
    50%      { transform:scale(1.35); box-shadow:0 0 0 9px rgba(255,76,113,0); }
  }
  .env-hint {
    font-family:'Cormorant Garamond',serif;
    font-size:13px; font-style:italic; letter-spacing:2px;
    color:rgba(255,228,224,.45); margin-bottom:52px;
  }
  .env-names-preview { display:flex; flex-direction:column; align-items:center; gap:5px; }
  .env-names-label {
    font-family:'Montserrat',sans-serif;
    font-size:7.5px; letter-spacing:4px; text-transform:uppercase;
    color:rgba(255,76,113,.35);
  }
  .env-names-text {
    font-family:'Cormorant Garamond',serif;
    font-size:26px; font-style:italic; font-weight:300;
    color:rgba(255,228,224,.18); letter-spacing:3px;
  }

  /* CARD */
  .card-scene { width:100%; max-width:390px; padding-bottom:48px; position:relative; z-index:1; }
  .card {
    width:100%; background:var(--ivory); border-radius:3px; overflow:hidden;
    animation:openCard .9s cubic-bezier(.16,1,.3,1) both;
    transform-origin:top center;
    box-shadow:0 40px 100px rgba(161,2,7,.55), 0 0 0 1px rgba(161,2,7,.18);
  }
  @keyframes openCard {
    0%   { opacity:0; transform:rotateX(-80deg) translateY(-40px); }
    100% { opacity:1; transform:rotateX(0) translateY(0); }
  }
  .card-bar-top { height:6px; background:linear-gradient(90deg,var(--deep),var(--rose),#ffb3c1); }

  /* HERO */
  .card-hero {
    background:linear-gradient(160deg,#220608 0%,#2e080a 55%,#1a0304 100%);
    padding:50px 30px 44px; text-align:center; position:relative; overflow:hidden;
  }
  .card-hero::before {
    content:''; position:absolute; inset:0;
    background:radial-gradient(ellipse at 50% -10%,rgba(255,76,113,.13) 0%,transparent 65%);
    pointer-events:none;
  }
  .ring { position:absolute; border-radius:50%; pointer-events:none; border:1px solid rgba(255,76,113,.09); }
  .ring-a { width:240px; height:240px; top:-90px; right:-70px; }
  .ring-b { width:180px; height:180px; bottom:-60px; left:-50px; border-color:rgba(161,2,7,.18); }
  .hero-label {
    font-family:'Montserrat',sans-serif;
    font-size:8px; letter-spacing:5px; text-transform:uppercase;
    color:rgba(255,228,224,.4); margin-bottom:18px;
  }
  .hero-to {
    font-family:'Cormorant Garamond',serif;
    font-size:14px; font-style:italic;
    color:rgba(255,228,224,.45); margin-bottom:4px;
  }
  .hero-guest {
    font-family:'Cormorant Garamond',serif;
    font-size:48px; font-weight:300; font-style:italic;
    color:var(--blush); line-height:1.05; margin-bottom:28px;
    text-shadow:0 4px 24px rgba(161,2,7,.5);
  }
  .hero-line { display:flex; align-items:center; gap:12px; max-width:220px; margin:0 auto 22px; }
  .hero-line-bar { flex:1; height:1px; background:rgba(255,76,113,.22); }
  .hero-line-diamond { width:5px; height:5px; background:var(--rose); transform:rotate(45deg); flex-shrink:0; opacity:.7; }
  .hero-couple { font-family:'Cormorant Garamond',serif; font-size:34px; font-weight:600; color:#fff; letter-spacing:1px; }
  .hero-couple-amp { font-style:italic; font-weight:300; color:var(--rose); margin:0 10px; }
  .hero-subtitle {
    font-family:'Cormorant Garamond',serif;
    font-size:13px; font-style:italic;
    color:rgba(255,228,224,.35); margin-top:8px; letter-spacing:1.5px;
  }

  /* SECTIONS */
  .section { padding:36px 30px; border-bottom:1px solid rgba(161,2,7,.08); }
  .section-label {
    font-family:'Montserrat',sans-serif;
    font-size:8px; letter-spacing:4px; text-transform:uppercase;
    color:var(--rose); margin-bottom:14px; text-align:center;
  }
  .divider { display:flex; align-items:center; gap:10px; margin:0 0 20px; }
  .divider-line { flex:1; height:1px; background:rgba(161,2,7,.12); }
  .divider-diamond { width:5px; height:5px; background:var(--rose); transform:rotate(45deg); flex-shrink:0; opacity:.6; }

  /* GREETING */
  .greeting-text {
    font-family:'Cormorant Garamond',serif;
    font-size:17px; font-style:italic; font-weight:300;
    color:#4a1f24; line-height:1.9; text-align:center;
  }
  .greeting-text strong { font-style:normal; font-weight:600; color:var(--deep); }

  /* COUNTDOWN */
  .countdown-wrap { background:var(--deep); border-radius:3px; padding:24px 12px 20px; }
  .cd-label {
    font-family:'Montserrat',sans-serif;
    font-size:7.5px; letter-spacing:4px; text-transform:uppercase;
    color:rgba(255,228,224,.5); text-align:center; margin-bottom:18px;
  }
  .cd-grid {
    display:grid;
    grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr;
    align-items:center;
    gap:0;
    width:100%;
  }
  .cd-unit { display:flex; flex-direction:column; align-items:center; gap:6px; }
  .cd-num {
    font-family:'Cormorant Garamond',serif;
    font-size:42px; font-weight:300; line-height:1; color:var(--blush);
    display:block; width:100%; text-align:center;
  }
  .cd-sep {
    font-family:'Cormorant Garamond',serif;
    font-size:30px; color:var(--rose); opacity:.7;
    text-align:center; padding-bottom:14px;
    display:block;
  }
  .cd-sub {
    font-family:'Montserrat',sans-serif;
    font-size:7px; letter-spacing:2px; text-transform:uppercase;
    color:rgba(255,228,224,.4);
  }

  /* INFO BLOCKS */
  .info-grid { display:flex; flex-direction:column; gap:12px; }
  .info-block {
    background:var(--blush); border-radius:3px; padding:18px 20px;
    border-left:3px solid var(--deep);
  }
  .info-block-label {
    font-family:'Montserrat',sans-serif;
    font-size:7.5px; letter-spacing:3.5px; text-transform:uppercase;
    color:var(--rose); margin-bottom:6px;
  }
  .info-block-val { font-family:'Cormorant Garamond',serif; font-size:20px; font-weight:600; color:var(--ink); line-height:1.2; }
  .info-block-sub { font-family:'Cormorant Garamond',serif; font-size:14px; font-style:italic; color:var(--muted); margin-top:3px; }

  /* PROGRAM */
  .program-list { display:flex; flex-direction:column; }
  .program-item {
    display:flex; align-items:flex-start; gap:16px;
    padding:14px 0; border-bottom:1px solid rgba(161,2,7,.07);
  }
  .program-item:last-child { border-bottom:none; }
  .program-time { font-family:'Cormorant Garamond',serif; font-size:14px; font-weight:600; color:var(--deep); min-width:52px; padding-top:1px; flex-shrink:0; }
  .program-dot { width:8px; height:8px; border-radius:50%; background:var(--rose); flex-shrink:0; margin-top:5px; box-shadow:0 0 0 3px rgba(255,76,113,.15); }
  .program-title { font-family:'Cormorant Garamond',serif; font-size:17px; font-weight:600; color:var(--ink); line-height:1.2; }
  .program-desc { font-family:'Cormorant Garamond',serif; font-size:13px; font-style:italic; color:var(--muted); margin-top:2px; }

  /* DRESS CODE */
  .dresscode-wrap { display:flex; gap:10px; }
  .dresscode-swatch { flex:1; border-radius:3px; padding:18px 14px; text-align:center; }
  .swatch-circle { width:38px; height:38px; border-radius:50%; margin:0 auto 10px; }
  .swatch-label { font-family:'Montserrat',sans-serif; font-size:7px; letter-spacing:2.5px; text-transform:uppercase; color:var(--muted); margin-bottom:5px; }
  .swatch-name { font-family:'Cormorant Garamond',serif; font-size:15px; font-weight:600; color:var(--ink); }

  /* QUOTE */
  .quote-section {
    background:linear-gradient(135deg,#220608,#2e080a);
    padding:38px 30px; text-align:center; position:relative; overflow:hidden;
  }
  .quote-section::before {
    content:''; position:absolute; inset:0;
    background:radial-gradient(ellipse at 50% 50%,rgba(255,76,113,.08) 0%,transparent 70%);
    pointer-events:none;
  }
  .quote-mark { font-family:'Cormorant Garamond',serif; font-size:72px; font-style:italic; line-height:.5; color:rgba(255,76,113,.18); display:block; margin-bottom:18px; }
  .quote-text { font-family:'Cormorant Garamond',serif; font-size:18px; font-style:italic; font-weight:300; color:rgba(255,228,224,.75); line-height:1.8; position:relative; z-index:1; }
  .quote-author { font-family:'Montserrat',sans-serif; font-size:8px; letter-spacing:3px; text-transform:uppercase; color:rgba(255,76,113,.45); margin-top:16px; }

  /* RSVP */
  .rsvp-section { text-align:center; }
  .rsvp-text { font-family:'Cormorant Garamond',serif; font-size:16px; font-style:italic; color:var(--muted); line-height:1.75; margin-bottom:20px; }
  .rsvp-phone { display:inline-block; font-family:'Cormorant Garamond',serif; font-size:22px; font-weight:600; color:var(--deep); border-bottom:1px solid rgba(161,2,7,.3); padding-bottom:2px; }
  .rsvp-note { font-family:'Montserrat',sans-serif; font-size:8px; letter-spacing:3px; text-transform:uppercase; color:rgba(161,2,7,.4); margin-top:12px; }

  /* FOOTER */
  .card-footer { background:var(--deep); padding:30px; text-align:center; }
  .footer-monogram { font-family:'Cormorant Garamond',serif; font-size:38px; font-style:italic; font-weight:300; color:rgba(255,228,224,.9); letter-spacing:4px; margin-bottom:10px; }
  .footer-line { display:flex; align-items:center; gap:10px; max-width:180px; margin:0 auto 10px; }
  .footer-line-bar { flex:1; height:1px; background:rgba(255,228,224,.15); }
  .footer-line-dot { width:4px; height:4px; border-radius:50%; background:var(--rose); flex-shrink:0; opacity:.6; }
  .footer-text { font-family:'Cormorant Garamond',serif; font-size:12px; font-style:italic; color:rgba(255,228,224,.4); letter-spacing:1px; }
  .card-bar-bottom { height:4px; background:linear-gradient(90deg,var(--rose),var(--deep)); opacity:.5; }
`;

export default function App() {
  const [opened, setOpened] = useState(false);
  const t = useCountdown(WEDDING_DATE.getTime());

  const dateStr = WEDDING_DATE.toLocaleDateString("uz-UZ", {
    weekday:"long", day:"numeric", month:"long", year:"numeric",
  });
  const timeStr = WEDDING_DATE.toLocaleTimeString("uz-UZ", {
    hour:"2-digit", minute:"2-digit",
  });

  return (
    <>
      <style>{css}</style>
      <div className="scene">
        {PETALS.map(p => (
          <div key={p.id} className="petal" style={{
            left:p.left, top:"-14px",
            background:p.color,
            animationDelay:p.delay,
            animationDuration:p.duration,
          }}/>
        ))}

        {!opened ? (
          /* ── ENVELOPE ── */
          <div className="env-page">
            <p className="env-super">Maxsus taklif</p>
            <div className="envelope" onClick={() => setOpened(true)}>
              <svg viewBox="0 0 320 210" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="eg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2d0608"/>
                    <stop offset="100%" stopColor="#1a0304"/>
                  </linearGradient>
                  <linearGradient id="fg" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#c00810"/>
                    <stop offset="100%" stopColor="#800106"/>
                  </linearGradient>
                  <linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#200406"/>
                    <stop offset="100%" stopColor="#160203"/>
                  </linearGradient>
                </defs>
                <rect x="0" y="30" width="320" height="180" rx="4" fill="url(#eg)" stroke="#6b0105" strokeWidth="1"/>
                <path d="M0,30 L160,118 L320,30 Z" fill="url(#fg)"/>
                <path d="M0,30 L0,210 L118,128 Z" fill="url(#bg2)"/>
                <path d="M320,30 L320,210 L202,128 Z" fill="url(#bg2)"/>
                <path d="M0,210 L118,128 L202,128 L320,210 Z" fill="#1c0305"/>
                <circle cx="160" cy="132" r="22" fill="#A10207" stroke="rgba(255,76,113,0.5)" strokeWidth="1.5"/>
                <circle cx="160" cy="132" r="16" fill="none" stroke="rgba(255,228,224,0.2)" strokeWidth="1"/>
                <text x="151" y="138" textAnchor="middle" fontFamily="Cormorant Garamond,serif" fontSize="13" fill="#FFE5E0" fontStyle="italic" fontWeight="600">J</text>
                <text x="160" y="136" textAnchor="middle" fontFamily="Cormorant Garamond,serif" fontSize="9" fill="rgba(255,228,224,0.5)" fontStyle="italic">&amp;</text>
                <text x="169" y="138" textAnchor="middle" fontFamily="Cormorant Garamond,serif" fontSize="13" fill="#FFE5E0" fontStyle="italic" fontWeight="600">M</text>
                <line x1="12" y1="38" x2="308" y2="38" stroke="rgba(255,76,113,0.1)" strokeWidth="0.5"/>
                <line x1="12" y1="200" x2="308" y2="200" stroke="rgba(255,76,113,0.08)" strokeWidth="0.5"/>
              </svg>
            </div>
            <div className="env-pulse"/>
            <p className="env-hint">ochish uchun bosing</p>
            <div className="env-names-preview">
              <span className="env-names-label">to'y sohiblari</span>
              <span className="env-names-text">{GROOM} &amp; {BRIDE}</span>
            </div>
          </div>
        ) : (
          /* ── CARD ── */
          <div className="card-scene">
            <div className="card">
              <div className="card-bar-top"/>

              {/* HERO */}
              <div className="card-hero">
                <div className="ring ring-a"/>
                <div className="ring ring-b"/>
                <p className="hero-label">Nikoh to'yiga taklifnoma</p>
                <p className="hero-to">Aziz</p>
                <h1 className="hero-guest">{GUEST_NAME}</h1>
                <div className="hero-line">
                  <div className="hero-line-bar"/>
                  <div className="hero-line-diamond"/>
                  <div className="hero-line-bar"/>
                </div>
                <div className="hero-couple">
                  <span>{GROOM}</span>
                  <span className="hero-couple-amp">&amp;</span>
                  <span>{BRIDE}</span>
                </div>
                <p className="hero-subtitle">nikoh to'yi · 2025</p>
              </div>

              {/* GREETING */}
              <div className="section">
                <p className="section-label">Hurmatli mehmon</p>
                <div className="divider">
                  <div className="divider-line"/><div className="divider-diamond"/><div className="divider-line"/>
                </div>
                <p className="greeting-text">
                  Hayotimizning eng muhim va unutilmas kunida —
                  <br/>nikoh to'yimizda — siz bilan birga bo'lishni
                  <br/>istardik.
                  <br/><br/>
                  <strong>{GROOM} va {BRIDE}</strong>
                  <br/><br/>
                  siz kabi aziz insonlarning ishtiroki bu kunni
                  <br/>yanada mazmunli va baxtiyor qiladi.
                  <br/><br/>
                  Sizni mehmonimiz sifatida ko'rishdan
                  <br/>cheksiz xursand bo'lamiz.
                </p>
              </div>

              {/* COUNTDOWN */}
              <div className="section">
                <p className="section-label">To'yga qadar qoldi</p>
                <div className="countdown-wrap">
                  <p className="cd-label">Sekundlar sanamoqda</p>
                  <div className="cd-grid">
                    <div className="cd-unit">
                      <span className="cd-num">{t.d}</span>
                      <span className="cd-sub">kun</span>
                    </div>
                    <span className="cd-sep">:</span>
                    <div className="cd-unit">
                      <span className="cd-num">{t.h}</span>
                      <span className="cd-sub">soat</span>
                    </div>
                    <span className="cd-sep">:</span>
                    <div className="cd-unit">
                      <span className="cd-num">{t.m}</span>
                      <span className="cd-sub">daqiqa</span>
                    </div>
                    <span className="cd-sep">:</span>
                    <div className="cd-unit">
                      <span className="cd-num">{t.s}</span>
                      <span className="cd-sub">soniya</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* DATE / TIME / LOCATION + MAP */}
              <div className="section">
                <p className="section-label">Sana, vaqt va manzil</p>
                <div className="info-grid">
                  <div className="info-block">
                    <p className="info-block-label">Sana</p>
                    <p className="info-block-val">{dateStr}</p>
                  </div>
                  <div className="info-block">
                    <p className="info-block-label">Boshlanish vaqti</p>
                    <p className="info-block-val">Soat {timeStr}</p>
                    <p className="info-block-sub">Iltimos, o'z vaqtida tashrif buyuring</p>
                  </div>
                  <div className="info-block">
                    <p className="info-block-label">Manzil</p>
                    <p className="info-block-val">{LOCATION}</p>
                    <p className="info-block-sub">{LOCATION_CITY} · {LOCATION_ADDR}</p>
                  </div>
                  {/* MAP */}
                  <MapBlock/>
                </div>
              </div>

              {/* PROGRAM */}
              <div className="section">
                <p className="section-label">Kun dasturi</p>
                <div className="divider">
                  <div className="divider-line"/><div className="divider-diamond"/><div className="divider-line"/>
                </div>
                <div className="program-list">
                  {PROGRAM.map((item,i) => (
                    <div className="program-item" key={i}>
                      <span className="program-time">{item.time}</span>
                      <div className="program-dot"/>
                      <div className="program-info">
                        <p className="program-title">{item.title}</p>
                        <p className="program-desc">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* DRESS CODE */}
              

              {/* QUOTE */}
              <div className="quote-section">
                <span className="quote-mark">"</span>
                <p className="quote-text">
                  Sevgi — bu bir nazar bilan boshlanadigan,
                  <br/>umr bo'yi davom etadigan safar.
                </p>
                <p className="quote-author">Nikoh marosimi so'zlari</p>
              </div>

              {/* RSVP */}
              <div className="section rsvp-section">
                <p className="section-label">Tasdiqlash</p>
                <p className="rsvp-text">
                  Ishtirokingizni tasdiqlab,
                  <br/>to'y kunidan <strong style={{color:"var(--deep)"}}>3 kun oldin</strong> qo'ng'iroq
                  <br/>qilishingizni so'raymiz.
                </p>
                <span className="rsvp-phone">{RSVP_PHONE}</span>
                <p className="rsvp-note">Siz bilan bo'lishimizdan xursandmiz</p>
              </div>

              {/* FOOTER */}
              <div className="card-footer">
                <div className="footer-monogram">{GROOM[0]} &amp; {BRIDE[0]}</div>
                <div className="footer-line">
                  <div className="footer-line-bar"/>
                  <div className="footer-line-dot"/>
                  <div className="footer-line-bar"/>
                </div>
                <p className="footer-text">Sizni sevgi bilan kutib qolamiz</p>
              </div>
              <div className="card-bar-bottom"/>
            </div>
          </div>
        )}
      </div>
    </>
  );
}