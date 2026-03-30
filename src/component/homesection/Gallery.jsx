import React, { useRef } from 'react';
import { useTheme } from '../../settings/ThemeContext';

// Global constants for gallery assets
const gallImg1 = 'https://res.cloudinary.com/dfmsx47el/image/upload/v1774796585/cxsqmingilfgyljyuw03.jpg';
const gallImg2 = 'https://res.cloudinary.com/dfmsx47el/image/upload/v1774796613/gk6cka4ogfqkjz4uapfy.jpg';
const gallImg3 = 'https://res.cloudinary.com/dfmsx47el/image/upload/v1774796639/d8m3k72wod7mnjraowqd.jpg';
const gallImg4 = 'https://res.cloudinary.com/dfmsx47el/image/upload/v1774796663/ioi08xdw8ehzndmo3up3.jpg';
const gallImg5 = 'https://res.cloudinary.com/dfmsx47el/image/upload/v1774796681/iejwztzhbjkrft3s0npm.jpg';
const gallImg6 = 'https://res.cloudinary.com/dfmsx47el/image/upload/v1774796681/iejwztzhbjkrft3s0npm.jpg';
const gallImg7 = 'https://res.cloudinary.com/dfmsx47el/image/upload/v1774796730/ojph08dbtvgrq3lln3ad.jpg';

// Video constants
const gallVid1 = 'https://res.cloudinary.com/dfmsx47el/video/upload/v1774803451/uyanbkwohphjaukkplew.mp4';
const gallVid8 = 'https://res.cloudinary.com/dfmsx47el/video/upload/v1774803556/gr6vwi9sxsplfrlzri1m.mp4';
const gallVid9 = 'https://res.cloudinary.com/dfmsx47el/video/upload/v1774803609/tanxvv9211zx3xcsaugv.mp4';
const gallVid10 = 'https://res.cloudinary.com/dfmsx47el/video/upload/v1774803644/lbu8duau160folluzbjd.mp4';
const gallVid11 = 'https://res.cloudinary.com/dfmsx47el/video/upload/v1774803726/gek3uqekrsuctvv4h9x9.mp4';
const gallVid12 = 'https://res.cloudinary.com/dfmsx47el/video/upload/v1774803823/rfyj7euwnagtdirlkrj6.mp4';
const gallVid13 = 'https://res.cloudinary.com/dfmsx47el/video/upload/v1774804035/i8gtfwscdyfmspqnogeh.mp4';
const gallVid14 = 'https://res.cloudinary.com/dfmsx47el/video/upload/v1774804258/jdd2t7t6g9wb6j01gall.mp4';
const gallVid15 = 'https://res.cloudinary.com/dfmsx47el/video/upload/v1774849464/ngkxmb3vimcddnoizz86.mp4';
const gallVid16 = 'https://res.cloudinary.com/dfmsx47el/video/upload/v1774849490/geikrhetrw4bo72qplsa.mp4';

// ─── Gallery Assets ───────────────────────────────────────────────────────────
const row1Assets = [
    { type: 'image', src: gallImg1, alt: 'Workshop' },
    { type: 'video', src: gallVid8, alt: 'Live Session' },
    { type: 'image', src: gallImg2, alt: 'Trading Group' },
    { type: 'video', src: gallVid9, alt: 'Seminar' },
    { type: 'image', src: gallImg3, alt: 'Expert Analysis' },
    { type: 'video', src: gallVid10, alt: 'Classroom' },
    { type: 'image', src: gallImg4, alt: 'Team Meeting' },
    { type: 'video', src: gallVid11, alt: 'Trading Session' },
];

const row2Assets = [
    { type: 'video', src: gallVid12, alt: 'Global Event' },
    { type: 'image', src: gallImg5, alt: 'Mentorship' },
    { type: 'video', src: gallVid13, alt: 'Analysis Session' },
    { type: 'image', src: gallImg6, alt: 'Certificate Event' },
    { type: 'video', src: gallVid14, alt: 'Workshop Group' },
    { type: 'image', src: gallImg7, alt: 'Celebration' },
    { type: 'video', src: gallVid15, alt: 'Live Trading' },
    { type: 'video', src: gallVid1, alt: 'Event Intro' },
    { type: 'video', src: gallVid16, alt: 'Success Story' },
];

// ─── Scrolling Row ────────────────────────────────────────────────────────────
const ScrollRow = ({ assets, direction = 'left', speed = 35 }) => {
    const { colors, theme } = useTheme();
    const isDark = theme === 'dark';
    const trackRef = useRef(null);
    const allAssets = [...assets, ...assets, ...assets]; // triple for seamless

    const pause = () => { if (trackRef.current) trackRef.current.style.animationPlayState = 'paused'; };
    const resume = () => { if (trackRef.current) trackRef.current.style.animationPlayState = 'running'; };

    const animName = direction === 'left' ? 'scrollLeft' : 'scrollRight';

    return (
        <div
            className="relative w-full overflow-hidden"
            onMouseEnter={pause}
            onMouseLeave={resume}
        >
            {/* Fade Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 z-10 pointer-events-none"
                style={{ background: `linear-gradient(to right, ${colors.background} 0%, transparent 100%)` }}
            />
            <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 z-10 pointer-events-none"
                style={{ background: `linear-gradient(to left, ${colors.background} 0%, transparent 100%)` }}
            />

            <div
                ref={trackRef}
                className="flex gap-4 md:gap-6 py-4"
                style={{
                    width: 'max-content',
                    animation: `${animName} ${speed}s linear infinite`,
                    willChange: 'transform',
                }}
            >
                {allAssets.map((asset, idx) => (
                    <div
                        key={idx}
                        className={`group relative flex-shrink-0 overflow-hidden rounded-[2rem] border transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] ${isDark ? 'border-white/10' : 'border-gray-200'}`}
                        style={{
                            width: 'clamp(300px, 35vw, 480px)',
                            height: 'clamp(220px, 22vw, 320px)',
                            background: isDark ? 'rgba(30, 41, 59, 0.4)' : '#fff',
                            boxShadow: isDark ? '0 20px 40px -20px rgba(0,0,0,0.5)' : '0 20px 40px -20px rgba(0,0,0,0.1)',
                            cursor: 'pointer',
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

                        {/* Status Badge for Videos */}
                        {asset.type === 'video' && (
                            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-blue-500/80 backdrop-blur-md text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-1.5 shadow-lg">
                                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                Moment
                            </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                ))}
            </div>
        </div>
    );
};

// ─── Main Gallery Component ───────────────────────────────────────────────────
const Gallery = () => {
    const { colors, theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <section style={{
            fontFamily: "'Space Grotesk', sans-serif",
            background: colors.background,
            padding: '40px 0 40px',
            position: 'relative',
            overflow: 'hidden',
        }}>
            <div className="max-w-7xl mx-auto px-4 mb-16">
                <div className="text-center">
                    <h2 className={`text-3xl md:text-4xl font-black uppercase tracking-[0.2em] ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Our <span className="text-blue-500">Moments</span>
                    </h2>
                    <div className="w-20 h-1.5 bg-blue-500 mx-auto mt-4 rounded-full" />
                    <p className={`mt-6 text-sm font-medium uppercase tracking-widest opacity-60 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        Capturing the essence of Trader Nation
                    </p>
                </div>
            </div>

            {/* Scrolling Rows */}
            <div className="flex flex-col gap-8 md:gap-12">
                <ScrollRow assets={row1Assets} direction="left" speed={45} />
                <ScrollRow assets={row2Assets} direction="right" speed={40} />
            </div>

            {/* Keyframes */}
            <style>{`
                @keyframes scrollLeft {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.333%); }
                }
                @keyframes scrollRight {
                    0% { transform: translateX(-33.333%); }
                    100% { transform: translateX(0); }
                }
            `}</style>
        </section>
    );
};

export default Gallery;
