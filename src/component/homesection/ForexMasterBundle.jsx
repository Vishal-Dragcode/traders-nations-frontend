import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, ArrowRight, Shield, Globe } from 'lucide-react';
import { useTheme } from '../../settings/ThemeContext';

const ForexMasterBundle = () => {
    const navigate = useNavigate();
    const { colors, theme } = useTheme();
    const isDark = theme === 'dark';

    const handleNavigate = () => {
        navigate('/courses');
    };

    return (
        <section className="relative py-14 px-4 overflow-hidden" style={{ backgroundColor: colors.background }}>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-12 space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[9px] font-black uppercase tracking-[0.3em] ">
                        Exclusive Bundle
                    </div>
                    <h2 className={`text-3xl md:text-3xl font-black tracking-widest text-center uppercase mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Premium Offerings
                    </h2>
                    <p className={`text-base max-w-xl mx-auto font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Unlock the secrets of the financial markets with our most comprehensive trading bundle, designed for those who demand excellence.
                    </p>
                </div>

                <div className="flex justify-center">
                    <div
                        onClick={handleNavigate}
                        className="group relative overflow-hidden rounded-4xl cursor-pointer transition-all duration-700 max-w-4xl w-full border"
                        style={{
                            background: colors.background,
                            borderColor: colors.border,
                            boxShadow: 'none',
                        }}
                    >

                        <div className="relative z-10 p-6 md:p-10 flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
                            {/* Left Content - Visual Showcase */}
                            <div className="w-full lg:w-5/12 relative">
                                <div className="relative aspect-square rounded-3xl overflow-hidden border transition-transform duration-700 hover:scale-[1.02]" style={{ borderColor: colors.border }}>
                                    {/* Abstract Visual Content */}
                                    <div className="absolute inset-0 bg-linear-to-br from-blue-600 via-blue-700 to-indigo-900"></div>
                                    <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-[url('https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80')] bg-cover bg-center"></div>

                                    {/* Animated Shapes */}
                                    <div className="absolute top-6 left-6 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
                                    <div className="absolute bottom-6 right-6 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '6s' }}></div>

                                    <div className="absolute inset-0 flex items-center justify-center p-8">
                                        <div className="relative w-full h-full border border-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm group-hover:backdrop-blur-none transition-all duration-700">
                                            <TrendingUp size={100} className="text-white opacity-90 translate-y-0 group-hover:-translate-y-2 transition-transform duration-700" />
                                        </div>
                                    </div>

                                    {/* Premium Floating Badge */}
                                    <div className="absolute top-6 right-6 bg-black/40 backdrop-blur-xl border border-white/20 rounded-xl px-4 py-2 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                        <span className="text-white text-[8px] font-black uppercase tracking-widest">Enrolling Now</span>
                                    </div>

                                    {/* Info Overlay */}
                                    <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-4 flex items-center justify-between transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center">
                                                <Shield size={20} className="text-white" />
                                            </div>
                                            <div>
                                                <p className="text-white text-[10px] font-black uppercase tracking-wider">Certified Authority</p>
                                                <p className="text-blue-100/70 text-[8px] font-medium">Industry Recognition</p>
                                            </div>
                                        </div>
                                        <Globe size={20} className="text-blue-300 animate-spin-slow" />
                                    </div>
                                </div>
                            </div>

                            {/* Right Content - Strategic Info */}
                            <div className="w-full lg:w-7/12 space-y-8">
                                <div className="space-y-4">
                                    <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-blue-600 text-white text-[9px] font-black uppercase tracking-[0.2em]">
                                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                                        Most Popular Selection
                                    </div>

                                    <h3 className={`text-2xl md:text-3xl font-black leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        The Complete <br />
                                        <span className="text-blue-600">Mastery Bundle</span>
                                    </h3>

                                    <p className={`text-base leading-relaxed font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                        The definitive architectural path for modern traders. We bridge the gap between retail basics and institutional power.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                    {[
                                        { text: "Comprehensive Institutional Core", sub: "Deep dive into SMC and market kinetics" },
                                        { text: "Proprietary Strategy Matrix", sub: "Exclusive high-alpha entry mechanisms" },
                                        { text: "Advanced Forensic Analysis", sub: "Reading liquidity like a professional" }
                                    ].map((feature, i) => (
                                        <div key={i} className="flex items-center gap-4 group/item">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${isDark ? 'bg-blue-500/10 text-blue-400 group-hover/item:bg-blue-500 group-hover/item:text-white' : 'bg-blue-50 text-blue-600 group-hover/item:bg-blue-600 group-hover/item:text-white'}`}>
                                                <ArrowRight size={18} className="group-hover/item:scale-110 transition-transform" />
                                            </div>
                                            <div>
                                                <p className={`text-xs font-black uppercase tracking-wider ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{feature.text}</p>
                                                <p className={`text-[10px] font-medium ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{feature.sub}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    className="group/btn relative inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all duration-300 active:scale-[0.98] w-full sm:w-auto overflow-hidden text-center justify-center"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        Secure Lifetime Access
                                        <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform duration-500" />
                                    </span>
                                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ForexMasterBundle;
