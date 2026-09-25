import React from 'react';

export function LoadingSpinner() {
  return (
    <div className="py-10 px-6 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-xs flex flex-col items-center justify-center gap-3">
      <div className="w-8 h-8 rounded-full border-3 border-indigo-100 border-t-indigo-600 animate-spin" />
      <span className="text-xs font-semibold text-slate-700">Loading tasks...</span>
    </div>
  );
}



