// date-time.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DateTimeService {
  private currentDateSource = new BehaviorSubject<string>(this.getCurrentDateTime());
  currentDate$ = this.currentDateSource.asObservable();

  constructor() {
    // Update the current date and time every second
    setInterval(() => {
      this.currentDateSource.next(this.getCurrentDateTime());
    }, 1000);
  }

  private getCurrentDateTime(): string {
    const currentDate = new Date();
    return currentDate.toISOString(); // You can format the date as needed
  }
}
