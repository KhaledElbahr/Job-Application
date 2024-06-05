import { Routes } from '@angular/router';
import { JobListingsComponent } from './components/job-listings/job-listings.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'jobs',
    pathMatch: 'full',
  },
  {
    path: 'jobs',
    component: JobListingsComponent,
  },
];
