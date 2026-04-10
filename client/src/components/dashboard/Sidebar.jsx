import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const navByRole = {
  seller: [{ label: 'Overview', icon: '•', path: '/seller-dashboard' }],
  buyer: [{ label: 'Overview', icon: '•', path: '/buyer-dashboard' }],
};

export default function Sidebar({ isOpen, onClose }) {
  const { user, switchRole, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [switching, setSwitching] = useState(false);

  const role = user?.role || 'seller';
  const navItems = navByRole[role];

  const handleSwitchRole = async () => {
    setSwitching(true);
    try {
      const nextRole = role === 'seller' ? 'buyer' : 'seller';
      await switchRole(nextRole);
      navigate(nextRole === 'buyer' ? '/buyer-dashboard' : '/seller-dashboard', { replace: true });
    } catch (err) {
      console.error('Failed to switch role', err);
    } finally {
      setSwitching(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();
  };

  return (
    <div className={`fixed inset-y-0 left-0 z-40 flex h-full w-[252px] flex-shrink-0 flex-col border-r border-card/40 bg-dark shadow-2xl transition-transform duration-300 md:relative md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="relative border-b border-white/10 p-6">
        {isOpen ? (
          <button onClick={onClose} className="absolute right-4 top-4 rounded-lg p-1 text-secondary transition hover:text-white md:hidden">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        ) : null}

        <div className="flex cursor-pointer items-center gap-3" onClick={() => navigate('/')}>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-sm font-bold text-white shadow-inner">
            IS
          </div>
          <div>
            <span className="font-heading block text-lg font-bold text-white">InvoiceSync</span>
            <span className="text-[11px] uppercase tracking-[0.22em] text-secondary">Finance workspace</span>
          </div>
        </div>

        <div className="mt-5 w-fit rounded-full border border-primary/30 bg-primary/20 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
          {role === 'seller' ? 'Seller dashboard' : 'Buyer dashboard'}
        </div>
      </div>

      <nav className="flex-1 space-y-2 px-4 py-6">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                isActive ? 'border border-primary/30 bg-primary/20 text-white' : 'text-secondary hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-4">
        {user ? (
          <div className="mb-4 flex items-center gap-3 rounded-2xl bg-white/5 px-3 py-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/30 text-xs font-bold text-primary">
              {getInitials(user.name)}
            </div>
            <div className="min-w-0">
              <p className="truncate font-heading text-sm font-bold text-white">{user.name}</p>
              <p className="truncate text-xs text-secondary">{user.email}</p>
            </div>
          </div>
        ) : null}

        <div className="space-y-2">
          <button
            onClick={handleSwitchRole}
            disabled={switching}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-secondary transition hover:border-primary/30 hover:bg-primary/20 hover:text-white disabled:opacity-60"
          >
            {switching ? 'Switching...' : `Switch to ${role === 'seller' ? 'Buyer' : 'Seller'}`}
          </button>
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-secondary transition hover:border-red-500/25 hover:bg-red-500/10 hover:text-red-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
