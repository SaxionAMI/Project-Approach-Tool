import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-vt-rules-list-delete-dialog',
  templateUrl: './vt-rules-list-delete-dialog.component.html',
  styleUrls: ['./vt-rules-list-delete-dialog.component.css']
})
export class VtRulesListDeleteDialogComponent {
  constructor(private dialogRef: MatDialogRef<VtRulesListDeleteDialogComponent>) {}

    onBack(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
