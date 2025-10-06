"use client";

import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Goal as GoalType } from '../../types';

export default function GoalsPage() {
  const { goals, addGoal, updateGoal } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    dueDate: '',
    progress: 0,
    description: ''
  });

  // Sample data that matches the screenshot
  const sampleGoals: GoalType[] = [
    {
      id: '1',
      title: 'Complete project proposal',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      progress: 20,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      title: 'Design new logo',
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      progress: 40,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '3',
      title: 'Update website content',
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      progress: 60,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  // Use sample data if no goals exist
  const displayGoals: GoalType[] = goals.length > 0 ? goals : sampleGoals;
  
  // Calculate overall progress
  const completedGoals = displayGoals.filter(goal => goal.completed).length;
  const totalGoals = displayGoals.length;
  const progressPercentage = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoal.title.trim()) return;
    
    const goalToAdd: GoalType = {
      id: Date.now().toString(),
      title: newGoal.title,
      description: newGoal.description,
      dueDate: newGoal.dueDate || undefined,
      progress: 0,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    addGoal(goalToAdd);
    setNewGoal({
      title: '',
      dueDate: '',
      progress: 0,
      description: ''
    });
    setIsModalOpen(false);
  };

  const toggleComplete = (goal: GoalType): void => {
    updateGoal(goal.id, { 
      completed: !goal.completed,
      progress: goal.completed ? 0 : 100,
      updatedAt: new Date() 
    });
  };

  const updateProgress = (goal: GoalType, newProgress: number): void => {
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

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-50 min-h-screen overflow-hidden">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button className="p-2 -ml-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1 className="text-xl font-semibold text-gray-900 flex-1 text-center -ml-6">Goals</h1>
      </div>

      {/* Progress Section */}
      <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <span className="text-sm font-medium text-[#9333EA]">Goals Progress</span>
          <span className="text-sm font-semibold text-[#9333EA]">{progressPercentage}%</span>
        </div>
        <div className="relative w-full h-2 bg-gray-100 rounded-full mb-3">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#9333EA] to-[#7C3AED] rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <p className="text-sm text-gray-500">
          <span className="font-medium text-gray-900">{completedGoals}</span> of <span className="font-medium text-gray-900">{totalGoals}</span> goals completed
        </p>
      </div>

      {/* Goals List */}
      <div className="space-y-4 mb-20">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Goals</h2>
        
        {displayGoals.map((goal) => (
          <div key={goal.id} className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="mt-1">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  goal.completed ? 'bg-[#9333EA] border-[#9333EA]' : 'border-gray-300'
                }`}>
                  {goal.completed && (
                    <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 4.5L4.33333 8L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`text-base font-medium ${
                    goal.completed ? 'line-through text-gray-400' : 'text-gray-900'
                  }`}>
                    {goal.title}
                  </h3>
                  <span className="text-sm font-medium text-gray-500">
                    {goal.progress}%
                  </span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.6667 2.6665H3.33333C2.59695 2.6665 2 3.26346 2 3.99984V13.3332C2 14.0696 2.59695 14.6665 3.33333 14.6665H12.6667C13.403 14.6665 14 14.0696 14 13.3332V3.99984C14 3.26346 13.403 2.6665 12.6667 2.6665Z" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10.666 1.3335V4.00016" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5.33398 1.3335V4.00016" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 6.6665H14" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Due {formatDate(goal.dueDate)}</span>
                </div>
                
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div 
                    className="bg-gradient-to-r from-[#9333EA] to-[#7C3AED] h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Add Goal FAB */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-[#9333EA] flex items-center justify-center shadow-lg hover:bg-[#7E22CE] transition-colors"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4V20M4 12H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {/* Add Goal Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Add New Goal</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                aria-label="Close"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleAddGoal} className="space-y-6">
              <div className="space-y-5">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Goal Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#9333EA] focus:border-transparent text-gray-700 placeholder-gray-400"
                    placeholder="E.g., Learn React"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Due Date (optional)
                  </label>
                  <input
                    type="date"
                    id="dueDate"
                    value={newGoal.dueDate}
                    onChange={(e) => setNewGoal({...newGoal, dueDate: e.target.value})}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#9333EA] focus:border-transparent text-gray-700"
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Description (optional)
                  </label>
                  <textarea
                    id="description"
                    rows={3}
                    value={newGoal.description}
                    onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#9333EA] focus:border-transparent text-gray-700 placeholder-gray-400"
                    placeholder="Add some details about your goal..."
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9333EA] focus:ring-offset-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-sm font-medium text-white bg-[#9333EA] hover:bg-[#7E22CE] rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9333EA] focus:ring-offset-white transition-colors"
                >
                  Add Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
