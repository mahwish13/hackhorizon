export default function StatCard({ label, value, sub, color }) {
  const accentMap = {
    'border-primary':     { dot: '#4ade80', glow: 'rgba(74,222,128,0.08)' },
    'border-green-500':   { dot: '#22c55e', glow: 'rgba(34,197,94,0.08)' },
    'border-yellow-500':  { dot: '#eab308', glow: 'rgba(234,179,8,0.08)' },
    'border-blue-500':    { dot: '#3b82f6', glow: 'rgba(59,130,246,0.08)' },
    'border-red-400':     { dot: '#f87171', glow: 'rgba(248,113,113,0.08)' },
    'border-orange-400':  { dot: '#fb923c', glow: 'rgba(251,146,60,0.08)' },
  };
  const accent = accentMap[color] || accentMap['border-primary'];

  return (
    <div
      className="bg-[#111a15] border border-[#243124] rounded-2xl p-6 flex flex-col gap-3 hover:border-[#2e4030] transition-all duration-300 group relative overflow-hidden"
      style={{ boxShadow: `0 0 0 0 ${accent.glow}` }}
    >
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${accent.dot}60, transparent)` }} />

      {/* Dot + Label */}
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: accent.dot }} />
        <span className="text-[11px] font-bold text-[#6b8f76] uppercase tracking-[0.12em]">{label}</span>
      </div>

      {/* Value */}
      <div className="text-[1.75rem] font-extrabold text-white leading-none" style={{ fontFamily: 'Plus Jakarta Sans' }}>
        {value}
      </div>

      {/* Sub */}
      <div className="text-[11px] text-[#3d5945] font-medium">{sub}</div>
    </div>
  );
}
