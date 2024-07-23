// src/app/kompanije/add-company.component.ts

import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { KompanijaService, Kompanija } from './kompanija.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrl: './add-company.component.css'
})
export class AddCompanyComponent {
  company: Kompanija = {
    kompanija_naziv: '',
    kompanija_longitude: 0,
    kompanija_latitude: 0,
    kompanija_telefon: '',
    kompanija_email: '',
    kompanija_kontakt_osoba: '',
    kompanija_kontakt_telefon: '',
    id_tip_kompanije: 0,
  };

  constructor(private kompanijaService: KompanijaService) {}

  addCompany(companyForm: NgForm): void {
    this.kompanijaService.addCompany(this.company).subscribe(
      (response) => {
        console.log('Company added successfully:', response);
        this.company = {
          kompanija_naziv: '',
          kompanija_longitude: 0,
          kompanija_latitude: 0,
          kompanija_telefon: '',
          kompanija_email: '',
          kompanija_kontakt_osoba: '',
          kompanija_kontakt_telefon: '',
          id_tip_kompanije: 0,
        };
        // Reset the form after successful submission
        if (companyForm) {
          companyForm.resetForm();
        }
      },
      (error) => {
        console.error('Error adding company:', error);
      }
    );
  }
}
