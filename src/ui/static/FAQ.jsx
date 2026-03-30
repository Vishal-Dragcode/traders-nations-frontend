import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../settings/ThemeContext';
import { Plus, Minus, ChevronLeft, TrendingUp, ArrowUpRight } from 'lucide-react';

const FAQ = () => {
    const { colors, theme } = useTheme();
    const navigate = useNavigate();
    const isDark = theme === 'dark';
    const [openIdx, setOpenIdx] = useState(null);

    const faqs = [
        {
            q: "Is this course suitable for complete beginners?",
            a: "Yes! Our Basic Forex Course is designed to take you from zero knowledge to a confident trader. We cover everything from reading a chart to executing your first live trade step by step."
        },
        {
            q: "What markets does this course cover?",
            a: "We cover Forex (currency pairs), indices (US30, NAS100, SPX500), and commodities (Gold, Oil). You'll learn how each market behaves and how to identify high-probability setups across all of them."
        },
        {
            q: "Do I need a funded account to start?",
            a: "No. We recommend starting with a free demo account so you can practice all strategies risk-free before committing real capital. We guide you through setting one up in the first module."
        },
        {
            q: "What trading strategy is taught?",
            a: "We focus on Smart Money Concepts (SMC) — the same methodology used by institutional traders. This includes order blocks, break of structure, liquidity sweeps, and fair value gaps."
        },
        {
            q: "How long until I can trade profitably?",
            a: "Results vary, but most students feel confident trading a demo account within 4–8 weeks. Consistency comes with screen time and discipline — we give you the exact framework to get there faster."
        },
        {
            q: "Do I get lifetime access?",
            a: "Absolutely. Once you enroll, you have unlimited lifetime access to all course content and any future updates — at no extra cost."
        },
        {
            q: "Is there a community or mentorship included?",
            a: "Yes. All students join our private Discord community with live trade alerts, weekly Q&A sessions, and direct access to our mentors to review your analysis."
        },
        {
            q: "What risk management rules are taught?",
            a: "We teach strict risk management: never risking more than 1–2% per trade, proper position sizing, setting stop losses before entering, and maintaining a minimum 1:2 risk-to-reward ratio on every setup."
        },
    ];

    const toggle = (idx) => setOpenIdx(openIdx === idx ? null : idx);

    return (
        <section
            id="faq"
            className="min-h-screen py-30 px-4"
            style={{ background: colors.background }}
        >
            <div className="max-w-2xl mx-auto">

                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className={`
                        group relative inline-flex items-center h-10 pl-4 pr-1.5 rounded-full transition-all duration-300 mb-8 border
                        ${isDark
                            ? 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                            : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                        }
                    `}
                >
                    <span className=" uppercase tracking-[2px] text-[10px] font-bold mr-4">
                        Back
                    </span>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:-translate-x-1 ${isDark ? 'bg-white/10' : 'bg-black/5'}`}>
                        <ChevronLeft size={14} />
                    </div>
                </button>

                {/* Header */}
                <div className="mb-16 text-center">
                    <h2 className={`text-3xl md:text-3xl font-black uppercase tracking-widest  ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        FAQ
                    </h2>
                    <p className={`mt-4 text-sm md:text-base max-w-sm mx-auto ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        Everything you need to know before you start trading.
                    </p>
                </div>

                {/* FAQ List */}
                <div className="space-y-2">
                    {faqs.map((faq, idx) => {
                        const isOpen = openIdx === idx;
                        return (
                            <div
                                key={idx}
                                onClick={() => toggle(idx)}
                                className={`
                                     rounded-xl border cursor-pointer transition-all duration-200
                                     ${isOpen
                                        ? isDark
                                            ? 'border-blue-500/40'
                                            : 'border-blue-300'
                                        : isDark
                                            ? 'border-white/5 hover:border-white/10'
                                            : 'border-gray-100 hover:border-gray-200'
                                    }
                                 `}
                                style={{ background: colors.background, boxShadow: 'none' }}
                            >
                                {/* Question Row */}
                                <div className="flex items-center justify-between gap-4 p-4">
                                    <h3 className={`font-semibold text-sm leading-snug ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        {faq.q}
                                    </h3>
                                    <span className={`
                                        shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200
                                        ${isOpen
                                            ? 'bg-blue-500 text-white'
                                            : isDark
                                                ? 'bg-white/5 text-gray-400'
                                                : 'bg-gray-100 text-gray-500'
                                        }
                                    `}>
                                        {isOpen ? <Minus size={13} /> : <Plus size={13} />}
                                    </span>
                                </div>

                                {/* Answer */}
                                {isOpen && (
                                    <div className={`px-4 pb-4 text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                        <div className={`border-t pt-3 ${isDark ? 'border-white/5' : 'border-gray-100'}`}>
                                            {faq.a}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Footer CTA */}
                <div
                    className={`mt-8 p-5 rounded-2xl text-center border ${isDark ? 'border-white/5' : 'border-gray-100'}`}
                    style={{ background: colors.background }}
                >
                    <p className={`text-sm font-medium mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Still have questions?
                    </p>
                    <p className={`text-xs mb-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        Reach us directly and we'll get back to you within 24 hours.
                    </p>
                    <a
                        href="mailto:Tradersnationacadamy@gmail.com"
                        className="group relative inline-flex items-center h-11 pl-6 pr-1.5 rounded-full transition-all duration-500 border bg-blue-600 border-white/10 hover:scale-105"
                    >
                        <span className=" uppercase tracking-[2px] text-xs font-bold mr-4 text-white">
                            Contact Support
                        </span>
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white transition-transform duration-500 group-hover:rotate-45">
                            <ArrowUpRight size={16} strokeWidth={2.5} />
                        </div>
                    </a>
                </div>

            </div>
        </section>
    );
};

export default FAQ;
