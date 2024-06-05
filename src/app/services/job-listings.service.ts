import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

import { RESPONSE } from '../models/response';
import { Job } from '../models/job';

@Injectable({
  providedIn: 'root',
})
export class JobListingsService {
  constructor(private http: HttpClient) {}

  getJobs(params: any): Observable<RESPONSE<Job[]>> {
    return this.http.get<RESPONSE<Job[]>>(environment.BASE_URL, { params });
  }
}
