// worker-form.component.ts

import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Add this line
import { WorkerService } from './worker.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from 'app/notification-dialog/notification.service';
@Component({
  selector: 'app-worker-form',
  templateUrl: './worker-form.component.html',
  styleUrls: ['./worker-form.component.css'],
})
export class WorkerFormComponent {
  newWorker: any = {};

  constructor(
    private workerService: WorkerService,
    private notificationService: NotificationService
  ) {}


  onSubmit() {
    this.workerService.addWorker(this.newWorker).subscribe(
      response => {
        console.log(response);
        this.notificationService.open('Radnik uspješno dodan!');
        // Reset the form after successful submission if needed
        this.newWorker = {};
      },
      error => {
        console.error(error);
        this.notificationService.open('Failed to add worker. Please try again.');
      }
    );
  }

  
}

@NgModule({
  imports: [FormsModule], // Add this line
})
export class WorkerFormModule {}
