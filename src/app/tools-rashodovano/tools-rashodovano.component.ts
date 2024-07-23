import { Component, OnInit } from '@angular/core';
import { ServiceInProgressService } from 'app/service-in-progress.service';
import { ToolService } from 'app/tools/tool.service';

@Component({
  selector: 'app-tools-rashodovano',
  templateUrl: './tools-rashodovano.component.html',
  styles: [`
    :host {
      display: block;
      margin: 20px;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    h2 {
      color: #333;
    }

    .table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 15px;
    }

    .table th {
      background-color: #f2f2f2;
      border: 1px solid #ddd;
      padding: 10px;
      text-align: left;
    }

    .table td {
      border: 1px solid #ddd;
      padding: 10px;
    }

    p {
      color: #888;
      font-style: italic;
    }
  `],
})
export class ToolsRashodovanoComponent implements OnInit {
  rashodovanoTools: any[] = [];

  constructor(private toolService: ToolService) {}

  ngOnInit(): void {
    this.loadRashodovanoTools();
  }

  loadRashodovanoTools() {
    this.toolService.getToolsByStatus('Rashodovano').subscribe(
      (data: any) => {
        console.log('Received rashodovano tools:', data);
        this.rashodovanoTools = data;
      },
      (error) => {
        console.error('Error fetching rashodovano tools:', error);
      }
    );
  }
}
