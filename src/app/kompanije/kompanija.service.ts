// src/app/kompanija.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class KompanijaService {
  private apiUrl = 'http://localhost:3000'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

  addCompany(company: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/kompanije`, company);
  }

  getAllCompanies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/kompanije`);
  }

  getCompanyDetails(companyId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/dobavljac/${companyId}`);
  }

  
}



export interface Kompanija {
    kompanija_id?: number; // Add '?' to make it optional for user input
    kompanija_naziv?: string;
    kompanija_longitude?: number;
    kompanija_latitude?: number;
    kompanija_telefon?: string;
    kompanija_email?: string;
    kompanija_kontakt_osoba?: string;
    kompanija_kontakt_telefon?: string;
    id_tip_kompanije?: number;
  }
  
