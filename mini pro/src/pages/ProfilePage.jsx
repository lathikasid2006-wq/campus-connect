import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Sparkles, Plus, X, Save, CheckCircle2, Shield } from 'lucide-react';

export const ProfilePage = () => {
  const { currentUser, updateUserSkills, showToast } = useAuth();
  const [skills, setSkills] = useState(currentUser.skills || []);
  const [newSkillInput, setNewSkillInput] = useState('');

  const handleAddSkill = () => {
    if (!newSkillInput.trim()) return;
    if (skills.includes(newSkillInput.trim())) return;
    const updated = [...skills, newSkillInput.trim()];
    setSkills(updated);
    setNewSkillInput('');
    updateUserSkills(updated);
  };

  const handleRemoveSkill = (skillToRemove) => {
    const updated = skills.filter((s) => s !== skillToRemove);
    setSkills(updated);
    updateUserSkills(updated);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      
      {/* Profile Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-gray-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-emerald-500 to-indigo-600 flex items-center justify-center text-white font-extrabold text-3xl shadow-xl">
            {currentUser.name.charAt(0)}
          </div>

          <div className="text-center sm:text-left space-y-1">
            <div className="flex items-center justify-center sm:justify-start space-x-2">
              <h1 className="text-2xl font-bold text-white">{currentUser.name}</h1>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {currentUser.role} Mode
              </span>
            </div>

            <p className="text-xs text-gray-400">{currentUser.department} • {currentUser.year} • Reg: {currentUser.regNo}</p>
            <p className="text-xs text-gray-300 pt-2 max-w-lg">{currentUser.bio}</p>
          </div>
        </div>
      </div>

      {/* Technical Skill Matrix for AI Match Engine */}
      <div className="glass-panel p-6 rounded-2xl border border-gray-800 space-y-4">
        <div>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg font-bold text-white">Technical Skill Profile Vector</h2>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            These skills are used by our Scikit-Learn TF-IDF & Cosine Similarity engine to recommend compatible project teammates and course resources.
          </p>
        </div>

        {/* Skill tag list */}
        <div className="flex flex-wrap gap-2 p-4 bg-gray-900/60 rounded-xl border border-gray-800">
          {skills.map((skill, idx) => (
            <span
              key={idx}
              className="inline-flex items-center space-x-1.5 text-xs font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-lg"
            >
              <span>{skill}</span>
              <button
                onClick={() => handleRemoveSkill(skill)}
                className="hover:text-rose-400 p-0.5 rounded transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>

        {/* Add new skill input */}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Add new skill (e.g. Scikit-Learn, PyTorch, Docker, Java)..."
            value={newSkillInput}
            onChange={(e) => setNewSkillInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
            className="flex-1 bg-gray-900/80 border border-gray-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
          />
          <button
            onClick={handleAddSkill}
            className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold flex items-center space-x-1 shadow-md shadow-emerald-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Add Tag</span>
          </button>
        </div>
      </div>

    </div>
  );
};
