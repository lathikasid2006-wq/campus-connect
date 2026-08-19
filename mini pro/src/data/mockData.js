export const MOCK_RESOURCES = [
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
    description: "Complete module notes covering Trees, Graphs, Sorting algorithms, Dynamic Programming, and complexity analysis with C++ implementation examples.",
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
    description: "Hands-on guide explaining TF-IDF vectorization, Cosine Similarity scoring, and building recommendation systems using Scikit-Learn and Python.",
    tags: ["Machine Learning", "Python", "Scikit-Learn", "TF-IDF", "AI"]
  },
  {
    id: "res-3",
    title: "Full Stack Web Development - React.js & Node.js Architecture",
    subject: "Web Development",
    department: "Information Technology",
    semester: "5th Semester",
    uploader: "Loganayagi D",
    uploaderRole: "Student",
    date: "2026-08-05",
    downloads: 215,
    rating: 4.8,
    fileType: "ZIP",
    fileSize: "12.4 MB",
    description: "Source code patterns, REST API endpoints, JWT Authentication integration, and MongoDB Mongoose schemas for full-stack web applications.",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT"]
  },
  {
    id: "res-4",
    title: "Database Management Systems (DBMS) SQL & Indexing Notes",
    subject: "DBMS",
    department: "Computer Science & Engineering",
    semester: "4th Semester",
    uploader: "Prof. R. Sundaram",
    uploaderRole: "Faculty",
    date: "2026-07-28",
    downloads: 310,
    rating: 4.9,
    fileType: "PDF",
    fileSize: "3.5 MB",
    description: "Relational algebra, SQL query optimization, ACID properties, Normalization (1NF to 3NF/BCNF), and B-Tree indexing.",
    tags: ["DBMS", "SQL", "Database", "Normalization", "ACID"]
  },
  {
    id: "res-5",
    title: "Operating Systems Process Synchronization & Concurrency",
    subject: "Operating Systems",
    department: "Information Technology",
    semester: "4th Semester",
    uploader: "Lathika S K",
    uploaderRole: "Student",
    date: "2026-08-01",
    downloads: 87,
    rating: 4.7,
    fileType: "PDF",
    fileSize: "2.9 MB",
    description: "Semaphores, Monitors, Deadlock prevention algorithms, CPU scheduling, and Memory Virtualization concepts.",
    tags: ["Operating Systems", "Process Sync", "Deadlocks", "Memory Management"]
  }
];

export const MOCK_STUDENTS = [
  {
    id: "std-1",
    name: "Lathika S K",
    regNo: "61782323106054",
    department: "Information Technology",
    year: "3rd Year",
    bio: "Passionate Full-Stack Developer focusing on React.js, Tailwind CSS, and UI/UX design. Enthusiastic about campus collaboration.",
    skills: ["React.js", "HTML5", "CSS3", "Tailwind CSS", "JavaScript", "UI/UX", "Git"],
    interests: ["Web Apps", "Frontend Architecture", "UI Design"],
    email: "lathika@sonatech.ac.in",
    matchScore: 96,
    avatarColor: "from-emerald-500 to-teal-700"
  },
  {
    id: "std-2",
    name: "Loganayagi D",
    regNo: "61782323106056",
    department: "Information Technology",
    year: "3rd Year",
    bio: "Backend specialist experienced in building scalable Node.js Express APIs, MongoDB databases, and JWT authentication pipelines.",
    skills: ["Node.js", "Express.js", "MongoDB", "JWT", "REST API", "JavaScript", "Docker"],
    interests: ["Backend Systems", "Database Security", "Cloud API"],
    email: "loganayagi@sonatech.ac.in",
    matchScore: 92,
    avatarColor: "from-blue-500 to-indigo-700"
  },
  {
    id: "std-3",
    name: "Mubeen Taj M H",
    regNo: "61782323106065",
    department: "Information Technology",
    year: "3rd Year",
    bio: "AI & ML researcher skilled in Python, Scikit-Learn, Natural Language Processing, and Recommendation Algorithms.",
    skills: ["Python", "Scikit-Learn", "Machine Learning", "TF-IDF", "Cosine Similarity", "Data Science", "Pandas"],
    interests: ["AI Systems", "NLP", "Recommendation Engines"],
    email: "mubeentaj@sonatech.ac.in",
    matchScore: 94,
    avatarColor: "from-purple-500 to-violet-700"
  },
  {
    id: "std-4",
    name: "Arun Kumar P",
    regNo: "61782323106012",
    department: "Computer Science",
    year: "4th Year",
    bio: "Cybersecurity enthusiast and Python developer focusing on web application security and cryptography.",
    skills: ["Python", "Cyber Security", "Network Security", "Linux", "SQL", "Docker"],
    interests: ["Ethical Hacking", "Cloud Security"],
    email: "arunkumar@sonatech.ac.in",
    matchScore: 78,
    avatarColor: "from-amber-500 to-orange-700"
  },
  {
    id: "std-5",
    name: "Priya Dharshini R",
    regNo: "61782323106088",
    department: "Information Technology",
    year: "2nd Year",
    bio: "Frontend designer creating clean interface components and interactive web dashboards.",
    skills: ["React.js", "JavaScript", "CSS3", "Figma", "HTML5"],
    interests: ["Frontend", "Design Systems"],
    email: "priya@sonatech.ac.in",
    matchScore: 84,
    avatarColor: "from-pink-500 to-rose-700"
  }
];

export const MOCK_PROJECTS = [
  {
    id: "proj-1",
    title: "AI Campus Recommendation Engine",
    leader: "Mubeen Taj M H",
    department: "Information Technology",
    description: "Building an intelligent recommendation module using Python, Scikit-Learn TF-IDF vectorization, and Cosine Similarity to pair students with peer collaborators and course resources.",
    requiredSkills: ["Python", "Scikit-Learn", "Machine Learning", "TF-IDF", "React.js"],
    status: "Recruiting Teammates",
    teamSize: "3 / 4 Members",
    postedDate: "2026-08-12"
  },
  {
    id: "proj-2",
    title: "Smart Campus Event Management & RSVP Portal",
    leader: "Loganayagi D",
    department: "Information Technology",
    description: "Developing a real-time event publishing platform with automated email notifications, QR ticket validation, and MongoDB backend database.",
    requiredSkills: ["Node.js", "Express.js", "MongoDB", "JWT", "React.js"],
    status: "Recruiting Teammates",
    teamSize: "2 / 3 Members",
    postedDate: "2026-08-15"
  },
  {
    id: "proj-3",
    title: "Student Academic Skill Exchange Network",
    leader: "Lathika S K",
    department: "Information Technology",
    description: "P2P peer tutoring platform where students can exchange skills (e.g. teaching Python in exchange for React guidance). Needs sleek UI components.",
    requiredSkills: ["React.js", "Tailwind CSS", "JavaScript", "UI/UX", "Node.js"],
    status: "Recruiting Teammates",
    teamSize: "2 / 4 Members",
    postedDate: "2026-08-16"
  }
];

export const MOCK_EVENTS = [
  {
    id: "evt-1",
    title: "Sona Tech AI & Web Hackathon 2026",
    organizer: "Department of Information Technology",
    date: "2026-09-05",
    time: "09:00 AM - 05:00 PM",
    location: "IT Department Computer Lab 3 & Auditorium",
    category: "Hackathon",
    description: "A 24-hour hands-on hackathon focusing on building innovative AI-powered full-stack web applications for educational institutions.",
    attendeesCount: 148,
    isRegistered: true,
    badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
  },
  {
    id: "evt-2",
    title: "Workshop on Building AI Recommendation Engines with Python",
    organizer: "AI & ML Student Club",
    date: "2026-08-28",
    time: "02:00 PM - 04:30 PM",
    location: "Seminar Hall B",
    category: "Workshop",
    description: "Interactive session detailing TF-IDF vectorization, cosine distance metrics, and Scikit-Learn deployment in web APIs.",
    attendeesCount: 92,
    isRegistered: false,
    badgeColor: "bg-purple-500/20 text-purple-400 border-purple-500/30"
  },
  {
    id: "evt-3",
    title: "National Level Technical Symposium - IT EXPO 2026",
    organizer: "Sona College of Technology",
    date: "2026-09-20",
    time: "09:30 AM - 04:00 PM",
    location: "Main College Campus Auditorium",
    category: "Symposium",
    description: "Paper presentations, project expos, coding marathons, and technical quizzes hosted by the IT Department.",
    attendeesCount: 310,
    isRegistered: false,
    badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/30"
  }
];
