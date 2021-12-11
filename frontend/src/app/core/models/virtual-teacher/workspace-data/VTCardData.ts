import { Card } from "../../card.model";

export class VTCardData {
    id: string;
    title: string;
    type: string;
    deck: string;
    constructor(card: Card) {
        this.id = card.id;
        this.title = card.title;
        this.type = card.type;
        this.deck = card.deck;
    }
}