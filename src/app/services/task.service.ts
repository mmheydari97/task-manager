import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task, TaskPriority } from '../models/task.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  private readonly STORAGE_KEY = 'angular_demo_tasks';
  private isBrowser: boolean;
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Check if we're running in a browser environment
    this.isBrowser = isPlatformBrowser(this.platformId);
    
    // Only load from localStorage if in browser environment
    if (this.isBrowser) {
      this.loadTasksFromStorage();
    }
  }
  
  private loadTasksFromStorage(): void {
    if (!this.isBrowser) return;
    
    const storedTasks = localStorage.getItem(this.STORAGE_KEY);
    if (storedTasks) {
      try {
        // Parse the stored tasks and fix dates (they're stored as strings in localStorage)
        const parsedTasks = JSON.parse(storedTasks);
        this.tasks = parsedTasks.map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          dueDate: task.dueDate ? new Date(task.dueDate) : undefined
        }));
        this.tasksSubject.next(this.tasks);
      } catch (error) {
        console.error('Error parsing tasks from localStorage:', error);
        this.tasks = [];
        this.tasksSubject.next(this.tasks);
      }
    }
  }
  
  private saveTasksToStorage(): void {
    if (!this.isBrowser) return;
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.tasks));
  }
  
  getTasks(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }
  
  addTask(title: string, description?: string, priority: TaskPriority = TaskPriority.Medium): Task {
    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      completed: false,
      priority,
      createdAt: new Date()
    };
    
    this.tasks = [...this.tasks, newTask];
    this.tasksSubject.next(this.tasks);
    
    // Save tasks to localStorage (only in browser)
    this.saveTasksToStorage();
    
    return newTask;
  }
  
  updateTask(updatedTask: Task): void {
    this.tasks = this.tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    );
    this.tasksSubject.next(this.tasks);
    
    // Save tasks to localStorage (only in browser)
    this.saveTasksToStorage();
  }
  
  completeTask(id: number): void {
    this.tasks = this.tasks.map(task => 
      task.id === id ? { ...task, completed: true } : task
    );
    this.tasksSubject.next(this.tasks);
    
    // Save tasks to localStorage (only in browser)
    this.saveTasksToStorage();
  }
  
  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.tasksSubject.next(this.tasks);
    
    // Save tasks to localStorage (only in browser)
    this.saveTasksToStorage();
  }
  
  getTaskById(id: number): Task | undefined {
    return this.tasks.find(task => task.id === id);
  }
  
  // Add method to clear all tasks (useful for testing)
  clearAllTasks(): void {
    this.tasks = [];
    this.tasksSubject.next(this.tasks);
    this.saveTasksToStorage();
  }
}