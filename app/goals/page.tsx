"use client";

import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Goal } from '../../types';
import { Plus, ChevronLeft, Check, Calendar as CalendarIcon, Edit2, Trash2 } from 'lucide-react';

// Animation for popup
const popupAnimation = {
  '@keyframes popup': {
    '0%': { opacity: 0, transform: 'scale(0.95) translateY(-5px)' },
    '100%': { opacity: 1, transform: 'scale(1) translateY(0)' },
  },
  '.animate-popup': {
    animation: 'popup 0.15s ease-out',
  },
};

export default function GoalsPage() {
  const { goals, addGoal, updateGoal, deleteGoal } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  // Add missing state for new goal form
  const initialNewGoal: Partial<Goal> = {
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium', // type matches Goal
    progress: 0,
    completed: false,
    subtasks: []
  };
  const [newGoal, setNewGoal] = useState<Partial<Goal>>(initialNewGoal);

  // Function to calculate progress based on subtasks
  const calculateProgress = (subtasks: Array<{ completed: boolean }> = []) => {
    if (subtasks.length === 0) return 0;
    const completedSubtasks = subtasks.filter(subtask => subtask.completed).length;
    return Math.round((completedSubtasks / subtasks.length) * 100);
  };

  // Function to toggle subtask completion
  const toggleSubtask = (goalId: string, subtaskId: string) => {
    const goal = goals.find(g => g.id === goalId);
    if (!goal || !goal.subtasks) return;
    
    const updatedSubtasks = goal.subtasks.map(subtask => 
      subtask.id === subtaskId 
        ? { ...subtask, completed: !subtask.completed, updatedAt: new Date() } 
        : subtask
    );
    
    const progress = calculateProgress(updatedSubtasks);
    const completed = progress === 100;
    
    updateGoal(goalId, {
      subtasks: updatedSubtasks,
      progress,
      completed,
      updatedAt: new Date()
    });
  };

  // Sample data with subtasks
  const sampleGoals: Goal[] = [
    {
      id: '1',
      title: 'Complete project proposal',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      progress: 33,
      completed: false,
      priority: 'high',
      description: 'Finish the project proposal document and send for review',
      subtasks: [
        {
          id: 's1',
          title: 'Write executive summary',
          completed: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 's2',
          title: 'Create project timeline',
          completed: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 's3',
          title: 'Prepare budget',
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      title: 'Design new logo',
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      progress: 0,
      completed: false,
      priority: 'medium',
      description: 'Create initial logo concepts for the new brand',
      subtasks: [
        {
          id: 's4',
          title: 'Research competitors',
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 's5',
          title: 'Create mood board',
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 's6',
          title: 'Design concepts',
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  // Use sample data if no goals exist
  const displayGoals = [...goals];
  
  // Calculate overall progress
  const completedGoals = displayGoals.filter(goal => goal.completed).length;
  const totalGoals = displayGoals.length;
  const progressPercentage = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;

  // Filter state
  const [filter, setFilter] = useState<'in-progress' | 'completed' | 'upcoming'>('in-progress');
  const [expandedGoals, setExpandedGoals] = useState<Set<string>>(new Set());
  
  const filteredGoals = displayGoals.filter(goal => {
    if (filter === 'in-progress') return !goal.completed && (!goal.dueDate || new Date(goal.dueDate) >= new Date());
    if (filter === 'completed') return goal.completed;
    if (filter === 'upcoming') return !goal.completed && goal.dueDate && new Date(goal.dueDate) > new Date();
    return true;
  });

  const toggleGoalExpansion = (goalId: string) => {
    setExpandedGoals(prev => {
      const newSet = new Set(prev);
      if (newSet.has(goalId)) {
        newSet.delete(goalId);
      } else {
        newSet.add(goalId);
      }
      return newSet;
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingGoal) {
      // Update existing goal
      updateGoal(editingGoal.id, {
        ...newGoal,
        updatedAt: new Date()
      });
      setEditingGoal(null);
    } else {
      // Add new goal
  if (!newGoal.title || !newGoal.title.trim()) return;
      
      const newGoalWithId: Goal = {
        id: Date.now().toString(),
        title: newGoal.title || '',
        description: newGoal.description || '',
        dueDate: newGoal.dueDate || '',
        targetDate: newGoal.targetDate,
        completed: false,
        progress: newGoal.progress ?? 0,
        priority: newGoal.priority ?? 'medium',
        projectId: newGoal.projectId,
        category: newGoal.category,
        subtasks: newGoal.subtasks ?? [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      addGoal(newGoalWithId);
    }
    
    // Reset form and close modal
    setNewGoal(initialNewGoal);
    setIsModalOpen(false);
  };

  // Handle edit button click
  const handleEditClick = (goal: Goal) => {
    setEditingGoal(goal);
    setNewGoal({
      title: goal.title,
      description: goal.description || '',
      dueDate: goal.dueDate || new Date().toISOString().split('T')[0],
      priority: goal.priority,
      progress: goal.progress,
      completed: goal.completed,
      subtasks: goal.subtasks || []
    });
    setIsModalOpen(true);
  };


  // Handle delete goal
  const handleDeleteGoal = (id: string) => {
    if (window.confirm('Are you sure you want to delete this goal? This action cannot be undone.')) {
      deleteGoal(id);
      setShowDeleteConfirm(null);
    }
  };

  // Get button position for delete confirmation
  const getButtonPosition = (button: HTMLElement | null) => {
    if (!button) return { top: '1rem', right: '1.5rem' };
    
    const rect = button.getBoundingClientRect();
    return {
      top: `${rect.bottom + window.scrollY + 5}px`,
      right: `${window.innerWidth - rect.right - window.scrollX}px`,
      maxWidth: 'calc(100vw - 2rem)'
    };
  };

  // Use a ref to track the delete button position
  const deleteButtonRefs = React.useRef<{[key: string]: HTMLButtonElement | null}>({});
  
  // Set button ref
  const setButtonRef = (el: HTMLButtonElement | null, id: string) => {
    if (el) {
      deleteButtonRefs.current[id] = el;
    }
  };

  // Toggle goal completion
  const toggleComplete = (goal: Goal) => {
    const completed = !goal.completed;
    updateGoal(goal.id, {
      completed,
      progress: completed ? 100 : 0,
      subtasks: goal.subtasks?.map(subtask => ({
        ...subtask,
        completed,
        updatedAt: new Date()
      })),
      updatedAt: new Date()
    });
  };

  const updateProgress = (goal: Goal, newProgress: number) => {
    updateGoal(goal.id, {
      progress: newProgress,
      completed: newProgress === 100,
      updatedAt: new Date()
    });
  };

  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return 'No due date';
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? 'Invalid date' : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch (e) {
      return 'Invalid date';
    }
  };

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
  <div className="px-8 pt-8 pb-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl text-gray-800 leading-tight mb-2" style={{fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif'}}>
              My Goals
            </h1>
            <p className="text-lg text-gray-500">
              Track your personal and professional progress here
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 h-10 px-5 text-white text-sm font-medium rounded-full hover:opacity-90 transition-all"
            style={{background: 'linear-gradient(to right, #766de0, #7d73e7, #bcb4ee)'}}
          >
            <Plus size={18} />
            Add
          </button>
        </div>
      </div>
      {/* Filter Buttons & View Mode Toggle */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('in-progress')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all focus:outline-none border-0
              ${filter === 'in-progress'
                ? 'bg-gradient-to-r from-[#766de0] via-[#7d73e7] to-[#bcb4ee] text-white scale-105'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'}
            `}
          >
            In Progress
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all focus:outline-none border-0
              ${filter === 'completed'
                ? 'bg-gradient-to-r from-[#766de0] via-[#7d73e7] to-[#bcb4ee] text-white scale-105'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'}
            `}
          >
            Completed
          </button>
          <button
            onClick={() => setFilter('upcoming')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all focus:outline-none border-0
              ${filter === 'upcoming'
                ? 'bg-gradient-to-r from-[#766de0] via-[#7d73e7] to-[#bcb4ee] text-white scale-105'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'}
            `}
          >
            Upcoming
          </button>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center justify-center h-10 w-10 transition-colors focus:outline-none ${viewMode === 'grid' ? 'text-gray-700' : 'text-gray-400 hover:text-gray-600'}`}
            aria-label="Grid view"
            style={{background: 'none'}} 
          >
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="2" width="6" height="6" rx="1.5"/>
              <rect x="12" y="2" width="6" height="6" rx="1.5"/>
              <rect x="12" y="12" width="6" height="6" rx="1.5"/>
              <rect x="2" y="12" width="6" height="6" rx="1.5"/>
            </svg>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center justify-center h-10 w-10 transition-colors focus:outline-none ${viewMode === 'list' ? 'text-gray-700' : 'text-gray-400 hover:text-gray-600'}`}
            aria-label="List view"
            style={{background: 'none'}} 
          >
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="6" x2="16" y2="6"/>
              <line x1="4" y1="10" x2="16" y2="10"/>
              <line x1="4" y1="14" x2="16" y2="14"/>
            </svg>
          </button>
        </div>
      </div>
      {/* Goals Grid (only in grid view) */}
      {viewMode === 'grid' && (
        <div className="w-full max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 mb-8">
          {filteredGoals.length === 0 ? (
            <div className="col-span-full text-center text-gray-400 py-12 text-lg">
              No goals found.
            </div>
          ) : (
            filteredGoals.map((goal) => (
              <div key={goal.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg flex flex-col justify-between border border-gray-100 transition-all duration-200 p-6" style={{minWidth: '0'}}>
                <div>
                  <h2 className="text-lg text-gray-800 leading-tight mb-1" style={{fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif'}}>{goal.title}</h2>
                  <span className="inline-block bg-[#ede9fe] text-[#6d28d9] text-[10px] font-semibold px-2 py-0.5 rounded-full mb-2">{goal.completed ? 'Completed' : 'In Progress'}</span>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-20 h-1 bg-[#ede9fe] rounded-full">
                      <div className="h-1 rounded-full transition-all duration-500" style={{ width: `${goal.progress}%`, background: 'linear-gradient(to right, #766de0, #7d73e7, #bcb4ee)' }} />
                    </div>
                    <span className="text-sm font-semibold text-[#6d28d9] ml-2">{goal.progress}%</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-700 mb-1">
                    <span>{goal.dueDate ? formatDate(goal.dueDate) : 'No date'}</span>
                    <span>{goal.completed ? 'Completed' : 'In Progress'}</span>
                  </div>
                </div>
                {goal.description && (
                  <p className="text-sm text-gray-400 italic mt-2 line-clamp-3">{goal.description}</p>
                )}
              </div>
            ))
          )}
        </div>
      )}
      {/* Minimal List View */}
      {viewMode === 'list' && (
        <div key="list-view" className="bg-white rounded-lg border border-gray-100 mb-8 overflow-hidden">
          {/* Header */}
          <div className="flex items-center border-b border-gray-100 bg-gray-50">
            <div className="flex-1 px-6 py-3 text-sm font-medium text-gray-500">Title</div>
            <div className="flex items-center">
              <div className="w-28 px-3 py-3 text-sm font-medium text-gray-500">Category</div>
              <div className="w-32 px-3 py-3 text-sm font-medium text-gray-500">Progress</div>
              <div className="w-28 px-3 py-3 text-sm font-medium text-gray-500 text-center">Due Date</div>
              <div className="w-24 px-3 py-3 text-sm font-medium text-gray-500 text-center">Status</div>
              <div className="w-28 px-3 py-3 text-sm font-medium text-gray-500 text-center">Actions</div>
            </div>
          </div>
          {/* Rows */}
          <div className="divide-y divide-gray-50">
            {filteredGoals.map((goal) => (
              <div key={goal.id} className="flex items-center hover:bg-gray-50 transition-colors">
                {/* Title with expandable subtasks */}
                <div className="flex-1 px-6 py-3">
                  <div className="flex items-center">
                    {goal.subtasks && goal.subtasks.length > 0 && (
                      <button 
                        onClick={() => toggleGoalExpansion(goal.id)}
                        className="mr-2 text-gray-400 hover:text-gray-600"
                        aria-label={expandedGoals.has(goal.id) ? 'Collapse subtasks' : 'Expand subtasks'}
                      >
                        <svg 
                          className={`w-4 h-4 transition-transform duration-200 ${expandedGoals.has(goal.id) ? 'rotate-90' : ''}`} 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    )}
                    <div className="text-sm text-gray-900">
                      <span className={goal.completed ? 'line-through text-gray-400' : ''}>
                        {goal.title}
                      </span>
                      {goal.subtasks && goal.subtasks.length > 0 && (
                        <span className="ml-2 text-xs text-gray-400">
                          ({goal.subtasks.filter(st => st.completed).length}/{goal.subtasks.length} completed)
                        </span>
                      )}
                    </div>
                  </div>
                  {/* Subtasks dropdown */}
                  {goal.subtasks && goal.subtasks.length > 0 && expandedGoals.has(goal.id) && (
                    <div className="mt-2 ml-6 space-y-1.5">
                      {goal.subtasks.map((subtask) => (
                        <div key={subtask.id} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={subtask.completed}
                            onChange={() => toggleSubtask(goal.id, subtask.id)}
                            className="h-3 w-3 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <span 
                            className={`ml-2 text-xs ${subtask.completed ? 'line-through text-gray-400' : 'text-gray-600'}`}
                          >
                            {subtask.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {/* Right-aligned content */}
                <div className="flex items-center">
                  {/* Category */}
                  <div className="w-28 px-3 py-3">
                    <span className="text-xs px-2 py-0.5 rounded-full inline-block" 
                      style={{background: 'linear-gradient(to right, #766de0, #7d73e7, #bcb4ee)', color: 'white'}}>
                      {goal.priority.charAt(0).toUpperCase() + goal.priority.slice(1)}
                    </span>
                  </div>
                  {/* Progress */}
                  <div className="w-32 px-3 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-20 bg-gray-100 rounded-full h-1.5">
                        <div 
                          className="h-1.5 rounded-full" 
                          style={{ 
                            width: `${goal.progress}%`,
                            background: 'linear-gradient(to right, #766de0, #7d73e7, #bcb4ee)'
                          }}
                        />
                      </div>
                      <span className="text-xs text-gray-700">{goal.progress}%</span>
                    </div>
                  </div>
                  {/* Due Date */}
                  <div className="w-28 px-3 py-3 text-center">
                    {goal.dueDate ? formatDate(goal.dueDate) : '—'}
                  </div>
                  {/* Status */}
                  <div className="w-24 px-3 py-3 text-center">
                    <span className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        background: 'linear-gradient(to right, #766de0, #7d73e7, #bcb4ee)',
                        color: 'white'
                      }}>
                      {goal.completed ? 'Done' : 'Active'}
                    </span>
                  </div>
                  {/* Actions */}
                  <div className="w-28 px-3 py-3 text-center relative" style={{ overflow: 'visible' }}>
                    <div className="flex items-center justify-center space-x-2">
                      <button 
                        onClick={() => handleEditClick(goal)}
                        className="text-gray-400 hover:text-blue-500 transition-colors p-1.5 rounded-full hover:bg-blue-50"
                        aria-label="Edit goal"
                        title="Edit goal"
                      >
                        <Edit2 size={16} />
                      </button>
                      <div className="relative">
                        <button 
                          ref={el => setButtonRef(el, goal.id)}
                          onClick={() => setShowDeleteConfirm(showDeleteConfirm === goal.id ? null : goal.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1.5 rounded-full hover:bg-red-50 relative"
                          aria-label="Delete goal"
                          title="Delete goal"
                          data-goal-id={goal.id}
                        >
                          <Trash2 size={16} />
                        </button>
                        {/* Delete confirmation with proper positioning */}
                        {showDeleteConfirm === goal.id && (
                          <div 
                            className="fixed inset-0 z-50"
                            onClick={() => setShowDeleteConfirm(null)}
                            style={{ pointerEvents: 'none' }}
                          >
                            <div 
                              className="absolute bg-white rounded-lg shadow-xl border border-gray-200 animate-popup w-48"
                              style={{
                                pointerEvents: 'auto',
                                position: 'absolute',
                                top: deleteButtonRefs.current[goal.id] 
                                  ? `${deleteButtonRefs.current[goal.id]!.getBoundingClientRect().bottom + window.scrollY + 5}px`
                                  : '1rem',
                                right: '1.5rem',
                                maxWidth: 'calc(100vw - 3rem)'
                              }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="p-3">
                                <p className="text-sm text-gray-700 mb-2">
                                  Are you sure you want to delete this goal? This action cannot be undone.
                                </p>
                                <div className="flex justify-end gap-2">
                                  <button
                                    onClick={() => setShowDeleteConfirm(null)}
                                    className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={() => handleDeleteGoal(goal.id)}
                                    className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Add/Edit Goal Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setIsModalOpen(false)}>
          <div className="bg-white rounded-lg p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {editingGoal ? 'Edit Goal' : 'Add New Goal'}
              </h2>
              <button 
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingGoal(null);
                }}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="title">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="description">
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows={3}
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700" htmlFor="dueDate">
                    Due Date
                  </label>
                  <input
                    type="date"
                    name="dueDate"
                    id="dueDate"
                    value={newGoal.dueDate}
                    onChange={(e) => setNewGoal({...newGoal, dueDate: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700" htmlFor="priority">
                    Priority
                  </label>
                  <select
                    name="priority"
                    id="priority"
                    value={newGoal.priority}
                    onChange={(e) => setNewGoal({...newGoal, priority: e.target.value as 'low' | 'medium' | 'high'})}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingGoal(null);
                  }}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  {editingGoal ? 'Update Goal' : 'Add Goal'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
