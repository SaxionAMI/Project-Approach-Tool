import { Card, ICardData } from './card.model';
import { Position } from './position.model'
import { VTFeedbackCategoriesModel } from './virtual-teacher/vt-feedback-categories-model';
export class Group {
  id: number;
  title: string;
  location: Position;
  cards: Card[];
  selected: boolean;
  feedback: VTFeedbackCategoriesModel;

  constructor(data) {
    this.id = data.id;
    this.cards = data.cards.map(x => new Card(x));
    this.title = data.title;
    this.location = data.location;
    this.selected = data.selected;
    this.feedback = new VTFeedbackCategoriesModel();
  }

  static blank() {
    return new Group({
      id: 0,
      cards: [],
      title: '',
      location: {x: 0, y: 0},
      selected: false
    });
  }

  data(): IGroupData {
    return new GroupData(this);
  }
}

export class GroupData implements IGroupData{
  constructor(data: Group) {
    this.id = data.id;
    this.title = data.title;
    this.location = data.location;
    this.cards = data.cards.map(x => x.data());
  }

  id: number;
  title: string;
  location: Position;
  cards: ICardData[];
  selected: boolean;
}

export declare interface IGroupData {
  id: number;
  title: string;
  location: Position;
  cards: ICardData[];
  selected: boolean;
}
