import { useAuth } from '../../hooks/useAuth';

export default function TopBar({ title, onMenuClick }) {
  const { user } = useAuth();

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date());

  return (
    <div className="h-[64px] bg-[#080c0a] border-b border-[#111a15] flex items-center justify-between px-5 md:px-7 sticky top-0 z-30 flex-shrink-0">

      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-[#111a15] border border-[#243124] text-[#6b8f76] hover:text-white hover:bg-[#192319] transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div>
          <h1 className="font-bold text-[15px] text-white leading-none" style={{ fontFamily: 'Plus Jakarta Sans' }}>
            {title || 'Overview'}
          </h1>
          <p className="text-[11px] text-[#3d5945] font-medium mt-0.5 hidden sm:block">{formattedDate}</p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">

        {/* Search */}
        <div className="relative hidden sm:block">
          <input
            type="text"
            placeholder="Search invoices..."
            className="bg-[#111a15] border border-[#243124] rounded-xl px-4 py-2 pl-9 text-sm w-44 focus:w-52 focus:border-[#4ade80]/40 outline-none transition-all duration-300 text-white placeholder-[#3d5945] font-medium"
          />
          <svg className="w-3.5 h-3.5 text-[#3d5945] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Notification */}
        <div className="relative w-9 h-9 bg-[#111a15] border border-[#243124] rounded-xl flex items-center justify-center cursor-pointer hover:bg-[#192319] hover:border-[#2e4030] transition-all group">
          <svg className="w-4 h-4 text-[#6b8f76] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="w-2 h-2 bg-red-400 rounded-full absolute top-1.5 right-1.5 border border-[#080c0a]" />
        </div>

        {/* Avatar */}
        <div
          className="w-9 h-9 rounded-xl bg-[#4ade80]/15 border border-[#4ade80]/20 flex flex-shrink-0 items-center justify-center font-bold text-xs text-[#4ade80] cursor-pointer hover:bg-[#4ade80]/25 transition-all"
          style={{ fontFamily: 'Plus Jakarta Sans' }}
          title={user?.name || 'User'}
        >
          {getInitials(user?.name)}
        </div>
      </div>
    </div>
  );
}
