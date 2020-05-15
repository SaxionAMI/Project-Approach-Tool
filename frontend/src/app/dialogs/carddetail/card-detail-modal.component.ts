import { Component, OnInit, Inject, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Card } from 'src/app/models/card.model';
import { GroupComponent } from 'src/app/group/group.component';


@Component({
  selector: 'app-card-detail-modal',
  templateUrl: './card-detail-modal.component.html',
  styleUrls: ['./card-detail-modal.component.css']
})
export class CardDetailModalComponent implements OnInit {
  question = false;
  canEdit = false;

  @ViewChild('title-editor') vc: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<GroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Card,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    if (this.data.Type === 'Question') {
      this.question = true;
    }
  }

  changeEdit() {
    this.canEdit = true;
    this.cd.detectChanges();
    this.vc.nativeElement.focus();
    // setTimeout(() => );
  }

  saveTitle() {
    if (this.data.Title !== ''){
      this.canEdit = false;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
