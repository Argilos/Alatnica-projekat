import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BazdarenjeInProgressService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  loadBazdarenjeInProgress(): Observable<any[]> {
    const apiUrlBaz = `${this.apiUrl}/bazdarenja-in-progress`;
    return this.http.get<any[]>(apiUrlBaz);
  }

  confirmSelectedToolsS(selectedTools: any[]): Observable<any> {
    console.log('Confirming and updating tools:', selectedTools);
    const currentDate = new Date().toISOString();
    const updateRequests = selectedTools.map((tool) =>
      this.http.put(`${this.apiUrl}/alat/${tool.ets_id}/bazdarenje`, {
        ...tool,
        datum_bazdarenja: currentDate,
      })
    );

    return forkJoin(updateRequests).pipe(
      map(() => ({ success: true })),
      catchError((error) => {
        console.error('Update error:', error);
        return of({ success: false, error });
      })
    );
  }

  getBazdarenjeByNalog(nalog: string): Observable<any> {
    console.log(`Getting bazdarenje for nalog: ${nalog}`);
    const url = `${this.apiUrl}/bazdarenje/by-nalog/${nalog}`;
    return this.http.get(url);
  }

  updateBazdarenje(bazdarenje: any): Observable<any> {
    const url = `${this.apiUrl}/update-bazdarenje-nalog`;
    console.log('Request body:', bazdarenje); // Add this log statement
    return this.http.put(url, bazdarenje);
}
}
