import React, { useState } from 'react';
import { FiPlus, FiAlertCircle } from 'react-icons/fi';

export function AddTaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Task title cannot be empty.');
      return;
    }

    const success = onAddTask(title, 1);
    if (success) {
      setTitle('');
      setError('');
    }
  };

  const handleInputChange = (e) => {
    setTitle(e.target.value);
    if (error && e.target.value.trim()) {
      setError('');
    }
  };

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-xs hover:shadow-md transition-all mb-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          {/* Text Input */}
          <div className="relative flex-1 w-full flex items-center">
            <div className="absolute left-3.5 w-7 h-7 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center pointer-events-none">
              <FiPlus className="w-4 h-4" />
            </div>
            <input
              type="text"
              className="w-full pl-12 pr-4 py-3 bg-slate-50/80 border border-slate-200 rounded-full text-xs sm:text-sm text-slate-800 placeholder-slate-400 font-medium outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15 transition-all"
              placeholder="What needs to be done? (e.g. Project Research)"
              value={title}
              onChange={handleInputChange}
            />
          </div>

          {/* Add Button - Gradient Indigo-Violet Pill */}
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-indigo-500/20 hover:shadow-md hover:shadow-indigo-500/30 transition-all active:scale-95"
          >
            <FiPlus className="w-4 h-4" />
            <span>Add task</span>
          </button>
        </div>

        {error && (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 pl-2 mt-1">
            <FiAlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}
      </form>
    </div>
  );
}

