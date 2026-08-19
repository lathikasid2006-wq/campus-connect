import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { Resource } from '../models/Resource.js';
import { Project } from '../models/Project.js';
import { Event } from '../models/Event.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/campus_connect';

export const connectMongoDB = async () => {
  try {
    // Attempt MongoDB connection with 3-second timeout
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 3000
    });

    console.log(`=======================================================`);
    console.log(`🍃 MongoDB Connected Successfully: ${MONGODB_URI}`);
    console.log(`=======================================================`);

    // Auto Seed Initial Data if MongoDB Collections are Empty
    await seedMongoDB();
    return true;

  } catch (err) {
    console.warn(`=======================================================`);
    console.warn(`⚠️ MongoDB Local Service Notice: ${err.message}`);
    console.warn(`ℹ️ Using High-Performance In-Memory Data Store Pipeline.`);
    console.warn(`=======================================================`);
    return false;
  }
};

async function seedMongoDB() {
  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('🌱 Seeding MongoDB User collection...');
      await User.insertMany([
        {
          id: "std-1",
          name: "Lathika S K",
          regNo: "61782323106054",
          role: "Student",
          department: "Information Technology",
          year: "3rd Year",
          email: "lathika@sonatech.ac.in",
          passwordHash: bcrypt.hashSync("student123", 8),
          skills: ["React.js", "HTML5", "CSS3", "Tailwind CSS", "JavaScript", "UI/UX", "Git"],
          interests: ["Web Apps", "Frontend Architecture", "UI Design"],
          bio: "Passionate Full-Stack Developer focusing on React.js, Tailwind CSS, and UI/UX design."
        },
        {
          id: "std-2",
          name: "Loganayagi D",
          regNo: "61782323106056",
          role: "Student",
          department: "Information Technology",
          year: "3rd Year",
          email: "loganayagi@sonatech.ac.in",
          passwordHash: bcrypt.hashSync("student123", 8),
          skills: ["Node.js", "Express.js", "MongoDB", "JWT", "REST API", "JavaScript", "Docker"],
          interests: ["Backend Systems", "Database Security"],
          bio: "Backend specialist experienced in Node.js, Express, MongoDB, and JWT authentication."
        },
        {
          id: "std-3",
          name: "Mubeen Taj M H",
          regNo: "61782323106065",
          role: "Student",
          department: "Information Technology",
          year: "3rd Year",
          email: "mubeentaj@sonatech.ac.in",
          passwordHash: bcrypt.hashSync("student123", 8),
          skills: ["Python", "Scikit-Learn", "Machine Learning", "TF-IDF", "Cosine Similarity", "NLP"],
          interests: ["AI Systems", "NLP", "Recommendation Engines"],
          bio: "AI & ML researcher skilled in Python, Scikit-Learn, and NLP Recommendation Engines."
        },
        {
          id: "admin-1",
          name: "Dr. S. K. Ramesh (Admin)",
          regNo: "FAC-IT-2026",
          role: "Admin",
          department: "Information Technology",
          year: "Faculty Head",
          email: "admin.it@sonatech.ac.in",
          passwordHash: bcrypt.hashSync("admin123", 8),
          skills: ["System Administration", "Curriculum Oversight", "Project Moderation"],
          interests: ["Academic Research", "Student Mentorship"],
          bio: "Head of IT Department & Mini Project Coordinator at Sona College of Technology."
        }
      ]);
    }

    const resCount = await Resource.countDocuments();
    if (resCount === 0) {
      console.log('🌱 Seeding MongoDB Resource collection...');
      await Resource.insertMany([
        {
          id: "res-1",
          title: "Data Structures & Algorithms Comprehensive Lecture Notes",
          subject: "Data Structures",
          department: "Information Technology",
          semester: "3rd Semester",
          uploader: "Lathika S K",
          uploaderRole: "Student",
          date: "2026-08-10",
          downloads: 142,
          rating: 4.9,
          fileType: "PDF",
          fileSize: "4.8 MB",
          description: "Complete module notes covering Trees, Graphs, Sorting algorithms, and Dynamic Programming.",
          tags: ["Data Structures", "Algorithms", "C++", "Trees", "Graphs"]
        },
        {
          id: "res-2",
          title: "Machine Learning & Scikit-Learn TF-IDF Tutorial Guide",
          subject: "Artificial Intelligence",
          department: "Information Technology",
          semester: "6th Semester",
          uploader: "Mubeen Taj M H",
          uploaderRole: "Student",
          date: "2026-08-14",
          downloads: 98,
          rating: 5.0,
          fileType: "PDF",
          fileSize: "6.2 MB",
          description: "Hands-on guide explaining TF-IDF vectorization and Cosine Similarity scoring using Scikit-Learn.",
          tags: ["Machine Learning", "Python", "Scikit-Learn", "TF-IDF", "AI"]
        }
      ]);
    }
  } catch (seedErr) {
    console.warn('Seed Error:', seedErr);
  }
}
