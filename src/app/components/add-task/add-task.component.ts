import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from 'app/services/task.service';
import { UiService } from 'app/services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {
  constructor(private taskService: TaskService, private uiService: UiService) {
    this.subscription = this.uiService.onToggle().subscribe(value => this.showAddTask = value);
  }

  text: string = '';
  day: string = '';
  reminder: boolean = false;
  isButtonDisabled: boolean = true;
  subscription: Subscription;
  showAddTask: boolean = false;

  ngDoCheck(): void {
    this.isButtonDisabled = !(this.text.trim() && this.day.trim());
  }

  createTask() {
    this.taskService.createTask({ text: this.text, day: this.day, reminder: this.reminder }).subscribe(() => {
      this.text = '';
      this.day = '';
      this.reminder = false;
      this.isButtonDisabled = true;
    })
  }
}
