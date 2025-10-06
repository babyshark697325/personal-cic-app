"use client";

import { useState } from 'react';

export default function TasksPage() {
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
    },
    {
      id: 3,
      name: "Review quarterly budget",
      priority: "Medium",
      dueDate: "Tomorrow",
      status: "todo",
      completed: false
    },
    {
      id: 4,
      name: "Prepare presentation slides",
      priority: "High",
      dueDate: "Next week",
      status: "upcoming",
      completed: false
    }
  ]);

  const [showTaskForm, setShowTaskForm] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('Medium');
  const [newTaskDueDate, setNewTaskDueDate] = useState('No date');

  const addTask = () => {
    if (newTaskName.trim()) {
      const newTask = {
        id: tasks.length + 1,
        name: newTaskName,
        priority: newTaskPriority,
        dueDate: newTaskDueDate,
        status: "todo",
        completed: false
      };
      setTasks([...tasks, newTask]);
      setNewTaskName('');
      setNewTaskPriority('Medium');
      setNewTaskDueDate('No date');
      setShowTaskForm(false);
    }
  };

  const toggleTaskCompletion = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const updateTaskStatus = (taskId: number, newStatus: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const renderTasksByStatus = (status: string, statusLabel: string, statusColor: string) => {
    const filteredTasks = tasks.filter(task => task.status === status);
    
    return (
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <button className="text-gray-600">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          <span className="text-black text-xs font-medium px-2 py-1 rounded" style={{backgroundColor: statusColor}}>
            {statusLabel}
          </span>
          <span className="text-sm text-gray-600">• {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''}</span>
        </div>

        {filteredTasks.length > 0 && (
          <>
            {/* Column Headers */}
            <div className="flex text-xs text-gray-500 mb-2 px-4">
              <div className="flex-1">Name</div>
              <div className="w-20 text-center">Priority</div>
              <div className="w-24 text-center">Due date</div>
              <div className="w-16 text-center">Actions</div>
            </div>

            {/* Task Items */}
            <div className="divide-y divide-gray-100 bg-white rounded-lg border border-gray-200">
              {filteredTasks.map((task) => (
                <div key={task.id} className="flex items-center gap-2 p-4 hover:bg-gray-50">
                  <button 
                    onClick={() => toggleTaskCompletion(task.id)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {task.completed ? (
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.414-8.414l4 4a1 1 0 001.414-1.414L11.414 10l2.586-2.586a1 1 0 00-1.414-1.414L10 8.586 7.414 6a1 1 0 00-1.414 1.414L8.586 10z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                  <div className="w-3 h-3 rounded-sm" style={{backgroundColor: '#a8edea'}}></div>
                  <div className="flex-1">
                    <span className={`text-sm ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                      {task.name}
                    </span>
                  </div>
                  <div className="w-20 text-center">
                    <span className="text-black text-xs px-2 py-1 rounded" style={{
                      backgroundColor: task.priority === 'High' ? '#fec2c6' : 
                                     task.priority === 'Medium' ? '#fef3c7' : '#f4f6f8'
                    }}>
                      {task.priority}
                    </span>
                  </div>
                  <div className="w-24 text-center">
                    <span className={`text-xs ${task.dueDate === 'Today' ? 'text-red-600' : 'text-black'}`}>
                      {task.dueDate}
                    </span>
                  </div>
                  <div className="w-16 text-center">
                    <button 
                      onClick={() => deleteTask(task.id)}
                      className="text-red-500 hover:text-red-700 text-xs"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <main className="px-8 pt-8 pb-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl text-gray-800 leading-tight mb-2" style={{fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'}}>
                My Tasks
              </h1>
              <p className="text-lg text-gray-600">
                Manage and track all your tasks in one place
              </p>
            </div>
            
            <button 
              onClick={() => setShowTaskForm(true)}
              className="h-10 px-5 text-white text-sm font-medium rounded-full hover:opacity-90 transition-all" 
              style={{background: 'linear-gradient(to right, #766de0, #7d73e7, #bcb4ee)'}}
            >
              Add New Task
            </button>
          </div>
        </div>

        {/* Add Task Form */}
        {showTaskForm && (
          <div className="bg-white rounded-lg p-6 border border-gray-200 mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Task</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Task Name</label>
                <input
                  type="text"
                  value={newTaskName}
                  onChange={(e) => setNewTaskName(e.target.value)}
                  placeholder="Enter task name..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={newTaskPriority}
                    onChange={(e) => setNewTaskPriority(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                  <select
                    value={newTaskDueDate}
                    onChange={(e) => setNewTaskDueDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Today">Today</option>
                    <option value="Tomorrow">Tomorrow</option>
                    <option value="Next week">Next week</option>
                    <option value="No date">No date</option>
                  </select>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={addTask}
                  className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                >
                  Add Task
                </button>
                <button
                  onClick={() => {
                    setShowTaskForm(false);
                    setNewTaskName('');
                    setNewTaskPriority('Medium');
                    setNewTaskDueDate('No date');
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-700 text-sm rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Task Sections */}
        <div className="space-y-6">
          {renderTasksByStatus('in-progress', 'IN PROGRESS', '#ace8eb')}
          {renderTasksByStatus('todo', 'TO DO', '#f4f6f8')}
          {renderTasksByStatus('upcoming', 'UPCOMING', '#f8d4ae')}
        </div>

        {/* Task Statistics */}
        <div className="mt-8 grid grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {tasks.filter(task => task.completed).length}
              </div>
              <div className="text-sm text-gray-600">Completed Tasks</div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {tasks.filter(task => !task.completed).length}
              </div>
              <div className="text-sm text-gray-600">Pending Tasks</div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {tasks.filter(task => task.priority === 'High' && !task.completed).length}
              </div>
              <div className="text-sm text-gray-600">High Priority</div>
            </div>
          </div>
      </div>
    </main>
  );
}
