import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task, TaskPriority } from '../../models/task.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() complete = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  
  TaskPriority = TaskPriority;
  
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
  
  onComplete(): void {
    this.complete.emit();
  }
  
  onDelete(): void {
    this.delete.emit();
  }
}
