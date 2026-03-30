import React, { useState } from 'react';
import { useTheme } from '../../settings/ThemeContext';
import { ArrowUpRight } from 'lucide-react';

const CTASection = ({ onStartJourney, onLearnMore }) => {
    const { colors, theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <section className="py-12 px-4 shadow-none" style={{ background: colors.background }}>
            <div className="max-w-4xl mx-auto">

                {/* Main CTA Card */}
                <div
                    className="relative overflow-hidden rounded-3xl px-8 py-10 text-center"
                    style={{
                        background: colors.background,
                        border: `1px solid ${colors.border}`,
                        boxShadow: 'none',
                    }}
                >

                    {/* Content */}
                    <div className="relative z-10">
                        <h2
                            className={`text-3xl md:text-3xl font-black mb-3 leading-tight uppercase tracking-widest  ${isDark ? 'text-white' : 'text-gray-900'}`}
                        >
                            Start Today
                        </h2>
                        <p className={`text-sm md:text-base max-w-lg mx-auto mb-10 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Join thousands of students who have enhanced their trading knowledge with our structured programs.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">

                            {/* Primary — Start Your Journey */}
                            <button
                                onClick={onStartJourney}
                                className="group relative flex items-center h-12 pl-8 pr-1.5 rounded-full transition-all duration-500 hover:scale-105 active:scale-95"
                                style={{
                                    background: '#2563EB',
                                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                                    boxShadow: 'none',
                                }}
                            >
                                <span className=" uppercase tracking-[2px] text-xs font-bold mr-6 text-white">
                                    Start Your Journey
                                </span>
                                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white transition-transform duration-500 group-hover:rotate-45">
                                    <ArrowUpRight size={18} strokeWidth={2.5} />
                                </div>
                            </button>

                            {/* Secondary — Learn More */}
                            <button
                                onClick={onLearnMore}
                                className="group relative flex items-center h-12 pl-8 pr-1.5 rounded-full transition-all duration-500 hover:scale-105 active:scale-95 border"
                                style={{
                                    background: colors.background,
                                    borderColor: colors.border,
                                    boxShadow: 'none',
                                }}
                            >
                                <span className=" uppercase tracking-[2px] text-xs font-bold mr-6" style={{ color: colors.text }}>
                                    Learn More
                                </span>
                                <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500 group-hover:rotate-45 ${isDark ? 'bg-white/10 text-white' : 'bg-black/5 text-black'}`}>
                                    <ArrowUpRight size={18} strokeWidth={2.5} />
                                </div>
                            </button>

                        </div>

                        {/* Trust line */}
                        <p className={`mt-8 text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                            ✦ No credit card required &nbsp;·&nbsp; Lifetime access &nbsp;·&nbsp; 7-day money-back guarantee
                        </p>
                    </div>
                </div>

            </div>
        </section >
    );
};

export default CTASection;
