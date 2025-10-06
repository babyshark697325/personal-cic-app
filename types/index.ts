export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: Date;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  projectId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Reminder {
  id: string;
  title: string;
  dueDate: Date;
  completed: boolean;
  taskId?: string;
}

export interface Goal {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  targetDate?: Date;
  completed: boolean;
  progress: number; // 0-100
  projectId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AppData {
  tasks: Task[];
  projects: Project[];
  reminders: Reminder[];
  goals: Goal[];
}
