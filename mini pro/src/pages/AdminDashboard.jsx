import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  ShieldCheck, 
  Users, 
  BookOpen, 
  Calendar, 
  Sparkles, 
  TrendingUp, 
  CheckCircle, 
  AlertTriangle,
  FileCheck,
  Activity
} from 'lucide-react';

export const AdminDashboard = () => {
  const { resources, projects, students, events } = useAuth();

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Admin Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 rounded-2xl border border-rose-900/40 bg-gradient-to-r from-rose-950/20 via-gray-900 to-gray-900">
        <div>
          <div className="flex items-center space-x-2 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Administrative Operations Panel</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Campus Connect Admin Portal</h1>
          <p className="text-xs text-gray-400 mt-1">System moderation, user auditing, resource validation, and platform activity metrics.</p>
        </div>

        <div className="flex items-center space-x-2 bg-rose-500/10 border border-rose-500/20 text-rose-300 px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0">
          <Activity className="w-4 h-4 text-rose-400 animate-pulse" />
          <span>System Health: 100% Operational</span>
        </div>
      </div>

      {/* Admin Quick Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-xl border border-gray-800">
          <div className="flex items-center justify-between text-gray-400 text-xs mb-1">
            <span>Total Enrolled Students</span>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <h3 className="text-2xl font-bold text-white">640 <span className="text-xs text-emerald-400 font-normal">+18 today</span></h3>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-gray-800">
          <div className="flex items-center justify-between text-gray-400 text-xs mb-1">
            <span>Verified Study Files</span>
            <BookOpen className="w-4 h-4 text-purple-400" />
          </div>
          <h3 className="text-2xl font-bold text-white">{resources.length} <span className="text-xs text-purple-400 font-normal">Indexed</span></h3>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-gray-800">
          <div className="flex items-center justify-between text-gray-400 text-xs mb-1">
            <span>Project Match Attempts</span>
            <Sparkles className="w-4 h-4 text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold text-white">1,420 <span className="text-xs text-blue-400 font-normal">Calculated</span></h3>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-gray-800">
          <div className="flex items-center justify-between text-gray-400 text-xs mb-1">
            <span>Published Events</span>
            <Calendar className="w-4 h-4 text-amber-400" />
          </div>
          <h3 className="text-2xl font-bold text-white">{events.length} <span className="text-xs text-amber-400 font-normal">Active</span></h3>
        </div>
      </div>

      {/* User Management & Resource Moderation Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Student Verification Table */}
        <div className="glass-panel p-5 rounded-2xl border border-gray-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-emerald-400" />
              <span>Student Profile Directory</span>
            </span>
            <span className="text-xs text-gray-400 font-normal">{students.length} Records</span>
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-900/80 text-gray-400 uppercase text-[10px]">
                <tr>
                  <th className="px-3 py-2">Student Name</th>
                  <th className="px-3 py-2">Reg Number</th>
                  <th className="px-3 py-2">Department</th>
                  <th className="px-3 py-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800 text-gray-300">
                {students.map((std) => (
                  <tr key={std.id} className="hover:bg-gray-900/40">
                    <td className="px-3 py-2.5 font-semibold text-white">{std.name}</td>
                    <td className="px-3 py-2.5 font-mono text-gray-400">{std.regNo}</td>
                    <td className="px-3 py-2.5 text-gray-400">{std.department}</td>
                    <td className="px-3 py-2.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Verified
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Resource Moderation Queue */}
        <div className="glass-panel p-5 rounded-2xl border border-gray-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <FileCheck className="w-4 h-4 text-purple-400" />
              <span>Resource Moderation Queue</span>
            </span>
            <span className="text-xs text-gray-400 font-normal">All Approved</span>
          </h3>

          <div className="space-y-3">
            {resources.map((res) => (
              <div key={res.id} className="p-3 bg-gray-900/60 rounded-xl border border-gray-800 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-white line-clamp-1">{res.title}</h4>
                  <p className="text-[11px] text-gray-400 mt-0.5">{res.subject} • Uploaded by {res.uploader}</p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
                  Approved
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
