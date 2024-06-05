import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'input-container',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule],
  templateUrl: './input-container.component.html',
  styleUrl: './input-container.component.scss',
})
export class InputContainer {
  @Input() label!: string;
  @Input() bgColor: string = 'white';
}
