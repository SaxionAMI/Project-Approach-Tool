import { Card } from './card.model';
import { Position } from './position.model'
export class Group {
  id: number;
  title: string;
  location: Position;
  cards: Card[];
  selected: boolean;
}
