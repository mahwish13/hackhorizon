import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OAuthCallback from "./pages/OAuthCallback";
import SellerDashboard from "./pages/SellerDashboard";
import BuyerDashboard from "./pages/BuyerDashboard";

function ProtectedRoute({ children, role }) {
  const { user, token } = useAuth();

  // If unauthenticated, redirect to login page
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated but trying to access the wrong role dashboard, bounce back
  if (user.role !== role) {
    return <Navigate to={user.role === "seller" ? "/seller/dashboard" : "/buyer/dashboard"} replace />;
  }

  // Identity verification passed, mount dashboard scope
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Views */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signup" element={<Navigate to="/register" replace />} />
          <Route path="/oauth/callback" element={<OAuthCallback />} />

          {/* Secure Seller Topology */}
          <Route 
            path="/seller/dashboard" 
            element={
              <ProtectedRoute role="seller">
                <SellerDashboard />
              </ProtectedRoute>
            } 
          />

          {/* Secure Buyer Topology */}
          <Route 
            path="/buyer/dashboard" 
            element={
              <ProtectedRoute role="buyer">
                <BuyerDashboard />
              </ProtectedRoute>
            } 
          />

          {/* Global Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}