import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { KeyRound, ShieldCheck, ArrowRight, RefreshCcw } from 'lucide-react';
import { API_URL } from "../../config";

const AdminVerifyOTP = () => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const navigate = useNavigate();

    const handleChange = (e, index) => {
        const val = e.target.value;
        if (isNaN(val)) return;
        const newOtp = [...otp];
        newOtp[index] = val.slice(-1);
        setOtp(newOtp);
        if (val && index < 5) {
            document.getElementById(`otp-${index + 1}`).focus();
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        const email = localStorage.getItem('admin_email');
        const otpCode = otp.join('');
        
        try {
            const response = await fetch(`${API_URL}/api/admin/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email?.toLowerCase(), otp: otpCode })
            });
            const result = await response.json();
            
            if (result.success) {
                localStorage.setItem('token', result.token);
                localStorage.removeItem('admin_email'); // cleanup temp storage
                navigate('/admin/dashboard');
            } else {
                alert(result.error || 'Verification failed');
            }
        } catch (error) {
            alert('Verification server error');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4" style={{ background: '#0d0d0d' }}>
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative w-full max-w-md">
                {/* Logo Area */}
                <div className="flex flex-col items-center mb-5 text-center">
                    <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-cyan-600 to-blue-500 flex items-center justify-center mb-3 shadow-[0_0_30px_rgba(8,145,178,0.4)]">
                        <KeyRound size={24} className="text-white" />
                    </div>
                    <h2 className="text-2xl font-black uppercase tracking-widest text-white mb-1">
                        Verification
                    </h2>
                    <p className="text-sm font-medium text-slate-500 uppercase tracking-[3px]">
                        Dynamic Secure Login
                    </p>
                </div>

                {/* OTP Card */}
                <div className="bg-slate-900/40 backdrop-blur-3xl border border-white/5 p-6 rounded-3xl shadow-2xl">
                    <form onSubmit={handleVerifyOTP} className="space-y-5">
                        <div className="text-center mb-2">
                            <p className="text-sm font-medium text-slate-400">
                                Enter the 4-digit code sent to your <br /> secondary secure device.
                            </p>
                        </div>

                        <div className="flex justify-center gap-2">
                            {otp.map((digit, i) => (
                                <input
                                    key={i}
                                    id={`otp-${i}`}
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(e, i)}
                                    className="w-12 h-16 text-center text-3xl font-black text-white bg-white/5 border border-white/10 rounded-xl outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]"
                                />
                            ))}
                        </div>

                        <button
                            type="submit"
                            className="group relative w-full h-14 bg-linear-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-black text-xs uppercase tracking-[2px] rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden shadow-lg"
                        >
                            <span className="relative z-10">Verify Access Card</span>
                            <ShieldCheck size={18} className="relative z-10 group-hover:scale-110 transition-transform" />
                            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        </button>

                        <div className="text-center">
                            <button
                                type="button"
                                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors group"
                            >
                                <RefreshCcw size={14} className="group-hover:rotate-180 transition-transform duration-500" />
                                Resend New Code
                            </button>
                        </div>
                    </form>
                </div>

                <p className="mt-4 text-center text-xs font-medium text-slate-600">
                    Session expires in <span className="text-cyan-500">2:00</span> minutes. <br />
                    System ID: <span className="text-slate-700">TN-SEC-8921-X</span>
                </p>
            </div>
        </div>
    );
};

export default AdminVerifyOTP;
