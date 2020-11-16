import { Group } from "./group.model";
import { Line } from "./line.model";
import { Permission } from "./Permission.model";
import { Card } from "./card.model";
import { Deck } from "./deck.model";

export class Workspace {
  _id: string;
  title: string;
  goal: string;
  groups: Group[];
  storedLines: Line[];
  image: string;
  users: Permission[];
  spawnList: Group;
  customCards: Card[];
  decks: Deck[];

  constructor() {
    this.groups = [];
    this.storedLines = [];
    this.users = [];
    this.customCards = [];
    this.decks = [];
    this.spawnList = {
      id: Date.now(),
      title: "spawngroup",
      location: { x: 0, y: 0 },
      cards: [],
      selected: false,
    };
  }
}
