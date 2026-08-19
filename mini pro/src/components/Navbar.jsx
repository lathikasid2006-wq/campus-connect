import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  BookOpen, 
  Users, 
  Calendar, 
  ShieldCheck, 
  User, 
  Bell, 
  Sparkles, 
  Layers, 
  LogOut,
  GraduationCap
} from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab }) => {
  const { currentUser, logout } = useAuth();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Layers },
    { id: 'resources', label: 'Resource Hub', icon: BookOpen },
    { id: 'teamfinder', label: 'AI Team Finder', icon: Users, badge: 'AI Powered' },
    { id: 'events', label: 'Campus Events', icon: Calendar },
    ...(currentUser.role === 'Admin' ? [{ id: 'admin', label: 'Admin Portal', icon: ShieldCheck, badge: 'Admin' }] : []),
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Institution Header */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold tracking-tight text-white">Campus<span className="gradient-text">Connect</span></span>
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">v2.0</span>
              </div>
              <p className="text-[10px] text-gray-400 font-medium tracking-wide">Sona College of Technology • Dept of IT</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                    isActive 
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' 
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-gray-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      item.badge === 'AI Powered' 
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Role Status Badge, Profile Avatar & Logout */}
          <div className="flex items-center space-x-3">
            
            {/* Active Role Indicator Badge */}
            <div className={`px-2.5 py-1 rounded-full text-xs font-bold border flex items-center space-x-1 ${
              currentUser.role === 'Admin' 
                ? 'bg-rose-500/15 text-rose-400 border-rose-500/30' 
                : 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
            }`}>
              <span className="w-2 h-2 rounded-full bg-current animate-pulse"></span>
              <span>{currentUser.role} Mode</span>
            </div>

            {/* Profile Avatar Button */}
            <button 
              onClick={() => setActiveTab('profile')}
              className={`flex items-center space-x-2 p-1.5 rounded-xl border transition-all ${
                activeTab === 'profile' 
                  ? 'border-emerald-500 bg-emerald-500/10' 
                  : 'border-gray-700/80 bg-gray-800/60 hover:border-gray-600'
              }`}
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-emerald-500 to-indigo-600 flex items-center justify-center font-bold text-white text-xs">
                {currentUser.name.charAt(0)}
              </div>
              <span className="text-xs font-semibold text-gray-200 hidden sm:inline">{currentUser.name.split(' ')[0]}</span>
            </button>

            {/* Logout Button */}
            <button
              onClick={logout}
              title="Sign Out"
              className="p-2 rounded-xl bg-gray-800/80 border border-gray-700 hover:border-rose-500/50 text-gray-400 hover:text-rose-400 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
