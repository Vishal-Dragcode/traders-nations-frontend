import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../settings/ThemeContext';
import { TrendingUp, Users, Award, Star, CheckCircle, ArrowUpRight } from 'lucide-react';
import Gallery from '../homesection/Gallery';

import StudentReview from './StudentReview';

const stats = [
    { icon: TrendingUp, value: "8+", label: "Years Trading", color: "text-blue-400", bg: "bg-blue-500/10" },
    { icon: Users, value: "10K+", label: "Students Trained", color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { icon: Award, value: "95%", label: "Success Rate", color: "text-amber-400", bg: "bg-amber-500/10" },
    { icon: Star, value: "4.9★", label: "Student Rating", color: "text-purple-400", bg: "bg-purple-500/10" },
];

const highlights = [
    "Ranked Top 3 Globally in Elite Trading Tournament",
    "Successfully Completed 10 Lakh to 3 Crore Growth Challenge",
    "Specialist in Smart Money Concepts (SMC)",
    "Trained 10,000+ students across India & globally",
    "Expert in Gold, Indices & Major Currency Pairs",
    "Certified Forex Trader & Market Analyst",
];

const AboutSection = () => {
    const { colors, theme } = useTheme();
    const isDark = theme === 'dark';
    const navigate = useNavigate();

    return (
        <section
            id="about"
            className="py-16 md:py-24 px-6 sm:px-10 lg:px-20"
            style={{ background: colors.background }}
        >
            <div className="max-w-7xl mx-auto">

                {/* Section Label */}
                <div className="text-center mb-12 md:mb-20">
                    <h2 className={`text-3xl md:text-4xl lg:text-2xl font-black uppercase tracking-widest ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Meet Your Mentor
                    </h2>
                </div>

                {/* Main Content — Left Img + Right Text */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* ── LEFT: Image Card ── */}
                    <div className="relative flex justify-center order-2 lg:order-1">
                        {/* Image wrapper */}
                        <div
                            className={`relative w-full max-w-sm rounded-[2.5rem] overflow-hidden border transition-all duration-500 group ${isDark ? 'border-white/10' : 'border-gray-200'}`}
                            style={{ boxShadow: isDark ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' : '0 25px 50px -12px rgba(0, 0, 0, 0.1)' }}
                        >
                            {/* Mentor Image */}
                            <div className="aspect-4/5 overflow-hidden">
                                <img
                                    src="https://res.cloudinary.com/dfmsx47el/image/upload/v1774616509/rshguth6gnywg1i8c0ke.jpg"
                                    alt="Tejas Toge"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>

                            {/* Name badge at bottom of image */}
                            <div className="px-8 py-6 border-t border-white/5" style={{ background: isDark ? 'rgba(15, 23, 42, 0.9)' : '#fff', backdropFilter: 'blur(12px)' }}>
                                <p className={`font-black text-2xl ${isDark ? 'text-white' : 'text-gray-900'}`}>Tejas Toge</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                                    <p className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                                        Master Forex Trader & Mentor
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Floating badge — Years Exp */}
                        <div
                            className={`absolute -bottom-6 right-0 sm:-right-6 md:-right-10 flex items-center gap-4 px-6 md:px-8 py-4 md:py-6 rounded-3xl border backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 z-10 ${isDark ? 'border-white/10 text-white' : 'border-gray-200 text-gray-900'}`}
                            style={{ background: isDark ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.8)', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.3)' }}
                        >
                            <span className="text-4xl md:text-5xl font-black text-blue-500">8+</span>
                            <div>
                                <p className="text-[10px] md:text-xs font-black uppercase tracking-wider">Years of</p>
                                <p className="text-[10px] md:text-xs opacity-60 font-black uppercase tracking-wider">Trading Edge</p>
                            </div>
                        </div>
                    </div>

                    {/* ── RIGHT: Content ── */}
                    <div className="relative order-1 lg:order-2">
                        {/* Decorative background element */}
                        <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none hidden lg:block" />

                        <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                            <Star size={12} className="text-blue-500 fill-blue-500" />
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-500">Certified Expert Mentor</span>
                        </div>

                        <h3 className={`text-4xl md:text-5xl font-black leading-tight mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Hi, I'm <br className="sm:hidden" />
                            <span className="text-blue-500">
                                Tejas Toge
                            </span>
                        </h3>

                        <p className={`text-base md:text-lg leading-relaxed mb-10 font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            I'm a full-time Forex trader and educator with over <strong className={isDark ? 'text-white' : 'text-gray-900'}>8 years of experience</strong> in high-stakes financial markets. Certified as a global market expert, I recently achieved a <strong className="text-blue-500">Global Top 3 Ranking</strong> in an international trading tournament and famously completed a <strong className="text-blue-500">10 Lakh to 3 Crore</strong> account growth challenge. My mission is to reveal how institutional players actually trade.
                        </p>

                        {/* Highlights Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-12">
                            {highlights.map((item, i) => (
                                <div key={i} className={`flex items-start gap-4 p-4 rounded-2xl border transition-all duration-300 group hover:scale-[1.02] ${isDark ? 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-blue-500/30' : 'bg-gray-50 border-gray-100 hover:bg-white hover:border-blue-200'}`}>
                                    <div className={`mt-0.5 shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${isDark ? 'bg-blue-500/20 text-blue-400 group-hover:bg-blue-500 group-hover:text-white' : 'bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'}`}>
                                        <CheckCircle size={14} />
                                    </div>
                                    <span className={`text-[13px] font-bold leading-tight ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{item}</span>
                                </div>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <button
                            onClick={() => navigate('/courses')}
                            className="group relative w-full sm:w-auto flex items-center justify-center sm:justify-between h-16 px-10 rounded-2xl transition-all duration-500 hover:scale-[1.02] active:scale-95 overflow-hidden"
                            style={{
                                background: '#2563EB',
                                border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                                boxShadow: '0 20px 40px -15px rgba(37, 99, 235, 0.4)',
                            }}
                        >
                            <span className="uppercase tracking-[3px] text-xs font-black mr-6 text-white text-center">
                                Start Your Journey
                            </span>
                            <div className="w-10 h-10 rounded-xl bg-white/20 items-center justify-center text-white transition-transform duration-500 group-hover:rotate-45 hidden sm:flex">
                                <ArrowUpRight size={20} strokeWidth={3} />
                            </div>
                        </button>
                    </div>
                </div>

                {/* ── Stats Row ── */}
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mt-24">
                    {stats.map(({ icon: Icon, value, label, color, bg }, i) => (
                        <div
                            key={i}
                            className={`flex flex-col items-center text-center p-6 md:p-10 rounded-[2.5rem] border transition-all duration-500 hover:-translate-y-2 ${isDark ? 'border-white/5 hover:border-blue-500/30' : 'border-gray-200 hover:border-blue-300'}`}
                            style={{ background: isDark ? 'rgba(30, 41, 59, 0.4)' : '#fff', boxShadow: 'none' }}
                        >
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${bg} transition-transform duration-500 hover:scale-110 shadow-inner`}>
                                <Icon size={26} className={color} />
                            </div>
                            <p className={`text-3xl md:text-4xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}</p>
                            <p className={`text-[10px] md:text-xs font-black uppercase tracking-[0.2em] mt-3 opacity-60 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p>
                        </div>
                    ))}
                </div>

            </div>
            <Gallery />
            <StudentReview />
        </section>
    );
};

export default AboutSection;
