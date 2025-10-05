"use client";

import { useState } from 'react';
import TasksWidget from "../components/TasksWidget";

export default function Home() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "One-on-One Meeting",
      priority: "High",
      dueDate: "Today",
      status: "in-progress",
      completed: false
    },
    {
      id: 2,
      name: "Send a summary email to stakeholders",
      priority: "Low",
      dueDate: "3 days left",
      status: "in-progress",
      completed: false
    }
  ]);

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

  const [showTaskForm, setShowTaskForm] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');

  const addTask = () => {
    if (newTaskName.trim()) {
      const newTask = {
        id: tasks.length + 1,
        name: newTaskName,
        priority: "Medium",
        dueDate: "No date",
        status: "in-progress",
        completed: false
      };
      setTasks([...tasks, newTask]);
      setNewTaskName('');
      setShowTaskForm(false);
    }
  };

  const toggleTaskCompletion = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const toggleReminderCompletion = (reminderId: number) => {
    setReminders(reminders.map(reminder => 
      reminder.id === reminderId ? { ...reminder, completed: !reminder.completed } : reminder
    ));
  };

  const deleteReminder = (reminderId: number) => {
    setReminders(reminders.filter(reminder => reminder.id !== reminderId));
  };

  return (
    <div className="bg-gray-50 min-h-screen relative">
      {/* Grid background pattern with fade - starts at absolute top */}
      <div className="absolute inset-0 top-0">
        <div 
          className="w-full"
          style={{
            height: '280px',
            backgroundImage: `
              linear-gradient(to right, #9ca3af 1px, transparent 1px),
              linear-gradient(to bottom, #9ca3af 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 30%, rgba(0,0,0,0.05) 70%, transparent 90%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 30%, rgba(0,0,0,0.05) 70%, transparent 90%)'
          }}
        ></div>

      <div className="px-8 pt-8 pb-8 relative">
        {/* Dashboard Header Section */}
        <div className="relative pb-8">
          <div className="flex items-end justify-between">
            {/* Left side - Date and Greeting */}
            <div>
              <p className="text-sm text-gray-500 mb-6 mt-4">Mon, July 7</p>
              <div className="space-y-1">
                <h1 className="text-4xl text-gray-800 leading-tight" style={{fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'}}>Hello, Keira</h1>
                <div className="flex items-center">
                  <p className="text-4xl bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent leading-tight" style={{fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'}}>
                    How can I help you today?
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Action Buttons aligned with second line */}
            <div className="flex items-center space-x-4 mb-1">
              {/* Ask AI button - filled gradient pill */}
              <button 
                onClick={() => alert('AI feature coming soon!')}
                className="h-10 px-5 text-white text-sm font-medium rounded-full hover:opacity-90 transition-all" 
                style={{background: 'linear-gradient(to right, #766de0, #7d73e7, #bcb4ee)'}}
              >
                Ask AI
              </button>

              {/* Outlined gradient border pills */}
              <div className="h-10 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 p-0.5">
                <button 
                  onClick={() => alert('Getting task updates...')}
                  className="h-full px-5 bg-gray-50 text-black text-sm font-medium rounded-full hover:bg-white/10 transition-all flex items-center whitespace-nowrap"
                >
                  Get tasks updates
                </button>
              </div>

              <div className="h-10 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 p-0.5">
                <button 
                  onClick={() => alert('Create workspace feature coming soon!')}
                  className="h-full px-5 bg-gray-50 text-black text-sm font-medium rounded-full hover:bg-white/10 transition-all flex items-center whitespace-nowrap"
                >
                  Create workspace
                </button>
              </div>

              <div className="h-10 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 p-0.5">
                <button 
                  onClick={() => alert('Connect apps feature coming soon!')}
                  className="h-full px-5 bg-gray-50 text-black text-sm font-medium rounded-full hover:bg-white/10 transition-all flex items-center whitespace-nowrap"
                >
                  Connect apps
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Widget Grid - 2 Column layout */}
        <div className="grid grid-cols-2 gap-6">
          {/* Left Column - My Tasks Widget */}
          <div className="space-y-6">
            <TasksWidget
              tasks={tasks}
              showTaskForm={showTaskForm}
              newTaskName={newTaskName}
              toggleTaskCompletion={toggleTaskCompletion}
              setShowTaskForm={setShowTaskForm}
              setNewTaskName={setNewTaskName}
              addTask={addTask}
            />
          </div>
            
            {/* My Goals Widget - moved to left column */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" style={{color: '#837acb'}}>
                    <circle cx="12" cy="12" r="10"/>
                    <circle cx="12" cy="12" r="6"/>
                    <circle cx="12" cy="12" r="2"/>
                  </svg>
                  <h2 className="text-lg text-gray-800" style={{fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'}}>My Goals</h2>
                </div>
                <button className="text-gray-600 hover:text-gray-800">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-800">Check Emails and Messages</span>
                    <div className="flex items-center gap-3">
                      <div className="w-20 bg-gray-200 rounded-md h-2">
                        <div className="h-2 rounded-md" style={{width: '73%', backgroundColor: '#31d3cb'}}></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">73%</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">Product launch • My Projects</div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-800">Prepare a brief status update to the client</span>
                    <div className="flex items-center gap-3">
                      <div className="w-20 bg-gray-200 rounded-md h-2">
                        <div className="h-2 rounded-md" style={{width: '11%', backgroundColor: '#f8ac67'}}></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">11%</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">Product launch • My Projects</div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-800">Update project documentation</span>
                    <div className="flex items-center gap-3">
                      <div className="w-20 bg-gray-200 rounded-md h-2">
                        <div className="h-2 rounded-md" style={{width: '63%', backgroundColor: '#31d3cb'}}></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">63%</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">Team brainstorm • My Projects</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Projects and Calendar */}
          <div className="space-y-6">
            {/* Projects Widget */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" style={{color: '#837acb'}}>
                  <path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Z"/>
                  <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
                <h2 className="text-lg text-gray-800" style={{fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'}}>Projects</h2>
              </div>
                <button className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1">
                  <span>Recents</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {/* Create new project card */}
                <button 
                  onClick={() => alert('Create new project feature coming soon!')}
                  className="p-3 rounded-lg border-2 border-dashed border-gray-200 hover:bg-gray-50 min-h-[60px]"
                >
                  <div className="flex items-center gap-3 h-full">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"/>
                        <line x1="5" y1="12" x2="19" y2="12"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm text-gray-600 font-medium">Create new project</h3>
                    </div>
                  </div>
                </button>

                {/* Product launch */}
                <button 
                  onClick={() => alert('Viewing Product launch project...')}
                  className="p-3 rounded-lg border border-gray-200 hover:bg-gray-50 min-h-[60px] text-left"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{backgroundColor: '#f3e4ff'}}>
                      <div className="w-5 h-5 rounded transform rotate-45" style={{backgroundColor: '#9223c6'}}></div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm text-gray-900 font-medium mb-1">Product launch</h3>
                      <p className="text-xs text-gray-500">6 tasks • 12 teammates</p>
                    </div>
                  </div>
                </button>

                {/* Team brainstorm */}
                <button 
                  onClick={() => alert('Viewing Team brainstorm project...')}
                  className="p-3 rounded-lg border border-gray-200 hover:bg-gray-50 min-h-[60px] text-left"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{backgroundColor: '#eae8ff'}}>
                      <div className="w-5 h-5 rounded transform rotate-45" style={{backgroundColor: '#242ac9'}}></div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm text-gray-900 font-medium mb-1">Team brainstorm</h3>
                      <p className="text-xs text-gray-500">2 tasks • 32 teammates</p>
                    </div>
                  </div>
                </button>

                {/* Branding launch */}
                <button 
                  onClick={() => alert('Viewing Branding launch project...')}
                  className="p-3 rounded-lg border border-gray-200 hover:bg-gray-50 min-h-[60px] text-left"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{backgroundColor: '#dcf1fa'}}>
                      <div className="w-5 h-5 rounded transform rotate-45" style={{backgroundColor: '#21b6c8'}}></div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm text-gray-900 font-medium mb-1">Branding launch</h3>
                      <p className="text-xs text-gray-500">4 tasks • 9 teammates</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Calendar Widget */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" style={{color: '#837acb'}}>
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <h2 className="text-lg font-medium text-gray-900">Calendar</h2>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm text-gray-700">July</span>
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Week navigation */}
              <div className="flex items-center justify-between mb-6">
                <button className="p-1 hover:bg-gray-100 rounded">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15,18 9,12 15,6"/>
                  </svg>
                </button>
                
                <div className="flex items-center gap-2">
                  {[
                    { day: 'Fri', date: '04' },
                    { day: 'Sat', date: '05' },
                    { day: 'Sun', date: '06' },
                    { day: 'Mon', date: '07', isToday: true },
                    { day: 'Tue', date: '08' },
                    { day: 'Wed', date: '09' },
                    { day: 'Thu', date: '10' }
                  ].map((dayInfo, index) => (
                    <div key={index} className="text-center">
                      <div className="text-xs text-gray-500 mb-1">{dayInfo.day}</div>
                      <button className={`px-3 py-2 text-sm rounded-lg ${
                        dayInfo.isToday 
                          ? 'text-white font-medium' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`} style={dayInfo.isToday ? {backgroundColor: '#736edd'} : {}}>
                        {dayInfo.date}
                      </button>
                    </div>
                  ))}
                </div>

                <button className="p-1 hover:bg-gray-100 rounded">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9,18 15,12 9,6"/>
                  </svg>
                </button>
              </div>

              {/* Meeting Event */}
              <div className="rounded-lg p-4" style={{backgroundColor: '#f5f6ff'}}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900 mb-1">Meeting with VP</h3>
                    <p className="text-xs text-gray-500">Today • 10:00 - 11:00 am</p>
                    
                    <div className="flex items-center gap-2 mt-3">
                      <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-full border border-gray-200">
                        <span className="text-xs text-gray-700">Google Meet</span>
                      </div>
                      
                      <div className="flex -space-x-1 ml-auto">
                        <div className="w-6 h-6 bg-orange-400 rounded-full border-2 border-white"></div>
                        <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white"></div>
                        <div className="w-6 h-6 bg-gray-400 rounded-full border-2 border-white"></div>
                        <div className="w-6 h-6 bg-red-400 rounded-full border-2 border-white"></div>
                        <div className="w-6 h-6 bg-purple-600 text-white text-xs rounded-full border-2 border-white flex items-center justify-center font-medium">
                          +2
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button className="text-gray-400 hover:text-gray-600 ml-4">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Reminders Widget */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" style={{color: '#837acb'}}>
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12,6 12,12 16,14"/>
                  </svg>
                  <h2 className="text-lg font-medium text-gray-900">Reminders</h2>
                </div>
              </div>

              {/* Today Section */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <button className="text-gray-600">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <span className="text-sm font-medium text-gray-900">Today</span>
                  <span className="text-sm text-gray-500">• {reminders.length}</span>
                </div>

                {/* Reminder Items */}
                <div className="divide-y divide-gray-100">
                  {reminders.map((reminder) => (
                    <div key={reminder.id} className="flex items-start justify-between py-4 hover:bg-gray-50 rounded-lg">
                      <div className="flex-1 pr-4">
                        <p className={`text-sm ${reminder.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                          {reminder.text}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={() => alert('Reminder notification sent!')}
                          className="text-black hover:text-gray-600 p-1"
                          title="Send notification"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
                            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
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
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
