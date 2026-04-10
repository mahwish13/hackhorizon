import { useAuth } from '../../context/AuthContext';

export default function TopBar({ title, onMenuClick }) {
  const { user } = useAuth();

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  // Maps correctly to: "Friday, 10 April 2026"
  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date());

  return (
    <div className="h-16 bg-bg border-b border-card flex items-center justify-between px-6 sticky top-0 z-30">
      
      {/* Left side - Dynamic Page Header */}
      <div className="flex items-center gap-3">
        <button 
          onClick={onMenuClick}
          className="md:hidden p-1.5 -ml-2 text-dark hover:bg-card/50 rounded-lg transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="flex flex-col justify-center">
          <h1 className="font-semibold text-lg text-dark leading-none pb-1" style={{ fontFamily: 'Plus Jakarta Sans' }}>
            {title || "Overview"}
          </h1>
        <p className="text-xs text-secondary font-medium tracking-wide">
          {formattedDate}
        </p>
      </div>
      </div>

      {/* Right side - Controls */}
      <div className="flex items-center gap-4">
        
        {/* Search */}
        <div className="relative hidden sm:block">
          <input
            type="text"
            placeholder="Search invoices..."
            className="bg-white border border-card rounded-xl px-4 py-2 pl-10 text-sm w-48 focus:w-56 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all duration-300 placeholder-secondary/60 text-dark font-medium shadow-sm"
          />
          <svg className="w-4 h-4 text-secondary absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Notification Bell */}
        <div className="relative w-9 h-9 bg-white border border-card rounded-xl flex items-center justify-center cursor-pointer hover:bg-card/30 hover:border-card/80 transition-colors shadow-sm group">
          <svg className="w-4 h-4 text-dark/80 group-hover:text-dark transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          {/* Unread dot */}
          <span className="w-2 h-2 bg-red-400 rounded-full absolute top-1.5 right-1.5 border border-white shadow-sm" />
        </div>

        {/* User Avatar */}
        <div 
          className="w-9 h-9 rounded-xl bg-primary flex flex-shrink-0 items-center justify-center font-bold text-xs text-white shadow-md border-2 border-transparent hover:border-primary/20 cursor-pointer transition-all" 
          style={{ fontFamily: 'Plus Jakarta Sans' }}
          title={user?.name || "User"}
        >
          {getInitials(user?.name)}
        </div>
        
      </div>
    </div>
  );
}
