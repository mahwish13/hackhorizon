import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../hooks/useAuth';
import api from '../../api/axios';

export default function TopBar({ title, onMenuClick }) {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

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

  const fetchNotifications = async () => {
    try {
      const res = await api.get('/notifications');
      setNotifications(res.data.data || []);
      setUnreadCount(res.data.unreadCount || 0);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 15000); // Polling every 15s
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMarkAsRead = async (id, e) => {
    e.stopPropagation();
    try {
      await api.patch(`/notifications/${id}/read`);
      setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await api.patch('/notifications/read-all');
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error(err);
    }
  };

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
        <div className="relative" ref={dropdownRef}>
          <div 
            onClick={() => setShowDropdown(!showDropdown)}
            className={`w-9 h-9 border rounded-xl flex items-center justify-center cursor-pointer transition-all group ${showDropdown ? 'bg-[#192319] border-[#4ade80]/30' : 'bg-[#111a15] border-[#243124] hover:bg-[#192319] hover:border-[#2e4030]'}`}
          >
            <svg className={`w-4 h-4 transition-colors ${showDropdown ? 'text-white' : 'text-[#6b8f76] group-hover:text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {unreadCount > 0 && (
              <span className="min-w-[14px] h-[14px] px-1 bg-red-500 rounded-full flex items-center justify-center text-[8px] font-bold text-white absolute -top-1 -right-1 border-2 border-[#080c0a] shadow-sm">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </div>

          {/* Dropdown Panel */}
          {showDropdown && (
            <div className="absolute right-0 top-[44px] w-80 bg-[#111a15] border border-[#243124] rounded-2xl shadow-xl shadow-black/50 overflow-hidden flex flex-col z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-3 border-b border-[#243124] flex items-center justify-between bg-[#0a0f0d]">
                <h3 className="text-sm font-bold text-white" style={{ fontFamily: 'Plus Jakarta Sans' }}>Notifications</h3>
                {unreadCount > 0 && (
                  <button onClick={handleMarkAllAsRead} className="text-[10px] font-bold uppercase tracking-wider text-[#4ade80] hover:text-[#86efac] transition-colors">
                    Mark All
                  </button>
                )}
              </div>
              
              <div className="max-h-[340px] overflow-y-auto custom-scrollbar flex flex-col">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-xs font-semibold text-[#3d5945]">You're all caught up!</div>
                ) : (
                  notifications.map(n => (
                    <div key={n._id} className={`p-4 border-b border-[#1a2a1f] hover:bg-[#192319] transition-colors flex flex-col gap-1.5 cursor-pointer ${n.isRead ? 'opacity-60' : 'bg-[#192319]/30'}`}>
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-bold text-white">{n.title}</span>
                        {!n.isRead && (
                          <button onClick={(e) => handleMarkAsRead(n._id, e)} className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-[#243124] transition-colors group/btn">
                             <span className="w-2 h-2 rounded-full bg-[#4ade80] group-hover/btn:hidden" />
                             <svg className="w-3 h-3 text-[#6b8f76] hidden group-hover/btn:block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                          </button>
                        )}
                      </div>
                      <p className="text-[11px] text-[#6b8f76] leading-relaxed">{n.message}</p>
                      <span className="text-[9px] font-bold uppercase tracking-widest text-[#3d5945] mt-1">
                        {new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', day:'numeric', month: 'short' }).format(new Date(n.createdAt))}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
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
