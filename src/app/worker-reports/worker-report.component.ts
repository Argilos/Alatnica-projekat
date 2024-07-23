import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WorkerReportService } from './worker-report.service';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-worker-report',
  templateUrl: './worker-report.component.html',
  styleUrls: ['./worker-report.component.css'],
})
export class WorkerReportComponent implements OnInit {
  workerReport: any; // Adjust the type based on the actual structure of your worker report data
  workerId: string | null = null; // Use null to represent no worker selected
  workerSelectionForm: FormGroup;

  constructor(private fb: FormBuilder, private workerReportService: WorkerReportService) {
    this.workerSelectionForm = this.fb.group({
      workerId: [null, Validators.required],
    });
  }

  ngOnInit() {
    // You may choose to load a list of workers here if needed
  }

  loadWorkerReport() {
    if (!this.workerId) {
      // Worker not selected, handle accordingly
      return;
    }

    this.workerReportService.getWorkerReport(this.workerId).subscribe(
      (report) => {
        console.log('Worker Report:', report);
        this.workerReport = report;
      },
      (error) => {
        console.error('Error fetching worker report:', error);
        // Handle the error as needed...
      }
    );
  }

  onWorkerSelectionChange() {
    this.workerId = this.workerSelectionForm.value.workerId;
    console.log('Selected Worker ID:', this.workerId);
    this.loadWorkerReport();
  
  }
}
