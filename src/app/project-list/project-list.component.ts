import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects: any[] = [];
  selectedYear: number | null = null; // Initialize selectedYear to null

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects() {
    let url = 'http://localhost:3000/projects';
    if (this.selectedYear) {
      url += `?year=${this.selectedYear}`;
    }

    this.http.get<any[]>(url)
      .subscribe(
        (projects: any[]) => {
          this.projects = projects;
        },
        (error) => {
          console.error('Error loading projects:', error);
        }
      );
  }

  onYearChange(year: number) {
    this.selectedYear = year;
    this.loadProjects();
  }
}
