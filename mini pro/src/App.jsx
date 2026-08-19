import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastNotification } from './components/ToastNotification';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { ResourceHub } from './pages/ResourceHub';
import { TeamFinder } from './pages/TeamFinder';
import { EventManagement } from './pages/EventManagement';
import { AdminDashboard } from './pages/AdminDashboard';
import { ProfilePage } from './pages/ProfilePage';
import { UploadResourceModal } from './components/UploadResourceModal';
import { CreateProjectModal } from './components/CreateProjectModal';
import { CreateEventModal } from './components/CreateEventModal';
import { ConnectModal } from './components/ConnectModal';

const MainAppContent = () => {
  const { isLoggedIn, currentUser } = useAuth();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [isEventOpen, setIsEventOpen] = useState(false);
  const [connectStudent, setConnectStudent] = useState(null);

  // If not authenticated, render dual-role Login Page
  if (!isLoggedIn) {
    return (
      <>
        <Login />
        <ToastNotification />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f19] text-gray-100 selection:bg-emerald-500 selection:text-white">
      
      {/* Top Navbar Header */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <Dashboard 
            setActiveTab={setActiveTab} 
            onOpenUpload={() => setIsUploadOpen(true)}
            onOpenProject={() => setIsProjectOpen(true)}
          />
        )}

        {activeTab === 'resources' && (
          <ResourceHub 
            onOpenUpload={() => setIsUploadOpen(true)}
          />
        )}

        {activeTab === 'teamfinder' && (
          <TeamFinder 
            onOpenProject={() => setIsProjectOpen(true)}
            onSelectConnectStudent={(student) => setConnectStudent(student)}
          />
        )}

        {activeTab === 'events' && (
          <EventManagement 
            onOpenCreateEvent={() => setIsEventOpen(true)}
          />
        )}

        {activeTab === 'admin' && currentUser.role === 'Admin' && (
          <AdminDashboard />
        )}

        {activeTab === 'profile' && (
          <ProfilePage />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Toast Notification */}
      <ToastNotification />

      {/* Modals */}
      <UploadResourceModal 
        isOpen={isUploadOpen} 
        onClose={() => setIsUploadOpen(false)} 
      />

      <CreateProjectModal 
        isOpen={isProjectOpen} 
        onClose={() => setIsProjectOpen(false)} 
      />

      <CreateEventModal 
        isOpen={isEventOpen} 
        onClose={() => setIsEventOpen(false)} 
      />

      <ConnectModal 
        isOpen={!!connectStudent} 
        onClose={() => setConnectStudent(null)} 
        student={connectStudent}
      />

    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MainAppContent />
    </AuthProvider>
  );
}
