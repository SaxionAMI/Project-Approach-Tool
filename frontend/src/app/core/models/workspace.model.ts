import { Group, IGroupData } from "./group.model";
import { Line } from "./line.model";
import { Permission } from "./permission.model";
import { Card, ICardData } from "./card.model";
import { Deck } from "./deck.model";
import { VTFeedbackCategoriesModel } from "./virtual-teacher/vt-feedback-categories-model";
import { TOUCH_BUFFER_MS } from "@angular/cdk/a11y";
import { flatten } from "@angular/compiler";

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
  feedback: VTFeedbackCategoriesModel;
  disabledRuleIds: string[];
  permanentDisableVT: boolean;

  constructor(data) {
    this._id = data._id;
    this.title = data.title;
    this.goal = data.goal;
    this.image = data.image;
    this.groups = data.groups.map(x => new Group(x));
    this.storedLines = data.storedLines;
    this.users = data.users;
    this.customCards = data.customCards.map(x => new Card(x));
    this.decks = data.decks;
    this.spawnList = new Group({
      id: Date.now(),
      title: "spawngroup",
      location: { x: 0, y: 0 },
      cards: [],
      selected: false
    });
    this.feedback = new VTFeedbackCategoriesModel();
    this.disabledRuleIds = data.disabledRuleIds ?? [];
    this.permanentDisableVT = data.permanentDisableVT;
  }

  static blank() {
    return new Workspace({
      groups: [],
      storedLines: [],
      users: [],
      customCards: [],
      decks: []
    });
  }

  data(): IWorkspaceData {
    return new WorkspaceData(this);
  }

  updateCards(changes: Partial<Card>[]): WorkspaceData {
    const cards = flatten(this.groups.map(group => group.cards)).filter(card => changes.map(change => change.id).includes(card.id));
    console.log('cards to update', cards);

    cards.forEach(card => card.update(changes.find(change => change.id === card.id)));
    console.log('updated cards', cards);
    return this.data();
  }
}

export class WorkspaceData implements IWorkspaceData {
  constructor(data: Workspace) {
    this._id = data._id;
    this.title = data.title;
    this.goal = data.goal;
    this.groups = data.groups.map(x => x.data());
    this.storedLines = data.storedLines;
    this.image = data.image;
    this.users  = data.users;
    this.spawnList = data.spawnList.data();
    this.customCards = data.customCards.map(x => x.data());
    this.decks = data.decks;
    this.disabledRuleIds = data.disabledRuleIds;
    this.permanentDisableVT = data.permanentDisableVT;
  }

  _id: string;
  title: string;
  goal: string;
  groups: IGroupData[];
  storedLines: Line[];
  image: string;
  users: Permission[];
  spawnList: IGroupData;
  customCards: ICardData[];
  decks: Deck[];
  disabledRuleIds: string[];
  permanentDisableVT: boolean;
}

export declare interface IWorkspaceData {
  _id: string;
  title: string;
  goal: string;
  groups: IGroupData[];
  storedLines: Line[];
  image: string;
  users: Permission[];
  spawnList: IGroupData;
  customCards: ICardData[];
  decks: Deck[];
  disabledRuleIds: string[];
  permanentDisableVT: boolean;
}
