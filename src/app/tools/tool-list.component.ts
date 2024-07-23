import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Tool } from './tool.model';
import { ToolService } from './tool.service';
import { Router } from '@angular/router';
import { SearchService } from '../pregled-alata/search.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-tool-list',
  templateUrl: './tool-list.component.html',
  styleUrls: ['./tool-list.component.css'],
})
export class ToolListComponent implements OnInit {
  tools: Tool[] = [];
  filteredTools: Tool[] = [];
  searchForm: FormGroup;

  constructor(
    private toolService: ToolService,
    private formBuilder: FormBuilder,
    private router: Router,
    private searchService: SearchService
  ) {
    this.searchForm = this.formBuilder.group({
      searchTerm: [''],
    });
  }

    

getIdAsNumber(tool: Tool): number {
  // Ensure tool.id is always a number
  return typeof tool.alat_id === 'number' ? tool.alat_id : parseInt(tool.alat_id, 10);
}


  ngOnInit(): void {
    // Subscribe to the observable to get updates when the list changes
    this.toolService.getTools().pipe(takeUntil(this.unsubscribe$)).subscribe((tools: Tool[]) => {
      this.tools = tools;
      this.filteredTools = tools;
    });

    this.searchService.searchTerm$.subscribe((searchTerm) => {
      this.searchForm.patchValue({ searchTerm });
      this.search();
    });
  }

  search(): void {
    
    const searchTerm = this.searchForm.get('searchTerm')?.value || '';
    this.filteredTools = this.tools.filter((tool) =>
      tool.naziv.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  navigateToToolProfile(toolId: string): void {
    console.log('Navigating to tool profile with ID:', toolId);
    this.router.navigate(['/tool', toolId]);
  }
  

  updateSearchService(): void {
    this.searchService.setSearchTerm(this.searchForm.get('searchTerm')?.value || '');
  }

  private unsubscribe$ = new Subject<void>();

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
