import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_RESOURCES, MOCK_STUDENTS, MOCK_PROJECTS, MOCK_EVENTS } from '../data/mockData';
import { api } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Authentication status state
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Current logged in user state
  const [currentUser, setCurrentUser] = useState({
    id: "std-1",
    name: "Lathika S K",
    regNo: "61782323106054",
    role: "Student", // "Student" or "Admin"
    department: "Information Technology",
    year: "3rd Year",
    email: "lathika@sonatech.ac.in",
    skills: ["React.js", "HTML5", "CSS3", "Tailwind CSS", "JavaScript", "UI/UX", "Git"],
    interests: ["Web Apps", "Frontend Architecture", "UI Design"],
    bio: "Passionate Full-Stack Developer focusing on React.js, Tailwind CSS, and UI/UX design."
  });

  const [resources, setResources] = useState(MOCK_RESOURCES);
  const [projects, setProjects] = useState(MOCK_PROJECTS);
  const [students, setStudents] = useState(MOCK_STUDENTS);
  const [events, setEvents] = useState(MOCK_EVENTS);
  const [toastMessage, setToastMessage] = useState(null);

  // Show Toast notification
  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Sync initial data with backend REST server upon mount
  useEffect(() => {
    async function loadBackendData() {
      const resData = await api.getResources();
      if (resData && resData.resources) setResources(resData.resources);

      const projData = await api.getProjects();
      if (projData && projData.projects) setProjects(projData.projects);

      const evtData = await api.getEvents();
      if (evtData && evtData.events) setEvents(evtData.events);
    }
    loadBackendData();
  }, []);

  // Perform Role-Based Login with Backend API integration
  const login = async (role, userData) => {
    const apiRes = await api.login(userData.regNo || userData.email, 'password123', role);

    if (apiRes && apiRes.success && apiRes.user) {
      setCurrentUser(apiRes.user);
      setIsLoggedIn(true);
      showToast(`Welcome ${apiRes.user.name}! Logged in via Node.js REST API (${apiRes.user.role}).`, 'success');
      return;
    }

    // Fallback if backend API offline
    if (role === 'Admin') {
      setCurrentUser({
        id: "admin-1",
        name: userData.name || "Dr. S. K. Ramesh (Admin)",
        regNo: "FAC-IT-2026",
        role: "Admin",
        department: userData.department || "Information Technology",
        year: "Faculty Head",
        email: userData.email || "admin.it@sonatech.ac.in",
        skills: ["System Administration", "Curriculum Oversight"],
        interests: ["Academic Research"],
        bio: "Head of IT Department at Sona College of Technology."
      });
    } else {
      setCurrentUser({
        id: userData.id || `std-${Date.now()}`,
        name: userData.name || "Lathika S K",
        regNo: userData.regNo || "61782323106054",
        role: "Student",
        department: userData.department || "Information Technology",
        year: userData.year || "3rd Year",
        email: userData.email || "lathika@sonatech.ac.in",
        skills: userData.skills || ["React.js", "Python", "JavaScript"],
        interests: ["Web Apps"],
        bio: userData.bio || "Student at Sona College of Technology."
      });
    }
    setIsLoggedIn(true);
    showToast(`Welcome ${userData.name || 'Lathika S K'}! Logged in as ${role}.`, 'success');
  };

  // Perform Logout
  const logout = () => {
    localStorage.removeItem('campus_connect_jwt');
    setIsLoggedIn(false);
    showToast("Logged out successfully.", 'info');
  };

  // Toggle user role dynamically
  const toggleRole = () => {
    if (currentUser.role === 'Student') {
      login('Admin', { name: 'Dr. S. K. Ramesh (Admin)', email: 'admin.it@sonatech.ac.in' });
    } else {
      login('Student', { name: 'Lathika S K', regNo: '61782323106054', email: 'lathika@sonatech.ac.in' });
    }
  };

  // Add new academic resource via REST API
  const addResource = async (newRes) => {
    const createdResource = {
      id: `res-${Date.now()}`,
      uploader: currentUser.name,
      uploaderRole: currentUser.role,
      date: new Date().toISOString().split('T')[0],
      downloads: 0,
      rating: 5.0,
      ...newRes
    };

    setResources([createdResource, ...resources]);
    showToast(`Resource "${newRes.title}" successfully published!`);
    api.createResource(createdResource);
  };

  // Add new project posting via REST API
  const addProject = async (newProj) => {
    const createdProj = {
      id: `proj-${Date.now()}`,
      leader: currentUser.name,
      department: currentUser.department,
      status: "Recruiting Teammates",
      teamSize: "1 / 4 Members",
      postedDate: new Date().toISOString().split('T')[0],
      ...newProj
    };

    setProjects([createdProj, ...projects]);
    showToast(`Project "${newProj.title}" posted to AI Team Finder!`);
    api.createProject(createdProj);
  };

  // Add new campus event via REST API
  const addEvent = async (newEvent) => {
    const createdEvent = {
      id: `evt-${Date.now()}`,
      organizer: currentUser.role === 'Admin' ? 'Department of IT Admin' : currentUser.name,
      attendeesCount: 1,
      isRegistered: true,
      badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      ...newEvent
    };

    setEvents([createdEvent, ...events]);
    showToast(`Campus Event "${newEvent.title}" published!`);
    api.createEvent(createdEvent);
  };

  // Toggle event registration
  const toggleEventRegistration = (eventId) => {
    setEvents(events.map((evt) => {
      if (evt.id === eventId) {
        const nextState = !evt.isRegistered;
        showToast(nextState ? `Registered for ${evt.title}` : `Cancelled registration for ${evt.title}`, nextState ? 'success' : 'info');
        return {
          ...evt,
          isRegistered: nextState,
          attendeesCount: nextState ? evt.attendeesCount + 1 : evt.attendeesCount - 1
        };
      }
      return evt;
    }));
  };

  // Update user skills
  const updateUserSkills = (newSkills) => {
    setCurrentUser((prev) => ({
      ...prev,
      skills: newSkills
    }));
    showToast('Profile technical skills updated!');
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        currentUser,
        setCurrentUser,
        toggleRole,
        resources,
        addResource,
        projects,
        addProject,
        students,
        events,
        addEvent,
        toggleEventRegistration,
        updateUserSkills,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
