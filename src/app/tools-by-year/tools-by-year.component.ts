// tools-by-year.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { NotificationService } from 'app/notification.service';


@Component({
  selector: 'app-tools-by-year',
  templateUrl: './tools-by-year.component.html',
  styleUrls: ['./tools-by-year.component.css'],
  providers: [DatePipe]
})
export class ToolsByYearComponent implements OnInit {
  selectedYear: number = new Date().getFullYear();
  tools: any[] = [];

  constructor(private http: HttpClient,
              private datePipe: DatePipe,
              private router: Router,
              private notificationService: NotificationService,              
            ) {}

  ngOnInit(): void {
    this.fetchToolsByYear();
  }

  fetchToolsByYear(year?: number): void {
    const apiUrl = `http://localhost:3000/tools?year=${year || this.selectedYear}`;

    this.http.get<any[]>(apiUrl).subscribe(
      (tools) => {
        tools.forEach(tool => {
          tool.datum_ulaza = this.datePipe.transform(tool.datum_ulaza, 'dd/MM/yyyy');
          console.log('Tool:', tool);  // Debug each tool object
        });

        this.tools = tools;
      },
      (error) => {
        console.error('Error fetching tools:', error);
      }
    );
  }

  redirectToToolProfile(toolId: string | null | undefined): void {
    console.log('redirectToToolProfile called with toolId:', toolId);  // Log toolId
    if (toolId) {
      this.router.navigate(['/tool', toolId]);
    } else {
      console.error('Invalid tool ID:', toolId);
    }
  }

  handleRowClick(tool: any): void {
    console.log('Row clicked:', tool);  // Log the entire tool object
    this.redirectToToolProfile(tool.ets_id);
  }

  onYearChange(selectedYear: number): void {
    console.log('Selected Year from onYearChange:', selectedYear);
    this.fetchToolsByYear(selectedYear);
  }

  // checkWarranty(): void {
  //   this.tools.forEach((tool) => {
  //     if (tool.remaining_warranty > 1) {
  //       this.notificationService.addNotification(
  //         `Tool ${tool.naziv} (ID: ${tool.ets_id}) has less than 30 days of warranty left.`
  //       );
  //     }
  //   });
  // }

}
