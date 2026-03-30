import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../settings/ThemeContext';
import { ArrowUpRight } from 'lucide-react';


// ─── Dot grid pattern ───────────────────────────────────────────────────────
const DotGrid = ({ color = '#e94560', opacity = 0.35, size = 5, gap = 18 }) => (
    <svg
        style={{ display: 'block' }}
        width={size * gap}
        height={size * gap}
        viewBox={`0 0 ${size * gap} ${size * gap}`}
    >
        {Array.from({ length: size }).map((_, row) =>
            Array.from({ length: size }).map((_, col) => (
                <circle
                    key={`${row}-${col}`}
                    cx={col * gap + gap / 2}
                    cy={row * gap + gap / 2}
                    r={2}
                    fill={color}
                    opacity={opacity}
                />
            ))
        )}
    </svg>
);

// ─── Counter animation hook ──────────────────────────────────────────────────
const useCounter = (target, duration = 1800, suffix = '') => {
    const [count, setCount] = useState(0);
    const started = useRef(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started.current) {
                    started.current = true;
                    const start = performance.now();
                    const step = (now) => {
                        const progress = Math.min((now - start) / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        setCount(Math.floor(eased * target));
                        if (progress < 1) requestAnimationFrame(step);
                    };
                    requestAnimationFrame(step);
                }
            },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [target, duration]);

    return { count, ref };
};

// ─── Video Thumbnail ─────────────────────────────────────────────────────────
const VideoCard = () => {
    const { colors, theme } = useTheme();
    const isDark = theme === 'dark';
    const [hovered, setHovered] = useState(false);

    return (
        <div
            style={{
                position: 'absolute',
                top: '-60px',
                right: '-30px',
                width: '230px',
                height: '140px',
                zIndex: 10,
                transition: 'transform 0.3s ease',
                transform: hovered ? 'scale(1.04)' : 'scale(1)',
            }}
        >
            <div
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                    position: 'relative',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: `1px solid ${colors.border}`,
                    background: colors.background,
                    width: '100%',
                    height: '100%',
                    cursor: 'pointer',
                }}
            >
                {/* Thumbnail bg */}
                <img
                    src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500&q=80"
                    alt="Mastery in Trading"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                {/* Dark overlay */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(0,0,0,0.42)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                    }}
                >
                    {/* Play button */}
                    <div
                        style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: '50%',
                            background: '#e94560',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 20px rgba(233,69,96,0.5)',
                            transition: 'transform 0.2s',
                            transform: hovered ? 'scale(1.12)' : 'scale(1)',
                        }}
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
                            <polygon points="5,3 14,8 5,13" />
                        </svg>
                    </div>
                    <span style={{ color: '#fff', fontSize: '10px', fontWeight: 700, letterSpacing: '0.5px' }}>
                        MASTERY IN TRADING
                    </span>
                </div>
            </div>
        </div>
    );
};

// ─── Stats Badge ─────────────────────────────────────────────────────────────
const StatBadge = ({ count, label, delay }) => {
    const { colors } = useTheme();
    return (
        <div style={{
            background: colors.background,
            padding: '24px',
            borderRadius: '24px',
            border: `1px solid ${colors.border}`,
            textAlign: 'center',
            minWidth: '160px',
        }}>
            {/* Medal icon */}
            <div
                style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #f5e642 0%, #f5a623 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 4px 16px rgba(245,166,35,0.4)',
                    margin: '0 auto 12px',
                }}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="14" r="7" stroke="#fff" strokeWidth="2" />
                    <path d="M8 7l1.5-5h5L16 7" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
                    <circle cx="12" cy="14" r="3" fill="#fff" opacity="0.5" />
                </svg>
            </div>
            <div>
                <div
                    style={{
                        fontSize: '26px',
                        fontWeight: 900,
                        color: '#f5a623',
                        lineHeight: 1,
                        fontFamily: "'Poppins', sans-serif",
                    }}
                >
                    {count}K+
                </div>
                <div
                    style={{
                        fontSize: '12px',
                        color: colors.textSecondary,
                        fontWeight: 600,
                        marginTop: '2px',
                        fontFamily: "'Poppins', sans-serif",
                    }}
                >
                    {label}
                </div>
            </div>
        </div>
    );
};


// ─── Main Component ──────────────────────────────────────────────────────────
const AboutTraderNation = () => {
    const { colors, theme } = useTheme();
    const isDark = theme === 'dark';
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const sectionRef = useRef(null);
    const { count: trainedCandidatesCount, ref: trainedCandidatesRef } = useCounter(10, 1800);


    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const fadeIn = (delay = 0) => ({
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
    });

    return (
        <>
            {/* Google Font */}
            <link
                href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
                rel="stylesheet"
            />

            <section
                ref={sectionRef}
                style={{
                    fontFamily: "'Poppins', sans-serif",
                    background: colors.background,
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <div
                    style={{
                        maxWidth: '1200px',
                        margin: '0 auto',
                        padding: '64px 24px',
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '80px',
                        alignItems: 'center',
                    }}
                >
                    {/* ── LEFT: Image collage ── */}
                    <div
                        style={{
                            position: 'relative',
                            ...fadeIn(0),
                        }}
                    >
                        {/* Main image */}
                        <div
                            style={{
                                position: 'relative',
                                zIndex: 1,
                                borderRadius: '24px',
                                overflow: 'hidden',
                                boxShadow: '0 24px 64px rgba(0,0,0,0.15)',
                                marginLeft: '24px',
                                marginTop: '24px',
                            }}
                        >
                            <img
                                src="https://res.cloudinary.com/dfmsx47el/image/upload/v1774727517/falpjp4h3zhukieneo4p.jpg"
                                alt="Trader Nation Seminar"
                                style={{
                                    width: '100%',
                                    height: '380px',
                                    objectFit: 'cover',
                                    display: 'block',
                                }}
                            />
                            {/* Orange gradient bottom overlay */}
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    height: '60px',
                                    background: 'linear-gradient(to top, rgba(245,166,35,0.35), transparent)',
                                }}
                            />
                        </div>

                        {/* Floating video card */}
                        <VideoCard />

                        {/* Stats badge */}
                        {/* <StatBadge /> */}
                    </div>

                    {/* ── RIGHT: Text content ── */}
                    <div style={{ ...fadeIn(150) }}>
                        {/* Headline */}
                        <div className="text-center mb-8">
                            <h2
                                className={`text-3xl md:text-3xl font-black uppercase tracking-widest  ${isDark ? 'text-white' : 'text-gray-900'}`}
                            >
                                About{' '}
                                <span style={{ color: '#A5B4FC' }}>
                                    Trader Nation
                                </span>
                            </h2>
                        </div>

                        {/* Body paragraphs */}
                        {[
                            'Welcome to Trader Nation, your premier destination for comprehensive stock market education. Our range of popular courses caters to both beginners and advanced traders, ensuring that everyone can benefit from our expertise. With options for both online and offline training, participants delve into the fundamentals of stock market investing, covering essential topics like fundamental analysis and intraday trading strategies.',
                            'Among our offerings, the "Mastery in Trading & Investment" course shines as one of our most popular programs. Designed to equip participants with expert skills in stock analysis and informed investment decision-making, this comprehensive program covers various aspects of stock market trading and investment.',
                            "Whether you're embarking on your journey in stock market investing or seeking to enhance your existing knowledge and skills, Trader Nation's courses provide valuable insights and practical strategies tailored to your needs. Join us today and empower yourself with the knowledge and confidence to excel in the dynamic world of trading and investment.",
                        ].map((para, i) => (
                            <p
                                key={i}
                                style={{
                                    fontSize: '15px',
                                    lineHeight: 1.85,
                                    color: isDark ? '#ccc' : '#444',
                                    marginBottom: '20px',
                                    textAlign: 'justify',
                                    ...fadeIn(200 + i * 100),
                                }}

                            >
                                {para}
                            </p>
                        ))}

                        {/* CTA Button */}
                        <div style={{ marginTop: '16px', ...fadeIn(500) }}>
                            <button
                                onClick={() => navigate('/courses')}
                                className="group"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    height: '48px',
                                    paddingLeft: '28px',
                                    paddingRight: '6px',
                                    background: colors.background,
                                    color: colors.text,
                                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                                    borderRadius: '50px',
                                    fontSize: '12px',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    letterSpacing: '2px',
                                    textTransform: 'uppercase',
                                    transition: 'all 0.5s ease',
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    outline: 'none',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = '#A5B4FC66';
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                <span style={{ marginRight: '16px' }}>Learn More</span>
                                <div
                                    style={{
                                        width: '36px',
                                        height: '36px',
                                        borderRadius: '50%',
                                        background: '#A5B4FC',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#050810',
                                        transition: 'transform 0.5s ease',
                                    }}
                                    className="icon-wrapper"
                                >
                                    <ArrowUpRight size={18} strokeWidth={2.5} />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── Responsive styles ── */}
                <style>{`
          @media (max-width: 768px) {
            section > div {
              grid-template-columns: 1fr !important;
              gap: 80px !important;
            }
          }
          .group:hover .icon-wrapper {
            transform: rotate(45deg);
          }
        `}</style>
            </section>
        </>
    );
};

export default AboutTraderNation;
