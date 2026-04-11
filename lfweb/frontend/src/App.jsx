import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import ProfileSetup from './pages/ProfileSetup';
import PassengerDashboard from './pages/PassengerDashboard';
import StaffDashboard from './pages/StaffDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Signup from "./pages/Signup";


const ProtectedRoute = ({ children, roleRequired }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" />;
  if (roleRequired && user.role !== roleRequired) return <Navigate to="/" />;
  return children;
};

const App = () => {
  const { user } = useContext(AuthContext);

  const getHomeRoute = () => {
    if (!user) return <Navigate to="/login" />;
    if (user.role === 'Passenger') {
      return user.isFirstLogin === true ? <Navigate to="/setup-profile" /> : <Navigate to="/passenger" />;
    }
    if (user.role === 'Staff') return <Navigate to="/staff" />;
    if (user.role === 'Admin') return <Navigate to="/admin" />;
    return <Navigate to="/login" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {user && <Navbar />}
      <div className="container mx-auto px-4">
        <Routes>
          <Route path="/" element={getHomeRoute()} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/setup-profile" element={<ProtectedRoute roleRequired="Passenger"><ProfileSetup /></ProtectedRoute>} />
          <Route path="/passenger/*" element={<ProtectedRoute roleRequired="Passenger"><PassengerDashboard /></ProtectedRoute>} />
          <Route path="/staff/*" element={<ProtectedRoute roleRequired="Staff"><StaffDashboard /></ProtectedRoute>} />
          <Route path="/admin/*" element={<ProtectedRoute roleRequired="Admin"><AdminDashboard /></ProtectedRoute>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
