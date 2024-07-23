// worker.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Worker } from './worker.model';

@Injectable({
  providedIn: 'root',
})
export class WorkerService {
  private apiUrl = 'http://localhost:3000'; // Replace with your actual backend API URL

  constructor(private http: HttpClient) {}

  addWorker(worker: Worker): Observable<any> {
    const endpoint = `${this.apiUrl}/uposlenik/uposlenik_dodaj`;
    return this.http.post(endpoint, worker);
  }

  getWorkerById(workerId: string): Observable<Worker> {
    const endpoint = `${this.apiUrl}/radnik-profile/${workerId}`; // Replace with the correct API endpoint
    return this.http.get<Worker>(endpoint);
  }

  getAllWorkers(): Observable<Worker[]> {
    const endpoint = `${this.apiUrl}/uposlenik`;
    return this.http.get<Worker[]>(endpoint);
  }
}
