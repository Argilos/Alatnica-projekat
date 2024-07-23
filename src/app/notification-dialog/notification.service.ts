import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationDialogComponent } from './notification-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private dialog: MatDialog) {}

  open(message: string= 'Radnik uspješno dodan!'): void {
    this.dialog.open(NotificationDialogComponent, {
      data: { message },
    });
  }
}
