import React, { useState, useEffect } from 'react';
import API from '../api';
import { Activity } from 'lucide-react';

const AdminDashboard = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    API.get('/audit').then(res => setLogs(res.data)).catch(console.error);
  }, []);

  return (
    <div className="py-8">
      <div className="flex items-center space-x-3 mb-8">
        <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
          <Activity size={24} />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Admin Dashboard - System Logs</h1>
      </div>
      
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-sm border-b uppercase tracking-wider">
                <th className="p-5 font-semibold">Date</th>
                <th className="p-5 font-semibold">User</th>
                <th className="p-5 font-semibold">Action</th>
                <th className="p-5 font-semibold">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {logs.map(log => (
                <tr key={log._id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-5 text-gray-500 whitespace-nowrap">{new Date(log.createdAt).toLocaleString()}</td>
                  <td className="p-5 font-medium text-gray-800">
                    <div className="flex items-center space-x-2">
                      <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs uppercase">
                        {(log.user?.email || 'SYS')[0]}
                      </span>
                      <span>{log.user?.email || 'System Action'}</span>
                    </div>
                  </td>
                  <td className="p-5">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg font-semibold text-xs border border-gray-200 tracking-wide shadow-sm flex inline-block">
                      {log.action}
                    </span>
                  </td>
                  <td className="p-5 text-gray-600 max-w-xs truncate" title={log.details}>{log.details}</td>
                </tr>
              ))}
              {logs.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-12 text-center text-gray-500 font-medium bg-gray-50/50">No audit logs recorded yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
