// src/app/list-companies/list-companies.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KompanijaService } from './kompanija.service';

@Component({
  selector: 'app-list-companies',
  templateUrl: './list-companies.component.html',
  styleUrl: './list-companies.component.css'
})
export class ListCompaniesComponent implements OnInit {
  companies: any[] = [];

  constructor(private kompanijaService: KompanijaService, private router: Router) {}

  ngOnInit(): void {
    this.kompanijaService.getAllCompanies().subscribe(
      (data) => {
        this.companies = data;
      },
      (error) => {
        console.error('Error fetching companies:', error);
      }
    );
  }

  showCompanyDetails(companyId: number): void {
    console.log('Company ID:', companyId);
    // Navigate to the company details page with the company ID
    this.router.navigate(['/dobavljac', companyId]);
  }
}
