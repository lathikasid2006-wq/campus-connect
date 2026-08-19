import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  GraduationCap, 
  ShieldCheck, 
  User, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Building,
  UserPlus
} from 'lucide-react';

export const Login = () => {
  const { login } = useAuth();
  
  // Tab states: 'student', 'admin', or 'signup'
  const [activeRoleTab, setActiveRoleTab] = useState('student');
  const [showPassword, setShowPassword] = useState(false);

  // Form Fields
  const [emailOrRegNo, setEmailOrRegNo] = useState('61782323106054');
  const [password, setPassword] = useState('password123');
  const [department, setDepartment] = useState('Information Technology');
  
  // Registration specific fields
  const [name, setName] = useState('');
  const [year, setYear] = useState('3rd Year');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (activeRoleTab === 'admin') {
      login('Admin', {
        name: emailOrRegNo.includes('Ramesh') ? emailOrRegNo : 'Dr. S. K. Ramesh (Admin)',
        email: emailOrRegNo.includes('@') ? emailOrRegNo : 'admin.it@sonatech.ac.in',
        department: department
      });
    } else if (activeRoleTab === 'signup') {
      login('Student', {
        name: name || 'New Student',
        regNo: emailOrRegNo || `6178232310${Math.floor(1000 + Math.random() * 9000)}`,
        email: `${(name || 'student').toLowerCase().replace(/\s+/g, '')}@sonatech.ac.in`,
        department: department,
        year: year
      });
    } else {
      // Student login
      const studentName = emailOrRegNo === '61782323106056' ? 'Loganayagi D' 
                        : emailOrRegNo === '61782323106065' ? 'Mubeen Taj M H' 
                        : 'Lathika S K';
      
      login('Student', {
        name: studentName,
        regNo: emailOrRegNo,
        email: `${studentName.split(' ')[0].toLowerCase()}@sonatech.ac.in`,
        department: department,
        year: '3rd Year'
      });
    }
  };

  // Quick Demo Auto-fill helpers
  const handleQuickDemoStudent = (nameStr, regStr) => {
    setActiveRoleTab('student');
    setEmailOrRegNo(regStr);
    setPassword('student123');
    login('Student', {
      name: nameStr,
      regNo: regStr,
      email: `${nameStr.split(' ')[0].toLowerCase()}@sonatech.ac.in`,
      department: 'Information Technology',
      year: '3rd Year'
    });
  };

  const handleQuickDemoAdmin = () => {
    setActiveRoleTab('admin');
    setEmailOrRegNo('admin.it@sonatech.ac.in');
    setPassword('admin123');
    login('Admin', {
      name: 'Dr. S. K. Ramesh (Admin)',
      email: 'admin.it@sonatech.ac.in',
      department: 'Information Technology'
    });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12 bg-[#0b0f19] relative overflow-hidden selection:bg-emerald-500 selection:text-white">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-500/10 via-purple-500/10 to-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md space-y-6 relative z-10 animate-fade-in">
        
        {/* Header Title & Branding */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-indigo-600 text-white shadow-xl shadow-emerald-500/20 mb-2">
            <GraduationCap className="w-8 h-8" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Campus<span className="gradient-text">Connect</span>
          </h1>
          
          <p className="text-xs text-gray-400 font-medium">
            Sona College of Technology • Dept of Information Technology
          </p>
        </div>

        {/* Login Card Container */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-gray-800 shadow-2xl space-y-6">
          
          {/* Dual Role Selector Tabs */}
          <div className="grid grid-cols-2 p-1 bg-gray-900/90 rounded-xl border border-gray-800">
            <button
              onClick={() => setActiveRoleTab('student')}
              className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center space-x-1.5 ${
                activeRoleTab === 'student' || activeRoleTab === 'signup'
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Student Portal</span>
            </button>

            <button
              onClick={() => setActiveRoleTab('admin')}
              className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center space-x-1.5 ${
                activeRoleTab === 'admin'
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin / Faculty</span>
            </button>
          </div>

          {/* Role Header Indicator */}
          <div className="flex items-center justify-between pb-2 border-b border-gray-800/80">
            <div>
              <h2 className="text-base font-bold text-white">
                {activeRoleTab === 'admin' ? 'Faculty & Admin Login' : activeRoleTab === 'signup' ? 'Student Registration' : 'Student Login'}
              </h2>
              <p className="text-[11px] text-gray-400">
                {activeRoleTab === 'admin'
                  ? 'Access administrative controls & event management'
                  : activeRoleTab === 'signup'
                  ? 'Create account to access AI team finder & resources'
                  : 'Enter registration number or student email'}
              </p>
            </div>

            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
              activeRoleTab === 'admin' 
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' 
                : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
            }`}>
              {activeRoleTab === 'admin' ? 'Role: Admin' : 'Role: Student'}
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Name Input (If Signup mode) */}
            {activeRoleTab === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Full Student Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lathika S K"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-gray-900/80 border border-gray-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            )}

            {/* Email / Reg No Input */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">
                {activeRoleTab === 'admin' ? 'Faculty Email / ID *' : 'Registration Number / Email *'}
              </label>
              <div className="relative">
                {activeRoleTab === 'admin' ? (
                  <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
                ) : (
                  <User className="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
                )}
                <input
                  type="text"
                  required
                  placeholder={activeRoleTab === 'admin' ? 'admin.it@sonatech.ac.in' : '61782323106054'}
                  value={emailOrRegNo}
                  onChange={(e) => setEmailOrRegNo(e.target.value)}
                  className={`w-full bg-gray-900/80 border border-gray-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none ${
                    activeRoleTab === 'admin' ? 'focus:border-rose-500' : 'focus:border-emerald-500'
                  }`}
                />
              </div>
            </div>

            {/* Department Selector */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Department</label>
              <div className="relative">
                <Building className="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full bg-gray-900/80 border border-gray-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 appearance-none"
                >
                  <option value="Information Technology">Information Technology</option>
                  <option value="Computer Science & Engineering">Computer Science & Eng</option>
                  <option value="Artificial Intelligence & DS">AI & Data Science</option>
                </select>
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Password *</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-900/80 border border-gray-700 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full py-3 rounded-xl text-xs font-bold text-white flex items-center justify-center space-x-2 transition-all shadow-lg ${
                activeRoleTab === 'admin'
                  ? 'bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 shadow-rose-500/20'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-emerald-500/20'
              }`}
            >
              <span>{activeRoleTab === 'admin' ? 'Sign In as Admin' : activeRoleTab === 'signup' ? 'Complete Registration' : 'Sign In to Campus Connect'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>

          {/* Quick 1-Click Demo Accounts */}
          <div className="pt-4 border-t border-gray-800/80 space-y-2">
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">
              ⚡ Quick Demo 1-Click Login:
            </span>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoStudent('Lathika S K', '61782323106054')}
                className="p-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-[11px] text-emerald-300 font-semibold text-left transition-colors truncate"
              >
                🎓 Student: Lathika S K
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoStudent('Mubeen Taj M H', '61782323106065')}
                className="p-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-[11px] text-purple-300 font-semibold text-left transition-colors truncate"
              >
                🎓 Student: Mubeen Taj
              </button>
            </div>

            <button
              type="button"
              onClick={handleQuickDemoAdmin}
              className="w-full p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-[11px] text-rose-300 font-semibold text-center transition-colors"
            >
              🛡️ Admin: Dr. S. K. Ramesh (Faculty Head)
            </button>
          </div>

          {/* Signup Toggle link */}
          <div className="text-center pt-2">
            {activeRoleTab === 'signup' ? (
              <button
                onClick={() => setActiveRoleTab('student')}
                className="text-xs text-emerald-400 hover:underline font-medium"
              >
                Already have an account? Sign in here
              </button>
            ) : (
              <button
                onClick={() => setActiveRoleTab('signup')}
                className="text-xs text-gray-400 hover:text-white font-medium inline-flex items-center space-x-1"
              >
                <UserPlus className="w-3.5 h-3.5 text-emerald-400" />
                <span>New Student? Create account</span>
              </button>
            )}
          </div>

        </div>

        {/* Footer credentials */}
        <p className="text-[11px] text-gray-500 text-center">
          Mini Project U23IT703 • Team: Lathika S K, Loganayagi D, Mubeen Taj M H
        </p>

      </div>

    </div>
  );
};
