import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { Task } from 'app/Task';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() deleteTask: EventEmitter<number> = new EventEmitter();
  @Output() setReminder: EventEmitter<number> = new EventEmitter();

  faTimes = faTimes;

  onDelete(taskId: number | undefined) {
    this.deleteTask.emit(taskId);
  }

  onRemind(taskId: number | undefined) {
    this.setReminder.emit(taskId);
  }
}
