// tool-rentals.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToolRentalsService } from './tool-rentals.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tool-rentals',
  templateUrl: './tool-rentals.component.html',
  styleUrls: ['./tool-rentals.component.css'],
})
export class ToolRentalsComponent implements OnInit {
  toolRentals: any[] = [];
  ets_id: string = '';
  toolRentalsForm: FormGroup;

  constructor(
    private toolRentalsService: ToolRentalsService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.toolRentalsForm = this.fb.group({
      ets_id: ['', Validators.required],
    });
  }

  ngOnInit() {
    // Load tool rentals when the component is initialized
    this.loadToolRentals();
  }

  loadToolRentals() {
    // Call the service to get tool rentals for the specific user
    const ets_id = this.ets_id || this.toolRentalsForm.value.ets_id;
    this.toolRentalsService.getToolRentals(ets_id).subscribe(
      (rentals) => {
        this.toolRentals = rentals;
      },
      (error) => {
        console.error('Error fetching tool rentals:', error);
        // Handle the error as needed...
      }
    );
  }

  onFormSubmit() {
    // Load tool rentals when the form is submitted
    this.loadToolRentals();
  }
}
