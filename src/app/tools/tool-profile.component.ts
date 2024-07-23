import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tool } from './tool.model';
import { ToolService } from './tool.service';
import { ToolCommunicationService } from './tool-comms.service';
import { DatePipe, formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';

@Component({
  selector: 'app-tool-profile',
  templateUrl: './tool-profile.component.html',
  styleUrls: ['./tool-profile.component.css'],
})
export class ToolProfileComponent implements OnInit {
  tool$!: Observable<Tool | null>;
  tool!: Tool;
  izdavanjaList: any[] = [];
  selectedMenu: string | null = null;
  servisiList: any[] = [];
  izdavanjaListFormatted: any[] = [];
  bazdarenjaList: any[] = [];
  imageUrl: string | null = null;
  selectedImage: File | null = null;
  imageUploaded: boolean = false; // Flag to track image upload status
  private apiUrl = 'http://localhost:3000';

  constructor(
    private toolService: ToolService,
    private route: ActivatedRoute,
    private router: Router,
    private toolCommunicationService: ToolCommunicationService,
    private cdr: ChangeDetectorRef,
    private datePipe: DatePipe,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const toolId = this.route.snapshot.paramMap.get('id');
  
    if (toolId) {
      this.toolService.getTool(toolId).subscribe(
        (tool) => {
          if (tool) {
            this.tool = tool;
            this.selectedMenu = 'Izdavanje'; 
            this.loadIzdavanjaList(); 
            this.loadBazdarenjeList(); 
            this.imageUrl = `${this.apiUrl}/api/tool/image/${tool.ets_id}`; // Set image URL

            // Check if image is already uploaded
            this.checkIfImageUploaded();
          } else {
            console.error('Tool not found');
          }
        },
        (error) => {
          console.error('Error fetching tool:', error);
        }
      );
    } else {
      console.error('Tool ID is null');
      this.tool$ = of(null); 
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
    }
  }

  onUploadImage() {
    if (this.selectedImage && this.tool?.ets_id) {
      const formData = new FormData();
      formData.append('image', this.selectedImage);
      formData.append('ets_id', this.tool.ets_id);
  
      this.http.post(`${this.apiUrl}/api/upload/${this.tool.ets_id}`, formData).pipe(
        catchError(error => {
          console.error('Error uploading image:', error);
          return throwError(() => new Error('Error uploading image'));
        })
      ).subscribe(
        (response: any) => {
          console.log('Image uploaded successfully');
          this.imageUrl = `${this.apiUrl}/api/tool/image/${this.tool.ets_id}`; // Refresh image URL
          this.imageUploaded = true; // Set flag to true after successful upload
          this.selectedImage = null; // Clear selected image after upload
        }
      );
    }
  }
  

  checkIfImageUploaded() {
    if (this.tool?.ets_id) {
      this.http.get(`${this.apiUrl}/api/tool/image/${this.tool.ets_id}`, { observe: 'response' }).pipe(
        catchError(error => {
          console.error('Error checking image status:', error);
          return throwError(() => new Error('Error checking image status'));
        })
      ).subscribe(
        (response) => {
          if (response.status === 200) {
            this.imageUploaded = true;
          }
        },
        (error) => {
          if (error.status === 404) {
            this.imageUploaded = false;
          }
        }
      );
    }
  }

  rentOutTool() {
    this.toolCommunicationService.triggerRentOutTool();
  }

  handleServisirajAlatClick(): void {
    const toolId = this.tool?.ets_id;
    const toolName = this.tool?.naziv;

    if (toolId && toolName) {
      this.router.navigate(['/servis'], {
        queryParams: {
          toolId: toolId,
          toolName: toolName,
        },
      });
    }
  }

  handleBazdariAlatClick(): void {
    const toolId = this.tool?.ets_id;
    const toolName = this.tool?.naziv;

    if (toolId && toolName) {
      this.router.navigate(['/bazdarenje'], {
        queryParams: {
          toolId: toolId,
          toolName: toolName,
        },
      });
    }
  }

  formatDateToString(date: string): string {
    if (!date || date === 'Invalid Date') {
      return '';
    }
  
    const [day, month, year] = date.split(/[-/]/);
    const parsedDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    return formatDate(parsedDate, 'dd.MM.yyyy', 'en-US');
  }

  loadIzdavanjaList(): void {
    if (this.tool?.ets_id) {
      this.toolService.getIzdavanjaList(this.tool.ets_id).subscribe(
        (izdavanjaList) => {
          this.izdavanjaListFormatted = izdavanjaList.map((izdavanje: any) => ({
            ...izdavanje,
            datum_od: this.formatDateToString(izdavanje.datum_od),
            datum_do: this.formatDateToString(izdavanje.datum_do),
          }));
          this.cdr.detectChanges();
        },
        (error) => {
          console.error('Error fetching izdavanjaList:', error);
        }
      );
    }
  }

  loadServisiList(etsId: string | undefined): void {
    if (etsId) {
      this.toolService.getServisiList(etsId).subscribe(
        (data) => {
          this.servisiList = data;
        },
        (error) => {
          console.error("Error fetching servisi data:", error);
        }
      );
    } else {
      console.error('Tool ID is undefined');
    }
  }

  loadBazdarenjeList(): void {
    this.selectedMenu = 'Baždarenje';
  
    if (this.tool?.ets_id) {
      this.toolService.getBazdarenjeList(this.tool.ets_id).subscribe(
        (bazdarenjaList) => {
          this.bazdarenjaList = bazdarenjaList;
        },
        (error) => {
          console.error('Error fetching bazdarenjaList:', error);
        }
      );
    } else {
      console.error('Cannot fetch bazdarenjaList: tool.ets_id is undefined');
    }
  }

  loadDokumentacijaList(): void {
    this.selectedMenu = 'Dokumentacija';
  }

  loadFinansijeList(): void {
    this.selectedMenu = 'Finansije';
  }

  printLK() {
    const printSection = document.getElementById('print-section');
    if (printSection) {
      const printContent = printSection.innerHTML;
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContent;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload(); // Reload the page to reset the original contents
    } else {
      console.error("Print section not found");
    }
  }
  

  getTool(toolId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/servis_alat/${toolId}`).pipe(
      map((tool: any) => {
        const izdavanjaListFormatted = tool.izdavanjaList.map((izdavanje: any) => {
          return izdavanje;
        });

        return { ...tool, izdavanjaListFormatted };
      })
    );
  }
}
