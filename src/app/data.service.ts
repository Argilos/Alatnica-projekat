import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'http://localhost:3000'; // Replace with your Node.js server URL

  constructor(private http: HttpClient) {}

  // getData(): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/`);
  // }

  addWorker(workerData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/uposlenik_dodaj`, workerData);
  }
}
