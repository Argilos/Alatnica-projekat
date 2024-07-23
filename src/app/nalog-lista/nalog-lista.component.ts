import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nalog-list',
  templateUrl: './nalog-lista.component.html',
  styleUrls: ['./nalog-lista.component.css']
})
export class NalogListComponent implements OnInit {
  nalogs: any[] = [];

  constructor(private http: HttpClient, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.fetchNalogs();
  }

  fetchNalogs(): void {
    this.http.get<any[]>('http://localhost:3000/nalog-ids-without-datum-do')
     .subscribe(
        nalogs => {
          console.log('Fetched nalogs:', nalogs);
          this.nalogs = nalogs;
          console.log('Updated nalogs array:', this.nalogs);
        },
        error => {
          console.error('Error fetching nalogs:', error);
        }
      );
  }
}


  // showRentedTools(nalog: any): void {
  //   this.http.get<any[]>('http://localhost:3000/rented-tools/' + nalog.nalog_id)
  //     .subscribe(
  //       rentedTools => {
  //         const dialogRef = this.dialog.open(RentedToolsDialogComponent, {
  //           width: '400px',
  //           data: { nalogId: nalog.nalog_id, tools: rentedTools }
  //         });
  //       },
  //       error => {
  //         console.error('Error fetching rented tools:', error);
  //       }
  //     );
  // }

