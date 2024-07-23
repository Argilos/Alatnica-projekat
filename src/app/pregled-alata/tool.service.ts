// tool.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlatService {
  private tools: any[] = [
    { id: 1, name: 'Tool 1' },
    { id: 2, name: 'Tool 2' },
    // Add more tools as needed
  ];

  getTools(): Observable<any[]> {
    return of(this.tools); // Assuming you want to return the predefined tools
  }

  getAllTools(){
    return [...this.tools];
  }
}
