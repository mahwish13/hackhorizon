import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';

const sellerNav = [
  { label: "Overview", icon: "▦", path: "/seller/dashboard" },
  { label: "My Invoices", icon: "⊞", path: "/seller/invoices" },
  { label: "Upload Invoice", icon: "+", path: "/seller/upload" },
  { label: "Requests", icon: "↩", path: "/seller/requests" },
  { label: "GST Summary", icon: "∑", path: "/seller/gst" },
  { label: "Payments", icon: "₹", path: "/seller/payments" }
];

const buyerNav = [
  { label: "Overview", icon: "▦", path: "/buyer/dashboard" },
  { label: "Received Invoices", icon: "⊞", path: "/buyer/invoices" },
  { label: "Request Invoice", icon: "↩", path: "/buyer/requests" },
  { label: "GST Summary", icon: "∑", path: "/buyer/gst" }
];

export default function Sidebar({ role: overrideRole, isOpen, onClose }) {
  const { user, switchRole, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [switching, setSwitching] = useState(false);

  // default to seller if undefined
  const role = user?.role || 'seller';
  const navItems = role === 'seller' ? sellerNav : buyerNav;

  const handleSwitchRole = async () => {
    setSwitching(true);
    try {
      const newRole = role === 'seller' ? 'buyer' : 'seller';
      // Assume API endpoint accepts { role } indicating which role to switch to, 
      // regenerating the token under the new role context.
      const res = await api.post('/auth/switch-role', { role: newRole });
      const { token } = res.data.data;
      
      switchRole(token, newRole);
      navigate(`/${newRole}/dashboard`, { replace: true });
    } catch (err) {
      console.error('Failed to switch role', err);
    } finally {
      setSwitching(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div className={`w-[240px] flex-shrink-0 flex flex-col bg-dark border-r border-card/40 shadow-2xl z-40 transition-transform duration-300 h-full fixed md:relative inset-y-0 left-0 md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      
      {/* Top Section - Branding */}
      <div className="p-6 border-b border-white/10 flex flex-col gap-4 relative">
        {/* Mobile Close Button */}
        {isOpen && (
          <button 
            onClick={onClose}
            className="md:hidden absolute top-4 right-4 text-secondary hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-sm shadow-inner">
            IS
          </div>
          <span className="text-white font-bold tracking-wide text-lg" style={{ fontFamily: 'Plus Jakarta Sans' }}>
            InvoiceSync
          </span>
        </div>
        
        {/* Role Badge */}
        <div className="bg-primary/20 border border-primary/20 text-primary text-xs font-semibold px-3 py-1.5 rounded-full w-max tracking-wider uppercase shadow-sm">
          {role === 'seller' ? 'Seller Dashboard' : 'Buyer Dashboard'}
        </div>
      </div>

      {/* Navigation Map */}
      <nav className="mt-6 flex flex-col gap-1.5 px-3 flex-1 overflow-y-auto custom-scrollbar pb-6">
        {navItems.map((item) => {
          // Exact match or sub-route mapping
          const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive 
                  ? 'bg-primary/20 text-white border-l-2 border-primary shadow-sm' 
                  : 'text-secondary hover:bg-white/5 hover:text-white border-l-2 border-transparent'
              }`}
            >
              <span className={`text-base w-5 text-center transition-transform duration-200 ${isActive ? 'scale-110 font-black' : 'font-bold group-hover:scale-110'}`}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section - User & Actions */}
      <div className="mt-auto p-4 border-t border-white/10 bg-dark/50">
        
        {/* Compact Profile Block */}
        {user && (
          <div className="flex items-center gap-3 mb-4 px-1 group cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-primary/30 flex-shrink-0 flex items-center justify-center text-primary font-bold text-xs ring-2 ring-transparent group-hover:ring-primary/40 transition-all shadow-inner" style={{ fontFamily: 'Plus Jakarta Sans' }}>
              {getInitials(user.name)}
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-bold text-white truncate" style={{ fontFamily: 'Plus Jakarta Sans' }}>{user.name}</span>
              <span className="text-[10px] text-secondary truncate font-medium">{user.email}</span>
            </div>
          </div>
        )}

        {/* Function Controllers */}
        <div className="flex flex-col gap-2">
          <button 
            onClick={handleSwitchRole}
            disabled={switching}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 text-xs font-semibold uppercase tracking-wider text-secondary hover:bg-primary/20 hover:text-white hover:border-primary/40 transition-all flex justify-center items-center gap-2 group disabled:opacity-50"
          >
            {switching ? (
              <span className="animate-spin w-3 h-3 border-2 border-white/50 border-t-white rounded-full" />
            ) : (
               <svg className="w-3.5 h-3.5 text-secondary group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            )}
            {switching ? 'Translating...' : `Switch to ${role === 'seller' ? 'Buyer' : 'Seller'}`}
          </button>

          <button 
            onClick={handleLogout}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 text-xs font-semibold uppercase tracking-wider text-secondary hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
