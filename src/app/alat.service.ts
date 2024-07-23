import { Injectable } from '@angular/core';
import { Tool } from './tools/tool.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ToolService {
  private tools: any[] = [];
  private numberOfIssuedToolsSource = new BehaviorSubject<number>(0);
  numberOfIssuedTools$ = this.numberOfIssuedToolsSource.asObservable();

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getRentedToolsByNalogId(nalogId: string): Observable<any[]> {
    const url = `${this.apiUrl}/alat/vraceni-alati/${nalogId}`;
    return this.http.get<any[]>(url);
  }
  
  returnSelectedTools(toolIds: string[], nalogId: string): Observable<any> {
    const url = `${this.apiUrl}/alat/vrati-odabrane-alate/${nalogId}`;
    const body = { toolIds };

    return this.http.post(url, body);
  }

  addTool(tool: any) {
    this.tools.push(tool);
    console.log('tools after adding', this.tools);

    // Notify subscribers about the change in the number of issued tools
    this.numberOfIssuedToolsSource.next(this.tools.length);
  }

  doesToolExist(barcode: string): boolean {
    // Check if a tool with the provided barcode exists
    return this.tools.some((tool) => tool.barcode === barcode);
  }

  getTool(barcode: string): Observable<Tool> {
    const url = `http://localhost:3000/alat/bk/${barcode}`;
    return this.http.get<Tool>(url);
  }

  deleteNalog(nalogId: string): Observable<any> {
    const url = `${this.apiUrl}/nalog/${nalogId}`; // Adjust the URL based on your backend API
    return this.http.delete(url);
  }
  
  

  updateToolStatus(barcode: string, newStatus: string): Observable<any> {
    // Assuming you have a backend endpoint to update tool status
    const url = `http://localhost:3000/alat/bk/${barcode}`; // Adjust the URL based on your backend API

    const statusUpdate = { id_status: newStatus };

    return this.http.put(url, statusUpdate);
  }

  getTools(): Observable<Tool[]> {
    return new Observable((observer) => {
      observer.next(this.tools);
      observer.complete();
    });

    
  }

  getTools4Warranty(): Observable<Tool[]> {
    const url = `${this.apiUrl}/alat`; // Adjust the URL based on your backend API
    return this.http.get<Tool[]>(url);
  }
  

  getRentedToolsStatus(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tools?status=Izdato`);
  }

  updateToolStatusVrati(etsId: string): Observable<any> {
    const url = `${this.apiUrl}/alat/vrati-alat/${etsId}`;
    return this.http.put(url, {});
  }

  returnTool(returnDate: string, nalogId: string): Observable<any> {
    const url = `${this.apiUrl}/alat/vrati-alat/${nalogId}`;
    const body = { returnDate, nalogId };

    return this.http.post(url, body);
}


  getReturnedTools(nalogId: string): Observable<any[]> {
    const url = `${this.apiUrl}/alat/vraceni-alati/${nalogId}`;
    return this.http.get<any[]>(url);
  }

  updateReturnDate(barcode: string, returnDate: string): Observable<any> {
    const url = `${this.apiUrl}/alat/bk/${barcode}`;
    const body = { returnDate };
    return this.http.put(url, body);
  }

  
}
  

  

  




