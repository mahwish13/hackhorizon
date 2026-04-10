import { useState, useEffect } from 'react';
import api from '../../api/axios';

export default function AuditFeed() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await api.get('/dashboard/audit');
        setLogs(res.data.data || []);
      } catch (err) {
        console.error('Failed to fetch audit logs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    }).format(new Date(dateString));
  };

  const getActionColor = (action) => {
    switch (action) {
      case 'Created Invoice': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'Updated Status': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
      case 'Updated Payment': return 'text-[#4ade80] bg-[#4ade80]/10 border-[#4ade80]/20';
      case 'Created Request': return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
      case 'Fulfilled Request': return 'text-teal-400 bg-teal-400/10 border-teal-400/20';
      default: return 'text-white bg-gray-500/10 border-gray-500/20';
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
         <span className="w-8 h-8 border-2 border-[#4ade80]/30 border-t-[#4ade80] rounded-full spin" />
      </div>
    );
  }

  return (
    <div className="bg-[#111a15] border border-[#243124] rounded-2xl p-6 h-[calc(100vh-140px)] flex flex-col">
      <h3 className="font-bold text-lg text-white mb-6" style={{ fontFamily: 'Plus Jakarta Sans' }}>Audit Trail & System Logs</h3>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 mb-4">
        {logs.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full opacity-60">
            <svg className="w-10 h-10 text-[#3d5945] mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-sm font-semibold text-[#3d5945]">No secure logging events captured yet.</span>
          </div>
        ) : (
          <div className="relative border-l border-[#243124] ml-3 pl-6 space-y-6 py-2">
            {logs.map((log) => (
              <div key={log._id} className="relative group">
                {/* Timeline dot */}
                <div className="absolute -left-[30px] top-1.5 w-3 h-3 bg-[#0a0f0d] border-2 border-[#3d5945] rounded-full group-hover:border-[#4ade80] transition-colors" />
                
                <div className="flex flex-col gap-1 hidden-scrollbar bg-[#0a0f0d] border border-[#1a2a1f] p-4 rounded-xl group-hover:border-[#243124] transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${getActionColor(log.action)}`}>
                      {log.action}
                    </span>
                    <span className="text-[10px] font-medium text-[#6b8f76] uppercase tracking-wide flex items-center gap-1.5">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {formatDate(log.createdAt)}
                    </span>
                  </div>
                  
                  <p className="text-sm font-medium text-[#e8f5ec]">
                    {log.details}
                  </p>
                  
                  <div className="flex items-center gap-3 mt-3 pt-3 border-t border-[#1a2a1f]">
                    <span className="text-[10px] font-bold text-[#3d5945] uppercase tracking-wider">
                      Business ID: <span className="text-[#6b8f76] font-mono">{log.businessGstin || 'INTERNAL'}</span>
                    </span>
                    <span className="text-[10px] font-bold text-[#3d5945] uppercase tracking-wider">
                      Sys Object: <span className="text-[#6b8f76] font-mono">{log.entityId}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
