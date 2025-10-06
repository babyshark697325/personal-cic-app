"use client";

import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Goal } from '../../types';
import { Plus, ChevronLeft, Check, Calendar as CalendarIcon } from 'lucide-react';

export default function GoalsPage() {
  const { goals, addGoal, updateGoal } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Initialize new goal with default values
  const initialNewGoal = {
    title: '',
    description: '',
    dueDate: new Date().toISOString().split('T')[0],
    progress: 0,
    priority: 'medium' as const,
    completed: false
  };
  
  const [newGoal, setNewGoal] = useState<Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>>(initialNewGoal);

  // Sample data that matches the screenshot
  const sampleGoals: Goal[] = [
    {
      id: '1',
      title: 'Complete project proposal',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      progress: 20,
      completed: false,
      priority: 'high',
      description: 'Finish the project proposal document and send for review',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      title: 'Design new logo',
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      progress: 75,
      completed: false,
      priority: 'medium',
      description: 'Create initial logo concepts for the new brand',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '3',
      title: 'Update website content',
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      progress: 10,
      completed: false,
      priority: 'high',
      description: 'Refresh the homepage and about page content',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '4',
      title: 'Team building workshop',
      dueDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      progress: 0,
      completed: false,
      priority: 'low',
      description: 'Plan and organize team building activities',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  // Use sample data if no goals exist
  const displayGoals = goals.length > 0 ? [...goals] : [...sampleGoals];
  
  // Calculate overall progress
  const completedGoals = displayGoals.filter(goal => goal.completed).length;
  const totalGoals = displayGoals.length;
  const progressPercentage = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;

  // Filter state
  const [filter, setFilter] = useState<'all' | 'in-progress' | 'completed' | 'upcoming'>('all');
  const filteredGoals = displayGoals.filter(goal => {
    if (filter === 'all') return true;
    if (filter === 'in-progress') return !goal.completed && (!goal.dueDate || new Date(goal.dueDate) >= new Date());
    if (filter === 'completed') return goal.completed;
    if (filter === 'upcoming') return !goal.completed && goal.dueDate && new Date(goal.dueDate) > new Date();
    return true;
  });

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoal.title.trim()) return;
    
    // Create a new goal with all required properties
    const newGoalWithId: Goal = {
      ...newGoal,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      completed: false,
      progress: 0
    };
    
    addGoal(newGoalWithId);
    
    // Reset form
    setNewGoal(initialNewGoal);
    setIsModalOpen(false);
  };

  const toggleComplete = (goal: Goal): void => {
    updateGoal(goal.id, { 
      completed: !goal.completed,
      progress: goal.completed ? 0 : 100,
      updatedAt: new Date() 
    });
  };

  const updateProgress = (goal: Goal, newProgress: number): void => {
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
    <main className="px-8 pt-8 pb-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl text-gray-800 leading-tight mb-2" style={{fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'}}>
              My Goals
            </h1>
            <p className="text-lg text-gray-500">
              Track your personal and professional progress here
            </p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="h-10 px-5 text-white text-sm font-medium rounded-full hover:opacity-90 transition-all" 
            style={{background: 'linear-gradient(to right, #766de0, #7d73e7, #bcb4ee)'}}
          >
            Add New Goal
          </button>
        </div>
      </div>

      {/* View Mode Toggle + Filter Bar */}
      <div className="flex items-center justify-between mb-8">
        {/* Filter Bar */}
        <div className="flex gap-4">
          {['all', 'in-progress', 'completed', 'upcoming'].map(type => (
            <button
              key={type}
              onClick={() => setFilter(type as any)}
              className={`px-4 py-2 rounded-full font-medium text-sm transition-colors focus:outline-none ${filter === type ? 'text-white shadow' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              style={filter === type ? {background: 'linear-gradient(to right, #766de0, #7d73e7, #bcb4ee)'} : {}}
            >
              {type === 'all' ? 'All Goals' : type === 'in-progress' ? 'In Progress' : type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
        {/* View Mode Toggle (icons, right aligned) */}
        <div className="flex gap-0.5 items-center h-10">
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
          {filteredGoals.map((goal) => (
            <div key={goal.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg flex flex-col justify-between border border-gray-100 transition-all duration-200 p-6" style={{minWidth: '0'}}>
              <div>
                <h2 className="text-lg text-gray-800 leading-tight mb-1" style={{fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'}}>{goal.title}</h2>
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
          ))}
        </div>
      )}

      {/* Goals List (detailed view) - hidden in grid mode */}
      {viewMode === 'list' && (
        <div className="divide-y divide-gray-50 bg-white rounded-lg border border-gray-50 mb-8">
          {/* List Header */}
          <div className="flex text-xs text-gray-500 mb-2 px-4 py-2">
            <div className="w-8"></div>
            <div className="flex-1 flex items-center">Title</div>
            <div className="w-20 flex items-center">Category</div>
            <div className="w-32 flex items-center">Progress</div>
            <div className="w-24 flex items-center">Deadline</div>
            <div className="w-24 flex items-center">Status</div>
            <div className="w-16 flex items-center justify-center text-center">Actions</div>
          </div>
          {/* List Items */}
          {filteredGoals.map((goal) => (
            <div key={goal.id} className="flex items-center gap-2 px-4 py-3 hover:bg-gray-50 transition">
              <button 
                onClick={() => toggleComplete(goal)}
                className="text-gray-400 hover:text-purple-500"
                aria-label={goal.completed ? 'Mark as incomplete' : 'Mark as complete'}
              >
                {goal.completed ? (
                  <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="10" r="9" stroke="#766de0" strokeWidth="2" fill="#f3f0ff"/><path d="M7 10l2 2 4-4" stroke="#766de0" strokeWidth="2" fill="none"/></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="#766de0" strokeWidth="2" viewBox="0 0 20 20"><circle cx="10" cy="10" r="9" stroke="#766de0" strokeWidth="2" fill="#fff"/></svg>
                )}
              </button>
              <div className="flex-1 text-sm font-medium">
                <span className={goal.completed ? 'line-through text-gray-400' : 'text-gray-900'}>{goal.title}</span>
              </div>
              <div className="w-20 flex items-center pl-2">
                <span className="inline-block text-white text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{background: 'linear-gradient(to right, #766de0, #7d73e7, #bcb4ee)'}}>{goal.category ? goal.category : 'General'}</span>
              </div>
              <div className="w-32 text-center flex items-center justify-center gap-2">
                <div className="w-20 h-1 bg-purple-100 rounded-full">
                  <div className="h-1 rounded-full transition-all duration-500" style={{ width: `${goal.progress}%`, background: 'linear-gradient(to right, #766de0, #7d73e7, #bcb4ee)' }} />
                </div>
                <span className="text-xs text-gray-700">{goal.progress}%</span>
              </div>
              <div className="w-24 text-center text-xs text-gray-700">{goal.dueDate ? formatDate(goal.dueDate) : 'No date'}</div>
              <div className="w-24 text-center">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white shadow`} style={{background: 'linear-gradient(to right, #766de0, #7d73e7, #bcb4ee)'}}>{goal.completed ? 'Completed' : 'In Progress'}</span>
              </div>
              <div className="w-16 text-center">
                {/* Example action: delete button */}
                <button className="text-red-500 hover:text-red-700 text-xs">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
