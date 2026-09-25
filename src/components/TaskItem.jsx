import React, { useState } from 'react';
import { FiCheck, FiTrash2, FiEdit2, FiCheckSquare, FiX, FiUser } from 'react-icons/fi';

export function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleSaveEdit = () => {
    if (editTitle.trim()) {
      onEdit(task.id, editTitle);
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditTitle(task.title);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  // User Color Rules:
  // Completed = FRESH EMERALD theme (#10B981)
  // Incomplete = WARM FRESH YELLOW theme (#F59E0B / #FEF3C7)
  const isCompleted = task.completed;

  return (
    <div 
      className={`group p-4.5 sm:p-5 rounded-2xl border transition-all duration-200 hover:-translate-y-0.5 animate-task-enter flex items-center justify-between gap-4 ${
        isCompleted 
          ? 'bg-emerald-50/40 border-emerald-200/80 hover:border-emerald-300 hover:shadow-xs' 
          : 'bg-amber-50/80 border-amber-200/90 hover:border-amber-300 hover:shadow-md'
      }`}
    >
      <div className="flex items-center gap-3.5 flex-1 min-w-0">
        {/* Checkbox */}
        <button
          type="button"
          onClick={() => onToggle(task.id)}
          className={`w-7 h-7 rounded-xl border-2 flex items-center justify-center transition-all duration-150 cursor-pointer active:scale-90 ${
            isCompleted
              ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
              : 'bg-white border-amber-300 text-transparent hover:border-amber-500 hover:bg-amber-100/60'
          }`}
          title={isCompleted ? "Mark as incomplete" : "Mark as completed"}
        >
          <FiCheck className={`w-4 h-4 stroke-[3] ${isCompleted ? 'animate-check-pop' : ''}`} />
        </button>

        {/* Task Details */}
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          {isEditing ? (
            <input
              type="text"
              className="w-full px-3 py-1.5 bg-white border border-amber-500 rounded-xl text-sm text-amber-950 font-semibold outline-none ring-2 ring-amber-500/20"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          ) : (
            <span
              onDoubleClick={() => setIsEditing(true)}
              className={`text-sm sm:text-base font-bold leading-snug break-words transition-all duration-200 cursor-pointer select-none ${
                isCompleted 
                  ? 'line-through text-slate-400 font-medium' 
                  : 'text-amber-950 hover:text-black font-bold'
              }`}
              title="Double-click to edit title"
            >
              {task.title}
            </span>
          )}

          <div className="flex items-center gap-2 text-xs">
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold text-[11px] border ${
              isCompleted 
                ? 'bg-slate-100 text-slate-600 border-slate-200/60' 
                : 'bg-amber-100/90 text-amber-900 border-amber-200/80'
            }`}>
              <FiUser className="w-3 h-3 text-amber-700/70" />
              <span>User {task.userId}</span>
            </span>

            {/* Completed = FRESH EMERALD | Incomplete = WARM YELLOW */}
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-extrabold text-[10px] uppercase shadow-2xs border ${
              isCompleted 
                ? 'bg-emerald-100 text-emerald-800 border-emerald-200/70' 
                : 'bg-amber-200/80 text-amber-950 border-amber-300/80'
            }`}>
              {isCompleted ? 'Completed' : 'Incomplete'}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
        {isEditing ? (
          <>
            <button
              onClick={handleSaveEdit}
              className="p-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-all cursor-pointer shadow-xs active:scale-95"
              title="Save changes"
            >
              <FiCheckSquare className="w-4 h-4" />
            </button>
            <button
              onClick={handleCancelEdit}
              className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all cursor-pointer shadow-xs active:scale-95"
              title="Cancel editing"
            >
              <FiX className="w-4 h-4" />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className={`p-2 rounded-xl transition-all cursor-pointer shadow-xs active:scale-95 ${
                isCompleted 
                  ? 'bg-slate-100/70 text-slate-600 hover:bg-indigo-100 hover:text-indigo-600' 
                  : 'bg-amber-100/80 text-amber-900 hover:bg-amber-200 hover:text-amber-950 border border-amber-200/60'
              }`}
              title="Edit task"
            >
              <FiEdit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className={`p-2 rounded-xl transition-all cursor-pointer shadow-xs active:scale-95 ${
                isCompleted 
                  ? 'bg-slate-100/70 text-slate-600 hover:bg-rose-100 hover:text-rose-600' 
                  : 'bg-amber-100/80 text-amber-900 hover:bg-rose-100 hover:text-rose-700 border border-amber-200/60'
              }`}
              title="Delete task"
            >
              <FiTrash2 className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}



