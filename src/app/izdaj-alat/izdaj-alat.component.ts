import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToolService } from 'app/tools/tool.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';


export interface RentedTool {
  workerName: string;
  toolName: string;
  barcode: string;
  nalog_id: string;
  id_projekat?: string;
  rentalDate: string | undefined;
}

interface UgovorId {
  ugovor_id: string;
}

interface Worker {
  uposlenik_id: number;
  uposlenik_ime: string;
}


@Component({
  selector: 'app-izdaj-alat',
  templateUrl: './izdaj-alat.component.html',
  styleUrls: ['./izdaj-alat.component.css'],
})
export class IzdajAlatComponent implements OnInit {
  rentalForm: FormGroup;
  rentedTools: RentedTool[] = [];
  errorMessage: string = '';
  ugovorIds: UgovorId[] = [];
  workers: Worker[] = [];
  filteredUgovorIds!: Observable<UgovorId[]>;
  selectedUgovorIdCtrl: FormControl = new FormControl();
  availableTools: any[] = [];
  selectedBarcodes: string[] = [];
  availableToolNames: string[] = []; 
  filteredToolNames!: Observable<string[]>;
  displayToolName(tool: any): string {
    return tool && tool.name ? tool.name : '';
  }

  @ViewChild(MatDatepicker, { static: true }) picker!: MatDatepicker<Date>;
  selectedToolsCtrl: FormControl = new FormControl();

  constructor(
    private fb: FormBuilder,
    
    private toolService: ToolService,
    private snackBar: MatSnackBar,
    private router: Router,
    private http: HttpClient,
    private datePipe: DatePipe
  ) {
    this.rentalForm = this.fb.group({
      workerName: [''],
      toolName: [''],
      selectedTools: [''],
      rentalDate: ['', Validators.required],
      id_projekat: ['', Validators.required],
      barcode: ['', Validators.required],
      
    });

    this.filteredUgovorIds = this.selectedUgovorIdCtrl.valueChanges
      .pipe(
        startWith(''),
        map(value => (typeof value === 'string' ? value : value.ugovor_id)),
        map(ugovorId => (ugovorId ? this._filterUgovorIds(ugovorId) : this.ugovorIds.slice()))
      );

    this.selectedToolsCtrl.valueChanges
      .pipe(
        startWith(''),
        map(value => (typeof value === 'string' ? value : value.barcode)),
        map(barcode => (barcode ? this._filterTools(barcode) : this.availableTools.slice()))
      )
      .subscribe(selectedTools => {
        this.selectedBarcodes = selectedTools.map(tool => tool.barcode);
      });
  }

  ngOnInit(): void {
    this.fetchUgovorIds();
    this.fetchAvailableTools();
    this.fetchWorkers();
    this.fetchAvailableToolNames();
  }

  fetchWorkers(): void {
    this.http.get<Worker[]>('http://localhost:3000/uposlenik')
      .subscribe(
        (workers: Worker[]) => {
          console.log('Workers fetched successfully:', workers);
          this.workers = workers;
        },
        (error) => {
          console.error('Error fetching workers:', error);
        }
      );
  }

  onIdProjekatChange(event: any): void {
    console.log('Selected id_projekat:', event.value);
  }

  displayBarcode(tool: any): string {
    return tool && tool.barcode ? tool.barcode : '';
  }

  fetchAvailableTools(): void {
    this.http.get<any[]>('http://localhost:3000/available_tools')
      .subscribe(
        (tools: any[]) => {
          console.log('Available tools fetched successfully:', tools);
          this.availableTools = tools;
        },
        (error) => {
          console.error('Error fetching available tools:', error);
        }
      );
  }

  fetchAvailableToolNames(): void {
    const toolNameControl = this.rentalForm.get('toolName');
    if (toolNameControl) {
      this.filteredToolNames = toolNameControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterToolNames(value))
      );
    }
  }

  onToolNameSelected(event: MatAutocompleteSelectedEvent): void {
    this.rentalForm.patchValue({ toolName: event.option.viewValue });
  }

  private _filterToolNames(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.availableToolNames.filter(toolName => toolName.toLowerCase().includes(filterValue));
  }

  fetchUgovorIds(): void {
    this.http.get<UgovorId[]>('http://localhost:3000/ugovor_ids')
      .subscribe(
        (ugovorIds: UgovorId[]) => {
          console.log('Ugovor IDs fetched successfully:', ugovorIds);
          this.ugovorIds = ugovorIds;
        },
        (error) => {
          console.error('Error fetching ugovor_ids:', error);
        }
      );
  }

  _filterUgovorIds(value: string): UgovorId[] {
    const filterValue = value.toLowerCase();
    return this.ugovorIds.filter(ugovorId => ugovorId.ugovor_id.toLowerCase().includes(filterValue));
  }

  _filterTools(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.availableTools.filter(tool => tool.barcode.toLowerCase().includes(filterValue));
  }

  removeBarcode(index: number): void {
    this.selectedBarcodes.splice(index, 1);
  }

  addBarcode(tool?: any): void {
    const barcodeControl = this.rentalForm.get('barcode');
    if (barcodeControl) {
      const barcodeValue = barcodeControl.value;
      if (barcodeValue.trim() !== '') {
        if (tool) {
          this.selectedBarcodes.push(tool.barcode);
        } else {
          this.selectedBarcodes.push(barcodeValue.trim());
          barcodeControl.setValue(''); // Clear input after adding barcode
        }
      }
    }
  }

  rentOutTool(): void {
    if (this.rentalForm.valid || this.selectedBarcodes.length > 0) { // Check if form is valid or if there are selected barcodes
      const { workerName, toolName } = this.rentalForm.value;
      const selectedTools = this.selectedBarcodes; // Use selectedBarcodes instead of manually entered barcode

      console.log('Submitting rentalform with values:', workerName, toolName, this.selectedUgovorIdCtrl.value, selectedTools);

      const currentDate = new Date();
      const formattedDate = this.datePipe.transform(currentDate, 'dd-MM-yyyy') || '';

      const rentalDate: string = formattedDate;

      const nalog_id = `Nalog-${Date.now()}`;

      const rentedTool: RentedTool = {
        rentalDate: formattedDate || '-',
        id_projekat: this.selectedUgovorIdCtrl.value || '',
        workerName,
        toolName,
        barcode: selectedTools.join(','), // Combine selected barcodes into a string
        nalog_id,
      };

      this.toolService.rentOutTool(Object.assign({
        rentalDate: `${rentedTool.rentalDate || '-'}`
      }, rentedTool)).subscribe(
        () => {
          this.rentedTools.push(rentedTool);
          this.rentalForm.reset();
          this.selectedBarcodes = []; // Clear selected barcodes
          this.errorMessage = '';

          this.snackBar.open(`Alat uspješno izdat, Nalog ID: ${rentedTool.nalog_id}`, 'Close', { duration: 0 });
          this.printButtonHtml();
        },
        (error) => {
          console.error('Error renting out tool:', error);
          this.errorMessage = 'Greška prilikom izdavanja alata';
        }
      );
    } else {
      this.errorMessage = 'Greška! Upiši sva polja ispravno.';
    }
  }

  printButtonHtml(): void {
    const rentedTool = this.rentedTools[this.rentedTools.length - 1];
  
    if (!rentedTool) {
      console.error('No rented tool found.');
      return;
    }
  
    // Format date as dd/MM/yyyy
    const formattedDate = this.datePipe.transform(new Date(), 'dd/MM/yyyy');
    // Format time as hh:mm
    const formattedTime = this.datePipe.transform(new Date(), 'HH:mm');
  
    // Create a simplified HTML structure for printing
    const printContent = `
      <html>
        <head>
          <title>Nalog izdavanja</title>
          <style>
            
            @media print {
              
              .sidebar, .header {
                display: none !important;
              }
             
              body {
                font-family: Arial, sans-serif;
                margin: 20px;
              }
              h1 {
                text-align: center;
              }
              ul {
                list-style-type: none;
                padding: 0;
              }
              li {
                margin-bottom: 10px;
              }
              .signatures {
                position: fixed;
                bottom: 20px;
                width: 100%;
                text-align: center;
              }
              .signature-left {
                position: absolute;
                left: 20px;
                bottom: 20px;
                width: 200px; /* Adjust the width as needed */
              }
              .signature-right {
                position: absolute;
                right: 13%;
                bottom: 20px;
                width: 200px; /* Adjust the width as needed */
              }
              .signature-line {
                border-top: 1px solid #000;
                width: 70%;
                margin: 0 auto;
              }
            }
          </style>
        </head>
        <body>
          <h1>Nalog izdavanja</h1>
          <h2>Detalji izdavanja</h2>
          <ul>
            <li><strong>Ime radnika:</strong> ${rentedTool.workerName}</li>
            <li><strong>Ime alata:</strong> ${rentedTool.toolName}</li>
            <li><strong>Barcode:</strong> ${rentedTool.barcode}</li>
            <li><strong>Nalog ID:</strong> ${rentedTool.nalog_id}</li>
            <li><strong>Datum izdavanja:</strong> ${formattedDate} ${formattedTime}</li>
            <li><strong>Projekat:</strong> ${rentedTool.id_projekat}</li>
          </ul>
          <div class="signatures">
            <div class="signature-left">
              <div class="signature-line"></div>
              <p>Potpis izdavaoca</p>
            </div>
            <div class="signature-right">
              <div class="signature-line"></div>
              <p>Potpis radnika</p>
            </div>
          </div>
        </body>
      </html>
    `;
  
    // Open a new window with the simplified HTML content
    const printWindow = window.open('', '_blank');
    
    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(printContent);
      printWindow.document.close();
  
      // Print the content
      printWindow.print();
    } else {
      console.error('Failed to open print window.');
    }
  }
  
  
  
  
  

  navigateHome(): void {
    this.router.navigate(['/home']);
  }
}
