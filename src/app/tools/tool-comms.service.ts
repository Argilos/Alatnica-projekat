// tool-communication.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToolCommunicationService {
  private rentOutToolSubject = new Subject<void>();

  rentOutTool$ = this.rentOutToolSubject.asObservable();

  triggerRentOutTool() {
    this.rentOutToolSubject.next();
  }
}
