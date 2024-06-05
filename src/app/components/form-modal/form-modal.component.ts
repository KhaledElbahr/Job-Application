import { Component, Inject } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Job } from '../../models/job';
import { ToastrService } from 'ngx-toastr';
import { MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { TextInput } from '../text-input/text-input.component';

@Component({
  selector: 'jg-form-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconButton,
    MatIconModule,
    TextInput,
  ],
  templateUrl: './form-modal.component.html',
  styleUrl: './form-modal.component.scss',
})
export class FormModalComponent {
  applicationForm!: FormGroup;
  fileName: string = '';
  coverLetterFileName = '';
  isCoverLetterFileTooLarge = false;

  constructor(
    private readonly toastrService: ToastrService,
    public dialogRef: MatDialogRef<FormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public job: Job
  ) {}

  ngOnInit(): void {
    this.initAppForm();
  }

  initAppForm(): void {
    this.applicationForm = new UntypedFormGroup({
      name: new UntypedFormControl('', [Validators.required]),
      email: new UntypedFormControl('', [Validators.email]),
      phoneNumber: new UntypedFormControl('', [Validators.required]),
      country: new UntypedFormControl('', [Validators.required]),
      education: new UntypedFormControl(''),
      currentPosition: new UntypedFormControl('', [Validators.required]),
      currentCompany: new UntypedFormControl(''),
      cvFile: new UntypedFormControl(null),
      coverLetterFile: new UntypedFormControl(null),
    });
  }

  get fc(): { [key: string]: AbstractControl } {
    return this.applicationForm.controls;
  }

  onSubmit() {
    if (this.applicationForm.invalid) {
      this.toastrService.error(
        'Please fill all required fields',
        'Invalid Inputs'
      );
      this.markControlAsTouched();
      return;
    }

    const formData = new FormData();
    Object.keys(this.applicationForm.value).forEach((key) => {
      formData.append(key, this.applicationForm.value[key]);
    });

    console.log(this.applicationForm.value);
    localStorage.setItem(
      'application',
      JSON.stringify({ ...this.applicationForm.value, jobId: this.job.id })
    );
    this.toastrService.success('Applied Successfully', 'Success');
    this.dialogRef.close(true);
  }

  private markControlAsTouched(): void {
    Object.values(this.fc).forEach((control) => control.markAllAsTouched());
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      this.fileName = file.name;
      this.applicationForm.patchValue({ cvFile: file });
      this.applicationForm.get('cvFile')?.updateValueAndValidity();
    }
  }

  onCoverLetterChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      const fileSize = file.size;
      const maxSize = 3 * 1024 * 1024;

      if (fileSize > maxSize) {
        this.isCoverLetterFileTooLarge = true;
        this.coverLetterFileName = '';
        this.applicationForm.patchValue({ coverLetterFile: null });
      } else {
        this.isCoverLetterFileTooLarge = false;
        this.coverLetterFileName = file.name;
        this.applicationForm.patchValue({ coverLetterFile: file });
        this.applicationForm.get('coverLetterFile')?.updateValueAndValidity();
      }
    }
  }
}
