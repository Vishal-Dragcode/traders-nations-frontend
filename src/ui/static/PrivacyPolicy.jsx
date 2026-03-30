import React from 'react';
import { useTheme } from '../../settings/ThemeContext';
import { Shield } from 'lucide-react';

const PrivacyPolicy = () => {
    const { colors, theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <div className={`py-25 px-4 min-h-screen ${isDark ? 'text-gray-300' : 'text-gray-700'}`} style={{ backgroundColor: colors.background }}>
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className={`text-3xl md:text-3xl font-black uppercase tracking-widest  mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Privacy Policy
                    </h1>
                    <p className="opacity-70 text-xs">Last Updated: February 2026</p>
                </div>

                <div className={`p-8 md:p-12 rounded-3xl border space-y-8 ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'}`} style={{ boxShadow: 'none' }}>
                    <section>
                        <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>1. Introduction</h2>
                        <p>
                            Welcome to Trader Nation. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
                        </p>
                    </section>

                    <section>
                        <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>2. Data We Collect</h2>
                        <p>
                            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
                        </p>
                        <ul className="list-disc pl-6 mt-4 space-y-2">
                            <li>Identity Data includes first name, maiden name, last name, username or similar identifier.</li>
                            <li>Contact Data includes billing address, delivery email address and telephone numbers.</li>
                            <li>Financial Data includes bank account and payment card details.</li>
                            <li>Transaction Data includes details about payments to and from you and other details of products and services you have purchased from us.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>3. How We Use Your Data</h2>
                        <p>
                            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                        </p>
                        <ul className="list-disc pl-6 mt-4 space-y-2">
                            <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                            <li>Where we need to comply with a legal or regulatory obligation.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>4. Create Your Own</h2>
                        <p>
                            This is a sample privacy policy for demonstration purposes. In a real application, you would include your specific legal terms here.
                        </p>
                    </section>
                </div>

                {/* Footer Note */}
                <div className={`mt-10 p-6 rounded-2xl text-center border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'}`} style={{ boxShadow: 'none' }}>
                    <p className={`text-sm font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Questions about our Privacy?
                    </p>
                    <p className={`text-xs mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        If you have any questions or concern about our Privacy Policy, please don't hesitate to reach out.
                    </p>
                    <a
                        href="mailto:Tradersnationacadamy@gmail.com"
                        className="group relative inline-flex items-center h-11 pl-6 pr-1.5 rounded-full transition-all duration-500 border bg-blue-600 border-white/10 hover:scale-105"
                    >
                        <span className=" uppercase tracking-[2px] text-xs font-bold mr-4 text-white">
                            Contact Us
                        </span>
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white transition-transform duration-500 group-hover:rotate-45">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="7" y1="17" x2="17" y2="7" />
                                <polyline points="7 7 17 7 17 17" />
                            </svg>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
