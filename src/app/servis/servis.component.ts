import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-servis',
  templateUrl: './servis.component.html',
  styleUrls: ['./servis.component.css']
})
export class ServisComponent implements OnInit {
  currentDate: string | null;
  servisniNalogNumber: string = ''; 
  servicerContact: string = '';
  selectedTool: any;
  servicePurpose: string = '';
  servicers: any[] = []; 
  tools: any[] = [];
  izvjestajServisa: string = '';
  servicerSignature: string = '';
  servicePrice: string = '';
  selectedServicer: any; 
  formVisible: boolean = false;
  filteredServicers!: Observable<any[]>; 
  filteredTools!: Observable<any[]>;
  servicerControl = new FormControl();
  serviserKompanija: string = '';
  razlogServisa: string = '';
  toolControl = new FormControl();
  toolNameControl = new FormControl();


  constructor(
    private datePipe: DatePipe,
    private http: HttpClient,
    private router: Router
  ) {
    const transformedDate = this.datePipe.transform(new Date(), 'MM/dd/yyyy');
    this.currentDate = transformedDate !== null ? transformedDate : '';

    const randomPart = Math.floor(Math.random() * 9000) + 1000;
    this.servisniNalogNumber = `servis_nalog_${randomPart}`;
  }

  ngOnInit(): void {
    this.fetchServicers();
    this.fetchTools();



    
    this.filteredServicers = this.servicerControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterServicers(value))
    );

    this.filteredTools = this.servicerControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterTools(value))
    );
  }

  toggleForm(): void {
    this.formVisible = !this.formVisible;
  }

  izdajNaServis(): void {
    console.log('Izdaj na servis called with selected servicer:', this.selectedServicer);
    const requestBody = {
      servis_nalog: this.servisniNalogNumber,
      serviser_kompanija: '',
      razlog_servisa: this.servicePurpose,
    };
    if (typeof this.selectedServicer === 'string') {
      // If the selected servicer is a string value, use it directly
      requestBody.serviser_kompanija = this.selectedServicer;
    } else {
      // If the selected servicer is an object, use its serviser_kompanija property
      if (!this.selectedServicer || !this.selectedServicer.serviser_kompanija) {
        console.error("No servicer selected or selected servicer doesn't have company name.");
        return;
      }
      requestBody.serviser_kompanija = this.selectedServicer.serviser_kompanija;
    }
  
    const toolId = this.selectedTool.ets_id;
  
    this.http.post(`http://localhost:3000/alat/${toolId}/servis`, requestBody).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/service-in-progress']);
      },
      (error) => {
        console.error(error);
      }
    );
  
    window.print();
  }
  
  

  fetchServicers(): void {
    this.http.get<any[]>('http://localhost:3000/serviseri').subscribe(
      (response: any[]) => {
        console.log('Fetched Servicers:', response); // Log fetched servicers
        this.servicers = response; // Assign response directly to servicers array
      },
      (error) => {
        console.error('Error fetching servicers:', error);
      }
    );
  }
  
  

  fetchTools(): void {
    this.http.get<any[]>('http://localhost:3000/alat').subscribe(
      (tools: any[]) => {
        this.tools = tools;
      },
      (error) => {
        console.error('Error fetching tools:', error);
      }
    );
  }

  filterServicers(value: string): any[] {
    console.log('Filtering servicers with value:', value);
    const filterValue = value.toLowerCase();
    return this.servicers.filter(servicer => 
      servicer.serviser_kompanija.toLowerCase().includes(filterValue)
    );
  }

  filterTools(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.tools.filter(tool => 
      tool.ets_id.toLowerCase().includes(filterValue) || tool.naziv.toLowerCase().includes(filterValue)
    );
  }

  displayServicer(servicer: any): string {
    return servicer ? servicer.kompanija_naziv : '';
  }
  

  displayTool(tool: any): string {
    return tool ? `${tool.ets_id} - ${tool.naziv}` : '';
  }

  onToolSelected(tool: any): void {
    this.selectedTool = tool;
  }

  onServicerSelected(servicer: any): void {
    console.log('Servicer selected:', servicer);
    if (typeof servicer === 'string') {
      this.selectedServicer = servicer;
    } else if (typeof servicer === 'object' && servicer.hasOwnProperty('serviser_kompanija')) {
      this.selectedServicer = servicer.serviser_kompanija;
    } else {
      console.log('No servicer selected.');
      // You can add any additional logic or error handling here
    }
    console.log('Selected servicer:', this.selectedServicer);
  }
  
  
  
  
  
  
  

  uploadDokumentacije() {
    // Implement logic for "Upload dokumentacije" button
  }

  vratiSaServisa() {
    // Implement logic for "Vrati sa servisa" button
  }
}
