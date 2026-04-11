import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const ProfileSetup = () => {
  const [contact, setContact] = useState('');
  const [idProof, setIdProof] = useState('');
  const { updateProfileStatus } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/setup-profile', { contact, idProof });
      updateProfileStatus(false);
      navigate('/passenger');
    } catch (err) {
      alert('Failed to setup profile');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-16 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Complete Your Profile</h2>
      <p className="text-gray-500 mb-8">Please provide your contact details and an ID proof to proceed to the Passenger Dashboard.</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
          <input 
            type="text" 
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ID Proof (e.g., Passport Number or National ID)</label>
          <input 
            type="text" 
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
            value={idProof}
            onChange={(e) => setIdProof(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg transition-colors shadow-md">
          Complete Setup
        </button>
      </form>
    </div>
  );
};

export default ProfileSetup;
