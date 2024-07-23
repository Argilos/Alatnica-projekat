import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-year-selector',
  templateUrl: './year-selector.component.html',
  styleUrls: ['./year-selector.component.css']
})
export class YearSelectorComponent {
  @Output() yearChange = new EventEmitter<number>();
  selectedYear!: number; // Definite assignment assertion
  years: number[] = [];

  constructor() {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= currentYear - 10; year--) {
      this.years.push(year);
    }
  }

 
  onYearChange(): void {
  this.yearChange.emit(this.selectedYear);
}

}
