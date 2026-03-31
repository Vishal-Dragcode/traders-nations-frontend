import { useState, useRef, useEffect, useCallback } from "react";
import { useTheme } from "../../settings/ThemeContext";


const moments = [
  {
    id: 1,
    image: "https://res.cloudinary.com/dfmsx47el/image/upload/v1774728836/ed9mhjlttydo8n0xftqe.jpg",
    title: "Tradersland India 2026",
    subtitle: "Award Ceremony — Pune, India",
    tag: "LIVE",
    tagBg: "rgba(59,130,246,0.90)",
    dotColor: "#93c5fd",
  },
  {
    id: 2,
    image: "https://res.cloudinary.com/dfmsx47el/image/upload/v1774728873/h7tpxgbta3y7xqtzrt6b.jpg",
    title: "Winpro Forex Championship",
    subtitle: "Excellence in Precision & Performance",
    tag: "AWARD",
    tagBg: "rgba(245,158,11,0.90)",
    dotColor: "#fde68a",
  },
  {
    id: 3,
    image: "https://res.cloudinary.com/dfmsx47el/image/upload/v1774728888/pgti4rqugczxhqvigc9x.jpg",
    title: "Tradersland India 2026",
    subtitle: "Celebrating Trading Excellence",
    tag: "LIVE",
    tagBg: "rgba(59,130,246,0.90)",
    dotColor: "#93c5fd",
  },
  {
    id: 4,
    image: "https://res.cloudinary.com/dfmsx47el/image/upload/v1774728901/da66kuf5j7fmz0y7fk2m.jpg",
    title: "Tradersland India 2026",
    subtitle: "Celebrating Trading Excellence",
    tag: "LIVE",
    tagBg: "rgba(59,130,246,0.90)",
    dotColor: "#93c5fd",
  },
  {
    id: 5,
    image: "https://res.cloudinary.com/dfmsx47el/image/upload/v1774728914/zsgxt0sjxpwdmqgtpqyi.jpg",
    title: "Tradersland India 2026",
    subtitle: "Celebrating Trading Excellence",
    tag: "LIVE",
    tagBg: "rgba(59,130,246,0.90)",
    dotColor: "#93c5fd",
  },
  {
    id: 6,
    image: "https://res.cloudinary.com/dfmsx47el/image/upload/v1774728924/wfvlpfldhlgbk8tjoyxa.jpg",
    title: "Tradersland India 2026",
    subtitle: "Celebrating Trading Excellence",
    tag: "LIVE",
    tagBg: "rgba(59,130,246,0.90)",
    dotColor: "#93c5fd",
  },
  {
    id: 7,
    image: "https://res.cloudinary.com/dfmsx47el/image/upload/v1774728936/bccspkysfm1zehtc9fxt.jpg",
    title: "Tradersland India 2026",
    subtitle: "Celebrating Trading Excellence",
    tag: "LIVE",
    tagBg: "rgba(59,130,246,0.90)",
    dotColor: "#93c5fd",
  },
  {
    id: 8,
    image: "https://res.cloudinary.com/dfmsx47el/image/upload/v1774728945/kj8piejfucot17emzklj.jpg",
    title: "Tradersland India 2026",
    subtitle: "Celebrating Trading Excellence",
    tag: "LIVE",
    tagBg: "rgba(59,130,246,0.90)",
    dotColor: "#93c5fd",
  },
  {
    id: 9,
    image: "https://res.cloudinary.com/dfmsx47el/image/upload/v1774727890/el7x3zmmpjsm1nf6abem.jpg",
    title: "Tradersland India 2026",
    subtitle: "Award Ceremony — Pune, India",
    tag: "LIVE",
    tagBg: "rgba(59,130,246,0.90)",
    dotColor: "#93c5fd",
  },
  {
    id: 10,
    image: "https://res.cloudinary.com/dfmsx47el/image/upload/v1774727944/zjte9bq7pc9v1ucpuh74.jpg",
    title: "Winpro Forex Championship",
    subtitle: "Excellence in Precision & Performance",
    tag: "AWARD",
    tagBg: "rgba(245,158,11,0.90)",
    dotColor: "#fde68a",
  },
  {
    id: 11,
    image: "https://res.cloudinary.com/dfmsx47el/image/upload/v1774727974/vwbnyybxmkqypu6azp9u.jpg",
    title: "Tradersland India 2026",
    subtitle: "Celebrating Trading Excellence",
    tag: "LIVE",
    tagBg: "rgba(59,130,246,0.90)",
    dotColor: "#93c5fd",
  },
  {
    id: 12,
    image: "https://res.cloudinary.com/dfmsx47el/image/upload/v1774728181/cwxwulxsrate9tphwmij.jpg",
    title: "Tradersland India 2026",
    subtitle: "Celebrating Trading Excellence",
    tag: "LIVE",
    tagBg: "rgba(59,130,246,0.90)",
    dotColor: "#93c5fd",
  },
  {
    id: 13,
    image: "https://res.cloudinary.com/dfmsx47el/image/upload/v1774728243/ftiux6yw102gcpxj0yzi.jpg",
    title: "Tradersland India 2026",
    subtitle: "Celebrating Trading Excellence",
    tag: "LIVE",
    tagBg: "rgba(59,130,246,0.90)",
    dotColor: "#93c5fd",
  },
  {
    id: 14,
    image: "https://res.cloudinary.com/dfmsx47el/image/upload/v1774728268/emos0d7j4jccornrgzyn.jpg",
    title: "Tradersland India 2026",
    subtitle: "Celebrating Trading Excellence",
    tag: "LIVE",
    tagBg: "rgba(59,130,246,0.90)",
    dotColor: "#93c5fd",
  },
  {
    id: 15,
    image: "https://res.cloudinary.com/dfmsx47el/image/upload/v1774728345/gesezgrdaeldoiggd7a2.jpg",
    title: "Tradersland India 2026",
    subtitle: "Celebrating Trading Excellence",
    tag: "LIVE",
    tagBg: "rgba(59,130,246,0.90)",
    dotColor: "#93c5fd",
  },
  {
    id: 16,
    image: "https://res.cloudinary.com/dfmsx47el/image/upload/v1774728425/mjkszz9lmrewj7wybqaz.jpg",
    title: "Tradersland India 2026",
    subtitle: "Celebrating Trading Excellence",
    tag: "LIVE",
    tagBg: "rgba(59,130,246,0.90)",
    dotColor: "#93c5fd",
  },
  {
    id: 17,
    image: "https://res.cloudinary.com/dfmsx47el/image/upload/v1774728441/zo3bgqmxccvtydy6r666.jpg",
    title: "Tradersland India 2026",
    subtitle: "Celebrating Trading Excellence",
    tag: "LIVE",
    tagBg: "rgba(59,130,246,0.90)",
    dotColor: "#93c5fd",
  },
  {
    id: 18,
    image: "https://res.cloudinary.com/dfmsx47el/image/upload/v1774728514/vegofvnm9umhn9ywf0oy.jpg",
    title: "Tradersland India 2026",
    subtitle: "Celebrating Trading Excellence",
    tag: "LIVE",
    tagBg: "rgba(59,130,246,0.90)",
    dotColor: "#93c5fd",
  },
  {
    id: 19,
    image: "https://res.cloudinary.com/dfmsx47el/image/upload/v1774728744/uwgezllrblw0oaqquqhi.jpg",
    title: "Tradersland India 2026",
    subtitle: "Celebrating Trading Excellence",
    tag: "LIVE",
    tagBg: "rgba(59,130,246,0.90)",
    dotColor: "#93c5fd",
  },
  {
    id: 20,
    image: "https://res.cloudinary.com/dfmsx47el/image/upload/v1774728718/tibarlnwb8g9qeob2d5k.jpg",
    title: "Tradersland India 2026",
    subtitle: "Celebrating Trading Excellence",
    tag: "LIVE",
    tagBg: "rgba(59,130,246,0.90)",
    dotColor: "#93c5fd",
  },
  {
    id: 21,
    image: "https://res.cloudinary.com/dfmsx47el/image/upload/v1774728668/cxbc8knwxzqi2syeprh0.jpg",
    title: "Tradersland India 2026",
    subtitle: "Celebrating Trading Excellence",
    tag: "LIVE",
    tagBg: "rgba(59,130,246,0.90)",
    dotColor: "#93c5fd",
  },
  {
    id: 22,
    image: "https://res.cloudinary.com/dfmsx47el/image/upload/v1774728650/jn1dnb5pbzrmo7wiy13c.jpg",
    title: "Tradersland India 2026",
    subtitle: "Celebrating Trading Excellence",
    tag: "LIVE",
    tagBg: "rgba(59,130,246,0.90)",
    dotColor: "#93c5fd",
  },
  {
    id: 23,
    image: "https://res.cloudinary.com/dfmsx47el/image/upload/v1774728633/luxwbbxws6q21hjm54au.jpg",
    title: "Tradersland India 2026",
    subtitle: "Celebrating Trading Excellence",
    tag: "LIVE",
    tagBg: "rgba(59,130,246,0.90)",
    dotColor: "#93c5fd",
  },
  {
    id: 24,
    image: "https://res.cloudinary.com/dfmsx47el/image/upload/v1774728618/x77djcn5hjwbxspwgfel.jpg",
    title: "Tradersland India 2026",
    subtitle: "Celebrating Trading Excellence",
    tag: "LIVE",
    tagBg: "rgba(59,130,246,0.90)",
    dotColor: "#93c5fd",
  },
];

export default function OurMoments() {
  const { colors, theme } = useTheme();
  const isDark = theme === 'dark';
  const [active, setActive] = useState(1); // start on middle card
  const autoRef = useRef(null);

  const next = useCallback(() => setActive(a => (a + 1) % moments.length), []);
  const prev = useCallback(() => setActive(a => (a - 1 + moments.length) % moments.length), []);

  useEffect(() => {
    autoRef.current = setInterval(next, 4500);
    return () => clearInterval(autoRef.current);
  }, [next]);

  return (
    <div style={{
      background: colors.background,
      padding: "24px 0 32px",
      fontFamily: "'Inter', sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes pulse   { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.45;transform:scale(1.5)} }

        .mom-card {
          transition: transform 0.5s cubic-bezier(.23,1,.32,1),
                      opacity  0.5s ease,
                      box-shadow 0.5s ease,
                      filter   0.5s ease;
          flex-shrink: 0;
          border-radius: 22px;
          overflow: hidden;
          position: relative;
          cursor: pointer;
        }
        .mom-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
          transition: transform 0.6s ease;
        }
        .mom-card.active-card .mom-img { transform: scale(1.04); }

        .nav-arr {
          transition: all 0.2s ease;
          border: none;
          cursor: pointer;
        }
        .nav-arr:hover { background: rgba(59,130,246,0.30) !important; transform: scale(1.12); }
      `}</style>

      {/* Ambient glows */}
      <div style={{ position:"absolute", top:"0", left:"0",    width:"480px", height:"480px", borderRadius:"50%", background:"radial-gradient(circle, rgba(29,78,216,0.10) 0%, transparent 70%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"0", right:"0", width:"400px", height:"400px", borderRadius:"50%", background:"radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 70%)", pointerEvents:"none" }} />

      {/* ── Header ── */}
      <div className="text-center mb-6 px-5">
        <h2 className={`text-2xl md:text-3xl font-black uppercase tracking-widest  ${isDark ? 'text-white' : 'text-gray-900'}`}>
          STUDENT'S {" "}
          <span className="text-blue-500">SUCCESS</span>
        </h2>
        <p className={`text-xs md:text-sm max-w-xl mx-auto mt-2 font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Real traders. Real results. Our students have gone from beginners to funded professionals — winning awards, passing evaluations, and building consistent income.
        </p>
      </div>

      {/* ── Carousel Track ── */}
      {/*
          Layout: [partial left] [full center] [partial right]
          We show all cards in a flex row, translate so active is centered.
          cardW = 52vw (capped), sideScale 0.82, peek = ~18% of cardW
      */}
      <div style={{ position:"relative", width:"100%", overflow:"hidden" }}>

        {/* Cards wrapper */}
        <div style={{
          display:"flex",
          alignItems:"center",
          justifyContent:"center",
          gap:"14px",
          padding:"16px 0 20px",
          transform:`translateX(calc( ${(1 - active) * (38 + 1.6)}vw ))`,
          transition:"transform 0.55s cubic-bezier(.23,1,.32,1)",
        }}>
          {moments.map((m, i) => {
            const isActive = i === active;
            return (
              <div
                key={m.id}
                className={`mom-card${isActive ? " active-card" : ""}`}
                onClick={() => setActive(i)}
                style={{
                  width: isActive ? "38vw" : "32vw",
                  maxWidth: isActive ? "400px" : "320px",
                  minWidth: isActive ? "200px" : "160px",
                  height: "clamp(220px, 30vw, 340px)",
                  opacity: isActive ? 1 : 0.55,
                  transform: isActive ? "scale(1)" : "scale(0.88)",
                  filter: isActive ? "none" : "brightness(0.7)",
                }}
              >
                <img src={m.image} alt={m.title} className="mom-img" />


              </div>
            );
          })}
        </div>

        {/* Fade edges — left */}
        <div style={{
          position:"absolute", top:0, left:0, bottom:0, width:"80px",
          background:`linear-gradient(to right, ${colors.background} 0%, transparent 100%)`,
          pointerEvents:"none", zIndex:2,
        }} />
        {/* Fade edges — right */}
        <div style={{
          position:"absolute", top:0, right:0, bottom:0, width:"80px",
          background:`linear-gradient(to left, ${colors.background} 0%, transparent 100%)`,
          pointerEvents:"none", zIndex:2,
        }} />

        {/* Prev / Next arrows */}
        <button onClick={prev} className="nav-arr" style={{
          position:"absolute", left:"20px", top:"50%", transform:"translateY(-50%)",
          zIndex:3,
          background: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)",
          backdropFilter:"blur(8px)",
          borderRadius:"50%", width:"46px", height:"46px",
          color: isDark ? "#fff" : "#111",
          fontSize:"22px",
          display:"flex", alignItems:"center", justifyContent:"center",

          border: isDark ? "1px solid rgba(255,255,255,0.10)" : "1px solid rgba(0,0,0,0.10)",
        }}>‹</button>

        <button onClick={next} className="nav-arr" style={{
          position:"absolute", right:"20px", top:"50%", transform:"translateY(-50%)",
          zIndex:3,
          background: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)",
          backdropFilter:"blur(8px)",
          borderRadius:"50%", width:"46px", height:"46px",
          color: isDark ? "#fff" : "#111",
          fontSize:"22px",
          display:"flex", alignItems:"center", justifyContent:"center",
          border: isDark ? "1px solid rgba(255,255,255,0.10)" : "1px solid rgba(0,0,0,0.10)",
        }}>›</button>
      </div>

      {/* ── Dot indicators ── */}
      <div style={{ display:"flex", gap:"8px", justifyContent:"center", marginTop:"2px" }}>
        {moments.map((_, i) => (
          <div
            key={i}
            onClick={() => setActive(i)}
            style={{
              width: active === i ? "28px" : "8px",
              height:"8px", borderRadius:"4px",
              background: active === i ? "#3b82f6" : isDark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.18)",
              transition:"all 0.3s ease",
              cursor:"pointer",
              opacity: active === i ? 1 : 0.55,
            }}
          />
        ))}
      </div>
    </div>
  );
}
