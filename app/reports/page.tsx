"use client";

import { useState } from 'react';
// Custom dropdown state

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('This Week');
    const [showDropdown, setShowDropdown] = useState(false);
  
  const goals = [
    {
      id: 1,
      title: "Check Emails and Messages",
      progress: 73,
      project: "Product launch",
      category: "My Projects",
      color: "#31d3cb"
    },
    {
      id: 2,
      title: "Prepare a brief status update to the client",
      progress: 11,
      project: "Product launch", 
      category: "My Projects",
      color: "#f8ac67"
    },
    {
      id: 3,
      title: "Update project documentation",
      progress: 63,
      project: "Team brainstorm",
      category: "My Projects", 
      color: "#31d3cb"
    }
  ];

  const weeklyStats = {
    tasksCompleted: 12,
    onTimeCompletion: 85,
    totalHours: 38,
    meetingsAttended: 8,
    goalsAchieved: 2
  };

  const chartData = [
    { day: 'Mon', tasks: 3, hours: 7 },
    { day: 'Tue', tasks: 2, hours: 6 },
    { day: 'Wed', tasks: 4, hours: 8 },
    { day: 'Thu', tasks: 1, hours: 5 },
    { day: 'Fri', tasks: 2, hours: 7 },
    { day: 'Sat', tasks: 0, hours: 2 },
    { day: 'Sun', tasks: 0, hours: 3 }
  ];

  const maxTasks = Math.max(...chartData.map(d => d.tasks));
  const maxHours = Math.max(...chartData.map(d => d.hours));

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="px-4 sm:px-8 pt-6 sm:pt-8 pb-24 sm:pb-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <h1 className="text-4xl text-gray-800 leading-tight mb-2" style={{fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'}}>
                Reports & Analytics
              </h1>
              <p className="text-lg text-gray-600">
                Track your productivity and analyze performance metrics
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Custom Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-200 rounded-xl text-sm bg-gray-50 cursor-pointer shadow-sm flex items-center gap-2 min-w-[140px]"
                  onClick={() => setShowDropdown((v) => !v)}
                  style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif', color: '#333' }}
                >
                  {selectedPeriod}
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path stroke="#736ee1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6"/></svg>
                </button>
                {showDropdown && (
                  <div className="absolute left-0 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-10">
                    {["This Week", "Last Week", "This Month", "Last Month"].map(option => (
                      <div
                        key={option}
                        className={`px-4 py-2 text-sm cursor-pointer hover:bg-purple-50 ${selectedPeriod === option ? 'bg-purple-100 text-[#736ee1]' : 'text-gray-700'}`}
                        onClick={() => { setSelectedPeriod(option); setShowDropdown(false); }}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <button 
                className="px-4 py-2 text-white text-sm rounded-lg hover:opacity-90 transition-all"
                style={{ backgroundColor: '#736ee1' }}
              >
                Export Report
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
  <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">{weeklyStats.tasksCompleted}</div>
              <div className="text-sm text-gray-600">Tasks Completed</div>
              <div className="text-xs text-green-600 mt-1">+20% from last week</div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">{weeklyStats.onTimeCompletion}%</div>
              <div className="text-sm text-gray-600">On-Time Completion</div>
              <div className="text-xs text-green-600 mt-1">+5% from last week</div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">{weeklyStats.totalHours}</div>
              <div className="text-sm text-gray-600">Hours Worked</div>
              <div className="text-xs text-red-600 mt-1">-2% from last week</div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-1">{weeklyStats.meetingsAttended}</div>
              <div className="text-sm text-gray-600">Meetings Attended</div>
              <div className="text-xs text-gray-600 mt-1">Same as last week</div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-600 mb-1">{weeklyStats.goalsAchieved}</div>
              <div className="text-sm text-gray-600">Goals Achieved</div>
              <div className="text-xs text-green-600 mt-1">+1 from last week</div>
            </div>
          </div>
        </div>

  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Progress Chart */}
          <div className="sm:col-span-2 col-span-1">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium text-gray-900">Daily Activity</h2>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                    <span className="text-gray-600">Tasks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span className="text-gray-600">Hours</span>
                  </div>
                </div>
              </div>
              
              <div className="h-64">
                <div className="flex items-end justify-between h-full pb-4">
                  {chartData.map((data, index) => (
                    <div key={index} className="flex flex-col items-center gap-2 flex-1">
                      <div className="flex items-end gap-1 h-48">
                        {/* Tasks Bar */}
                        <div 
                          className="w-4 bg-blue-500 rounded-t"
                          style={{ height: `${(data.tasks / maxTasks) * 100}%` }}
                          title={`${data.tasks} tasks`}
                        ></div>
                        {/* Hours Bar */}
                        <div 
                          className="w-4 bg-green-500 rounded-t"
                          style={{ height: `${(data.hours / maxHours) * 80}%` }}
                          title={`${data.hours} hours`}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 font-medium">{data.day}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Goal Progress */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg text-gray-800" style={{fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'}}>Goal Progress</h2>
              </div>
              
              <div className="space-y-4">
                {goals.map((goal) => (
                  <div key={goal.id}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-800">{goal.title}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-20 bg-gray-200 rounded-md h-2">
                          <div 
                            className="h-2 rounded-md transition-all duration-300" 
                            style={{width: `${goal.progress}%`, backgroundColor: goal.color}}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{goal.progress}%</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">{goal.project} • {goal.category}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Summary */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg text-gray-800 font-sans mb-4" style={{fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'}}>Performance Summary</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Productivity Score</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className="h-2 bg-green-500 rounded-full" style={{width: '78%'}}></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">78%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Focus Time</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className="h-2 bg-blue-500 rounded-full" style={{width: '65%'}}></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">65%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Goal Achievement</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className="h-2 bg-purple-500 rounded-full" style={{width: '82%'}}></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">82%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Achievements */}
        <div className="mt-8">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Achievements</h3>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Task Streak</div>
                  <div className="text-xs text-gray-600">5 days in a row</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">High Performer</div>
                  <div className="text-xs text-gray-600">Top 10% this month</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Goal Master</div>
                  <div className="text-xs text-gray-600">2 goals completed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
