import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Task } from 'app/Task';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskService } from 'app/services/task.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, TaskItemComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  tasks: Array<Task> = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => this.tasks = tasks);
  }

  deleteTask(taskId: number | undefined) {
    if (taskId === undefined) {
      throw new Error('Task ID is undefined');
    }

    this.taskService.deleteTask(taskId).subscribe((tasks) => this.tasks = tasks);
  }

  setReminder(taskId: number | undefined) {
    if (taskId === undefined) {
      throw new Error('Task ID is undefined');
    }

    this.taskService.setReminder(taskId).subscribe((tasks) => this.tasks = tasks)
  }
}
