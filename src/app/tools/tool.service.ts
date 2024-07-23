import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Tool } from './tool.model';

interface RentedTool {
  workerName: string;
  toolName: string;
  rentalDate: string;
  barcode: string;
  nalog_id: string;
  
}

@Injectable({
  providedIn: 'root',
})
export class ToolService {
  private apiUrl = 'http://localhost:3000/alat';
  private apiUrlOrg = 'http://localhost:3000';
  private izdavanjeUrl = 'http://localhost:3000/izdavanje';
  private storageKey = 'sequentialNumber';

  constructor(private http: HttpClient) {
    // Retrieve the sequential number from local storage during service initialization
    this.sequentialNumber = parseInt(localStorage.getItem(this.storageKey) || '0', 10);
  }

  // Handle HTTP errors
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }

  // getProjects(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}/projectList`);
  // }

  getLast10RentedTools(): Observable<RentedTool[]> {
    const url = `${this.apiUrl}/alat/last-10-rented-tools`;
    return this.http.get<RentedTool[]>(url);
  }

  getRentedTools(userId: string): Observable<any> {
    const url = `${this.apiUrl}/rentedTools/${userId}`;
    return this.http.get(url);
  }

  // Get a list of tools
  getTools(): Observable<Tool[]> {
    return this.http.get<Tool[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  getToolByEtsId(ets_id: string): Observable<Tool> {
    return this.http.get<Tool>(`${this.apiUrl}/tools/by-ets-id/${ets_id}`);
  }

  // Get a single tool by ID
  getTool(toolId: string): Observable<Tool | null> {
    const url = `${this.apiUrl}/${toolId}`;
    return this.http.get<Tool>(url).pipe(catchError(this.handleError));
  }

  // Add a new tool
  addTool(newTool: Tool): Observable<any> {
    // Set the id to the barcode if it exists, otherwise generate a unique ID
    newTool.bar_kod = this.generateUniqueId();
    newTool.ets_id = this.generateUniqueCode();

    console.log('New Tool Data:', newTool); // Log the newTool object

    // Save the updated sequential number to local storage
    localStorage.setItem(this.storageKey, this.sequentialNumber.toString());

    return this.http.post(this.apiUrl, newTool).pipe(catchError(this.handleError));
  }

  // Update tool status to 'Servis'
  updateToolStatusToServis(toolId: string): Observable<any> {
    const url = `${this.apiUrl}/${toolId}/servis`;
    return this.http.post(url, {}).pipe(catchError(this.handleError));
  }

  // Make the method public
  getNextSequentialNumber(): number {
    return this.sequentialNumber++;
  }

  generateUniqueId(): string {
    return new Date().getTime().toString();
  }

  private sequentialNumber: number = 0;

  private generateUniqueCode(): string {
    // Assuming 'ETS' is a fixed prefix
    const prefix = 'ETS';

    // Use padStart to ensure a consistent length of 4 digits
    const uniqueCode = this.getNextSequentialNumber().toString().padStart(4, '0');

    // Combine the prefix and uniqueCode
    return prefix + uniqueCode;
  }



  rentOutTool(rentedTool: RentedTool): Observable<any> {
    const url = `${this.apiUrl}/rent`;
    return this.http.post(url, rentedTool)
      .pipe(
        catchError((error: any) => {
          // Handle errors appropriately
          console.error('Error renting out tool:', error);
          return throwError(error);
        })
      );
  }

  getToolStatus(barcode: string): Observable<string> {
    const statusUrl = `${this.apiUrl}/status/${barcode}`;
    return this.http.get<string>(statusUrl);
  }

  getBazdarenjeList(alatId: string): Observable<any> {
    return this.http.get(`${this.apiUrlOrg}/alat/${alatId}/bazdarenje`);
  }
  

  
  // tool.service.ts
returnTool(etsId: string, returnDate: string): Observable<any> {
  const url = `${this.apiUrl}/vrati-alat`;
  const body = { etsId, returnDate }; // Include both parameters in the request body
  return this.http.post(url, body).pipe(
    catchError((error: any) => {
      // Handle errors appropriately
      return throwError(error);
    })
  );
}


  checkToolExistence(etsId: string): Observable<boolean> {
    const url = `${this.apiUrl}/existence/${etsId}`;
    return this.http.get<boolean>(url);
  }

  getToolStatusByETS(etsId: string): Observable<string> {
    const statusUrl = `${this.apiUrl}/statusByETS/${etsId}`;
    return this.http.get<string>(statusUrl);
  }

  updateToolStatus(etsId: string, newStatus: string): Observable<any> {
    const url = `${this.apiUrl}/updateStatus/${etsId}`;
    const body = { status: newStatus };
    return this.http.put(url, body);
  }


   handleErrors(error: any, message: string): void {
    console.error(message, error);
  }

 

getIzdavanjaList(toolId: string): Observable<any[]> {
  const url = `${this.apiUrl}/loadIzdavanjaList/${toolId}`;
  return this.http.get<any[]>(url);
}

// getUposlenikById(uposlenikId: string): Observable<any> {
//   const url = `${this.apiUrlOrg}/uposlenik/${uposlenikId}`;
//   return this.http.get<any>(url);
// }

markAsConsumed(etsId: string): Observable<any> {
  // Make an HTTP request to mark the tool as consumed in your backend
  const url = `${this.apiUrl}/markAsRashodovano/${etsId}`; // Update with your actual endpoint
  return this.http.put(url, { etsId });
}

getToolsByStatus(status: string) {
  const url = `${this.apiUrlOrg}/rashodovano`;
  const params = { status }; // assuming 'status' is the query parameter name

  return this.http.get<any[]>(url, { params });
}

getServisiList(etsId: string): Observable<any[]> {
  const url = `${this.apiUrl}/loadServisiList/${etsId}`;
  return this.http.get<any[]>(url);
}

getToolFromBackend(toolId: string): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/alat/${toolId}`).pipe(
    catchError((error: any) => {
      console.error('Error fetching tool:', error);
      return throwError('Something went wrong while fetching tool details.');
    })
  );
}



}
