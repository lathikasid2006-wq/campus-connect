import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  BookOpen, 
  Users, 
  Calendar, 
  Sparkles, 
  ArrowUpRight, 
  TrendingUp, 
  CheckCircle, 
  Upload, 
  Search,
  Award,
  Layers
} from 'lucide-react';

export const Dashboard = ({ setActiveTab, onOpenUpload, onOpenProject }) => {
  const { currentUser, resources, projects, students, events } = useAuth();

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Hero Banner with Glassmorphism */}
      <div className="relative overflow-hidden rounded-3xl glass-panel p-8 sm:p-10 border border-gray-800 bg-gradient-to-r from-gray-900 via-gray-900/90 to-emerald-950/30">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-12 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI-Powered Campus Collaboration Platform</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            Welcome back, <span className="gradient-text">{currentUser.name}</span> 👋
          </h1>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-6">
            Access verified study resources, connect with AI-matched project teammates based on skills and interests, and stay updated on campus events — all in one centralized hub.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('teamfinder')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-xs sm:text-sm font-bold flex items-center space-x-2 shadow-lg shadow-emerald-500/20 transition-all transform hover:-translate-y-0.5"
            >
              <Users className="w-4 h-4" />
              <span>Explore AI Team Finder</span>
            </button>

            <button
              onClick={onOpenUpload}
              className="px-5 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 hover:text-white text-xs sm:text-sm font-semibold flex items-center space-x-2 border border-gray-700 transition-all"
            >
              <Upload className="w-4 h-4 text-emerald-400" />
              <span>Upload Study Notes</span>
            </button>
          </div>
        </div>
      </div>

      {/* Platform Stat Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="glass-panel p-5 rounded-2xl border border-gray-800 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium">Academic Materials</p>
            <h3 className="text-2xl font-bold text-white mt-0.5">{resources.length} <span className="text-xs font-normal text-emerald-400">+12 this week</span></h3>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-gray-800 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium">Active AI Matches</p>
            <h3 className="text-2xl font-bold text-white mt-0.5">94.6% <span className="text-xs font-normal text-purple-400">Accuracy</span></h3>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-gray-800 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium">Student Community</p>
            <h3 className="text-2xl font-bold text-white mt-0.5">640+ <span className="text-xs font-normal text-blue-400">Enrolled</span></h3>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-gray-800 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium">Upcoming Events</p>
            <h3 className="text-2xl font-bold text-white mt-0.5">{events.length} <span className="text-xs font-normal text-amber-400">Scheduled</span></h3>
          </div>
        </div>

      </div>

      {/* Main Grid: AI Teammate Recommendations & Recent Materials */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Top AI Team Finder Recommendations (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <h2 className="text-lg font-bold text-white">Top AI Recommended Teammates</h2>
              <span className="text-xs bg-purple-500/10 border border-purple-500/20 text-purple-300 px-2 py-0.5 rounded font-semibold">
                TF-IDF Engine
              </span>
            </div>
            <button 
              onClick={() => setActiveTab('teamfinder')}
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {students.slice(0, 4).map((student) => (
              <div key={student.id} className="glass-panel-interactive p-5 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${student.avatarColor} flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white">{student.name}</h3>
                        <p className="text-xs text-gray-400">{student.department}</p>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      {student.matchScore}% Match
                    </span>
                  </div>

                  <p className="text-xs text-gray-300 line-clamp-2 mb-3">
                    {student.bio}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {student.skills.slice(0, 4).map((skill, idx) => (
                      <span key={idx} className="text-[10px] font-medium bg-gray-800/80 text-gray-300 px-2 py-0.5 rounded border border-gray-700">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => setActiveTab('teamfinder')}
                  className="w-full py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-xs font-semibold text-emerald-400 hover:text-white border border-gray-700 transition-colors"
                >
                  Connect Teammate
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar: Recent Study Materials */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-emerald-400" />
              <span>Recent Materials</span>
            </h2>
            <button 
              onClick={() => setActiveTab('resources')}
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center space-x-1"
            >
              <span>Explore Hub</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {resources.slice(0, 3).map((res) => (
              <div key={res.id} className="glass-panel p-4 rounded-xl border border-gray-800 hover:border-gray-700 transition-all">
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {res.subject}
                  </span>
                  <span className="text-[11px] text-gray-400">⭐ {res.rating}</span>
                </div>
                
                <h4 className="text-xs font-bold text-white mt-2 line-clamp-1 hover:text-emerald-400 cursor-pointer" onClick={() => setActiveTab('resources')}>
                  {res.title}
                </h4>
                
                <p className="text-[11px] text-gray-400 mt-1 line-clamp-1">{res.description}</p>

                <div className="mt-3 pt-2 border-t border-gray-800/80 flex items-center justify-between text-[11px] text-gray-400">
                  <span>Uploaded by {res.uploader}</span>
                  <span className="text-emerald-400 font-semibold">{res.downloads} downloads</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
