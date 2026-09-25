import React from 'react';
import { FiCheckCircle, FiTrash2, FiInfo } from 'react-icons/fi';

export function Toast({ notification }) {
  if (!notification) return null;

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <FiCheckCircle className="w-4 h-4 text-emerald-400" />;
      case 'danger':
        return <FiTrash2 className="w-4 h-4 text-rose-400" />;
      default:
        return <FiInfo className="w-4 h-4 text-indigo-400" />;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      <div className="px-5 py-3.5 rounded-full bg-slate-900/95 border border-slate-800 text-white text-xs font-bold shadow-xl shadow-slate-900/20 backdrop-blur-md flex items-center gap-3 animate-task-enter">
        <div className="p-1 rounded-full bg-slate-800">
          {getIcon()}
        </div>
        <span>{notification.message}</span>
      </div>
    </div>
  );
}

