import React from 'react';
import { FiList, FiCheckCircle, FiClock } from 'react-icons/fi';

export function TaskStats({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {/* Total Tasks Card - FRESH INDIGO */}
      <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-100/90 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md flex flex-col justify-between">
        <div className="flex items-center justify-between text-xs font-bold text-indigo-900 uppercase tracking-wide">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <FiList className="w-4 h-4" />
            </div>
            <span>Total Tasks</span>
          </div>
        </div>
        <div className="text-3xl font-extrabold text-indigo-950 mt-3 mb-3">{total}</div>
        <div className="w-full bg-indigo-200/60 h-2 rounded-full overflow-hidden p-0.5">
          <div className="bg-indigo-600 h-full rounded-full transition-all duration-500" style={{ width: '100%' }} />
        </div>
      </div>

      {/* Completed Tasks Card - FRESH EMERALD MINT */}
      <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-100/90 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md flex flex-col justify-between">
        <div className="flex items-center justify-between text-xs font-bold text-emerald-900 uppercase tracking-wide">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <FiCheckCircle className="w-4 h-4" />
            </div>
            <span>Completed</span>
          </div>
          <span className="text-[11px] font-bold text-emerald-800 bg-white border border-emerald-200/80 px-2.5 py-0.5 rounded-full shadow-2xs">{completionRate}%</span>
        </div>
        <div className="text-3xl font-extrabold text-emerald-950 mt-3 mb-3">{completed}</div>
        <div className="w-full bg-emerald-200/60 h-2 rounded-full overflow-hidden p-0.5">
          <div 
            className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
            style={{ width: `${completionRate}%` }} 
          />
        </div>
      </div>

      {/* Pending & Incomplete Tasks Card - FRESH AMBER CORAL */}
      <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-100/90 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md flex flex-col justify-between">
        <div className="flex items-center justify-between text-xs font-bold text-amber-900 uppercase tracking-wide">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
              <FiClock className="w-4 h-4" />
            </div>
            <span>Incomplete</span>
          </div>
        </div>
        <div className="text-3xl font-extrabold text-amber-950 mt-3 mb-3">{pending}</div>
        <div className="w-full bg-amber-200/60 h-2 rounded-full overflow-hidden p-0.5">
          <div 
            className="bg-amber-500 h-full rounded-full transition-all duration-500" 
            style={{ width: `${total > 0 ? (pending / total) * 100 : 0}%` }} 
          />
        </div>
      </div>
    </div>
  );
}




