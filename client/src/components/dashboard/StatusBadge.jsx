export default function StatusBadge({ status }) {
  const normalizedStatus = status?.toLowerCase() || 'pending';
  
  const styles = {
    pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
    accepted: "bg-green-100 text-green-700 border-green-200",
    rejected: "bg-red-100 text-red-700 border-red-200",
    modified: "bg-blue-100 text-blue-700 border-blue-200"
  };

  const badgeClass = styles[normalizedStatus] || styles.pending;

  return (
    <span className={`text-xs px-2.5 py-1 rounded-full font-medium border capitalize tracking-wide shadow-sm inline-block text-center ${badgeClass}`}>
      {status || 'Pending'}
    </span>
  );
}
