import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-rented-tools-dialog',
  templateUrl: './rented-tools-dialog.component.html',
})
export class RentedToolsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
