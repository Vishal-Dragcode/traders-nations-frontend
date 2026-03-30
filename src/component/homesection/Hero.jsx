import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../settings/ThemeContext";

const slides = [
    {
        image: "https://cdn.pixabay.com/photo/2024/08/21/07/01/ai-generated-8985299_1280.jpg",
        title: "Forex Trading Masterclass",
        subtitle: "Master the art of currency trading with institutional-grade strategies and technical precision.",
        tag: "Education",
    },
    {
        image: "https://cdn.pixabay.com/photo/2020/11/24/04/13/finance-5771541_1280.jpg",
        title: "Advanced Market Analysis",
        subtitle: "Unlock deep market insights using professional-grade technical and fundamental analysis tools.",
        tag: "Analytics",
    },
    {
        image: "https://cdn.pixabay.com/photo/2020/11/24/04/13/smartphone-5771542_1280.jpg",
        title: "Institutional Trading Community",
        subtitle: "Join a global network of professional traders and gain access to exclusive market insights.",
        tag: "Community",
    },
];

const Hero = () => {
    const { colors, theme } = useTheme();
    const isDark = theme === 'dark';
    const navigate = useNavigate();
    const [current, setCurrent] = useState(0);
    const [animating, setAnimating] = useState(false);

    // Auto-advance carousel
    useEffect(() => {
        const interval = setInterval(() => {
            goToNext();
        }, 5000);
        return () => clearInterval(interval);
    }, [current]);

    const goTo = (index) => {
        if (animating || index === current) return;
        setAnimating(true);
        setTimeout(() => {
            setCurrent(index);
            setAnimating(false);
        }, 400);
    };

    const goToNext = () => goTo((current + 1) % slides.length);
    const goToPrev = () => goTo((current - 1 + slides.length) % slides.length);

    const slide = slides[current];

    return (
        <div className="relative min-h-screen overflow-hidden" style={{ background: colors.background }}>

            {/* ── Carousel Background Images ── */}
            {slides.map((s, i) => (
                <div
                    key={i}
                    className="absolute inset-0 h-full w-full transition-opacity duration-700"
                    style={{
                        opacity: i === current ? 1 : 0,
                        zIndex: i === current ? 0 : -1,
                    }}
                >
                    <img
                        src={s.image}
                        alt={s.title}
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                    {/* Overlays */}
                    <div className="absolute inset-0 opacity-60" style={{ background: colors.background }} />
                    <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/80" />
                </div>
            ))}

            {/* ── Hero Content ── */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pt-28 text-center">
                <div
                    key={current}
                    className="max-w-4xl space-y-7"
                    style={{ animation: 'fadeInUp 0.7s ease-out forwards' }}
                >
                    {/* Tag badge */}


                    {/* Title */}
                    <h1 className="text-4xl sm:text-6xl md:text-5xl font-bold tracking-tight text-white leading-[1.1]">
                        Empowering Your Business<br />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-[#A5B4FC] to-indigo-400">
                            {slide.title}
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-white/60 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
                        {slide.subtitle}
                    </p>

                </div>
            </div>


            {/* ── Dot Indicators ── */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goTo(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        className={`transition-all duration-300 rounded-full ${i === current
                            ? 'w-8 h-2.5 bg-[#A5B4FC]'
                            : 'w-2.5 h-2.5 bg-white/30 hover:bg-white/60'
                            }`}
                    />
                ))}
            </div>

            {/* ── Progress Bar ── */}
            <div className="absolute bottom-0 left-0 z-20 h-[3px] bg-[#A5B4FC]/30 w-full">
                <div
                    key={current}
                    className="h-full bg-[#A5B4FC]"
                    style={{ animation: 'progress 5s linear forwards' }}
                />
            </div>

            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(24px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes progress {
                    from { width: 0%; }
                    to   { width: 100%; }
                }
                :global(html) { scroll-behavior: smooth; }
                :global(body) { margin: 0; padding: 0; overflow-x: hidden; }
            `}</style>
        </div>
    );
};

export default Hero;
