import React, { useState } from 'react';
import { useTheme } from '../../settings/ThemeContext';
import { FileText, ChevronRight, ArrowUpRight } from 'lucide-react';

const sections = [
    {
        id: 1,
        title: "Acceptance of Terms",
        content: `By accessing or using Trader Nation's platform, courses, or any associated services, you confirm that you are at least 18 years of age and have read, understood, and agreed to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our services.`
    },
    {
        id: 2,
        title: "Course Enrollment & Access",
        content: `Upon successful payment, you will be granted lifetime access to the course content you have purchased. Access is granted to a single individual and is non-transferable. You may not share your login credentials, distribute course materials, or allow others to access content on your behalf. Trader Nation reserves the right to revoke access in cases of misuse.`
    },
    {
        id: 3,
        title: "Payment & Pricing",
        content: `All prices are listed in the applicable currency at the time of purchase. Payments are processed securely through our third-party payment providers. Trader Nation reserves the right to modify pricing at any time. Existing enrolled students will not be affected by price changes after their purchase has been completed.`
    },
    {
        id: 4,
        title: "Refund Policy",
        content: `We offer a 7-day money-back guarantee from the date of purchase. To be eligible, you must not have completed more than 20% of the course content. Refund requests must be submitted via email to Tradersnationacadamy@gmail.com with your order details. Refunds are typically processed within 5–10 business days. Courses purchased during promotional sales may not be eligible for refunds.`
    },
    {
        id: 5,
        title: "Intellectual Property",
        content: `All course content, including but not limited to videos, PDFs, charts, strategies, written materials, and branding, is the exclusive intellectual property of Trader Nation. You are granted a limited, non-exclusive, non-transferable license to access and view the content for personal, non-commercial educational purposes only. Reproduction, redistribution, resale, or public display of any course material is strictly prohibited.`
    },
    {
        id: 6,
        title: "Trading Risk Disclaimer",
        content: `Trading in Forex, indices, and commodities involves substantial risk of loss and is not suitable for all investors. The educational content provided by Trader Nation is for informational and educational purposes only and does not constitute financial or investment advice. Past performance of any trading strategy discussed in our courses does not guarantee future results. You trade entirely at your own risk.`
    },
    {
        id: 7,
        title: "Community & Conduct",
        content: `Access to our private Discord community is a privilege extended to enrolled students. Members are expected to engage respectfully and professionally. Any form of harassment, spam, sharing of illegal content, or promotion of third-party services without permission will result in immediate removal from the community and potential revocation of course access without refund.`
    },
    {
        id: 8,
        title: "Limitation of Liability",
        content: `To the fullest extent permitted by applicable law, Trader Nation and its affiliates, instructors, and staff shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our platform or trading decisions made based on our educational content. Our total liability in any circumstance shall not exceed the amount you paid for the course in question.`
    },
    {
        id: 9,
        title: "Modifications to Terms",
        content: `Trader Nation reserves the right to update or modify these Terms and Conditions at any time. Any changes will be posted on this page with an updated effective date. Continued use of our platform following any changes constitutes your acceptance of the revised terms. We encourage you to review this page periodically.`
    },
    {
        id: 10,
        title: "Governing Law",
        content: `These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts located in India. If any provision of these terms is found to be unenforceable, the remaining provisions shall continue in full force and effect.`
    },
];

const TermsAndCondition = () => {
    const { colors, theme } = useTheme();
    const isDark = theme === 'dark';
    const [activeId, setActiveId] = useState(null);

    return (
        <div
            className={`py-25 px-4 min-h-screen ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
            style={{ backgroundColor: colors.background }}
        >
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className={`text-3xl md:text-3xl font-black uppercase tracking-widest  mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Terms & Conditions
                    </h1>
                    <p className="opacity-60 text-xs">Last Updated: February 2026</p>
                </div>

                {/* Intro Banner */}
                <div className={`mb-8 px-6 py-4 rounded-2xl border-l-4 border-blue-500 text-sm leading-relaxed ${isDark ? 'bg-blue-500/5 border border-white/5 border-l-blue-500' : 'bg-blue-50 border border-blue-100 border-l-blue-500'}`}>
                    Please read these Terms and Conditions carefully before enrolling in any Trader Nation course or using our platform. By accessing our services, you agree to be legally bound by the terms outlined below.
                </div>

                {/* Sections Card */}
                <div className={`rounded-3xl border divide-y overflow-hidden ${isDark ? 'bg-white/5 border-white/10 divide-white/5' : 'bg-white border-gray-200 divide-gray-100'}`} style={{ boxShadow: 'none' }}>
                    {sections.map((section, idx) => {
                        const isActive = activeId === section.id;
                        return (
                            <div key={section.id}>
                                {/* Section Header — clickable */}
                                <button
                                    onClick={() => setActiveId(isActive ? null : section.id)}
                                    className={`w-full flex items-center justify-between gap-4 px-8 py-5 text-left transition-colors duration-200 ${isActive
                                        ? isDark ? 'bg-blue-500/10' : 'bg-blue-50'
                                        : isDark ? 'hover:bg-white/3' : 'hover:bg-gray-50'
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <span className={`shrink-0 text-xs font-black w-7 h-7 rounded-lg flex items-center justify-center ${isActive
                                            ? 'bg-blue-600 text-white'
                                            : isDark ? 'bg-white/10 text-gray-400' : 'bg-gray-100 text-gray-500'
                                            }`}>
                                            {String(idx + 1).padStart(2, '0')}
                                        </span>
                                        <span className={`font-bold text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                            {section.title}
                                        </span>
                                    </div>
                                    <ChevronRight
                                        size={16}
                                        className={`shrink-0 transition-transform duration-300 ${isActive
                                            ? 'rotate-90 text-blue-500'
                                            : isDark ? 'text-gray-500' : 'text-gray-400'
                                            }`}
                                    />
                                </button>

                                {/* Section Body */}
                                {isActive && (
                                    <div className={`px-8 pb-6 pt-1 text-sm leading-7 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                        <div className={`border-t pt-4 ${isDark ? 'border-white/5' : 'border-gray-100'}`}>
                                            {section.content}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Footer Note */}
                <div className={`mt-10 p-6 rounded-2xl text-center border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'}`} style={{ boxShadow: 'none' }}>
                    <p className={`text-sm font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Questions about our Terms?
                    </p>
                    <p className={`text-xs mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        If you have any questions or concerns about these Terms and Conditions, please don't hesitate to contact us.
                    </p>
                    <a
                        href="mailto:Tradersnationacadamy@gmail.com"
                        className="group relative inline-flex items-center h-11 pl-6 pr-1.5 rounded-full transition-all duration-500 border bg-blue-600 border-white/10 hover:scale-105"
                    >
                        <span className=" uppercase tracking-[2px] text-xs font-bold mr-4 text-white">
                            Contact Us
                        </span>
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white transition-transform duration-500 group-hover:rotate-45">
                            <ArrowUpRight size={16} strokeWidth={2.5} />
                        </div>
                    </a>
                </div>

            </div>
        </div>
    );
};

export default TermsAndCondition;
