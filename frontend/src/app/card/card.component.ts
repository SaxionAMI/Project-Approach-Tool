import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Card } from '../models/card.model';
import { MatDialog } from '@angular/material/dialog';
import { CardDetailModalComponent } from '../dialogs/carddetail/card-detail-modal.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() card: Card;
  canEdit = false;

  @Output()
  save = new EventEmitter<string>();

  @ViewChild('question') QuestionField: ElementRef;


  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
    if (!this.card.Title) {
      this.canEdit = true;
      setTimeout(() => this.QuestionField.nativeElement.focus());
    }
  }

  openDetail() {
    const dialogRef = this.dialog.open(
      CardDetailModalComponent,
      {
        width: '400px',
        data: this.card
      }
    );


    dialogRef.afterClosed().subscribe(result => {
      if (this.card.Title === '') {
        this.canEdit = true;
      }
    });
  }

  saveTitle() {
    if (this.card.Title !== '') {
    this.canEdit = false;
    this.save.emit();
    }
  }
}
