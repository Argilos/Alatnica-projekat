// worker-list.component.ts
import { Component, OnInit } from '@angular/core';
import { WorkerService } from 'app/worker-form/worker.service';
import { Worker } from 'app/worker-form/worker.model';
import { Router } from '@angular/router';








@Component({
  selector: 'app-worker-list',
  templateUrl: './worker-list.component.html',
  styleUrl: './worker-list.component.css'
})
export class WorkerListComponent implements OnInit {
  workers: Worker[] = [];

  constructor(private workerService: WorkerService,
    private router: Router) {}

    ngOnInit(): void {
      this.workerService.getAllWorkers().subscribe(
        (workers: Worker[]) => {
          // Map each worker to include 'id' property
          this.workers = workers.map((worker, index) => ({ ...worker, id: index + 1 }));
        },
        (error) => {
          console.error(error);
          // Handle error, e.g., display an error message or redirect
        }
      );
    }
    
    navigateToWorkerProfile(id: number | undefined): void {
      if (id !== undefined) {
        // Navigate using the id
        this.router.navigate(['/radnik-profile/', id]);
      }
    }
    

  
}

