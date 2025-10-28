"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";

export default function RemindersPage() {
  const [reminders, setReminders] = useState([
    {
      id: 1,
      text: "Assess any new risks identified in the morning meeting.",
      completed: false
    },
    {
      id: 2,
      text: "Outline key points for tomorrow's stand-up meeting.",
      completed: false
    }
  ]);

  const toggleReminderCompletion = (reminderId: number) => {
    setReminders(reminders.map(reminder => 
      reminder.id === reminderId ? { ...reminder, completed: !reminder.completed } : reminder
    ));
  };

  const deleteReminder = (reminderId: number) => {
    setReminders(reminders.filter(reminder => reminder.id !== reminderId));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="px-4 sm:px-8 pt-6 sm:pt-8 pb-24 sm:pb-8 max-w-2xl sm:max-w-full mx-auto w-full">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl text-gray-800 leading-tight mb-2" style={{fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif'}}>
                Reminders
              </h1>
              <p className="text-lg text-gray-600">
                View and manage your reminders for today
              </p>
            </div>
            <button
              onClick={() => {/* TODO: open reminder modal or add logic */}}
              className="flex items-center gap-2 h-10 px-5 text-white text-sm font-medium rounded-full hover:opacity-90 transition-all"
              style={{background: 'linear-gradient(to right, #766de0, #7d73e7, #bcb4ee)'}}
            >
              <Plus size={18} />
              Add
            </button>
          </div>
        </div>

  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
          {/* Reminders List */}
          <div className="col-span-2">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" style={{color: '#837acb'}}>
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12,6 12,12 16,14"/>
                  </svg>
                  <h2 className="text-lg font-medium text-gray-900">Reminders</h2>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm text-gray-700">Today</span>
                  <span className="text-sm text-gray-500">• {reminders.length}</span>
                </div>
              </div>
              <div className="divide-y divide-gray-100">
                {reminders.map(reminder => (
                  <div key={reminder.id} className="flex items-start justify-between py-4 hover:bg-gray-50 rounded-lg">
                    <div className="flex-1 pr-4">
                      <p className={`text-sm ${reminder.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>{reminder.text}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => toggleReminderCompletion(reminder.id)}
                        className="text-black hover:text-green-500 p-1"
                        title="Mark as complete"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"/>
                          <polyline points="9,12 12,15 16,9"/>
                        </svg>
                      </button>
                      <button 
                        onClick={() => deleteReminder(reminder.id)}
                        className="text-black hover:text-red-500 p-1"
                        title="Delete reminder"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3,6 5,6 21,6"/>
                          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m5 0V4a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg text-gray-800 font-sans mb-4" style={{fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'}}>Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Reminders</span>
                <span className="text-sm font-medium text-gray-900">{reminders.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Completed</span>
                <span className="text-sm font-medium text-gray-900">{reminders.filter(r => r.completed).length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Pending</span>
                <span className="text-sm font-medium text-gray-900">{reminders.filter(r => !r.completed).length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
