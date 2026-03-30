import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Users, Award, CheckCircle, Play, FileText, Download, TrendingUp, BookOpen, Target, Plus, Minus } from 'lucide-react';
import { useTheme } from '../../../settings/ThemeContext';
import ReviewSection from '../ReviewSection';
function CourseDetails() {
    const { id } = useParams();
    const { colors, theme } = useTheme();
    const navigate = useNavigate();
    const isDark = theme === 'dark';
    const [activeCurriculumIndex, setActiveCurriculumIndex] = useState(0);

    const cardBg = isDark ? 'bg-white/5' : 'bg-gray-50';
    const textColor = isDark ? 'text-white' : 'text-gray-900';
    const subTextColor = isDark ? 'text-gray-300' : 'text-gray-700';
    const mutedTextColor = isDark ? 'text-gray-400' : 'text-gray-600';

    const toggleCurriculum = (index) => {
        setActiveCurriculumIndex(activeCurriculumIndex === index ? null : index);
    };

    // Course specific data
    const courseData = {
        'master-bundle': {
            title: "Forex Master Bundle",
            subtitle: "Complete Trading Program (Phase 1: Basic + Phase 2: Advanced SMC + Phase 3: Funded Mastery)",
            description: "The ultimate all-in-one trading program designed to take you from zero to a professional institutional trader. This bundle is split into three high-impact phases: Foundation Mastery, Institutional SMC Execution, and professional Funded Account Excellence.",
            phase1: {
                title: "Phase 1: Foundations",
                subtitle: "Price Action & Market Kinetics",
                highlights: [
                    'Price Action (Complete Fundamentals)',
                    'Chart Reading & Candlestick Anatomy',
                    'Support & Resistance Matrix',
                    'Chart Patterns & Trendlines',
                    'Basic Risk Management'
                ],
                curriculum: [
                    {
                        section: 'Price Action Foundations',
                        content: ['Understanding Pips & Lots', 'Candlestick Anatomy', 'Wick Rejections', 'Bullish & Bearish Engulfing']
                    },
                    {
                        section: 'Market Mechanics',
                        content: ['Role of Support & Resistance', 'Drawing Trendlines Correctively', 'Identifying Market Trends', 'Entry & Exit Rules']
                    }
                ]
            },
            phase2: {
                title: "Phase 2: Advanced SMC",
                subtitle: "Institutional Order Flow",
                highlights: [
                    'Advanced Structure',
                    'Mitigation & Breakers',
                    'Supply & Demand Zones',
                    'Institutional Stop Hunting',
                    'Institutional Entry & Exit'
                ],
                curriculum: [
                    {
                        section: 'SMC Deep Dive',
                        content: ['Order Blocks & Mitigation', 'Inducement & Liquidity', 'Fair Value Gaps (FVG)', 'MSB vs BOS']
                    },
                    {
                        section: 'Institutional Execution',
                        content: ['Stop Loss Hunting Patterns', 'Top-Down Analysis', 'High Probability Entries', 'Risk Management for Pros']
                    }
                ]
            },
            phase3: {
                title: "Phase 3: Funded Mastery",
                subtitle: "Pass Challenges & Scale Accounts",
                highlights: [
                    'Prop Firm Selection Guide',
                    'Evaluation Rule Protection',
                    'Drawdown Management Matrix',
                    'Psychology of Large Capital',
                    'Scaling & Payout Plan',
                    'Live Challenge Breakdown'
                ],
                curriculum: [
                    {
                        section: 'Funded Success Blueprint',
                        content: ['Choosing the Best Prop Firms', 'Passing Evaluation Rules', 'Daily Drawdown Protection', 'Payout & Scaling Strategies']
                    },
                    {
                        section: 'The Professional Edge',
                        content: ['Large Capital Psychology', 'Trading Plan for Challenges', 'Dealing with Account Loss', 'Professional Risk Scoring']
                    }
                ]
            },
            meta: { price: "₹45,000", gst: "Inclusive of GST", oldPrice: "₹90,000", duration: "25 Days", lessons: "127" }
        }
    };

    // Default to 'master-bundle'
    const currentCourse = courseData[id === 'advanced' || id === 'basic' ? 'master-bundle' : id] || courseData['master-bundle'];

    return (
        <div
            className="min-h-screen transition-colors duration-300 pb-12 lg:pb-0"
            style={{ backgroundColor: colors.background }}
        >
            {/* Course Header/Banner */}
            <div className={`py-25 md:py-25 ${isDark ? 'bg-white/5 border-b border-white/5' : 'bg-black'} text-white`}>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-4">
                            <div className="flex items-center gap-2">
                                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">
                                    Master Level
                                </span>
                                <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-medium opacity-80">
                                    Updated Feb 2026
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-5xl lg:text-5xl font-extrabold leading-tight tracking-tight">
                                {currentCourse.title}
                            </h1>
                            <p className="text-base md:text-lg text-blue-100/80 max-w-2xl leading-relaxed">
                                {currentCourse.subtitle}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid lg:grid-cols-3 gap-10">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Three Phases Cards */}
                        <div className="grid md:grid-cols-3 gap-4">
                            {/* Phase 1: Basic */}
                            <div className={`${cardBg} rounded-3xl p-5 border ${isDark ? 'border-white/10' : 'border-emerald-100'}`} style={{ boxShadow: 'none' }}>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                                        <BookOpen className="text-emerald-500" size={16} />
                                    </div>
                                    <div>
                                        <h3 className={`text-[13px] font-black leading-tight ${textColor}`}>{currentCourse.phase1.title}</h3>
                                        <p className="text-[8px] uppercase tracking-widest text-emerald-500 font-bold mt-0.5">Step One</p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    {currentCourse.phase1.highlights.map((item, index) => (
                                        <div key={index} className="flex items-start gap-2.5">
                                            <CheckCircle className="text-emerald-500 mt-0.5 shrink-0" size={11} />
                                            <span className={`${mutedTextColor} text-[10px] font-medium leading-tight`}>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Phase 2: Advanced */}
                            <div className={`${cardBg} rounded-3xl p-5 border ${isDark ? 'border-white/10' : 'border-blue-100'}`} style={{ boxShadow: 'none' }}>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center">
                                        <TrendingUp className="text-blue-500" size={16} />
                                    </div>
                                    <div>
                                        <h3 className={`text-[13px] font-black leading-tight ${textColor}`}>{currentCourse.phase2.title}</h3>
                                        <p className="text-[8px] uppercase tracking-widest text-blue-500 font-bold mt-0.5">Step Two</p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    {currentCourse.phase2.highlights.map((item, index) => (
                                        <div key={index} className="flex items-start gap-2.5">
                                            <CheckCircle className="text-blue-500 mt-0.5 shrink-0" size={11} />
                                            <span className={`${mutedTextColor} text-[10px] font-medium leading-tight`}>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Phase 3: Funded Mastery */}
                            <div className={`${cardBg} rounded-3xl p-5 border ${isDark ? 'border-white/10' : 'border-purple-100'}`} style={{ boxShadow: 'none' }}>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 rounded-xl bg-purple-500/10 flex items-center justify-center">
                                        <Target className="text-purple-500" size={16} />
                                    </div>
                                    <div>
                                        <h3 className={`text-[13px] font-black leading-tight ${textColor}`}>{currentCourse.phase3.title}</h3>
                                        <p className="text-[8px] uppercase tracking-widest text-purple-500 font-bold mt-0.5">Final Goal</p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    {currentCourse.phase3.highlights.map((item, index) => (
                                        <div key={index} className="flex items-start gap-2.5">
                                            <CheckCircle className="text-purple-500 mt-0.5 shrink-0" size={11} />
                                            <span className={`${mutedTextColor} text-[10px] font-medium leading-tight`}>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-3">
                            <h2 className={`text-xl font-black ${textColor} uppercase tracking-tight`}>Description</h2>
                            <p className={`${subTextColor} text-[15px] leading-relaxed opacity-90`}>
                                {currentCourse.description}
                            </p>
                        </div>

                        {/* Curriculum Grouped */}
                        <div className="space-y-6">
                            <h2 className={`text-xl font-black ${textColor} uppercase tracking-tight`}>Course Curriculum</h2>

                            {/* Phase 1 Curriculum */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-emerald-500">Phase 1 Foundations</span>
                                    <div className={`h-px flex-1 ${isDark ? 'bg-white/5' : 'bg-emerald-50'}`}></div>
                                </div>
                                {currentCourse.phase1.curriculum.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`rounded-xl overflow-hidden border transition-all duration-300 ${activeCurriculumIndex === index
                                            ? (isDark ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-emerald-200 bg-emerald-50')
                                            : (isDark ? 'border-white/5 bg-transparent' : 'border-gray-100 bg-transparent')
                                            }`}
                                    >
                                        <button
                                            onClick={() => toggleCurriculum(index)}
                                            className="w-full flex items-center justify-between p-4 text-left"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDark ? 'bg-emerald-500/10' : 'bg-emerald-100'}`}>
                                                    <Play className="text-emerald-500" size={14} />
                                                </div>
                                                <h3 className={`font-bold text-base ${textColor}`}>{item.section}</h3>
                                            </div>
                                            {activeCurriculumIndex === index ? <Minus size={18} className="text-emerald-500" /> : <Plus size={18} className={mutedTextColor} />}
                                        </button>

                                        <div className={`transition-all duration-300 ${activeCurriculumIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                                            <div className="p-4 pt-0 space-y-2">
                                                {item.content.map((lesson, idx) => (
                                                    <div key={idx} className="flex items-center gap-3 pl-12">
                                                        <FileText size={12} className="text-emerald-400" />
                                                        <span className={`text-[13px] ${subTextColor}`}>{lesson}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-500">Phase 2 Advanced SMC</span>
                                    <div className={`h-px flex-1 ${isDark ? 'bg-white/5' : 'bg-blue-50'}`}></div>
                                </div>
                                {currentCourse.phase2.curriculum.map((item, index) => {
                                    const actualIndex = index + currentCourse.phase1.curriculum.length;
                                    return (
                                        <div
                                            key={actualIndex}
                                            className={`rounded-xl overflow-hidden border transition-all duration-300 ${activeCurriculumIndex === actualIndex
                                                ? (isDark ? 'border-blue-500/30 bg-blue-500/5' : 'border-blue-200 bg-blue-50')
                                                : (isDark ? 'border-white/5 bg-transparent' : 'border-gray-100 bg-transparent')
                                                }`}
                                        >
                                            <button
                                                onClick={() => toggleCurriculum(actualIndex)}
                                                className="w-full flex items-center justify-between p-4 text-left"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDark ? 'bg-blue-500/10' : 'bg-blue-100'}`}>
                                                        <Play className="text-blue-500" size={14} />
                                                    </div>
                                                    <h3 className={`font-bold text-base ${textColor}`}>{item.section}</h3>
                                                </div>
                                                {activeCurriculumIndex === actualIndex ? <Minus size={18} className="text-blue-500" /> : <Plus size={18} className={mutedTextColor} />}
                                            </button>

                                            <div className={`transition-all duration-300 ${activeCurriculumIndex === actualIndex ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                                                <div className="p-4 pt-0 space-y-2">
                                                    {item.content.map((lesson, idx) => (
                                                        <div key={idx} className="flex items-center gap-3 pl-12">
                                                            <FileText size={12} className="text-blue-400" />
                                                            <span className={`text-[13px] ${subTextColor}`}>{lesson}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-purple-500">Phase 3 Funded Mastery</span>
                                    <div className={`h-px flex-1 ${isDark ? 'bg-white/5' : 'bg-purple-50'}`}></div>
                                </div>
                                {currentCourse.phase3.curriculum.map((item, index) => {
                                    const actualIndex = index + currentCourse.phase1.curriculum.length + currentCourse.phase2.curriculum.length;
                                    return (
                                        <div
                                            key={actualIndex}
                                            className={`rounded-xl overflow-hidden border transition-all duration-300 ${activeCurriculumIndex === actualIndex
                                                ? (isDark ? 'border-purple-500/30 bg-purple-500/5' : 'border-purple-200 bg-purple-50')
                                                : (isDark ? 'border-white/5 bg-transparent' : 'border-gray-100 bg-transparent')
                                                }`}
                                        >
                                            <button
                                                onClick={() => toggleCurriculum(actualIndex)}
                                                className="w-full flex items-center justify-between p-4 text-left"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDark ? 'bg-purple-500/10' : 'bg-purple-100'}`}>
                                                        <Play className="text-purple-500" size={14} />
                                                    </div>
                                                    <h3 className={`font-bold text-base ${textColor}`}>{item.section}</h3>
                                                </div>
                                                {activeCurriculumIndex === actualIndex ? <Minus size={18} className="text-purple-500" /> : <Plus size={18} className={mutedTextColor} />}
                                            </button>

                                            <div className={`transition-all duration-300 ${activeCurriculumIndex === actualIndex ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                                                <div className="p-4 pt-0 space-y-2">
                                                    {item.content.map((lesson, idx) => (
                                                        <div key={idx} className="flex items-center gap-3 pl-12">
                                                            <FileText size={12} className="text-purple-400" />
                                                            <span className={`text-[13px] ${subTextColor}`}>{lesson}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-28 space-y-6">
                            <div className={`${cardBg} rounded-3xl p-6 border ${isDark ? 'border-white/5' : 'border-blue-100'}`} style={{ boxShadow: 'none' }}>
                                <div className="aspect-video mb-6 rounded-xl bg-blue-600/10 flex items-center justify-center relative group overflow-hidden">
                                    <div className="absolute inset-0 bg-linear-to-br from-blue-600/20 to-indigo-600/20"></div>
                                    <div className="relative z-10 w-14 h-14 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform cursor-pointer" style={{ boxShadow: 'none' }}>
                                        <Play className="text-blue-600 ml-1" size={20} fill="currentColor" />
                                    </div>
                                </div>

                                <div className="space-y-1 mb-6">
                                    <div className="flex items-baseline gap-3">
                                        <span className={`text-3xl font-black ${textColor}`}>{currentCourse.meta.price}</span>
                                        <span className="text-gray-500 line-through text-base font-medium">{currentCourse.meta.oldPrice}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-md">
                                            {currentCourse.meta.gst}
                                        </span>
                                        <span className={`text-[9px] font-medium ${mutedTextColor}`}>Exclusive of taxes</span>
                                    </div>
                                </div>

                                {/* CTA Buttons */}
                                <div className="flex flex-col gap-3 mb-6">


                                    {/* Admission Form Button */}
                                    <button
                                        onClick={() => navigate(`/course-details/${id}/admission-form`)}
                                        className="w-full relative overflow-hidden group font-black py-4 rounded-xl transition-all duration-300 active:scale-95 text-[15px] tracking-wide flex items-center justify-center gap-2 border-2"
                                        style={{
                                            background: isDark ? 'rgba(99,102,241,0.07)' : 'rgba(37,99,235,0.05)',
                                            borderColor: isDark ? 'rgba(99,102,241,0.5)' : 'rgba(37,99,235,0.4)',
                                            color: isDark ? '#818cf8' : '#2563eb',
                                            boxShadow: 'none'
                                        }}
                                    >
                                        <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                                            style={{ background: isDark ? 'rgba(99,102,241,0.12)' : 'rgba(37,99,235,0.06)' }} />
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" className="shrink-0"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                        Admission Form
                                    </button>
                                </div>

                                <div className="space-y-3.5 pt-5 border-t border-white/10">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle size={14} className="text-emerald-500" />
                                        <span className={`text-[11px] font-bold ${textColor}`}>Phase 1: Basic Mastery Included</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle size={14} className="text-blue-500" />
                                        <span className={`text-[11px] font-bold ${textColor}`}>Phase 2: Advanced SMC Included</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle size={14} className="text-purple-500" />
                                        <span className={`text-[11px] font-bold ${textColor}`}>Phase 3: Funded Excellence Included</span>
                                    </div>
                                    <div className="h-2"></div>
                                    <div className="flex items-center gap-3">
                                        <Clock size={14} className="text-blue-500" />
                                        <span className={`text-[12px] font-medium ${subTextColor}`}>{currentCourse.meta.duration} total content</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <BookOpen size={14} className="text-blue-500" />
                                        <span className={`text-[12px] font-medium ${subTextColor}`}>{currentCourse.meta.lessons} modules</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Award size={14} className="text-blue-500" />
                                        <span className={`text-[12px] font-medium ${subTextColor}`}>Certificate of completion</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ReviewSection />
        </div>
    );
}

export default CourseDetails;
