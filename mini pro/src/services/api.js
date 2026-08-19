const API_BASE_URL = 'http://localhost:5000/api';

// Helper for HTTP requests with JWT Token
const fetchWithAuth = async (endpoint, options = {}) => {
  const token = localStorage.getItem('campus_connect_jwt');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers
    });
    return await response.json();
  } catch (error) {
    console.warn(`API request to ${endpoint} failed, utilizing client store fallback.`, error);
    return null;
  }
};

export const api = {
  // Auth API
  login: async (emailOrRegNo, password, role) => {
    const data = await fetchWithAuth('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ emailOrRegNo, password, role })
    });
    if (data && data.token) {
      localStorage.setItem('campus_connect_jwt', data.token);
    }
    return data;
  },

  register: async (userData) => {
    const data = await fetchWithAuth('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
    if (data && data.token) {
      localStorage.setItem('campus_connect_jwt', data.token);
    }
    return data;
  },

  // Resource API
  getResources: () => fetchWithAuth('/resources'),
  createResource: (resData) => fetchWithAuth('/resources', { method: 'POST', body: JSON.stringify(resData) }),

  // AI Matching API (Python Scikit-Learn TF-IDF Execution)
  matchTeam: (projectSkills) => fetchWithAuth('/ai/match-team', {
    method: 'POST',
    body: JSON.stringify({ projectSkills })
  }),

  // Projects API
  getProjects: () => fetchWithAuth('/projects'),
  createProject: (projData) => fetchWithAuth('/projects', { method: 'POST', body: JSON.stringify(projData) }),

  // Events API
  getEvents: () => fetchWithAuth('/events'),
  createEvent: (evtData) => fetchWithAuth('/events', { method: 'POST', body: JSON.stringify(evtData) }),

  // Admin Metrics API
  getAdminMetrics: () => fetchWithAuth('/admin/metrics')
};
