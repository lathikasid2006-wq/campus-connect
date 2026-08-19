import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getRankedStudents } from '../utils/aiMatching';
import { 
  Users, 
  Sparkles, 
  Plus, 
  Search, 
  Code, 
  Cpu, 
  MessageSquare, 
  CheckCircle2,
  ChevronRight,
  Zap,
  Briefcase
} from 'lucide-react';

export const TeamFinder = ({ onOpenProject, onSelectConnectStudent }) => {
  const { projects, students } = useAuth();
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [selectedSkillFilter, setSelectedSkillFilter] = useState('All');

  // Compute live AI Scikit-Learn matching scores for the selected project
  const rankedStudents = getRankedStudents(selectedProject, students);

  const availableSkills = ['All', 'React.js', 'Python', 'Node.js', 'Scikit-Learn', 'MongoDB', 'Tailwind CSS'];

  const filteredStudents = rankedStudents.filter((std) => {
    if (selectedSkillFilter === 'All') return true;
    return std.skills.some(s => s.toLowerCase().includes(selectedSkillFilter.toLowerCase()));
  });

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 rounded-2xl border border-gray-800 bg-gradient-to-r from-purple-950/30 via-gray-900 to-gray-900">
        <div>
          <div className="flex items-center space-x-2 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Python Scikit-Learn TF-IDF & Cosine Similarity Engine</span>
          </div>
          <h1 className="text-2xl font-bold text-white">AI-Based Project Team Finder</h1>
          <p className="text-xs text-gray-400 mt-1">Discover optimal project teammates dynamically scored by skill compatibility algorithms.</p>
        </div>

        <button
          onClick={onOpenProject}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white text-xs font-bold flex items-center justify-center space-x-2 shadow-lg shadow-purple-500/20 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Post Project Idea</span>
        </button>
      </div>

      {/* Project Selector Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-gray-800">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center space-x-1.5">
          <Briefcase className="w-4 h-4 text-purple-400" />
          <span>Select Target Project to Calculate AI Compatibility Scores:</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {projects.map((proj) => {
            const isSelected = selectedProject.id === proj.id;
            return (
              <div
                key={proj.id}
                onClick={() => setSelectedProject(proj)}
                className={`p-3.5 rounded-xl cursor-pointer transition-all border ${
                  isSelected
                    ? 'bg-purple-500/15 border-purple-500/50 shadow-md shadow-purple-500/10'
                    : 'bg-gray-900/60 border-gray-800 hover:border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
                    {proj.department}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-semibold">{proj.teamSize}</span>
                </div>

                <h4 className="text-xs font-bold text-white mt-2 line-clamp-1">{proj.title}</h4>
                <p className="text-[11px] text-gray-400 line-clamp-1 mt-0.5">{proj.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Project Target Details */}
      <div className="glass-panel p-5 rounded-2xl border border-gray-800 bg-gray-900/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-purple-400">Target Project:</span>
              <h2 className="text-base font-bold text-white">{selectedProject.title}</h2>
            </div>
            <p className="text-xs text-gray-300 mt-1 max-w-3xl">{selectedProject.description}</p>
          </div>

          <div className="shrink-0 bg-gray-950 p-3 rounded-xl border border-gray-800">
            <span className="text-[11px] text-gray-400 font-medium block mb-1">Required Skills Vector:</span>
            <div className="flex flex-wrap gap-1">
              {selectedProject.requiredSkills.map((sk, idx) => (
                <span key={idx} className="text-[10px] font-bold bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded border border-purple-500/30">
                  {sk}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Filter by skill pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        <span className="text-xs text-gray-400 font-semibold px-2 shrink-0">Skill Filter:</span>
        {availableSkills.map((sk) => (
          <button
            key={sk}
            onClick={() => setSelectedSkillFilter(sk)}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all shrink-0 ${
              selectedSkillFilter === sk
                ? 'bg-purple-500 text-white shadow-md shadow-purple-500/20'
                : 'bg-gray-900/80 text-gray-300 hover:bg-gray-800 border border-gray-800'
            }`}
          >
            {sk}
          </button>
        ))}
      </div>

      {/* Ranked Student Profiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => {
          const matchColor = student.matchScore >= 90
            ? 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/40'
            : student.matchScore >= 80
            ? 'from-purple-500/20 to-indigo-500/20 text-purple-300 border-purple-500/40'
            : 'from-amber-500/20 to-orange-500/20 text-amber-300 border-amber-500/40';

          return (
            <div key={student.id} className="glass-panel-interactive rounded-2xl p-5 flex flex-col justify-between border border-gray-800 relative">
              
              <div>
                {/* Score badge header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${student.avatarColor} flex items-center justify-center text-white font-bold text-base shadow-md`}>
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">{student.name}</h3>
                      <p className="text-xs text-gray-400">{student.department} • {student.year}</p>
                    </div>
                  </div>

                  <div className={`px-2.5 py-1 rounded-xl bg-gradient-to-r ${matchColor} border flex items-center space-x-1 shadow-sm`}>
                    <Zap className="w-3.5 h-3.5" />
                    <span className="text-xs font-extrabold">{student.matchScore}% Match</span>
                  </div>
                </div>

                <p className="text-xs text-gray-300 leading-relaxed line-clamp-2 mb-3">
                  {student.bio}
                </p>

                {/* Matching Skills */}
                <div className="mb-4">
                  <span className="text-[11px] text-gray-400 font-semibold block mb-1">Skills Profile:</span>
                  <div className="flex flex-wrap gap-1">
                    {student.skills.map((skill, idx) => {
                      const isMatching = student.matchingSkills?.includes(skill);
                      return (
                        <span
                          key={idx}
                          className={`text-[10px] font-medium px-2 py-0.5 rounded border ${
                            isMatching
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                              : 'bg-gray-800 text-gray-300 border-gray-700'
                          }`}
                        >
                          {isMatching && '✓ '}{skill}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-gray-800/80">
                <button
                  onClick={() => onSelectConnectStudent(student)}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-xs font-bold text-white flex items-center justify-center space-x-2 shadow-lg shadow-purple-500/20 transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Send Team Invite</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
