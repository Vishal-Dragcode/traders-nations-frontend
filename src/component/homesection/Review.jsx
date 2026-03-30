import React from 'react';
import { useTheme } from '../../settings/ThemeContext';
import { Star, MessageCircle } from 'lucide-react';

const Review = () => {
    const { colors, theme } = useTheme();
    const isDark = theme === 'dark';

    const reviews = [
        { name: "Vishal Lodhe", role: "Stock Trader", text: "Finally understood how the big players move. This course is for anyone serious about profit." },
        { name: "Prathmesh Mane", role: "Option Trader", text: "Zero to hero in 4 months! Practical tips helped me recover all my previous losses." },
        { name: "Sanket Kale", role: "Student", text: "Simple language but very effective results. My portfolio has never looked this green." },
        { name: "Yashraj Awari", role: "Full-time Trader", text: "Don't waste time on YouTube tutorials. Get this course and see the difference in your P&L." },
        { name: "Atharwa Marke", role: "Part-time Trader", text: "I work a 9-5 and still manage to trade profitably now. Best investment for financial freedom." },
        { name: "Ayush Pagar", role: "Intraday Trader", text: "Mind-blowing strategies! Each session was a new eye-opener for me." },
        { name: "Nikhi Edake", role: "Home Maker & Trader", text: "Very easy to understand. I never thought I could trade stocks this confidently." },
        { name: "Sayli Patil", role: "Business Owner", text: "Clear, logical, and profitable. This is the only training that actually works in the Indian market." },
        { name: "Manswi Sambhar", role: "Student", text: "Life-changing experience. The mentor explains everything so clearly, even a beginner can succeed." }
    ];

    // Duplicate reviews for seamless loop
    const displayReviews = [...reviews, ...reviews];

    return (
        <section className="py-8 px-4 overflow-hidden relative" style={{ background: colors.background }}>
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-10">
                    <h2 className={`text-2xl md:text-3xl font-black mb-2 uppercase tracking-widest  ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        True Success Stories
                    </h2>
                    <p className={`text-xs md:text-sm max-w-xl mx-auto font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        Real people, real profits. See how our community is mastering the stock market.
                    </p>
                </div>

                {/* Marquee Container */}
                <div className="relative group">
                    {/* Perspective Gradient Fades */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none" style={{ background: `linear-gradient(to right, ${colors.background}, transparent)` }} />
                    <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none" style={{ background: `linear-gradient(to left, ${colors.background}, transparent)` }} />

                    {/* Scrolling Content */}
                    <div className="flex animate-scroll hover:[animation-play-state:paused] transition-all duration-300 py-4">
                        {displayReviews.map((review, idx) => (
                            <div
                                key={idx}
                                className="w-[300px] md:w-[340px] shrink-0 mx-3 p-6 rounded-2xl border transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1"
                                style={{
                                    background: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(255, 255, 255, 0.5)',
                                    backdropFilter: 'blur(10px)',
                                    borderColor: colors.border,
                                    boxShadow: isDark ? '0 10px 30px -15px rgba(0,0,0,0.5)' : '0 10px 30px -15px rgba(0,0,0,0.1)',
                                }}
                            >
                                <div className="flex gap-0.5 text-amber-500 mb-3">
                                    {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                                </div>
                                <p className={`text-[13px] mb-5 leading-relaxed font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                    "{review.text}"
                                </p>
                                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isDark ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                                        <MessageCircle size={16} />
                                    </div>
                                    <div>
                                        <h4 className={`text-[13px] font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>{review.name}</h4>
                                        <p className={`text-[9px] font-bold uppercase tracking-wider opacity-50 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{review.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(calc(-312px * 10 - 1.5rem * 10)); }
                }
                
                @media (min-width: 768px) {
                    @keyframes scroll {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(calc(-352px * 10)); }
                    }
                }

                .animate-scroll {
                    animation: scroll 40s linear infinite;
                }
                
                .group:hover .animate-scroll {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
};

export default Review;
