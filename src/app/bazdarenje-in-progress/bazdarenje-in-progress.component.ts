import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { BazdarenjeInProgressService } from './bazdarenje-in-progress.service';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bazdarenje-in-progress',
  templateUrl: './bazdarenje-in-progress.component.html',
  styleUrls: ['./bazdarenje-in-progress.component.css'],
})
export class BazdarenjeInProgressComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  bazdarenjeInProgress: any[] = [];
  searchTerm: string = '';
  displayedColumns: string[] = ['ets_id', 'naziv', 'bazdarenje_nalog', 'Izaberi alat'];
  selectedTools: any[] = [];
  currentDate!: string | null;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  selectedBazdarenje: any = null;
  submitMessage: string = '';
  formEdited: boolean = false;
  bazdarenjeForm: FormGroup;
  isFormSubmitted: boolean = false;

  constructor(
    private bazdarenjeInProgressService: BazdarenjeInProgressService,
    private datePipe: DatePipe,
    private fb: FormBuilder,
    private http: HttpClient,
  ) {
    this.bazdarenjeForm = this.fb.group({
      bazdarenje_nalog: new FormControl('', Validators.required),
      serviserContact: new FormControl(''),
      izvjestajBazdarenja: new FormControl(''),
      imeServisera: new FormControl(''),
      cijenaBazdarenja: new FormControl(''),
      intervalBazdarenja: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.loadBazdarenjeInProgress();
    this.currentDate = this.datePipe.transform(new Date(), 'dd.MM.yyyy');
  }

  loadBazdarenjeInProgress() {
    this.bazdarenjeInProgressService.loadBazdarenjeInProgress().subscribe(
      (data: any) => {
        console.log('Received data:', data);
        this.bazdarenjeInProgress = data;
        this.dataSource = new MatTableDataSource(this.bazdarenjeInProgress);
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error('Error fetching bazdarenje in progress:', error);
      }
    );
  }

  onInputChange() {
    this.formEdited = true;
  }

  toggleToWarehouse(tool: any) {
    tool.toggledToWarehouse = !tool.toggledToWarehouse;

    if (tool.toggledToWarehouse) {
      this.selectedTools.push(tool);
    } else {
      const index = this.selectedTools.indexOf(tool);
      if (index !== -1) {
        this.selectedTools.splice(index, 1);
      }
    }
  }

  confirmSelectedTools() {
    if (this.selectedTools.length === 0) {
      console.warn('No tools selected to confirm.');
      return;
    }
  
    const currentDate = new Date().toISOString();
  
    const selectedToolsWithAdditionalData = this.selectedTools.map((tool) => ({
      bazdarenje_nalog: tool.bazdarenje_nalog,
      currentDate: currentDate,
      toggledToWarehouse: tool.toggledToWarehouse,
      datum_kraj_bazdarenja: currentDate, // Set to current date
      datum_bazdarenja: tool.datum_bazdarenja, // Make sure this field is populated correctly
      id_status: 'U skladištu' // Update id_status to "U skladištu"
    }));
  
    console.log('Data to be sent:', selectedToolsWithAdditionalData);
  
    this.bazdarenjeInProgressService.confirmSelectedToolsS(selectedToolsWithAdditionalData).subscribe(
      () => {
        console.log('Selected tools confirmed and datum_kraj_bazdarenja updated successfully');
        this.loadBazdarenjeInProgress();
        this.selectedTools = [];
      },
      (error) => {
        console.error('Error confirming and updating datum_kraj_bazdarenja:', error);
      }
    );
  }
  

  openBazdarenjeNalog(event: Event, selectedBazdarenje: any) {
    event.preventDefault();
    this.selectedBazdarenje = { ...selectedBazdarenje };
    this.bazdarenjeForm.patchValue(selectedBazdarenje);
    this.formEdited = true;
  }

  submitForm(): void {
    const formData = this.bazdarenjeForm.value;
    const bazdarenjeNalog = formData.bazdarenje_nalog;
  
    if (!bazdarenjeNalog) {
      console.error('Bazdarenje Nalog is undefined!');
      return;
    }
  
    this.bazdarenjeInProgressService.getBazdarenjeByNalog(bazdarenjeNalog).subscribe(
      (selectedBazdarenje: any) => {
        if (selectedBazdarenje) {
          selectedBazdarenje.cijena_bazdarenja = formData.cijenaBazdarenja;
          selectedBazdarenje.ime_servisera = formData.imeServisera;
          selectedBazdarenje.interval_bazdarenja = formData.intervalBazdarenja;
          selectedBazdarenje.izvjestaj_bazdarenja = formData.izvjestajBazdarenja;
          selectedBazdarenje.serviser_kontakt = formData.serviserContact;
  
          console.log('Updated bazdarenje:', selectedBazdarenje);
  
          this.bazdarenjeInProgressService.updateBazdarenje(selectedBazdarenje).subscribe(
            () => {
              console.log('Bazdarenje updated successfully');
              this.isFormSubmitted = true;
            },
            (error: any) => {
              console.error('Error updating bazdarenje:', error);
            }
          );
        } else {
          console.error('Bazdarenje not found for nalog:', bazdarenjeNalog);
        }
      },
      (error: any) => {
        console.error('Error getting bazdarenje by nalog:', error);
      }
    );
  }

  closeBazdarenjeNalog() {
    this.formEdited = false;
    this.selectedBazdarenje = null;
  }
}
