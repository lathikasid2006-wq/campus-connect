import mongoose from 'mongoose';

const ResourceSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  subject: { type: String, required: true },
  department: { type: String, default: 'Information Technology' },
  semester: { type: String, default: '3rd Semester' },
  uploader: { type: String, required: true },
  uploaderRole: { type: String, default: 'Student' },
  date: { type: String, default: () => new Date().toISOString().split('T')[0] },
  downloads: { type: Number, default: 0 },
  rating: { type: Number, default: 5.0 },
  fileType: { type: String, default: 'PDF' },
  fileSize: { type: String, default: '4.5 MB' },
  description: { type: String, required: true },
  tags: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

export const Resource = mongoose.model('Resource', ResourceSchema);
