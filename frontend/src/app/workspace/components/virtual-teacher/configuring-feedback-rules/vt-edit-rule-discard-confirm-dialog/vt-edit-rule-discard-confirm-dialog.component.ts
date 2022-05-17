import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-vt-edit-rule-discard-confirm-dialog',
  templateUrl: './vt-edit-rule-discard-confirm-dialog.component.html',
  styleUrls: ['./vt-edit-rule-discard-confirm-dialog.component.css']
})
export class VtEditRuleDiscardConfirmDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<VtEditRuleDiscardConfirmDialogComponent>) { }

  ngOnInit(): void {
  }

  yes() {
    this.dialogRef.close(true);
  }

  no() {
    this.dialogRef.close(false);
  }
}
