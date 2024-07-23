import { Component } from '@angular/core';
import { ToolService } from 'app/alat.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { RentalDetailsDialogComponent } from 'app/rental-details-dialog/rental-details-dialog.component';


@Component({
  selector: 'app-return-tools',
  templateUrl: './vrati-alat.component.html',
  styleUrls: ['./vrati-alat.component.css']
})
export class ReturnToolsComponent {
  nalogId: string = '';
  returnDate: string = '';
  returnedTools: any[] = [];
  returnedToolsModalVisible: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private alatService: ToolService, private snackBar: MatSnackBar, private dialog: MatDialog) {}

  openRentalDetailsDialog(): void {
    const dialogRef = this.dialog.open(RentalDetailsDialogComponent, {
      width: '600px',
      data: { nalogId: this.nalogId }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  returnTool(): void {
    if (this.nalogId) {
      // Assuming you have a method in your ToolService to return tools by Nalog ID
      this.alatService.returnTool(this.returnDate, this.nalogId).subscribe(
        () => {
          this.successMessage = 'Alati uspješno vraćeni!';
          this.errorMessage = '';
          // Show success message using MatSnackBar
          this.snackBar.open(this.successMessage, 'Close', {
            duration: 3000,
          });
        },
        (error) => {
          console.error(error);
          this.errorMessage = 'Pogreška pri vraćanju alata. Provjerite Nalog ID i pokušajte ponovno.';
          // Show error message using MatSnackBar
          this.snackBar.open(this.errorMessage, 'Close', {
            duration: 3000,
          });
        }
      );
    } else {
      this.errorMessage = 'Unesite validan Nalog ID.';
      // Show error message using MatSnackBar
      this.snackBar.open(this.errorMessage, 'Close', {
        duration: 3000,
      });
    }
  }


  

  showReturnedToolsModal(): void {
    this.returnedToolsModalVisible = true;
  }

  closeModal(): void {
    this.returnedToolsModalVisible = false;
  }



  // private initializeFadeOutTimer(): void {
  //   setTimeout(() => {
  //     this.successMessage = '';
  //     this.errorMessage = '';
  //   }, this.fadeTime);
  // }
}
