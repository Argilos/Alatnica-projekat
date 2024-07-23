// pregled-alata.component.ts
import { Component, OnInit } from '@angular/core';
import { ToolService } from '../alat.service'; // Adjust the import statement
import { Router } from '@angular/router';
import { SearchService } from './search.service';

@Component({
  selector: 'app-pregled-alata',
  templateUrl: './pregled-alata.component.html',
  styleUrls: ['./pregled-alata.component.css']
})
export class PregledAlataComponent implements OnInit {
  tools: any[] = [];
  filteredTools: any[] = [];
  searchValue: string = '';

  constructor(
    private toolService: ToolService,
    private router: Router,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    // Use getAllTools to get all tools including those from the izdaj alat page
    // this.tools = this.toolService.getAllTools();
    // this.filteredTools = this.tools;

    this.searchService.searchTerm$.subscribe((searchTerm) => {
      this.searchValue = searchTerm;
      this.search();
    });
  }

  search(): void {
    this.filteredTools = this.tools.filter(tool =>
      tool.name.toLowerCase().includes(this.searchValue.toLowerCase())
    );
  }

  navigateToToolProfile(toolId: number): void {
    this.router.navigate(['/tool', toolId]);
  }
}
