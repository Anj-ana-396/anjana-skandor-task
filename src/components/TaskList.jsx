import React from 'react';
import { TaskItem } from './TaskItem';
import { FiCheckCircle } from 'react-icons/fi';

export function TaskList({ tasks, onToggle, onDelete, onEdit, filter }) {
  if (tasks.length === 0) {
    let emptyMessage = "You don't have any tasks yet. Add one above to get started!";
    if (filter === 'completed') {
      emptyMessage = "No completed tasks yet. Finish a task to see it here!";
    } else if (filter === 'incomplete') {
      emptyMessage = "Hooray! No pending tasks left to complete!";
    }

    return (
      <div className="p-10 rounded-3xl bg-white/80 backdrop-blur-md border border-slate-200/80 flex flex-col items-center justify-center text-center gap-3 shadow-xs">
        <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
          <FiCheckCircle className="w-7 h-7" />
        </div>
        <h3 className="text-base font-extrabold text-slate-900">All Clear!</h3>
        <p className="text-xs text-slate-500 max-w-xs font-medium">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3.5" role="list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

