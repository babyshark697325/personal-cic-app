import React from "react";
// ...existing code...
type Task = {
  id: number;
  name: string;
  priority: string;
  dueDate: string;
  status: string;
  completed: boolean;
};

type TasksWidgetProps = {
  tasks: Task[];
  showTaskForm: boolean;
  newTaskName: string;
  toggleTaskCompletion: (id: number) => void;
  setShowTaskForm: (show: boolean) => void;
  setNewTaskName: (name: string) => void;
  addTask: () => void;
};

export default function TasksWidget({
  tasks,
  showTaskForm,
  newTaskName,
  toggleTaskCompletion,
  setShowTaskForm,
  setNewTaskName,
  addTask
}: TasksWidgetProps) {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div style={{background: '#ffeeba', color: '#856404', padding: '8px', borderRadius: '6px', marginBottom: '12px', textAlign: 'center', fontWeight: 'bold'}}>This is a test message. If you see this, your code is updating!</div>
      <div className="flex items-center mb-4">
        <h2 className="text-lg text-gray-800" style={{fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'}}>My Tasks</h2>
      </div>

      {/* IN PROGRESS Section */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          {/* Area is now empty before the label and count */}
          <span className="text-black text-xs font-medium px-2 py-1 rounded" style={{backgroundColor: '#ace8eb'}}>IN PROGRESS</span>
          <span className="text-sm text-gray-600">• {tasks.filter(task => task.status === 'in-progress').length} tasks</span>
        </div>

        {/* Column Headers */}
        <div className="flex text-xs text-gray-500 mb-2 px-4">
          <div className="flex-1">Name</div>
          <div className="w-20 text-center">Priority</div>
          <div className="w-24 text-right">Due date</div>
        </div>

        {/* Task Items */}
        <div className="divide-y divide-gray-100">
          {tasks.filter((task: Task) => task.status === 'in-progress').map((task: Task) => (
            <div key={task.id} className="flex items-center gap-2 p-3 hover:bg-gray-50">
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
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
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
              <div className="w-24 text-right">
                <span className={`text-xs ${task.dueDate === 'Today' ? 'text-red-600' : 'text-black'}`}>
                  {task.dueDate}
                </span>
              </div>
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
                onKeyPress={(e) => e.key === 'Enter' && addTask()}
              />
              <div className="flex gap-2">
                <button
                  onClick={addTask}
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
          {/* Area is now empty before the label and count */}
          <span className="text-black text-xs font-medium px-2 py-1 rounded" style={{backgroundColor: '#f4f6f8'}}>TO DO</span>
          <span className="text-sm text-gray-600">• {tasks.filter((task: Task) => task.status === 'todo').length} task</span>
        </div>
      </div>

      {/* UPCOMING Section */}
      <div>
        <div className="flex items-center gap-2">
          {/* Area is now empty before the label and count */}
          <span className="text-black text-xs font-medium px-2 py-1 rounded" style={{backgroundColor: '#f8d4ae'}}>UPCOMING</span>
          <span className="text-sm text-gray-600">• {tasks.filter((task: Task) => task.status === 'upcoming').length} tasks</span>
        </div>
      </div>
    </div>
  );
}
