import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { TaskStats } from './components/TaskStats';
import { AddTaskForm } from './components/AddTaskForm';
import { FilterBar } from './components/FilterBar';
import { TaskList } from './components/TaskList';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { Toast } from './components/Toast';

const API_URL = 'https://jsonplaceholder.typicode.com/todos?_limit=15';
const LOCAL_STORAGE_KEY = 'task_tracker_app_items_v1';

export function App() {
  // Task State Management
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // App UI States
  const [filter, setFilter] = useState('all'); // 'all' | 'completed' | 'incomplete'
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'oldest' | 'title-asc' | 'title-desc' | 'status'
  const [toast, setToast] = useState(null);

  // Helper to show transient toast message
  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 2800);
  };

  // Helper to update state and sync to localStorage
  const updateTasks = useCallback((newTasks) => {
    setTasks(newTasks);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
    } catch (e) {
      console.error("Failed to write to localStorage:", e);
    }
  }, []);

  // Fetch tasks from API or read from LocalStorage with 2-second loader effect
  const fetchTasksFromAPI = useCallback(async () => {
    setLoading(true);
    setError(null);

    // Snappy 500ms loading delay for fast, responsive UI feedback
    const delayPromise = new Promise(resolve => setTimeout(resolve, 500));

    try {
      const [response] = await Promise.all([
        fetch(API_URL),
        delayPromise
      ]);

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();

      const formattedTasks = data.map(item => ({
        id: item.id,
        title: item.title,
        completed: Boolean(item.completed),
        userId: item.userId,
        createdAt: Date.now() - (15 - item.id) * 60000
      }));

      setTasks(formattedTasks);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formattedTasks));
    } catch (err) {
      console.error("Fetch tasks error:", err);
      setError(err.message || 'Failed to fetch tasks from server.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load effect (displays brief 400ms loader on app load)
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setTasks(parsed);
          const timer = setTimeout(() => {
            setLoading(false);
          }, 400);
          return () => clearTimeout(timer);
        }
      } catch (e) {
        console.warn("Error parsing localStorage data, fetching fresh from API:", e);
      }
    }

    fetchTasksFromAPI();
  }, [fetchTasksFromAPI]);

  // Task Actions Wrappers with Toast Feedback
  const handleAddTask = (title, userId = 1) => {
    if (!title || !title.trim()) return false;

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      completed: false,
      userId: Number(userId) || 1,
      createdAt: Date.now()
    };

    const nextTasks = [newTask, ...tasks];
    updateTasks(nextTasks);
    showToast(`Task "${title.length > 20 ? title.substring(0, 20) + '...' : title}" added`, 'success');
    return true;
  };

  const handleToggleTask = (id) => {
    const task = tasks.find(t => t.id === id);
    const nextTasks = tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    updateTasks(nextTasks);
    if (task) {
      showToast(task.completed ? 'Task marked as incomplete' : 'Task completed! 🎉', 'success');
    }
  };

  const handleDeleteTask = (id) => {
    const nextTasks = tasks.filter(t => t.id !== id);
    updateTasks(nextTasks);
    showToast(`Task removed`, 'danger');
  };

  const handleEditTask = (id, newTitle) => {
    if (!newTitle || !newTitle.trim()) return;
    const nextTasks = tasks.map(t =>
      t.id === id ? { ...t, title: newTitle.trim() } : t
    );
    updateTasks(nextTasks);
    showToast('Task updated successfully', 'success');
  };

  // Calculate task statistics
  const counts = useMemo(() => {
    return {
      all: tasks.length,
      completed: tasks.filter(t => t.completed).length,
      incomplete: tasks.filter(t => !t.completed).length
    };
  }, [tasks]);

  // Filter & Sort Pipeline
  const filteredAndSortedTasks = useMemo(() => {
    let result = [...tasks];

    // 1. Filter by tab status
    if (filter === 'completed') {
      result = result.filter(t => t.completed);
    } else if (filter === 'incomplete') {
      result = result.filter(t => !t.completed);
    }

    // 2. Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return (b.createdAt || b.id) - (a.createdAt || a.id);
        case 'oldest':
          return (a.createdAt || a.id) - (b.createdAt || b.id);
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        case 'status':
          return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
      }
    });

    return result;
  }, [tasks, filter, sortBy]);

  // Toggle all tasks completed status
  const handleToggleAllTasks = () => {
    if (tasks.length === 0) return;
    const allAreCompleted = tasks.every(t => t.completed);
    const nextTasks = tasks.map(t => ({
      ...t,
      completed: !allAreCompleted
    }));
    updateTasks(nextTasks);
    showToast(
      allAreCompleted ? 'All tasks marked as incomplete' : 'All tasks marked as completed! 🎉',
      'success'
    );
  };

  // Scroll to add task form smoothly
  const handleScrollToForm = () => {
    const el = document.getElementById('add-task-form-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const input = el.querySelector('input');
      if (input) input.focus();
    }
  };

  const allCompleted = tasks.length > 0 && tasks.every(t => t.completed);

  return (
    <div className="min-h-screen relative flex flex-col bg-[#F8FAFC] py-6 sm:py-10 px-3 sm:px-6 text-slate-900 selection:bg-indigo-600 selection:text-white items-center justify-center overflow-hidden">
      {/* Centered Main Page Container - Crisp White Page Sheet */}
      <div className="max-w-5xl w-full mx-auto bg-white rounded-3xl border-2 border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.08)] ring-1 ring-slate-900/5 overflow-hidden flex flex-col min-h-[85vh] relative z-10">
        <main className="w-full px-5 sm:px-10 py-8 flex-1 bg-white">
          {/* Main Stats Header */}
          {!loading && !error && <TaskStats tasks={tasks} />}

          {/* Add Task Input Form */}
          <div id="add-task-form-section">
            <AddTaskForm onAddTask={handleAddTask} />
          </div>

          {/* Filters & Toggle Check All Controls */}
          <FilterBar
            filter={filter}
            onFilterChange={setFilter}
            sortBy={sortBy}
            onSortChange={setSortBy}
            counts={counts}
            onToggleAllTasks={handleToggleAllTasks}
            allCompleted={allCompleted}
          />

          {/* Main Content Area: Loading / Error / Task List */}
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorMessage error={error} onRetry={fetchTasksFromAPI} />
          ) : (
            <TaskList
              tasks={filteredAndSortedTasks}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
              onEdit={handleEditTask}
              filter={filter}
            />
          )}
        </main>
      </div>

      <Toast notification={toast} />
    </div>
  );
}

export default App;

