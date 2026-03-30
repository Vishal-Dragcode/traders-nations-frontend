import { Navigate } from "react-router-dom";

/**
 * ProtectedRoute - Blocks access to admin routes if not authenticated.
 * Checks for a 'token' in localStorage. If missing, redirects to /admin/login.
 */
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
