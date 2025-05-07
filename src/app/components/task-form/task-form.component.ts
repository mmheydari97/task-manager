import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { TaskPriority } from '../../models/task.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup;
  priorities = Object.values(TaskPriority)
    .filter(value => typeof value === 'number')
    .map(value => ({ label: TaskPriority[value as number], value }));
  
  constructor(
    private fb: FormBuilder,
    private taskService: TaskService
  ) {}
  
  ngOnInit(): void {
    this.initForm();
  }
  
  initForm(): void {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      priority: [TaskPriority.Medium],
      dueDate: [null]
    });
  }
  
  onSubmit(): void {
    if (this.taskForm.valid) {
      const { title, description, priority, dueDate } = this.taskForm.value;
      this.taskService.addTask(title, description, priority);
      this.taskForm.reset({
        title: '',
        description: '',
        priority: TaskPriority.Medium,
        dueDate: null
      });
    }
  }
}
