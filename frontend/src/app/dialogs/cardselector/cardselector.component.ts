import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CardService } from 'src/app/services/card.service';
import { GroupComponent } from 'src/app/group/group.component';

@Component({
  selector: 'app-cardselector',
  templateUrl: './cardselector.component.html',
  styleUrls: ['./cardselector.component.css']
})
export class CardSelectorComponent implements OnInit {
  cards;

  constructor(public dialogRef: MatDialogRef<GroupComponent>,
              private cardService: CardService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.getCards();
  }

  getCards() {
    switch (this.data.type) {
      case 'method':
        this.cardService.getCards().subscribe(res => (this.cards = res));
        break;
      case 'steppingStone':
        this.cardService.getSteppingStones().subscribe(res => (this.cards = res));
        break;
      case 'custom':
        this.cards = JSON.parse(localStorage.getItem('customCards'));
        break;
      default:
        break;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectCard(card) {
    this.dialogRef.close(card);
  }

}
