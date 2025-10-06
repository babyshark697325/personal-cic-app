"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import FlowerIcon from '@/components/FlowerIcon';
import { useAppContext } from '@/context/AppContext';
import { Project, Task, Reminder, Goal } from '@/types';

// Types
interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
  data?: {
    type: 'project' | 'task' | 'reminder' | 'goal';
    action: 'add' | 'update' | 'delete';
    item: unknown;
  };
}

type CommandHandler = (input: string) => Promise<string>;

// Command handlers
const useCommandHandlers = () => {
  const {
    addProject, addTask, addReminder, addGoal,
    updateProject, updateTask, updateReminder, updateGoal,
    deleteProject, deleteTask, deleteReminder, deleteGoal,
    projects, tasks, reminders, goals
  } = useAppContext();

  const handleAddProject = async (input: string): Promise<string> => {
    const name = input.replace(/^add project\s*/i, '').trim();
    if (!name) return 'Please provide a project name.';
    
    const project = {
      name,
      color: `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`,
    };
    
    await addProject(project);
    return `Project "${name}" has been created!`;
  };

  const handleAddTask = async (input: string): Promise<string> => {
    const match = input.match(/^add task\s+(.+?)\s*(?:#(\w+))?\s*(?:@(\d{4}-\d{2}-\d{2}))?\s*(!{1,3})?/i);
    if (!match) return 'Please provide a task name.';
    
    const [_, name, projectName, dueDateStr, priorityStr] = match;
    const priority = priorityStr ? 
      (priorityStr.length === 1 ? 'low' : priorityStr.length === 2 ? 'medium' : 'high') : 
      'medium';
    
    const dueDate = dueDateStr ? new Date(dueDateStr) : undefined;
    const project = projectName ? projects.find(p => 
      p.name.toLowerCase() === projectName.toLowerCase()
    ) : undefined;

    await addTask({
      title: name.trim(),
      description: '',
      dueDate,
      priority: priority as 'low' | 'medium' | 'high',
      projectId: project?.id,
    });

    return `Task "${name.trim()}" has been added${project ? ` to project "${project.name}"` : ''}!`;
  };

  // Add other command handlers here...

  return {
    'add project': handleAddProject,
    'add task': handleAddTask,
    // Add other commands here...
  };
};

const QUICK_QUESTIONS = [
  'What should I work on next?',
  'What are my urgent tasks?',
  'What\'s on my schedule today?',
];

// Tasks Widget Component
const TasksWidget: React.FC<{ tasks: Task[]; onToggleComplete: (id: string) => void }> = ({ tasks, onToggleComplete }) => {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [sortBy, setSortBy] = useState<'dueDate' | 'priority' | 'createdAt'>('dueDate');

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'dueDate') {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    } else if (sortBy === 'priority') {
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">My Tasks</h3>
        <div className="flex space-x-2">
          <select 
            className="text-sm p-1 border rounded"
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'all' | 'active' | 'completed')}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
          <select 
            className="text-sm p-1 border rounded"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'dueDate' | 'priority' | 'createdAt')}
          >
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
            <option value="createdAt">Recently Added</option>
          </select>
        </div>
      </div>
      
      {sortedTasks.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No tasks found</p>
      ) : (
        <ul className="space-y-2">
          {sortedTasks.map(task => (
            <li 
              key={task.id} 
              className={`flex items-center p-3 rounded-lg border ${task.completed ? 'bg-gray-50' : 'bg-white'}`}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggleComplete(task.id)}
                className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <div className="ml-3 flex-1">
                <div className="flex justify-between items-center">
                  <span className={`text-sm font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                    {task.title}
                  </span>
                  {task.dueDate && (
                    <span className={`text-xs px-2 py-1 rounded-full ${new Date(task.dueDate) < new Date() && !task.completed ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                      {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
                <div className="flex items-center mt-1 space-x-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                  {task.description && (
                    <p className="text-xs text-gray-500 truncate">{task.description}</p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Components
const MessageBubble: React.FC<{ message: Message }> = ({ message }) => (
  <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
    <div className={`flex items-end gap-2 ${message.isUser ? 'flex-row-reverse' : ''}`}>
      {!message.isUser && (
        <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
          <FlowerIcon className="w-4 h-4 text-[#8b7ff5]" />
        </div>
      )}
      <div className={`flex flex-col ${message.isUser ? 'items-end' : 'items-start'}`}>
        <div 
          className={`rounded-[18px] px-4 py-2.5 ${message.isUser ? 'bg-[#8b7ff5] text-white' : 'bg-gray-100 text-gray-900'}`} 
          style={{ maxWidth: '600px' }}
        >
          {message.text}
        </div>
      </div>
    </div>
  </div>
);

const InputArea: React.FC<{
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  disabled?: boolean;
}> = ({ value, onChange, onSend, onKeyPress, disabled = false }) => (
  <div className="fixed bottom-0 left-0 right-0 flex justify-center pb-6 px-4 pl-[280px]">
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white border border-gray-200 rounded-full shadow-lg px-4 py-1 flex items-center gap-2 w-full">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder="Ask Bloom AI anything..."
          className="w-full px-4 py-3 border-0 rounded-full text-base text-gray-900 focus:outline-none bg-white placeholder-gray-400"
          disabled={disabled}
        />
        <button
          onClick={onSend}
          disabled={!value.trim() || disabled}
          className="w-8 h-8 flex items-center justify-center text-white text-sm font-medium rounded-full bg-[#736ee1] hover:bg-[#5a54c4] transition disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
          aria-label="Send message"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  </div>
);

const ChatHeader: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <div className="flex items-center gap-2 px-4 py-3 bg-white/80 backdrop-blur-sm">
    <div className="flex items-center gap-2">
      <button 
        onClick={onBack}
        className="text-gray-500 hover:text-gray-700 transition-colors"
        aria-label="Back to home"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </button>
      <div className="w-5 h-5">
        <FlowerIcon className="w-full h-full text-[#8b7ff5]" />
      </div>
    </div>
  </div>
);

// Main Component
export default function ChatPage() {
  // State and Context
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { tasks, updateTask } = useAppContext();
  const commandHandlers = useCommandHandlers();

  // Effects
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Callbacks
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const getResponse = useCallback(async (userInput: string): Promise<string> => {
    if (!tasks) return 'Unable to load your tasks. Please try again later.';
    const input = userInput.toLowerCase().trim();
    
    // Check for commands
    for (const [command, handler] of Object.entries(commandHandlers)) {
      if (input.startsWith(command)) {
        try {
          return await handler(input);
        } catch (error) {
          console.error('Error executing command:', error);
          return 'Sorry, I encountered an error processing your request.';
        }
      }
    }
    
    // Handle quick questions
    if (input.includes('what should i work on next') || 
        input.includes('what to work on') ||
        input.includes('what are my tasks')) {
      const incompleteTasks = tasks.filter((task: Task) => !task.completed);
      
      if (incompleteTasks.length === 0) {
        return 'You have no pending tasks. Would you like to add a new task?';
      }
      
      const highPriorityTasks = incompleteTasks.filter((task: Task) => task.priority === 'high');
      const mediumPriorityTasks = incompleteTasks.filter((task: Task) => task.priority === 'medium');
      
      let response = 'Here are your tasks:\n';
      
      if (highPriorityTasks.length > 0) {
        response += '\n🚨 *High Priority*\n';
        response += highPriorityTasks.map(task => `• ${task.title}`).join('\n');
      }
      
      if (mediumPriorityTasks.length > 0) {
        response += '\n\n📝 *Medium Priority*\n';
        response += mediumPriorityTasks.map(task => `• ${task.title}`).join('\n');
      }
      
      const lowPriorityTasks = incompleteTasks.filter((task: Task) => task.priority === 'low');
      if (lowPriorityTasks.length > 0) {
        response += '\n\n📋 *Low Priority*\n';
        response += lowPriorityTasks.map(task => `• ${task.title}`).join('\n');
      }
      
      return response;
      
    } else if (input.includes('urgent') || input.includes('priority')) {
      const urgentTasks = tasks.filter((task: Task) => !task.completed && task.priority === 'high');
      
      if (urgentTasks.length === 0) {
        return 'You have no urgent tasks right now. Great job!';
      }
      
      return `You have ${urgentTasks.length} urgent task${urgentTasks.length > 1 ? 's' : ''}:\n` +
        urgentTasks.map(task => `• ${task.title}`).join('\n');
      
    } else if (input.includes('schedule') || input.includes('today') || input.includes('upcoming')) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const upcomingTasks = tasks.filter((task: Task) => {
        if (task.completed || !task.dueDate) return false;
        const dueDate = new Date(task.dueDate);
        dueDate.setHours(0, 0, 0, 0);
        return dueDate.getTime() === today.getTime();
      });
      
      if (upcomingTasks.length === 0) {
        return 'You have no tasks scheduled for today. Enjoy your day!';
      }
      
      return `Here's what's on your schedule for today (${today.toLocaleDateString()}):\n` +
        upcomingTasks.map(task => `• ${task.title}`).join('\n');
    }
    
    // Default responses
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return 'Hello! How can I help you today?';
    } else if (input.includes('thank')) {
      return 'You\'re welcome! Is there anything else I can help with?';
    } else if (input.includes('bye')) {
      return 'Goodbye! Have a great day!';
    } else if (input.includes('help')) {
      return `I can help you with:
• Projects: "Add project [name]"
• Tasks: "Add task [name] #project @2023-12-31 !!"
• Reminders: "Remind me to [task] at [time]"
• Goals: "Set a goal to [goal] by [date]"`;
    }
    
    return 'I\'m not sure how to respond to that. Type "help" to see what I can do.';
  }, [commandHandlers]);

  const handleSendMessage = useCallback(async (text?: string) => {
    const messageText = text || inputText;
    if (!messageText.trim()) return;

    setShowChat(true);
    
    const newMessage: Message = {
      id: Date.now(),
      text: messageText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      const response = await getResponse(messageText);
      const botMessage: Message = {
        id: Date.now() + 1,
        text: response,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting response:', error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: 'Sorry, I encountered an error processing your request.',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  }, [inputText, getResponse]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && inputText.trim()) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage, inputText]);

  const handleBackToHome = useCallback(() => {
    setShowChat(false);
    setMessages([]);
    setInputText('');
  }, []);

  // Render
  if (!showChat) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-[#f0e8ff] p-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-6">
            <FlowerIcon className="w-full h-full text-[#8b7ff5]" />
          </div>
          <h1 className="text-4xl text-gray-800 leading-tight mb-2" style={{fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif'}}>
            Bloom AI
          </h1>
          <p className="text-lg text-gray-600 mb-8">Your personal productivity assistant</p>
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {QUICK_QUESTIONS.map((question, index) => (
              <button
                key={index}
                onClick={() => handleSendMessage(question)}
                className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition shadow-sm"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
        <InputArea
          value={inputText}
          onChange={setInputText}
          onSend={() => handleSendMessage()}
          onKeyPress={handleKeyPress}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative bg-gradient-to-b from-white to-[#f0e8ff]">
      <ChatHeader onBack={handleBackToHome} />

      <div className="flex-1 px-0 pb-32 overflow-y-auto">
        <div className="w-full pt-6 px-6">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            {isTyping && (
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                  <FlowerIcon className="w-4 h-4 text-[#8b7ff5]" />
                </div>
                <div className="bg-gray-100 rounded-[18px] px-4 py-2.5">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '450ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      <InputArea
        value={inputText}
        onChange={setInputText}
        onSend={() => handleSendMessage()}
        onKeyPress={handleKeyPress}
        disabled={isTyping}
      />
    </div>
  );
}
