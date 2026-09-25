import React from 'react';
import { FiAlertCircle, FiRefreshCw } from 'react-icons/fi';

export function ErrorMessage({ error, onRetry }) {
  return (
    <div className="p-8 rounded-3xl bg-rose-50/80 backdrop-blur-md border border-rose-200 shadow-xs flex flex-col items-center justify-center text-center gap-4">
      <FiAlertCircle className="w-10 h-10 text-rose-500" />
      <div>
        <h3 className="text-base font-extrabold text-rose-950">Unable to load tasks</h3>
        <p className="text-xs text-rose-700 mt-1 max-w-sm font-medium">
          {error || 'An unexpected error occurred while fetching tasks from JSONPlaceholder.'}
        </p>
      </div>
      <button
        onClick={onRetry}
        className="px-5 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs flex items-center gap-2 cursor-pointer transition-all active:scale-95"
      >
        <FiRefreshCw className="w-4 h-4" />
        <span>Try Again</span>
      </button>
    </div>
  );
}

