import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() text!: string;
  @Input() color!: string;
  @Output() buttonClick = new EventEmitter();

  onClick() { this.buttonClick.emit();}
}
