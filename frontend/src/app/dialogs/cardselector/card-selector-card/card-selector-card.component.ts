import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Card } from 'src/app/models/card.model';

@Component({
  selector: 'app-card-selector-card',
  templateUrl: './card-selector-card.component.html',
  styleUrls: ['./card-selector-card.component.css']
})
export class CardSelectorCardComponent implements OnInit {
  @Input()card: Card;
  @Input()detail: Boolean;
  flipDiv = false;


  @Output() childEvent = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  selectCard() {
    this.childEvent.emit(this.card);
  }


}
