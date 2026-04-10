export default function StatCard({ label, value, sub, color }) {
  return (
    <div className={`bg-white border text-left border-card rounded-2xl p-5 border-l-[4px] shadow-sm ${color}`}>
      <div className="text-xs font-medium text-secondary uppercase tracking-wider">{label}</div>
      <div className="text-2xl font-bold text-dark mt-1.5" style={{ fontFamily: 'Plus Jakarta Sans' }}>
        {value}
      </div>
      <div className="text-[11px] font-medium text-secondary/80 mt-1">{sub}</div>
    </div>
  );
}
