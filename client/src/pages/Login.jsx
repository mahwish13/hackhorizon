import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function Login() {
  const [activeRole, setActiveRole] = useState('seller');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await api.post('/auth/login', { email, password });
      
      const { user, token } = res.data.data;

      // Log the user in context
      login(user, token);

      // Navigate based on their actual role retrieved from the DB, ensuring correct dashboard is shown
      navigate(`/${user.role}/dashboard`, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden relative">
      
      {/* Left half - Branding & Visuals (Hidden on small mobile logic conditionally via flex-col stacking) */}
      <div className="hidden md:flex w-1/2 bg-dark items-center justify-center p-16 relative">
        {/* Absolute Logo */}
        <div className="absolute top-10 left-10 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-sm">
            IS
          </div>
          <span className="text-white font-bold tracking-wide" style={{ fontFamily: 'Plus Jakarta Sans' }}>InvoiceSync</span>
        </div>

        {/* Center Canvas */}
        <div className="w-full max-w-sm">
          <h1 className="text-4xl font-bold text-white mb-2" style={{ fontFamily: 'Plus Jakarta Sans' }}>Welcome back</h1>
          <p className="text-sm text-secondary" style={{ fontFamily: 'Inter' }}>Log in to manage your invoices</p>

          {/* Decorative Card Stack */}
          <div className="mt-16 relative h-[200px] w-full">
            {/* Card 1 (Bottom) */}
            <div className="absolute top-12 left-12 right-0 h-32 bg-primary/10 border border-primary/20 rounded-2xl transform origin-bottom-right rotate-6 scale-95" />
            
            {/* Card 2 (Middle) */}
            <div className="absolute top-6 left-6 right-6 h-32 bg-primary/20 border border-primary/30 rounded-2xl transform origin-bottom-right rotate-3 scale-100" />
            
            {/* Card 3 (Top) */}
            <div className="absolute top-0 left-0 right-12 h-36 bg-white/10 border border-white/20 rounded-2xl p-5 shadow-2xl backdrop-blur-md flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className="text-white/80 font-mono text-sm font-medium tracking-wider">INV-2024-001</span>
                <span className="bg-[#28C840]/20 text-[#28C840] border border-[#28C840]/30 text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded shadow-sm">
                  Accepted
                </span>
              </div>
              <div className="mt-4">
                <div className="text-[10px] uppercase tracking-widest text-white/50 mb-1 font-semibold">Total Amount</div>
                <div className="text-4xl font-extrabold text-white tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans' }}>₹24,500</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right half - Form Area */}
      <div className="flex-1 bg-bg flex flex-col items-center justify-center p-6 sm:p-12 min-h-screen md:min-h-0">
        
        {/* Mobile Header Logo fallback */}
        <div className="md:hidden flex items-center gap-2 mb-10 w-full max-w-md justify-center">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-sm shadow-md">
            IS
          </div>
          <span className="text-dark font-extrabold text-xl tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans' }}>InvoiceSync</span>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl shadow-primary/5 max-w-md w-full border border-card/40 relative">
          
          {/* Role Tabs */}
          <div className="flex w-full bg-bg/80 rounded-xl p-1 mb-8 border border-card/60">
            <button
              type="button"
              onClick={() => setActiveRole('seller')}
              className={`flex-1 text-center py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                activeRole === 'seller' ? 'bg-dark text-white shadow-md' : 'text-secondary hover:text-dark'
              }`}
            >
              Login as Seller
            </button>
            <button
              type="button"
              onClick={() => setActiveRole('buyer')}
              className={`flex-1 text-center py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                activeRole === 'buyer' ? 'bg-dark text-white shadow-md' : 'text-secondary hover:text-dark'
              }`}
            >
              Login as Buyer
            </button>
          </div>

          <h2 className="font-bold text-2xl text-dark" style={{ fontFamily: 'Plus Jakarta Sans' }}>
            Sign in as {activeRole === 'seller' ? 'Seller' : 'Buyer'}
          </h2>
          <p className="text-xs sm:text-sm text-secondary mt-2 mb-8 leading-relaxed" style={{ fontFamily: 'Inter' }}>
            {activeRole === 'seller' 
              ? 'Access your invoice dashboard and track payments' 
              : 'Review and validate invoices from your suppliers'}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email */}
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

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold text-dark uppercase tracking-wider">Password</label>
                <Link to="/forgot-password" className="text-xs font-semibold text-primary hover:text-dark transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
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
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  )}
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
                {isLoading ? (
                  <>
                    <span className="animate-spin border-2 border-white/80 border-t-transparent rounded-full w-4 h-4 inline-block" />
                    Authenticating...
                  </>
                ) : (
                  `Sign in as ${activeRole === 'seller' ? 'Seller' : 'Buyer'}`
                )}
              </span>
            </button>
          </form>

          {/* Divider */}
          <div className="mt-8 flex items-center gap-4">
            <hr className="flex-1 border-card" />
            <span className="text-xs text-secondary/80 font-bold uppercase tracking-wider">or</span>
            <hr className="flex-1 border-card" />
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-secondary font-medium">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary font-bold hover:text-dark transition-colors border-b-2 border-primary/20 hover:border-dark pb-0.5 ml-1">
                Register here
              </Link>
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
