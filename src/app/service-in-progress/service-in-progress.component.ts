import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceInProgressService } from 'app/service-in-progress.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-service-in-progress',
  templateUrl: './service-in-progress.component.html',
  styleUrls: ['./service-in-progress.component.css'],
})
export class ServiceInProgressComponent implements OnInit {
  servicesInProgress = new MatTableDataSource<any>([]);
  searchTerm: string = '';
  displayedColumns: string[] = ['ets_id', 'servis_nalog', 'datum_servisa', 'Izaberi alat'];
  selectedTools: any[] = [];
  selectedService: any = null;
  serviserContact: string = '';
  izvjestajServisa: string = '';
  imeServisera: string = '';
  cijenaServisa: number = 0;
  servicerSignature: string = '';
  formEdited: boolean = false;
  message: string = '';
  submitMessage: string = '*Nalog nije moguće dorađivati nakon što se jednom zaključi*';

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private serviceInProgressService: ServiceInProgressService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadServicesInProgress();
  }

  ngAfterViewInit() {
    this.servicesInProgress.sort = this.sort;
  }

  loadServicesInProgress() {
    this.serviceInProgressService.getServicesInProgress().subscribe(
      (data: any[]) => {
        // Filter tools based on datum_kraj_servisa condition
        this.servicesInProgress.data = data.filter((tool: any) => !tool.datum_kraj_servisa);
      },
      (error) => {
        console.error('Error fetching services in progress:', error);
      }
    );
  }

  toggleToWarehouse(tool: any) {
    // Toggle the 'toggledToWarehouse' property locally
    tool.toggledToWarehouse = !tool.toggledToWarehouse;

    // Update the selectedTools array based on the toggled state
    if (tool.toggledToWarehouse) {
      this.selectedTools.push(tool);
    } else {
      // Remove tool from the selectedTools array if toggled off
      const index = this.selectedTools.indexOf(tool);
      if (index !== -1) {
        this.selectedTools.splice(index, 1);
      }
    }
  }

  confirmSelectedTools() {
    // Filter tools that are toggled to be confirmed
    const selectedTools = this.servicesInProgress.data.filter((tool: any) => tool.toggledToWarehouse);

    // Call the service to confirm and update the status of selected tools
    this.serviceInProgressService.confirmSelectedTools(selectedTools).subscribe(
      () => {
        console.log('Selected tools confirmed and updated successfully');
        // Optionally, you can reload the services after the update
        this.loadServicesInProgress();
        // Clear the selected tools array
        this.selectedTools = [];
      },
      (error) => {
        console.error('Error confirming and updating tools status:', error);
        // Handle error as needed
      }
    );
  }

  openServisniNalog(event: Event, tool: any): void {
    event.preventDefault(); // Prevent the default link behavior
    this.selectedService = { ...tool };
  }

  closeForm(): void {
    this.selectedService = null;
  }

  submitForm(): void {
    // Send the updated servis_nalog along with other form values to the backend
    const updatedService = {
      ...this.selectedService,
      serviser_kontakt: this.serviserContact,
      izvjestaj_servisa: this.izvjestajServisa,
      ime_servisera: this.imeServisera,
      cijena_servisa: this.cijenaServisa
    };
  
    this.serviceInProgressService.updateServisNalog(updatedService).subscribe(
      (response) => {
        console.log('Servis Nalog updated successfully:', response);
        // Optionally, you can reload the services after the update
        this.loadServicesInProgress();
        // Close the form
        this.closeForm();
        // Set formEdited to true to lock the form
        this.formEdited = true;
        // Set the message to display
        this.message = this.submitMessage;
      },
      (error) => {
        console.error('Error updating Servis Nalog:', error);
        // Handle error as needed
        // Optionally, you can set the message to display an error message
        this.message = 'Error updating Servis Nalog: ' + error.message;
      }
    );
  }

  resetForm(): void {
    this.selectedService = null;
    this.serviserContact = '';
    this.izvjestajServisa = '';
    this.imeServisera = '';
    this.cijenaServisa = 0;
    this.formEdited = false;
  }
}
