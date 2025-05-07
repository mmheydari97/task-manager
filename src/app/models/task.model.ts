export enum TaskPriority {
    Low = 0,
    Medium = 1,
    High = 2,
    Critical = 3
  }
  
export interface Task {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
    priority: TaskPriority;
    dueDate?: Date;
    readonly createdAt: Date;
  }
