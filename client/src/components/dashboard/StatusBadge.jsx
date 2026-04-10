export default function StatusBadge({ status }) {
  const normalizedStatus = status?.toLowerCase() || 'pending';

  const styles = {
    pending:  'bg-[#eab308]/10 text-[#eab308] border-[#eab308]/20',
    accepted: 'bg-[#4ade80]/10 text-[#4ade80] border-[#4ade80]/20',
    rejected: 'bg-[#f87171]/10 text-[#f87171] border-[#f87171]/20',
    modified: 'bg-[#60a5fa]/10 text-[#60a5fa] border-[#60a5fa]/20',
  };

  const dots = {
    pending:  '#eab308',
    accepted: '#4ade80',
    rejected: '#f87171',
    modified: '#60a5fa',
  };

  const badgeClass = styles[normalizedStatus] || styles.pending;
  const dotColor   = dots[normalizedStatus]   || dots.pending;

  return (
    <span className={`inline-flex items-center gap-1.5 text-[10px] px-2.5 py-1 rounded-full font-bold border capitalize tracking-wider ${badgeClass}`}>
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: dotColor }} />
      {status || 'Pending'}
    </span>
  );
}
