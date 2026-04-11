import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut, User as UserIcon } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-emerald-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-black tracking-widest text-emerald-50">LFWEB</Link>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 bg-emerald-700/50 px-3 py-1.5 rounded-full">
            <UserIcon size={16} />
            <span className="font-medium text-sm">{user?.name}</span>
            <span className="text-xs border border-emerald-400/50 text-emerald-100 bg-emerald-800/50 px-2 py-0.5 rounded-full ml-2">
              {user?.role}
            </span>
          </div>
          <button 
            onClick={logout} 
            className="flex items-center space-x-1 hover:text-emerald-200 transition-colors focus:outline-none"
          >
            <LogOut size={18} />
            <span className="font-semibold text-sm">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
