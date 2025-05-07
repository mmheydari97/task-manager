import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task, TaskPriority } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { TaskItemComponent } from '../task-item/task-item.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  standalone: true,
  imports: [CommonModule, TaskItemComponent]
})
export class TaskListComponent implements OnInit {
  tasks$!: Observable<Task[]>;
  TaskPriority = TaskPriority;
  
  constructor(private taskService: TaskService) {}
  
  ngOnInit(): void {
    this.tasks$ = this.taskService.getTasks();
  }
  
  completeTask(id: number): void {
    this.taskService.completeTask(id);
  }
  
  deleteTask(id: number): void {
    this.taskService.deleteTask(id);
  }
  
  getPriorityLabel(priority: TaskPriority): string {
    return TaskPriority[priority];
  }
  
  getPriorityClass(priority: TaskPriority): string {
    switch (priority) {
      case TaskPriority.Low:
        return 'bg-success';
      case TaskPriority.Medium:
        return 'bg-info';
      case TaskPriority.High:
        return 'bg-warning';
      case TaskPriority.Critical:
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  }
}
