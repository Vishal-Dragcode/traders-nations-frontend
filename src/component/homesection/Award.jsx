import React, { useRef } from 'react';
import { useTheme } from '../../settings/ThemeContext';

// Import images
const award1 = 'https://res.cloudinary.com/dfmsx47el/image/upload/v1774793368/iifxdulavr3ogoqlcpbp.jpg';
const award2 = 'https://res.cloudinary.com/dfmsx47el/image/upload/v1774793405/hsyi7i09xhgbydzfhcx0.jpg';

// Import videos
const awardVid1 = 'https://res.cloudinary.com/dfmsx47el/video/upload/v1774793458/wc5h4vtr7uqwez4joytz.mp4';
const awardVid2 = 'https://res.cloudinary.com/dfmsx47el/video/upload/v1774794725/qdaunmn0sawr1h16blnk.mp4';
const awardVid3 = 'https://res.cloudinary.com/dfmsx47el/video/upload/v1774794759/gs1rxeixzvfa1n5kov5i.mp4';

const awardAssets = [
    {
        id: 1,
        type: 'image',
        src: award1,
        alt: 'Radio One Award Ceremony',
    },
    {
        id: 2,
        type: 'video',
        src: awardVid1,
        alt: 'Award Video 1',
    },
    {
        id: 3,
        type: 'image',
        src: award2,
        alt: 'Baar Resort Award',
    },
    {
        id: 4,
        type: 'video',
        src: awardVid2,
        alt: 'Award Video 2',
    },
    {
        id: 5,
        type: 'video',
        src: awardVid3,
        alt: 'Award Video 3',
    },
];

// Duplicate for seamless loop
const allAssets = [...awardAssets, ...awardAssets];

const Award = () => {
    const { colors, theme } = useTheme();
    const isDark = theme === 'dark';
    const trackRef = useRef(null);

    const handleMouseEnter = () => {
        if (trackRef.current) {
            trackRef.current.style.animationPlayState = 'paused';
        }
    };

    const handleMouseLeave = () => {
        if (trackRef.current) {
            trackRef.current.style.animationPlayState = 'running';
        }
    };

    return (
        <section
            style={{
                padding: '80px 0',
                background: colors.background,
                overflow: 'hidden',
                fontFamily: "'Space Grotesk', sans-serif",
            }}
        >
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className={`text-3xl md:text-4xl font-black uppercase tracking-[0.2em] ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Recognition & <span className="text-blue-500">Awards</span>
                    </h2>
                    <div className="w-20 h-1.5 bg-blue-500 mx-auto mt-4 rounded-full" />
                </div>
            </div>

            {/* ── Scrolling Track ── */}
            <div
                className="relative w-full"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* Fade Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 z-10 pointer-events-none"
                    style={{ background: `linear-gradient(to right, ${colors.background} 0%, transparent 100%)` }}
                />
                <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 z-10 pointer-events-none"
                    style={{ background: `linear-gradient(to left, ${colors.background} 0%, transparent 100%)` }}
                />

                {/* Scrolling Container */}
                <div className="overflow-hidden">
                    <div
                        ref={trackRef}
                        className="flex gap-6 py-8"
                        style={{
                            width: 'max-content',
                            animation: 'marquee 40s linear infinite',
                            willChange: 'transform',
                        }}
                    >
                        {allAssets.map((asset, idx) => (
                            <div
                                key={idx}
                                className={`group relative flex-shrink-0 overflow-hidden rounded-[2rem] border transition-all duration-500 hover:-translate-y-2 ${isDark ? 'border-white/10' : 'border-gray-200'}`}
                                style={{
                                    width: 'clamp(280px, 30vw, 450px)',
                                    height: 'clamp(200px, 20vw, 300px)',
                                    background: isDark ? 'rgba(30, 41, 59, 0.4)' : '#fff',
                                    boxShadow: isDark ? '0 20px 40px -20px rgba(0,0,0,0.5)' : '0 20px 40px -20px rgba(0,0,0,0.1)',
                                }}
                            >
                                {asset.type === 'video' ? (
                                    <video
                                        src={asset.src}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <img
                                        src={asset.src}
                                        alt={asset.alt}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                )}

                                {/* Overlay Shadow */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Status Badge for Videos */}
                                {asset.type === 'video' && (
                                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-blue-500/80 backdrop-blur-md text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                        Live
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
        </section>
    );
};

export default Award;
