// user.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserUrl = 'http://localhost:3000/login'; // Use the login endpoint for fetching current user

  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<any> {
    // Make a GET request to fetch the current user's information
    return this.http.get<any>(this.currentUserUrl);
  }
}
