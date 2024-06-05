import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Job } from '../../models/job';
import { CurrencyPipe } from '@angular/common';
import { FormModalComponent } from '../form-modal/form-modal.component';

@Component({
  selector: 'jg-job-details-modal',
  standalone: true,
  imports: [MatDialogModule, CurrencyPipe, FormModalComponent],
  templateUrl: './job-details-modal.component.html',
  styleUrl: './job-details-modal.component.scss',
})
export class JobDetailsModalComponent {
  showApplicationForm: boolean = false;
  isApplied: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<JobDetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public job: Job
  ) {}

  ngOnInit(): void {
    this.checkAppliedStatus();
  }

  checkAppliedStatus(): void {
    const storedApplication = localStorage.getItem('application');
    if (storedApplication) {
      const applicationData = JSON.parse(storedApplication);
      if (applicationData.jobId === this.job.id) {
        this.isApplied = true;
      }
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onApply(): void {
    this.showApplicationForm = true;
  }
}
