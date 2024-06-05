import { Component, Input } from '@angular/core';
import { InputContainer } from '../input-container/input-container.component';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputValidation } from '../input-validation/input-validation.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'text-input',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule, 
    InputContainer,
    InputValidation,
    ReactiveFormsModule,
  ],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss',
})
export class TextInput {
  @Input() control!: AbstractControl;
  @Input() label!: string;
  @Input() type: 'text' | 'password' | 'email' = 'text';

  get formControl() {
    return this.control as FormControl;
  }
}
