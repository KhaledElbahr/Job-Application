import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Subject, takeUntil } from 'rxjs';

const VALIDATORS_MESSAGES: any = {
  required: 'Input is REQUIRED!',
  email: 'Input is Not VALID!',
};

@Component({
  selector: 'input-validation',
  standalone: true,
  imports: [MatInputModule],
  templateUrl: './input-validation.component.html',
  styleUrl: './input-validation.component.scss',
})
export class InputValidation {
  @Input() control!: AbstractControl;
  errorMessages: string[] = [];
  private destroy$ = new Subject<void>();

  ngAfterViewInit(): void {
    this.control.statusChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.checkValidation());
    this.control.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.checkValidation());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  checkValidation(): void {
    const errors = this.control.errors;
    if (!errors) {
      this.errorMessages = [];
      return;
    }

    const errorKeys = Object.keys(errors);
    this.errorMessages = errorKeys.map((key) => VALIDATORS_MESSAGES[key]);
  }
}
