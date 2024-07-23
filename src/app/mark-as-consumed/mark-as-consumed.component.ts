import { Component } from '@angular/core';
import { ToolService } from 'app/tools/tool.service';

@Component({
  selector: 'app-mark-as-consumed',
  templateUrl: './mark-as-consumed.component.html',
  styleUrls: ['./mark-as-consumed.component.css'],
})
export class MarkAsConsumedComponent {
  etsId: string = '';

  constructor(private toolService: ToolService) {}

  markAsConsumed() {
    this.toolService.markAsConsumed(this.etsId).subscribe(
      (response) => {
        console.log('Tool marked as consumed:', response);
        // Handle success, e.g., show a success message
      },
      (error) => {
        console.error('Error marking tool as consumed:', error);
        // Handle error, e.g., show an error message
      }
    );
  }
}
