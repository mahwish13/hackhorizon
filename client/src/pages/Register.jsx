import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [activeRole, setActiveRole] = useState('seller');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gstin, setGstin] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleGoogleSignup = () => {
    setError('');
    setIsGoogleLoading(true);
    const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    window.location.href = `${apiBaseUrl}/auth/google`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await api.post('/auth/register', {
        name,
        email,
        password,
        role: activeRole,
        gstin,
      });

      const { user, token } = res.data.data;
      login(user, token);
      navigate(`/${user.role}/dashboard`, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to create account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden relative">
      <div className="hidden md:flex w-1/2 bg-dark items-center justify-center p-16 relative">
        <div className="absolute top-10 left-10 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-sm">
            IS
          </div>
          <span className="text-white font-bold tracking-wide" style={{ fontFamily: 'Plus Jakarta Sans' }}>InvoiceSync</span>
        </div>

        <div className="w-full max-w-sm">
          <h1 className="text-4xl font-bold text-white mb-2" style={{ fontFamily: 'Plus Jakarta Sans' }}>Create your account</h1>
          <p className="text-sm text-secondary" style={{ fontFamily: 'Inter' }}>Set up your buyer or seller workspace</p>

          <div className="mt-16 relative h-50 w-full">
            <div className="absolute top-12 left-12 right-0 h-32 bg-primary/10 border border-primary/20 rounded-2xl transform origin-bottom-right rotate-6 scale-95" />
            <div className="absolute top-6 left-6 right-6 h-32 bg-primary/20 border border-primary/30 rounded-2xl transform origin-bottom-right rotate-3 scale-100" />
            <div className="absolute top-0 left-0 right-12 h-36 bg-white/10 border border-white/20 rounded-2xl p-5 shadow-2xl backdrop-blur-md flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className="text-white/80 font-mono text-sm font-medium tracking-wider">INV-START</span>
                <span className="bg-[#28C840]/20 text-[#28C840] border border-[#28C840]/30 text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded shadow-sm">
                  Ready
                </span>
              </div>
              <div className="mt-4">
                <div className="text-[10px] uppercase tracking-widest text-white/50 mb-1 font-semibold">Instant Access</div>
                <div className="text-4xl font-extrabold text-white tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans' }}>₹0</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-bg flex flex-col items-center justify-center p-6 sm:p-12 min-h-screen md:min-h-0">
        <div className="md:hidden flex items-center gap-2 mb-10 w-full max-w-md justify-center">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-sm shadow-md">
            IS
          </div>
          <span className="text-dark font-extrabold text-xl tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans' }}>InvoiceSync</span>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl shadow-primary/5 max-w-md w-full border border-card/40 relative">
          <div className="flex w-full bg-bg/80 rounded-xl p-1 mb-8 border border-card/60">
            <button
              type="button"
              onClick={() => setActiveRole('seller')}
              className={`flex-1 text-center py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                activeRole === 'seller' ? 'bg-dark text-white shadow-md' : 'text-secondary hover:text-dark'
              }`}
            >
              Seller
            </button>
            <button
              type="button"
              onClick={() => setActiveRole('buyer')}
              className={`flex-1 text-center py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                activeRole === 'buyer' ? 'bg-dark text-white shadow-md' : 'text-secondary hover:text-dark'
              }`}
            >
              Buyer
            </button>
          </div>

          <h2 className="font-bold text-2xl text-dark" style={{ fontFamily: 'Plus Jakarta Sans' }}>
            Create a {activeRole === 'seller' ? 'Seller' : 'Buyer'} account
          </h2>
          <p className="text-xs sm:text-sm text-secondary mt-2 mb-8 leading-relaxed" style={{ fontFamily: 'Inter' }}>
            Start with your email, password, and GSTIN to unlock the dashboard.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-2">Full name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full bg-bg border border-card/60 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-medium text-dark placeholder-secondary/60"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-2">Email address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full bg-bg border border-card/60 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-medium text-dark placeholder-secondary/60"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-2">GSTIN</label>
              <input
                type="text"
                required
                value={gstin}
                onChange={(e) => setGstin(e.target.value.toUpperCase())}
                placeholder="27AAPFU0939F1ZV"
                className="w-full bg-bg border border-card/60 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-medium text-dark placeholder-secondary/60 tracking-wider"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-bg border border-card/60 rounded-xl pl-4 pr-12 py-3.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-medium text-dark placeholder-secondary/60 tracking-wider"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary hover:text-dark transition-colors p-1"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-medium px-4 py-3 rounded-xl mt-1 animate-fadeIn">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-dark text-white rounded-xl py-3.5 font-bold mt-2 hover:bg-primary transition-all duration-300 flex items-center justify-center disabled:opacity-80 disabled:cursor-not-allowed group relative overflow-hidden"
            >
              <div className={`absolute inset-0 bg-primary/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ${isLoading ? 'hidden' : ''}`} />
              <span className="relative z-10 flex items-center gap-2">
                {isLoading ? 'Creating account...' : 'Create account'}
              </span>
            </button>
          </form>

          <div className="mt-8 flex items-center gap-4">
            <hr className="flex-1 border-card" />
            <span className="text-xs text-secondary/80 font-bold uppercase tracking-wider">or</span>
            <hr className="flex-1 border-card" />
          </div>

          <button
            type="button"
            onClick={handleGoogleSignup}
            disabled={isLoading || isGoogleLoading}
            className="w-full mt-5 bg-white border border-card/70 text-dark rounded-xl py-3.5 font-semibold hover:bg-bg transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 48 48" aria-hidden="true">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.72 1.22 9.23 3.6l6.85-6.85C35.9 2.38 30.37 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.36 13.98 17.73 9.5 24 9.5z" />
              <path fill="#4285F4" d="M46.5 24.5c0-1.65-.15-3.23-.42-4.75H24v9h12.67c-.55 2.96-2.2 5.48-4.67 7.17l7.2 5.59C43.95 37.05 46.5 31.3 46.5 24.5z" />
              <path fill="#FBBC05" d="M10.54 28.59a14.5 14.5 0 010-9.18l-7.98-6.19A23.96 23.96 0 000 24c0 3.87.92 7.53 2.56 10.78l7.98-6.19z" />
              <path fill="#34A853" d="M24 48c6.37 0 11.72-2.1 15.63-5.7l-7.2-5.59c-2 1.34-4.57 2.14-8.43 2.14-6.27 0-11.64-4.48-13.46-10.41l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
            </svg>
            {isGoogleLoading ? 'Redirecting to Google...' : 'Continue with Google'}
          </button>

          <div className="text-center mt-6">
            <p className="text-sm text-secondary font-medium">
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-bold hover:text-dark transition-colors border-b-2 border-primary/20 hover:border-dark pb-0.5 ml-1">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}