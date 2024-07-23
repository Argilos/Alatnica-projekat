// worker-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Worker } from 'app/worker-form/worker.model';
import { WorkerService } from 'app/worker-form/worker.service';
@Component({
  selector: 'app-worker-profile',
  templateUrl: './worker-profile.component.html',
  styleUrl: './worker-profile.component.css'
})
export class WorkerProfileComponent implements OnInit {
  worker: Worker | undefined; // Initialize with 'undefined'

  constructor(private route: ActivatedRoute, private workerService: WorkerService) {}

  ngOnInit(): void {
    const workerId = this.route.snapshot.paramMap.get('id');
  
    if (workerId) {
      this.workerService.getWorkerById(workerId).subscribe(
        (worker: Worker) => {
          this.worker = worker;
        },
        (error) => {
          console.error(error);
          this.worker = undefined; // Set worker to undefined in case of an error
          // Handle error, e.g., display an error message or redirect
        }
      );
    }
  }
  
}
