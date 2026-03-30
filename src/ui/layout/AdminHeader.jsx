import { LogOut, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AdminHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin_email");
    navigate("/admin/login");
  };

  return (
    <header style={{
      background: "linear-gradient(135deg, #0a0f1c 0%, #111827 60%, #0d1a2e 100%)",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      padding: "0 32px",
      height: "68px",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      position: "relative",
      boxShadow: "0 4px 32px rgba(0,0,0,0.5)",
      fontFamily: "'DM Sans', sans-serif",
    }}>

      {/* Top glow line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "2px",
        background: "linear-gradient(90deg, transparent 0%, #3b82f6 30%, #06b6d4 60%, transparent 100%)",
      }} />


      {/* Right controls - ONLY Logout as requested */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <button 
          onClick={handleLogout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(220, 38, 38, 0.15))",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            color: "#f87171",
            padding: "10px 20px",
            borderRadius: "14px",
            fontSize: "12px",
            fontWeight: "800",
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            cursor: "pointer",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow: "0 4px 12px rgba(239, 68, 68, 0.1)",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "linear-gradient(135deg, rgba(239, 68, 68, 0.25), rgba(220, 38, 38, 0.25))";
            e.currentTarget.style.border = "1px solid rgba(239, 68, 68, 0.5)";
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(239, 68, 68, 0.2)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(220, 38, 38, 0.15))";
            e.currentTarget.style.border = "1px solid rgba(239, 68, 68, 0.3)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(239, 68, 68, 0.1)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <LogOut size={18} strokeWidth={2.5} />
        </button>
      </div>
    </header>
  );
}

export default AdminHeader;
