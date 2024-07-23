// service-in-progress.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceInProgressService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getServicesInProgress(): Observable<any[]> {
    const url = `${this.apiUrl}/alat/Servis`;
    return this.http.get<any[]>(url);
  }

  updateToolsStatus(tools: any[]): Observable<any> {
    const url = `${this.apiUrl}/alat/updateStatus`;
    return this.http.post<any>(url, { tools });
  }

  confirmSelectedTools(selectedTools: any[]): Observable<any> {
    const url = `${this.apiUrl}/alat/confirmSelectedTools`; // Adjust the endpoint accordingly
    return this.http.post<any>(url, { selectedTools });
  }

  updateServisNalog(tool: any): Observable<any> {
    const url = `${this.apiUrl}/update-servis-nalog`;
    return this.http.put<any>(url, tool);
  }
  
  
}
