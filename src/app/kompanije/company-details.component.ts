// src/app/company-details/company-details.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KompanijaService } from './kompanija.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrl: './company-details.component.css'
})
export class CompanyDetailsComponent implements OnInit {
  companyId!: number; // Add definite assignment assertion

  companyDetails: any;

  constructor(
    private route: ActivatedRoute,
    private kompanijaService: KompanijaService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.companyId = +params['id'];
      this.kompanijaService.getCompanyDetails(this.companyId).subscribe(
        (data) => {
          this.companyDetails = data;
        },
        (error) => {
          console.error('Error fetching company details:', error);
        }
      );
    });
  }
}
