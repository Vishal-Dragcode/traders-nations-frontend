import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { API_URL } from "../../../config";

function AdminSidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [counts, setCounts] = useState({
        registration: 0,
        review: 0,
        contact: 0
    });

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const [regRes, revRes, conRes] = await Promise.all([
                    fetch(`${API_URL}/api/enroll`),
                    fetch(`${API_URL}/api/reviews`),
                    fetch(`${API_URL}/api/contact`)
                ]);

                const [regData, revData, conData] = await Promise.all([
                    regRes.json(),
                    revRes.json(),
                    conRes.json()
                ]);

                setCounts({
                    registration: regData.success ? regData.data.length : 0,
                    review: revData.success ? revData.data.length : 0,
                    contact: conData.success ? conData.data.length : 0
                });
            } catch (error) {
                console.error("Sidebar Sync Failed:", error);
            }
        };

        fetchCounts();
        const interval = setInterval(fetchCounts, 30000);
        return () => clearInterval(interval);
    }, []);

    const navItems = [
        {
            id: "dashboard",
            title: "Dashboard",
            desc: "Overview & stats",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={16} height={16}>
                    <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" />
                    <rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
                </svg>
            ),
        },
        {
            id: "registration",
            title: "Registration",
            desc: "User sign-ups",
            badge: counts.registration,
            badgeRed: counts.registration > 0,
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={16} height={16}>
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
            ),
        },
        {
            id: "review",
            title: "Review",
            desc: "Pending approvals",
            badge: counts.review,
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={16} height={16}>
                    <path d="M9 11l3 3L22 4" />
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                </svg>
            ),
        },
        {
            id: "contact",
            title: "Contact",
            desc: "Messages & queries",
            badge: counts.contact,
            badgeRed: counts.contact > 0,
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={16} height={16}>
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.14 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.05 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 17z" />
                </svg>
            ),
        },
        {
            id: "event-register",
            title: "Event Register",
            desc: "Manage live events",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={16} height={16}>
                    <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
            ),
        },
    ];

    // Direct path matching to ensure "proper" active state on every render
    const getActiveTab = () => {
        const path = location.pathname;
        const normalizedPath = path.endsWith('/') ? path.slice(0, -1) : path;
        
        if (normalizedPath === '/admin' || normalizedPath === '/admin/dashboard') {
            return 'dashboard';
        }

        const segments = normalizedPath.split('/').filter(Boolean);
        const lastPart = segments[segments.length - 1];

        const match = navItems.find(item => item.id === lastPart);
        return match ? match.id : 'dashboard';
    };

    const active = getActiveTab();

    const handleNavClick = (id) => {
        navigate(`/admin/${id}`);
    };

    return (
        <aside style={{
            width: 240, height: "100vh", background: "#0a0f1c",
            display: "flex", flexDirection: "column", position: "relative",
            fontFamily: "'DM Sans', sans-serif",
            boxShadow: "none",
            border: "none",
        }}>

            <div style={{ height: "68px", padding: "0 24px", display: "flex", alignItems: "center", gap: 12, position: "relative" }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: "linear-gradient(135deg,#1d4ed8,#0891b2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 0 15px rgba(59,130,246,0.3)" }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <rect x="4" y="10" width="3" height="8" rx="1" fill="white" opacity="0.9" />
                        <rect x="4" y="7" width="3" height="2" rx="0.5" fill="white" opacity="0.5" />
                        <rect x="10.5" y="5" width="3" height="13" rx="1" fill="white" />
                        <rect x="17" y="8" width="3" height="7" rx="1" fill="white" opacity="0.9" />
                        <rect x="17" y="16" width="3" height="2" rx="0.5" fill="white" opacity="0.5" />
                        <polyline points="5.5,14 12,8 18.5,11" stroke="rgba(147,210,255,0.7)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                    </svg>
                </div>
                <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
                    <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: "1px", color: "#f0f6ff", textTransform: "uppercase" }}>Trader <span style={{ color: "#3b82f6" }}>Nation</span></span>
                    <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: "2px", color: "#475569", textTransform: "uppercase", marginTop: 2 }}>Admin Portal</span>
                </div>
            </div>

            <nav style={{ padding: "20px 12px 8px", flex: 1 }}>
                <div style={{ fontSize: 9, fontWeight: 500, letterSpacing: 3, textTransform: "uppercase", color: "#334155", padding: "0 8px", marginBottom: 6 }}>Main Menu</div>

                {navItems.map((item) => {
                    const isActive = active === item.id;
                    return (
                        <div key={item.id} onClick={() => handleNavClick(item.id)} style={{
                            display: "flex", alignItems: "center", gap: 11,
                            padding: "10px 12px", borderRadius: 10, cursor: "pointer",
                            marginBottom: 4, position: "relative",
                            background: isActive 
                                ? "rgba(59,130,246,0.12)" 
                                : "transparent",
                            border: `1px solid ${isActive ? 'rgba(59,130,246,0.2)' : 'transparent'}`,
                            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}>
                            {isActive && <div style={{ position: "absolute", left: -12, top: "50%", transform: "translateY(-50%)", width: 4, height: 20, background: "#3b82f6", borderRadius: "0 4px 4px 0", boxShadow: "0 0 10px rgba(59,130,246,0.5)" }} />}
                            <div style={{ 
                                width: 34, height: 34, borderRadius: 8, 
                                display: "flex", alignItems: "center", justifyContent: "center", 
                                flexShrink: 0, 
                                background: isActive ? "linear-gradient(135deg, #1e40af, #1d4ed8)" : "rgba(255,255,255,0.03)", 
                                color: isActive ? "#fff" : "#64748b",
                                boxShadow: isActive ? "0 4px 12px -2px rgba(59,130,246,0.4)" : "none",
                                transition: "all 0.2s"
                            }}>
                                {item.icon}
                            </div>
                            <div style={{ flex: 1, lineHeight: 1.2 }}>
                                <div style={{ fontSize: 13, fontWeight: isActive ? 700 : 500, color: isActive ? "#f8fafc" : "#94a3b8", transition: "color 0.2s" }}>{item.title}</div>
                                <div style={{ fontSize: 10, color: isActive ? "#60a5fa" : "#475569", marginTop: 1, fontWeight: isActive ? 600 : 400 }}>{item.desc}</div>
                            </div>
                            {item.badge && (
                                <span style={{
                                    background: item.badgeRed ? "rgba(239,68,68,0.15)" : "rgba(59,130,246,0.2)",
                                    color: item.badgeRed ? "#f87171" : "#60a5fa",
                                    border: `1px solid ${item.badgeRed ? "rgba(239,68,68,0.25)" : "rgba(59,130,246,0.25)"}`,
                                    fontSize: 9, fontWeight: 600, padding: "2px 7px", borderRadius: 20,
                                }}>{item.badge}</span>
                            )}
                        </div>
                    );
                })}
            </nav>
        </aside>
    );
}

export default AdminSidebar;
