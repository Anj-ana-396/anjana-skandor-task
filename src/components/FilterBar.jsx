import React from 'react';
import { FiCheckSquare, FiSquare } from 'react-icons/fi';

export function FilterBar({
  filter,
  onFilterChange,
  sortBy,
  onSortChange,
  counts,
  onToggleAllTasks,
  allCompleted
}) {
  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-xs mb-5 flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex p-1 bg-slate-100/90 rounded-full border border-slate-200/80 gap-1" role="tablist">
          {/* ALL Tab - INDIGO */}
          <button
            role="tab"
            aria-selected={filter === 'all'}
            onClick={() => onFilterChange('all')}
            className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all flex items-center gap-1.5 cursor-pointer ${
              filter === 'all'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <span>All</span>
            <span className={`px-2 py-0.5 text-[10px] rounded-full font-bold ${filter === 'all' ? 'bg-white/25 text-white' : 'bg-slate-200 text-slate-700'}`}>
              {counts.all}
            </span>
          </button>

          {/* INCOMPLETE Tab - AMBER */}
          <button
            role="tab"
            aria-selected={filter === 'incomplete'}
            onClick={() => onFilterChange('incomplete')}
            className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all flex items-center gap-1.5 cursor-pointer ${
              filter === 'incomplete'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-amber-800 hover:bg-amber-100/60'
            }`}
          >
            <span>Incomplete</span>
            <span className={`px-2 py-0.5 text-[10px] rounded-full font-bold ${filter === 'incomplete' ? 'bg-white/25 text-white' : 'bg-amber-100 text-amber-800'}`}>
              {counts.incomplete}
            </span>
          </button>

          {/* COMPLETED Tab - EMERALD */}
          <button
            role="tab"
            aria-selected={filter === 'completed'}
            onClick={() => onFilterChange('completed')}
            className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all flex items-center gap-1.5 cursor-pointer ${
              filter === 'completed'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-emerald-800 hover:bg-emerald-100/60'
            }`}
          >
            <span>Completed</span>
            <span className={`px-2 py-0.5 text-[10px] rounded-full font-bold ${filter === 'completed' ? 'bg-white/25 text-white' : 'bg-emerald-100 text-emerald-800'}`}>
              {counts.completed}
            </span>
          </button>
        </div>

        {/* Toggle Check All Button */}
        {counts.all > 0 && (
          <button
            type="button"
            onClick={onToggleAllTasks}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-full border transition-all flex items-center gap-2 cursor-pointer shadow-xs active:scale-95 ${
              allCompleted
                ? 'bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-white hover:border-indigo-300 hover:text-indigo-600'
            }`}
            title={allCompleted ? "Mark all as incomplete" : "Mark all as completed"}
          >
            {allCompleted ? (
              <FiCheckSquare className="w-4 h-4 text-white" />
            ) : (
              <FiSquare className="w-4 h-4 text-indigo-600" />
            )}
            <span>{allCompleted ? 'Uncheck All' : 'Check All'}</span>
          </button>
        )}
      </div>

      {/* Sort Controls */}
      <div className="flex items-center gap-2 justify-end w-full sm:w-auto">
        <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">Sort:</span>
        <select
          className="px-3.5 py-2 bg-slate-50/90 border border-slate-200 rounded-full text-xs text-slate-800 font-bold outline-none cursor-pointer focus:bg-white focus:border-indigo-500 transition-all"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="title-asc">Title (A – Z)</option>
          <option value="title-desc">Title (Z – A)</option>
          <option value="status">Incomplete First</option>
        </select>
      </div>
    </div>
  );
}



