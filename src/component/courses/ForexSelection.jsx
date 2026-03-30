import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, TrendingUp, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../../settings/ThemeContext';

const SelectionCard = ({ id, title, description, topics, isDark, navigate }) => {
    const { colors } = useTheme();
    return (
        <div
            onClick={() => navigate(`/course-details/${id}`)}
            className={`group relative flex flex-col h-full rounded-4xl overflow-hidden transition-all duration-700 cursor-pointer
                ${isDark
                    ? 'backdrop-blur-2xl border border-white/5 hover:border-blue-500/40 hover:bg-white/5'
                    : 'bg-white border border-blue-50'}`}
            style={{ background: colors.background, boxShadow: 'none' }}
        >

            <div className="p-8 flex flex-col flex-1 relative z-10">
                {/* Header: Icon & Badge */}
                <div className="flex justify-between items-start mb-8">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6
                        ${isDark ? 'bg-linear-to-br from-blue-500/20 to-indigo-500/20 text-blue-400 border border-blue-500/20' : 'bg-linear-to-br from-blue-50 to-indigo-50 text-blue-600 border border-blue-100'}`}>
                        <TrendingUp size={30} />
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-blue-600 text-white border border-blue-400/20">
                            Master Level
                        </span>
                        <span className={`text-[9px] font-bold uppercase tracking-widest opacity-60 ${isDark ? 'text-blue-200' : 'text-blue-900'}`}>
                            2-in-1 Bundle
                        </span>
                    </div>
                </div>

                {/* Title & Description */}
                <div className="space-y-4 mb-8">
                    <h3 className={`text-3xl font-black leading-tight tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {title}
                    </h3>
                    <p className={`text-[15px] leading-relaxed font-medium opacity-80 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {description}
                    </p>
                </div>

                {/* Price & Info Preview - NEW */}
                <div className={`grid grid-cols-2 gap-4 mb-8 p-5 rounded-3xl border ${isDark ? 'bg-black/20 border-white/5' : 'bg-blue-50/50 border-blue-100/50'}`}>
                    <div className="space-y-1">
                        <p className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-blue-400/60' : 'text-blue-600/60'}`}>Investment</p>
                        <div className="flex items-center gap-2">
                            <span className={`text-xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>₹45,000</span>
                            <span className={`text-[9px] font-bold ${isDark ? 'text-blue-400/80' : 'text-blue-600'}`}>Inclusive of GST</span>
                        </div>
                    </div>
                    <div className="space-y-1 pl-4 border-l border-white/5">
                        <p className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-blue-400/60' : 'text-blue-600/60'}`}>Duration</p>
                        <div className="flex items-center gap-2">
                            <span className={`text-lg font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>25 Days</span>
                        </div>
                    </div>
                </div>

                {/* Highlights */}
                <div className="space-y-4 mb-10 flex-1">
                    <div className="flex items-center gap-3">
                        <span className={`text-[10px] font-black uppercase tracking-widest shrink-0 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                            What's Included
                        </span>
                        <div className={`h-px flex-1 ${isDark ? 'bg-white/5' : 'bg-blue-100'}`}></div>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                        {topics.map((topic, index) => (
                            <div key={index} className="flex items-center gap-3 group/item">
                                <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300
                                    ${isDark ? 'bg-blue-500/10' : 'bg-blue-50'}`}>
                                    <CheckCircle2 size={13} className="text-blue-500" />
                                </div>
                                <span className={`text-[13px] font-bold transition-colors duration-300 ${isDark ? 'text-gray-300 group-hover/item:text-blue-400' : 'text-gray-700 group-hover/item:text-blue-600'}`}>
                                    {topic}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/course-details/${id}`);
                    }}
                    className="group relative w-full flex items-center justify-between h-14 pl-8 pr-2 rounded-2xl transition-all duration-500 hover:scale-[1.01] active:scale-[0.98] overflow-hidden"
                    style={{ background: '#2563EB', boxShadow: 'none' }}
                >
                    <span className="relative z-10 uppercase tracking-[2px] text-xs font-bold text-white">
                        Start Your Journey
                    </span>
                    <div className="relative z-10 w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white transition-transform duration-500 group-hover:rotate-45">
                        <ArrowUpRight size={20} strokeWidth={2.5} />
                    </div>
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
                </button>
            </div>
        </div>
    );
};

const ForexSelection = () => {
    const navigate = useNavigate();
    const { colors, theme } = useTheme();
    const isDark = theme === 'dark';

    const courses = [
        {
            id: 'master-bundle',
            type: 'master',
            title: 'Forex Master Bundle',
            description: 'The ultimate all-in-one trading program. Master everything from complete basics to institutional Smart Money Concepts (SMC).',
            topics: [
                'Complete Price Action Mastery',
                'Institutional Smart Money (SMC)',
                'Liquidity & Institutional Flow',
                'Psychology & Risk Strategy',
                'Two Pro Trading Strategies'
            ]
        }
    ];

    return (
        <section className="relative py-25 px-4 overflow-hidden" style={{ background: colors.background }}>

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className={`text-3xl md:text-3xl font-black uppercase tracking-widest ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Our Courses
                    </h2>
                    <p className={`mt-6 text-sm md:text-base max-w-xl mx-auto font-medium leading-relaxed ${isDark ? 'text-gray-400/70' : 'text-gray-500'}`}>
                        The only trading program you'll ever need. Master markets with Institutional Smart Money Concepts.
                    </p>
                </div>

                <div className="max-w-xl mx-auto">
                    {courses.map((course) => (
                        <SelectionCard
                            key={course.id}
                            {...course}
                            isDark={isDark}
                            navigate={navigate}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ForexSelection;
