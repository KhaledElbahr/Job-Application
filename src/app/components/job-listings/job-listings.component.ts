import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { JobListingsService } from '../../services/job-listings.service';
import { Job } from '../../models/job';
import { JobDetailsModalComponent } from '../job-details-modal/job-details-modal.component';
import { CurrencyPipe, SlicePipe } from '@angular/common';

@Component({
  selector: 'jg-job-listings',
  standalone: true,
  imports: [
    SlicePipe,
    CurrencyPipe,
    MatToolbarModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
  ],
  templateUrl: './job-listings.component.html',
  styleUrl: './job-listings.component.scss',
})
export class JobListingsComponent {
  jobs: Job[] = [];
  filteredJobs: Job[] = [];

  constructor(
    private jobListingsService: JobListingsService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.jobListingsService.getJobs({}).subscribe((data) => {
      this.jobs = data.data;
      this.filteredJobs = this.jobs;
    });
  }

  filterJobs(filterValue: string) {
    this.filteredJobs = this.jobs.filter((job) =>
      job.title.toLowerCase().includes(filterValue.toLowerCase())
    );
  }

  openJobDetails(job: any) {
    this.dialog.open(JobDetailsModalComponent, {
      width: '600px',
      data: job,
    });
  }
}
