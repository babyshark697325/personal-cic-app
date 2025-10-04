"use client";

import Link from "next/link";

export default function Home() {
  // Get today's date
  const today = new Date();
  const dayOfWeek = today.toLocaleDateString('en-US', { weekday: 'long' });
  const monthDay = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  // Get personalized greeting
  const getGreeting = () => {
    const hour = today.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  // Mock data for tasks and progress
  const todayTasks = [
    { id: 1, title: "Complete React component", completed: false, priority: "High" },
    { id: 2, title: "Review CSS fundamentals", completed: true, priority: "Medium" },
    { id: 3, title: "Write daily reflection", completed: false, priority: "High" },
  ];

  const upcomingTasks = [
    { id: 4, title: "JavaScript array methods practice", priority: "Low", dueDate: "Tomorrow" },
    { id: 5, title: "CSS Grid layout project", priority: "Medium", dueDate: "3 days left" },
  ];

  // Calendar data for current week
  const getWeekDays = () => {
    const days = [];
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      days.push({
        day: date.getDate(),
        name: date.toLocaleDateString('en-US', { weekday: 'short' }),
        isToday: date.toDateString() === today.toDateString(),
        hasActivity: Math.random() > 0.5 // Mock activity data
      });
    }
    return days;
  };

  const weekDays = getWeekDays();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-500 text-sm">{dayOfWeek}, {monthDay}</p>
          <h1 className="text-2xl font-bold text-slate-900">Hello, Keira</h1>
          <p className="text-indigo-600 text-lg">How can I help you today?</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
            + Ask AI
          </button>
          <button className="border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
            Get tasks updates
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Tasks */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Tasks */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900">My Tasks</h2>
              <div className="text-sm text-slate-500">
                <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-medium">
                  IN PROGRESS
                </span>
                <span className="ml-2">• 2 tasks</span>
              </div>
            </div>
            
            <div className="space-y-3">
              {todayTasks.map((task) => (
                <div key={task.id} className="flex items-center space-x-3 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                  <input 
                    type="checkbox" 
                    checked={task.completed}
                    className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                    readOnly
                  />
                  <div className="flex-1">
                    <p className={`text-sm ${task.completed ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                      {task.title}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    task.priority === 'High' ? 'bg-red-100 text-red-700' :
                    task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {task.priority}
                  </span>
                  {task.priority === 'High' && !task.completed && (
                    <span className="text-red-500 text-sm">Today</span>
                  )}
                </div>
              ))}
              
              <button className="w-full text-left text-indigo-600 text-sm font-medium hover:text-indigo-700 p-3">
                + Add task
              </button>
            </div>
          </div>

          {/* Goals Section */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">My Goals</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-700">Complete CIC Program</span>
                  <span className="text-sm text-slate-500">73%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{width: '73%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-700">Daily Check-ins Streak</span>
                  <span className="text-sm text-slate-500">11%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{width: '11%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-700">Build Portfolio Projects</span>
                  <span className="text-sm text-slate-500">63%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: '63%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Calendar & Quick Actions */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link href="/checkin" className="flex items-center space-x-3 p-3 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors">
                <span className="text-lg">✍️</span>
                <span className="font-medium">Daily Check-in</span>
              </Link>
              <Link href="/history" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                <span className="text-lg">📊</span>
                <span className="text-slate-700">View Timeline</span>
              </Link>
              <Link href="/chat" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                <span className="text-lg">🔍</span>
                <span className="text-slate-700">Get Insights</span>
              </Link>
            </div>
          </div>

          {/* Calendar Widget */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Calendar</h3>
              <span className="text-sm text-slate-500">July</span>
            </div>
            
            <div className="grid grid-cols-7 gap-1 mb-4">
              {weekDays.map((day, index) => (
                <div key={index} className="text-center">
                  <div className="text-xs text-slate-500 mb-1">{day.name}</div>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium ${
                    day.isToday 
                      ? 'bg-indigo-600 text-white' 
                      : day.hasActivity
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'text-slate-700 hover:bg-slate-100'
                  }`}>
                    {day.day}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-slate-600">Check-in completed</span>
              </div>
              <div className="text-xs text-slate-500">
                Meeting with VP • Today • 10:00 - 11:00 am
              </div>
            </div>
          </div>

          {/* Reminders */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Reminders</h3>
            <div className="space-y-3">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-start justify-between text-sm">
                  <p className="text-slate-700 flex-1">{task.title}</p>
                  <span className="text-slate-500 text-xs">{task.dueDate}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
