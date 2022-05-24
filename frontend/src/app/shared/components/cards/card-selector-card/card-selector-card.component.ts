import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Card } from "@app/core/models/card.model";

@Component({
  selector: "app-card-selector-card",
  templateUrl: "./card-selector-card.component.html",
  styleUrls: ["./card-selector-card.component.css"],
})
export class CardSelectorCardComponent {
  @Input() card: Card;
  @Input() detail: boolean;
  flipDiv: boolean = false;

  // Added room 
  @Input() room: string;

  @Output() childEvent = new EventEmitter();

  constructor() {}

  /**
   * Select a card
   * @returns void
   */
  selectCard(): void {
    this.childEvent.emit(this.card);
  }
}
