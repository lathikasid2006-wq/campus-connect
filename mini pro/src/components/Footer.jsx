import React from 'react';
import { GraduationCap, Heart, Code2 } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="mt-20 border-t border-gray-800 bg-gray-950/80 text-gray-400 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">Campus<span className="text-emerald-400">Connect</span></span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed mb-4 max-w-md">
              AI-Powered Campus Connect: Intelligent Student Collaboration and Resource Recommendation Platform. Unified study resource sharing, project teammate discovery, and campus event management.
            </p>
            <div className="text-xs text-gray-500">
              <p className="font-semibold text-gray-400">Sona College of Technology (Autonomous Institution)</p>
              <p>Department of Information Technology • Mini Project U23IT703</p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300 mb-3">Project Team</h4>
            <ul className="text-xs space-y-2">
              <li className="flex justify-between text-gray-300">
                <span>Lathika S K</span>
                <span className="text-gray-500">61782323106054</span>
              </li>
              <li className="flex justify-between text-gray-300">
                <span>Loganayagi D</span>
                <span className="text-gray-500">61782323106056</span>
              </li>
              <li className="flex justify-between text-gray-300">
                <span>Mubeen Taj M H</span>
                <span className="text-gray-500">61782323106065</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300 mb-3">Project Guide</h4>
            <div className="text-xs space-y-1 text-gray-300">
              <p className="font-semibold text-emerald-400">Ms. Lydia D Isaac</p>
              <p className="text-gray-400">Assistant Professor</p>
              <p className="text-gray-500">Dept of Information Technology</p>
            </div>
          </div>

        </div>

        <div className="pt-6 border-t border-gray-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
          <p>© 2026-27 Sona College of Technology. All Rights Reserved.</p>
          <div className="flex items-center space-x-1 mt-2 sm:mt-0">
            <span>Built with</span>
            <Code2 className="w-3.5 h-3.5 text-emerald-400 inline" />
            <span>React.js, Node.js & Python Scikit-Learn</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
