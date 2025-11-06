"use client";

import { useState, useRef, useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';
import FlowerIcon from '@/components/FlowerIcon';
import CalendarWidgetDashboard from '@/components/CalendarWidgetDashboard';
import type { Task } from '@/types';

// Custom modal component for task summary
interface TaskSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewAll: () => void;
  children: React.ReactNode;
}

const TaskSummaryModal: React.FC<TaskSummaryModalProps> = ({ 
  isOpen, 
  onClose, 
  onViewAll,
  children 
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div ref={modalRef} className="bg-white rounded-2xl w-full max-w-md sm:max-w-lg md:max-w-xl overflow-hidden shadow-xl">
        <div className="relative">
          <div className="flex items-center justify-center pt-5 pb-4 px-6 relative">
            <div className="absolute left-6">
              <FlowerIcon className="h-5 w-5 text-indigo-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Task Updates</h3>
          </div>
        </div>
        <div className="px-4 sm:px-6 pb-6">
          <p className="text-gray-600 text-sm text-center mb-6">{children}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6">
            <button type="button" className="px-5 py-2 rounded-full text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 focus:outline-none transition-colors" onClick={onClose}>Close</button>
            <button type="button" className="px-5 py-2 rounded-full text-sm font-medium text-white shadow-sm transition-all duration-200" style={{ background: 'linear-gradient(to right, #766de0, #7d73e7, #bcb4ee)' }} onMouseOver={(e) => e.currentTarget.style.background = 'linear-gradient(to right, #6b62d4, #7369dc, #b3aae6)'} onMouseOut={(e) => e.currentTarget.style.background = 'linear-gradient(to right, #766de0, #7d73e7, #bcb4ee)'} onClick={() => { onClose(); onViewAll(); }}>View All Tasks</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Modal for creating workspace
// Modal for connecting apps
interface ConnectAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (appName: string) => void;
}

const ConnectAppModal: React.FC<ConnectAppModalProps> = ({ isOpen, onClose, onConnect }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [appName, setAppName] = useState('');
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div ref={modalRef} className="bg-white rounded-2xl w-full max-w-md sm:max-w-lg md:max-w-xl overflow-hidden shadow-xl">
        <div className="relative">
          <div className="flex items-center justify-center pt-5 pb-4 px-6 relative">
            <div className="absolute left-6">
              <FlowerIcon className="h-5 w-5 text-indigo-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Connect App</h3>
          </div>
        </div>
        <div className="px-4 sm:px-6 pb-6">
          <div className="mb-4">
            <input
              type="text"
              value={appName}
              onChange={e => setAppName(e.target.value)}
              placeholder="App name (e.g. Asana, Trello, Zoom)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 placeholder-gray-400"
              autoFocus
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6">
            <button type="button" className="px-5 py-2 rounded-full text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 focus:outline-none transition-colors" onClick={onClose}>Cancel</button>
            <button type="button" className="px-5 py-2 rounded-full text-sm font-medium text-white shadow-sm transition-all duration-200" style={{ background: 'linear-gradient(to right, #766de0, #7d73e7, #bcb4ee)' }} onClick={() => { onConnect(appName); onClose(); }} disabled={!appName}>Connect</button>
          </div>
        </div>
      </div>
    </div>
  );
};
interface CreateWorkspaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string, description: string) => void;
}

const CreateWorkspaceModal: React.FC<CreateWorkspaceModalProps> = ({ isOpen, onClose, onCreate }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div ref={modalRef} className="bg-white rounded-2xl w-full max-w-md sm:max-w-lg md:max-w-xl overflow-hidden shadow-xl">
        <div className="relative">
          <div className="flex items-center justify-center pt-5 pb-4 px-6 relative">
            <div className="absolute left-6">
              <FlowerIcon className="h-5 w-5 text-indigo-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Create Workspace</h3>
          </div>
        </div>
        <div className="px-4 sm:px-6 pb-6">
          <div className="mb-4">
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Workspace name (e.g. Marketing Team Workspace)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 placeholder-gray-400"
              autoFocus
            />
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Workspace description (e.g. For all marketing projects and team tasks)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              rows={3}
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6">
            <button type="button" className="px-5 py-2 rounded-full text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 focus:outline-none transition-colors" onClick={onClose}>Cancel</button>
            <button type="button" className="px-5 py-2 rounded-full text-sm font-medium text-white shadow-sm transition-all duration-200" style={{ background: 'linear-gradient(to right, #766de0, #7d73e7, #bcb4ee)' }} onClick={() => { onCreate(name, description); onClose(); }} disabled={!name}>Create Workspace</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const { tasks, addTask, updateTask, deleteTask, reminders, deleteReminder, addProject } = useAppContext();
  const [showTaskSummary, setShowTaskSummary] = useState(false);
  const [taskSummary, setTaskSummary] = useState('You have 3 tasks due today and 2 overdue tasks.');
  const [showCreateWorkspace, setShowCreateWorkspace] = useState(false);
  const [showConnectApp, setShowConnectApp] = useState(false);
  const handleConnectApp = (appName: string) => {
    setTimeout(() => {
      alert(`🔌 Connecting to ${appName}...\n\nThis would typically open an OAuth flow or connection settings for ${appName} in a real application.`);
    }, 100);
  };
  
  const handleViewAllTasks = () => {
    window.location.href = '/tasks';
  };
  // ...existing code...
  const handleCreateWorkspace = (name: string, description: string) => {
    addProject({
      name,
      description,
      color: `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`,
    });
    setTimeout(() => {
      alert(`✅ Workspace "${name}" created successfully!`);
    }, 100);
  };
  // Responsive dashboard grid and cards
  // Add responsive classes to all main containers, cards, and widgets below

  const [showTaskForm, setShowTaskForm] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');
  const [expandedSections, setExpandedSections] = useState({
    inProgress: true,
    todo: true,
    upcoming: true
  });

  // Calendar widget state
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [monthDropdownOpen, setMonthDropdownOpen] = useState(false);

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const endOfToday = new Date(startOfToday);
  endOfToday.setHours(23, 59, 59, 999);

  const inProgressTasks = tasks.filter((task: Task) => {
    if (task.completed || !task.dueDate) {
      return false;
    }
    const dueDate = new Date(task.dueDate);
    return dueDate <= endOfToday;
  });

  const todoTasks = tasks.filter(
    (task: Task) => !task.completed && !task.dueDate
  );

  const upcomingTasks = tasks.filter((task: Task) => {
    if (task.completed || !task.dueDate) {
      return false;
    }
    const dueDate = new Date(task.dueDate);
    return dueDate > endOfToday;
  });

  const taskSections = [
    {
      key: 'inProgress' as const,
      label: 'IN PROGRESS',
      color: '#ace8eb',
      tasks: inProgressTasks,
      emptyLabel: 'No tasks in progress',
      showDueDate: true,
    },
    {
      key: 'todo' as const,
      label: 'TO DO',
      color: '#f4f6f8',
      tasks: todoTasks,
      emptyLabel: 'No tasks in this section',
    },
    {
      key: 'upcoming' as const,
      label: 'UPCOMING',
      color: '#f8d4ae',
      tasks: upcomingTasks,
      emptyLabel: 'No upcoming tasks',
      showDueDate: true,
    },
  ];

  const toggleSection = (section: 'inProgress' | 'todo' | 'upcoming') => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleAddTask = () => {
    if (newTaskName.trim()) {
      addTask({
        title: newTaskName,
        description: '',
        priority: 'medium',
      });
      setNewTaskName('');
      setShowTaskForm(false);
    }
  };

  const handleToggleTaskCompletion = (taskId: string) => {
    const taskToToggle = tasks.find((task) => task.id === taskId);
    if (!taskToToggle) {
      return;
    }
    updateTask(taskId, { completed: !taskToToggle.completed });
  };

  const handleToggleReminderCompletion = (reminderId: string) => {
    // Note: Reminder interface doesn't have completed field in current implementation
    // This would need to be added to the Reminder interface
  };

  // Helper function to format due date
  const formatDueDate = (dueDate?: Date | string) => {
    if (!dueDate) return 'No date';
    const today = new Date();
    const taskDate = new Date(dueDate);
    if (Number.isNaN(taskDate.getTime())) {
      return 'No date';
    }
    today.setHours(0, 0, 0, 0);
    taskDate.setHours(0, 0, 0, 0);

    if (taskDate.getTime() === today.getTime()) {
      return 'Today';
    } else if (taskDate.getTime() < today.getTime()) {
      return 'Overdue';
    } else {
      const diffTime = taskDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return `${diffDays} days left`;
    }
  };

  return (
  <main className="px-4 sm:px-8 pb-24 sm:pb-8 relative max-w-2xl sm:max-w-full mx-auto w-full">
    {/* Grid background pattern with fade - starts at very top, behind header */}
    <div className="fixed inset-0 top-0 left-0 w-full pointer-events-none" style={{zIndex: 0}}>
      <div
        className="w-full"
        style={{
          height: '480px',
          marginLeft: '260px', // Further increased sidebar width
          width: 'calc(100% - 260px)',
          backgroundImage: `
            linear-gradient(to right, #9ca3af 1px, transparent 1px),
            linear-gradient(to bottom, #9ca3af 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 30%, rgba(0,0,0,0.05) 70%, transparent 90%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 30%, rgba(0,0,0,0.05) 70%, transparent 90%)'
        }}
      ></div>
    </div>
  <div className="px-0 sm:px-2 pb-0 sm:pb-8 relative">
        {/* Dashboard Header Section */}
        <div className="relative pb-8">
    <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2">
            {/* Left side - Date and Greeting stacked vertically, flush left */}
            <div className="flex flex-col items-start flex-1 min-w-[420px]">
              <p className="text-sm text-gray-500 mb-2 mt-20">Mon, July 7</p>
              <h1 className="text-4xl text-gray-800 leading-tight mb-0" style={{fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif'}}>Hello, Keira</h1>
              <p className="text-4xl bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent leading-tight mt-0 mb-0" style={{fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif'}}>
                How can I help you today?
              </p>
            </div>

            {/* Right side - Action Buttons aligned with second line */}
            <div className="flex items-center space-x-4 mb-1">
              {/* Ask AI button - filled gradient pill */}
              <a 
                href="/chat"
                className="h-10 px-5 text-white text-sm font-medium rounded-full hover:opacity-90 transition-all flex items-center justify-center" 
                style={{background: 'linear-gradient(to right, #766de0, #7d73e7, #bcb4ee)'}}
              >
                Ask AI
              </a>

              {/* Task Management */}
              <div className="h-10 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 p-0.5">
                <button 
                  onClick={() => {
                    // Get current date and calculate start/end of week
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    const endOfWeek = new Date(today);
                    endOfWeek.setDate(today.getDate() + 6);
                    endOfWeek.setHours(23, 59, 59, 999);
                    
                    // Filter tasks
                    const tasksDueToday = tasks.filter(task => 
                      task.dueDate && 
                      new Date(task.dueDate).toDateString() === today.toDateString()
                    );
                    
                    const completedTasks = tasks.filter(task => task.completed);
                    
                    const upcomingThisWeek = tasks.filter(task => 
                      task.dueDate && 
                      !task.completed &&
                      new Date(task.dueDate) > today &&
                      new Date(task.dueDate) <= endOfWeek
                    );
                    
                    // Create summary message
                    const summary = `You have ${tasksDueToday.length} task${tasksDueToday.length !== 1 ? 's' : ''} due today, ${completedTasks.length} completed, and ${upcomingThisWeek.length} upcoming this week.`;
                    
                    // Show the summary in our custom modal
                    setTaskSummary(summary);
                    setShowTaskSummary(true);
                  }}
                  className="h-full px-5 bg-gray-50 text-black text-sm font-medium rounded-full hover:bg-white/10 transition-all flex items-center whitespace-nowrap"
                >
                  Get tasks updates
                </button>
              </div>

              {/* Workspace Management */}
              <div className="h-10 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 p-0.5">
                <button 
                  onClick={() => setShowCreateWorkspace(true)}
                  className="h-full px-5 bg-gray-50 text-black text-sm font-medium rounded-full hover:bg-white/10 transition-all flex items-center whitespace-nowrap"
                >
                  Create workspace
                </button>
              </div>
              <CreateWorkspaceModal
                isOpen={showCreateWorkspace}
                onClose={() => setShowCreateWorkspace(false)}
                onCreate={handleCreateWorkspace}
              />

              {/* App Integration */}
              <div className="h-10 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 p-0.5">
                <button 
                  onClick={() => setShowConnectApp(true)}
                  className="h-full px-5 bg-gray-50 text-black text-sm font-medium rounded-full hover:bg-white/10 transition-all flex items-center whitespace-nowrap"
                >
                  Connect apps
                </button>
              </div>
              <ConnectAppModal
                isOpen={showConnectApp}
                onClose={() => setShowConnectApp(false)}
                onConnect={handleConnectApp}
              />
            </div>
          </div>
        </div>

        {/* Dashboard Widget Grid - 2 Column layout */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Left Column - My Tasks Widget */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" style={{color: '#837acb'}}>
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
                  <path d="m16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                </svg>
                <h2 className="text-lg text-gray-800" style={{fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'}}>My Tasks</h2>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  className="text-gray-600 hover:text-gray-800"
                  onClick={() => setShowTaskForm(true)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                </button>
                <button 
                  className="text-gray-600 hover:text-gray-800"
                  onClick={() => {
                    const allExpanded = Object.values(expandedSections).every(v => v);
                    setExpandedSections({
                      inProgress: !allExpanded,
                      todo: !allExpanded,
                      upcoming: !allExpanded
                    });
                  }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 19L19 5M5 5v14l14-14" />
                  </svg>
                </button>
                <button className="text-gray-600 hover:text-gray-800">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* IN PROGRESS Section */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <button 
                  className="text-gray-600 transform transition-transform"
                  onClick={() => toggleSection('inProgress')}
                  style={{ transform: expandedSections.inProgress ? 'rotate(90deg)' : 'rotate(0)' }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <span className="text-black text-xs font-medium px-2 py-1 rounded" style={{backgroundColor: '#ace8eb'}}>IN PROGRESS</span>
                <span className="text-sm text-gray-600">• {inProgressTasks.length} task{inProgressTasks.length !== 1 ? 's' : ''}</span>
              </div>
              {expandedSections.inProgress && (
                <div className="pl-6">
                  {inProgressTasks.length > 0 ? (
                    <>
                      {/* Column Headers - Only show when there are tasks */}
                      <div className="flex text-xs text-gray-500 mb-2 px-4">
                        <div className="flex-1">Name</div>
                        <div className="w-20 text-center">Priority</div>
                        <div className="w-24 text-right">Due date</div>
                      </div>
                      
                      {/* Task List */}
                      <div className="space-y-2">
                        {inProgressTasks.map(task => (
                          <div key={task.id} className="flex items-center p-2 hover:bg-gray-50 rounded">
                            <input
                              type="checkbox"
                              checked={task.completed}
                              onChange={() => handleToggleTaskCompletion(task.id)}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <div className="ml-2">
                              <div className="text-sm">{task.title}</div>
                              {task.dueDate && (
                                <div className="text-xs text-gray-500">
                                  {formatDueDate(new Date(task.dueDate))}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <p className="text-sm text-gray-500 pl-2">No tasks in progress</p>
                  )}
                </div>
              )}

              {/* Task Items */}
              <div className="divide-y divide-gray-100">
                {inProgressTasks.map((task) => (
                  <div key={task.id} className="flex items-center gap-2 p-3 hover:bg-gray-50">
                    <button 
                      onClick={() => handleToggleTaskCompletion(task.id)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {task.completed ? (
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                    <div className="w-3 h-3 rounded-sm" style={{backgroundColor: '#a8edea'}}></div>
                    <div className="flex-1">
                      <span className={`text-sm ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                        {task.title}
                      </span>
                    </div>
                    <div className="w-20 text-center">
                      <span className="text-black text-xs px-2 py-1 rounded" style={{
                        backgroundColor: task.priority === 'high' ? '#fec2c6' : 
                                       task.priority === 'medium' ? '#fef3c7' : '#f4f6f8'
                      }}>
                        {task.priority}
                      </span>
                    </div>
                    <div className="w-24 text-right">
                      <span className={`text-xs ${formatDueDate(task.dueDate) === 'Today' ? 'text-red-600' : 'text-black'}`}>
                        {formatDueDate(task.dueDate)}
                      </span>
                    </div>
                    <button 
                      onClick={() => deleteTask(task.id)}
                      className="text-gray-400 hover:text-red-500 p-1 ml-2"
                      title="Delete task"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3,6 5,6 21,6"/>
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m5 0V4a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2"/>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              {/* Add task button */}
              <div className="border-t border-gray-100">
                {!showTaskForm ? (
                  <button 
                    onClick={() => setShowTaskForm(true)}
                    className="flex items-center gap-2 p-3 text-sm text-gray-600 hover:text-gray-800 w-full text-left"
                  >
                    <span className="text-lg">+</span>
                    <span>Add task</span>
                  </button>
                ) : (
                  <div className="p-3 space-y-2">
                    <input
                      type="text"
                      value={newTaskName}
                      onChange={(e) => setNewTaskName(e.target.value)}
                      placeholder="Enter task name..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      autoFocus
                      onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleAddTask}
                        className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                      >
                        Add
                      </button>
                      <button
                        onClick={() => {
                          setShowTaskForm(false);
                          setNewTaskName('');
                        }}
                        className="px-3 py-1 bg-gray-300 text-gray-700 text-xs rounded hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* TO DO Section */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <button 
                  className="text-gray-600 transform transition-transform" 
                  onClick={() => toggleSection('todo')}
                  style={{ transform: expandedSections.todo ? 'rotate(90deg)' : 'rotate(0)' }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <span className="text-black text-xs font-medium px-2 py-1 rounded" style={{backgroundColor: '#f4f6f8'}}>TO DO</span>
                <span className="text-sm text-gray-600">• {inProgressTasks.length} task{inProgressTasks.length !== 1 ? 's' : ''}</span>
              </div>
              {expandedSections.todo && (
                <div className="pl-6">
                  {inProgressTasks.length > 0 ? (
                    <div className="space-y-2">
                      {inProgressTasks.map(task => (
                        <div key={task.id} className="flex items-center p-2 hover:bg-gray-50 rounded">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => handleToggleTaskCompletion(task.id)}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="ml-2 text-sm">{task.title}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 pl-2">No tasks in this section</p>
                  )}
                </div>
              )}
            </div>

            {/* UPCOMING Section */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <button 
                  className="text-gray-600 transform transition-transform"
                  onClick={() => toggleSection('upcoming')}
                  style={{ transform: expandedSections.upcoming ? 'rotate(90deg)' : 'rotate(0)' }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <span className="text-black text-xs font-medium px-2 py-1 rounded" style={{backgroundColor: '#f8d4ae'}}>UPCOMING</span>
                <span className="text-sm text-gray-600">• {tasks.filter(task => task.dueDate && new Date(task.dueDate) > new Date()).length} task{tasks.filter(task => task.dueDate && new Date(task.dueDate) > new Date()).length !== 1 ? 's' : ''}</span>
              </div>
              {expandedSections.upcoming && (
                <div className="pl-6">
                  {tasks.filter(task => task.dueDate && new Date(task.dueDate) > new Date()).length > 0 ? (
                    <div className="space-y-2">
                      {tasks
                        .filter(task => task.dueDate && new Date(task.dueDate) > new Date())
                        .sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime())
                        .map(task => (
                          <div key={task.id} className="flex items-center p-2 hover:bg-gray-50 rounded">
                            <input
                              type="checkbox"
                              checked={task.completed}
                              onChange={() => handleToggleTaskCompletion(task.id)}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <div className="ml-2">
                              <div className="text-sm">{task.title}</div>
                              <div className="text-xs text-gray-500">
                                {task.dueDate && formatDueDate(new Date(task.dueDate))}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 pl-2">No upcoming tasks</p>
                  )}
                </div>
              )}
            </div>
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
          <div className="space-y-6 mt-6 sm:mt-0">
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
            {/* Calendar Widget - replaced with calendar page logic/UI */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" style={{color: '#837acb'}}>
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    <h2 className="text-lg text-gray-800 font-sans" style={{fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'}}>
                      Calendar
                    </h2>
                  </div>
                  <div className="relative">
                    <button
                      className="flex items-center gap-1 text-sm text-gray-400 bg-transparent outline-none font-normal"
                      onClick={() => setMonthDropdownOpen(!monthDropdownOpen)}
                    >
                      {monthNames[selectedMonth]}
                      <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                    {monthDropdownOpen && (
                      <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded shadow-lg z-10">
                        {monthNames.map((name, idx) => (
                          <div
                            key={name}
                            role="button"
                            tabIndex={0}
                            className={`block px-4 py-2 text-sm w-full text-left cursor-pointer hover:bg-gray-100 ${selectedMonth === idx ? 'font-bold text-[#766de0]' : 'text-gray-400 font-normal'}`}
                            onClick={() => {
                              setSelectedMonth(idx);
                              setMonthDropdownOpen(false);
                            }}
                            onKeyPress={e => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                setSelectedMonth(idx);
                                setMonthDropdownOpen(false);
                              }
                            }}
                          >
                            {name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
              </div>
              <CalendarWidgetDashboard
                monthNames={monthNames}
                selectedMonth={selectedMonth}
                setSelectedMonth={setSelectedMonth}
                monthDropdownOpen={monthDropdownOpen}
                setMonthDropdownOpen={setMonthDropdownOpen}
              />
            </div>

            {/* Reminders Widget */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" style={{color: '#837acb'}}>
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12,6 12,12 16,14"/>
                  </svg>
                  <h2 className="text-lg text-gray-800 font-sans" style={{fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'}}>Reminders</h2>
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
                          {reminder.title}
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
                          onClick={() => handleToggleReminderCompletion(reminder.id)}
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
      
      {/* Task Updates Modal */}
      <TaskSummaryModal 
        isOpen={showTaskSummary} 
        onClose={() => setShowTaskSummary(false)}
        onViewAll={handleViewAllTasks}
      >
        <p className="text-gray-700 leading-relaxed">{taskSummary}</p>
      </TaskSummaryModal>
    </main>
  );
}