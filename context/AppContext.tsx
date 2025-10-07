'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { AppData, Project, Task, Reminder, Goal } from '@/types';

interface AppContextType extends AppData {
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'completed'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  addReminder: (reminder: Omit<Reminder, 'id'>) => void;
  updateReminder: (id: string, updates: Partial<Reminder>) => void;
  deleteReminder: (id: string) => void;
  addGoal: (goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt' | 'completed' | 'progress'>) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'personal-cic-app-data';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<AppData>({
    tasks: [],
    projects: [],
    reminders: [],
    goals: [],
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData && savedData.trim().length > 0) {
      try {
        const parsedData = JSON.parse(savedData);
        // Convert string dates back to Date objects
        const processedData = {
          ...parsedData,
          tasks: parsedData.tasks.map((task: any) => ({
            ...task,
            dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
            createdAt: new Date(task.createdAt),
            updatedAt: new Date(task.updatedAt),
          })),
          projects: parsedData.projects.map((project: any) => ({
            ...project,
            createdAt: new Date(project.createdAt),
            updatedAt: new Date(project.updatedAt),
          })),
          reminders: parsedData.reminders.map((reminder: any) => ({
            ...reminder,
            dueDate: new Date(reminder.dueDate),
          })),
          goals: parsedData.goals.map((goal: any) => ({
            ...goal,
            targetDate: goal.targetDate ? new Date(goal.targetDate) : undefined,
            createdAt: new Date(goal.createdAt),
            updatedAt: new Date(goal.updatedAt),
          })),
        };
        setData(processedData);
      } catch (error) {
        console.error('Failed to parse saved data', error);
      }
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  // Project methods
  const addProject = (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date();
    const newProject: Project = {
      ...project,
      id: `proj_${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    };
    setData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject],
    }));
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(project =>
        project.id === id
          ? { ...project, ...updates, updatedAt: new Date() }
          : project
      ),
    }));
  };

  const deleteProject = (id: string) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.filter(project => project.id !== id),
      tasks: prev.tasks.map(task =>
        task.projectId === id ? { ...task, projectId: undefined } : task
      ),
      goals: prev.goals.map(goal =>
        goal.projectId === id ? { ...goal, projectId: undefined } : goal
      ),
    }));
  };

  // Task methods
  const addTask = (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'completed'>) => {
    const now = new Date();
    const newTask: Task = {
      ...task,
      id: `task_${Date.now()}`,
      completed: false,
      createdAt: now,
      updatedAt: now,
    };
    setData(prev => ({
      ...prev,
      tasks: [...prev.tasks, newTask],
    }));
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setData(prev => ({
      ...prev,
      tasks: prev.tasks.map(task =>
        task.id === id
          ? { ...task, ...updates, updatedAt: new Date() }
          : task
      ),
    }));
  };

  const deleteTask = (id: string) => {
    setData(prev => ({
      ...prev,
      tasks: prev.tasks.filter(task => task.id !== id),
      reminders: prev.reminders.filter(reminder => reminder.taskId !== id),
    }));
  };

  // Reminder methods
  const addReminder = (reminder: Omit<Reminder, 'id'>) => {
    const newReminder: Reminder = {
      ...reminder,
      id: `rem_${Date.now()}`,
    };
    setData(prev => ({
      ...prev,
      reminders: [...prev.reminders, newReminder],
    }));
  };

  const updateReminder = (id: string, updates: Partial<Reminder>) => {
    setData(prev => ({
      ...prev,
      reminders: prev.reminders.map(reminder =>
        reminder.id === id ? { ...reminder, ...updates } : reminder
      ),
    }));
  };

  const deleteReminder = (id: string) => {
    setData(prev => ({
      ...prev,
      reminders: prev.reminders.filter(reminder => reminder.id !== id),
    }));
  };

  // Goal methods
  const addGoal = (goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt' | 'completed' | 'progress'>) => {
    const now = new Date();
    const newGoal: Goal = {
      ...goal,
      id: `goal_${Date.now()}`,
      completed: false,
      progress: 0,
      createdAt: now,
      updatedAt: now,
    };
    setData(prev => ({
      ...prev,
      goals: [...prev.goals, newGoal],
    }));
  };

  const updateGoal = (id: string, updates: Partial<Goal>) => {
    setData(prev => ({
      ...prev,
      goals: prev.goals.map(goal =>
        goal.id === id
          ? { ...goal, ...updates, updatedAt: new Date() }
          : goal
      ),
    }));
  };

  const deleteGoal = (id: string) => {
    setData(prev => ({
      ...prev,
      goals: prev.goals.filter(goal => goal.id !== id),
    }));
  };

  return (
    <AppContext.Provider
      value={{
        ...data,
        addProject,
        updateProject,
        deleteProject,
        addTask,
        updateTask,
        deleteTask,
        addReminder,
        updateReminder,
        deleteReminder,
        addGoal,
        updateGoal,
        deleteGoal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
