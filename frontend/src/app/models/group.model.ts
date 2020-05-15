import { Card } from './card.model';

export class Group {
  id: number;
  title: string;
  location: { x: number; y: number };
  cards: any[];
  selected: boolean;
}
