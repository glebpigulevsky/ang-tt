import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Task } from 'app/Task';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskService } from 'app/services/task.service';
import { AddTaskComponent } from '../add-task/add-task.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, TaskItemComponent, AddTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  tasks: Array<Task> = [];
  private taskCreatedSubscription!: Subscription;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => this.tasks = tasks);
    this.taskCreatedSubscription = this.taskService.taskCreated().subscribe(() => {
      this.taskService.getTasks().subscribe((tasks) => this.tasks = tasks);
    });
  }

  ngOnDestroy(): void {
    this.taskCreatedSubscription.unsubscribe();
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
