import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface VtDisableDialogData {
  disable: boolean;
  temporary: boolean;
}

@Component({
  selector: 'app-vt-disable-dialog',
  templateUrl: './vt-disable-dialog.component.html',
  styleUrls: ['./vt-disable-dialog.component.css']
})
export class VtDisableDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<VtDisableDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: VtDisableDialogData) { 
      console.log(data);
    }

  ngOnInit(): void {
  }

  onKeepEnableClicked() {
    this.data.disable = false;
    this.dialogRef.close(this.data);
  }

  onDisableClicked() {
    this.data.disable = true;
    this.dialogRef.close(this.data);
  }

  get temporary(): boolean {
    return this.data.temporary;
  }

  set temporary(value: boolean) {
    this.data.temporary = value;
  }
}
