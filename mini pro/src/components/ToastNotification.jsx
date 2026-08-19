import React from 'react';
import { useAuth } from '../context/AuthContext';
import { CheckCircle2, Info, AlertCircle } from 'lucide-react';

export const ToastNotification = () => {
  const { toastMessage } = useAuth();

  if (!toastMessage) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
    info: <Info className="w-5 h-5 text-blue-400" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400" />
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
      <div className="glass-panel px-4 py-3 rounded-xl flex items-center space-x-3 border border-gray-700 shadow-2xl">
        {icons[toastMessage.type] || icons.success}
        <span className="text-sm font-medium text-gray-200">{toastMessage.message}</span>
      </div>
    </div>
  );
};
