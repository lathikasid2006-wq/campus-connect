import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  leader: { type: String, required: true },
  department: { type: String, default: 'Information Technology' },
  description: { type: String, required: true },
  requiredSkills: [{ type: String }],
  status: { type: String, default: 'Recruiting Teammates' },
  teamSize: { type: String, default: '1 / 4 Members' },
  postedDate: { type: String, default: () => new Date().toISOString().split('T')[0] },
  createdAt: { type: Date, default: Date.now }
});

export const Project = mongoose.model('Project', ProjectSchema);
