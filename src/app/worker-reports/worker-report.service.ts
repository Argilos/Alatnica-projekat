import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkerReportService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getWorkerReport(workerId: string): Observable<any> {
    const url = `${this.apiUrl}/izdavanje/${workerId}`;
    return this.http.get(url);
  }
}
