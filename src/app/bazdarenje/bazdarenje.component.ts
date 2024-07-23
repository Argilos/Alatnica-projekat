import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bazdarenje',
  templateUrl: './bazdarenje.component.html',
  styleUrls: ['./bazdarenje.component.css']
})
export class BazdarenjeComponent implements OnInit {
  errorMessage: string = '';
  currentDate: string | null;
  bazdarenjeNalogNumber: string = '';
  servicerContact: string = '';
  selectedTool: any = { ets_id: '', naziv: '' };
  bazdarenjePurpose: string = '';
  bazdarenjeIzvjestaj: string = ''; // Add this property
  bazdarenjePrice: string = '';
  bazdarenjeInterval: string = '';
  servicerSignature: string = '';
  formVisible = false;
  filteredTools!: Observable<any[]>;
  filteredServicers!: Observable<any[]>;
  servicerControl = new FormControl();
  toolControl = new FormControl();
  tools: any[] = [];
  servicers: any[] = [];
  selectedServicer: any;

  constructor(
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {
    const transformedDate = this.datePipe.transform(new Date(), 'dd/MM/yyyy');
    this.currentDate = transformedDate !== null ? transformedDate : '';

    const randomPart = Math.floor(Math.random() * 9000) + 1000;
    this.bazdarenjeNalogNumber = `bazdarenje_nalog_${randomPart}`;
  }

  ngOnInit(): void {
    this.fetchServicers();
    this.fetchTools();
    this.currentDate = this.getCurrentDate();

    this.filteredTools = this.toolControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterTools(value))
    );

    this.filteredServicers = this.servicerControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterServicers(value))
    );

    this.route.queryParams.subscribe(params => {
      this.selectedTool.ets_id = params['toolId'];
      this.selectedTool.naziv = params['toolName'];
    });
  }

  toggleForm(): void {
    this.formVisible = !this.formVisible;
  }

  getCurrentDate(): string {
    return this.datePipe.transform(new Date(), 'dd.MM.yyyy') ?? '';
  }

  izdajNaBazdarenje(): void {
  console.log('Izdaj na baždarenje called with selected servicer:', this.selectedServicer);
  const requestBody = {
    bazdarenje_nalog: this.bazdarenjeNalogNumber,
    ets_id: this.selectedTool.ets_id,
    datum_bazdarenja: new Date().toISOString(),
    serviser_kontakt: this.servicerContact,
    serviser_kompanija: '',
    razlog_bazdarenja: this.bazdarenjePurpose,
    ime_alata: this.selectedTool.naziv,
    izvjestaj_bazdarenja: this.bazdarenjeIzvjestaj // Include this property
  };

  if (typeof this.selectedServicer === 'string') {
    requestBody.serviser_kompanija = this.selectedServicer;
  } else {
    if (!this.selectedServicer || !this.selectedServicer.serviser_kompanija) {
      console.error("No servicer selected or selected servicer doesn't have company name.");
      return;
    }
    requestBody.serviser_kompanija = this.selectedServicer.serviser_kompanija;
  }

  const toolId = this.selectedTool.ets_id;

  this.http.post('http://localhost:3000/bazdarenje', requestBody).subscribe(
    (response) => {
      console.log(response);
      this.http.patch(`http://localhost:3000/alat/${toolId}/bazdarenje`, { id_status: 'Baždarenje' }).subscribe(
        (response) => {
          console.log(response);
          // Redirect to bazdarenje-in-progress route
          this.router.navigate(['/bazdarenja-in-progress']);
          window.print(); // Move the print function here
        },
        (error) => {
          console.error(error);
          this.handleBazdarenjeError(error);
        }
      );
    },
    (error) => {
      console.error(error);
      this.handleBazdarenjeError(error);
    }
  );
}


  private handleBazdarenjeError(error: HttpErrorResponse): void {
    if (error.status === 400 && error.error.error === 'Alat je rashodovan') {
      console.log('Tool is Rashodovano');
      this.errorMessage = 'Greška: Alat je rashodovan';
    } else {
      console.error('Error initiating Baždarenje:', error);
      this.errorMessage = 'Error initiating Baždarenje';
    }
  }

  fetchServicers(): void {
    this.http.get<any[]>('http://localhost:3000/serviseri').subscribe(
      (response: any[]) => {
        console.log('Fetched Servisers:', response);
        this.servicers = response;
      },
      (error) => {
        console.error('Error fetching servisers:', error);
      }
    );
  }

  fetchTools(): void {
    this.http.get<any[]>('http://localhost:3000/skladiste').subscribe(
      (tools: any[]) => {
        this.tools = tools;
      },
      (error) => {
        console.error('Error fetching tools:', error);
      }
    );
  }
  
  

  filterServicers(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.servicers.filter(serviser => 
      serviser.serviser_kompanija.toLowerCase().includes(filterValue)
    );
  }

  filterTools(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.tools.filter(tool => 
      tool.ets_id.toLowerCase().includes(filterValue) || tool.naziv.toLowerCase().includes(filterValue)
    );
  }

  displayServiser(serviser: any): string {
    return serviser ? serviser.serviser_kompanija : '';
  }

  displayTool(tool: any): string {
    return tool ? `${tool.ets_id} - ${tool.naziv}` : '';
  }
  onToolSelected(tool: any): void {
    this.selectedTool = tool;
  }

  onServicerSelected(serviser: any): void {
    if (typeof serviser === 'string') {
      this.selectedServicer = serviser;
    } else if (typeof serviser === 'object' && serviser.hasOwnProperty('serviser_kompanija')) {
      this.selectedServicer = serviser.serviser_kompanija;
    } else {
      console.log('No serviser selected.');
    }
  }
}
