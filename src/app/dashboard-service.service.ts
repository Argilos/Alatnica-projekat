// dashboard.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) {}

  getNotificationsAboutServices(): Observable<any> {
    // Implement logic to get notifications about services from the backend
    // Example: return this.http.get<any>('/api/notifications/services');
    return this.http.get<any>('/api/notifications/services');
  }

  getNotificationsAboutUpcomingTuning(): Observable<any> {
    // Implement logic to get notifications about upcoming tuning from the backend
    // Example: return this.http.get<any>('/api/notifications/tuning');
    return this.http.get<any>('/api/notifications/tuning');
  }


  getUnseenNotificationsCount(): Observable<number> {
    // Replace 'unseen_notifications_count_endpoint' with the actual endpoint
    return this.http.get<number>(`${this.apiUrl}/unseen_notifications_count_endpoint`);
  }

  getNumberOfIssuedTools(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/alat/Izdato/count`);
  }

  getNumberOfToolsOnService(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/alat/Servis/count`);
  }
}
