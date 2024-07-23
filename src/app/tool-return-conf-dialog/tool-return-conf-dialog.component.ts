// tool-return-confirmation-dialog.component.ts

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-tool-return-confirmation-dialog',
  template: `
    <h2>{{ data.message }}</h2>
  `,
})
export class ToolReturnConfirmationDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {}
}
