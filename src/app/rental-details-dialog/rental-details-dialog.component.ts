import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToolService } from 'app/alat.service';

@Component({
  selector: 'app-rental-details-dialog',
  templateUrl: './rental-details-dialog.component.html',
  styleUrls: ['./rental-details-dialog.component.css'],
})
export class RentalDetailsDialogComponent {
  rentedTools: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toolService: ToolService,
    private dialogRef: MatDialogRef<RentalDetailsDialogComponent>,
    private snackBar: MatSnackBar
  ) {
    this.fetchRentedTools(data.nalogId);
  }

  fetchRentedTools(nalogId: string): void {
    this.toolService.getRentedToolsByNalogId(nalogId).subscribe(
      (tools) => {
        this.rentedTools = tools.map((tool) => ({
          ...tool,
          returned: !!tool.datum_do, // Check if datum_do (return date) is set
        }));
      },
      (error) => {
        console.error('Error fetching rented tools:', error);
      }
    );
  }

  returnSelectedTools(): void {
    const selectedTools = this.rentedTools.filter((tool) => tool.selected);

    if (selectedTools.length === 0) {
      console.log('No tools selected.');
      return;
    }

    const currentDate = new Date().toLocaleDateString('en-GB'); // Format date as dd/MM/yyyy

    selectedTools.forEach((tool) => {
      // Update tool status to "U skladištu"
      this.toolService.updateToolStatus(tool.barcode, 'U skladištu').subscribe(
        () => {
          console.log(`Status updated for tool with barcode ${tool.barcode}`);
          // Update return date (datum_do) in the database
          this.toolService.updateReturnDate(tool.barcode, currentDate).subscribe(
            () => {
              console.log(`Return date updated for tool with barcode ${tool.barcode}`);
              this.openSnackBar('Selected tools have been returned successfully.');
              this.dialogRef.close(); // Close the dialog after successful return
            },
            (error) => {
              console.error(`Error updating return date for tool with barcode ${tool.barcode}:`, error);
            }
          );
        },
        (error) => {
          console.error(`Error updating status for tool with barcode ${tool.barcode}:`, error);
        }
      );
    });
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}
