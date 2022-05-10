import { VTFeedbackCategoriesModel } from "./virtual-teacher/vt-feedback-categories-model";

export class Card {
  _id?: string;
  id?: string;
  title?: string;
  shortDescription?: string;
  longDescription?: string;
  type: string;
  picture?: string;
  color?: string;
  note?: string;
  deck?: string;
  startDate?: Date;
  endDate?: Date;
  feedback: VTFeedbackCategoriesModel;

  constructor(data) {
    this._id = data._id;
    this.id = data.id;
    this.title = data.title;
    this.shortDescription = data.shortDescription;
    this.longDescription = data.longDescription;
    this.type = data.type;
    this.picture = data.picture;
    this.color = data.color;
    this.note = data.note;
    this.deck = data.deck;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.feedback = new VTFeedbackCategoriesModel();
  }

  static blank() {
    return new Card({
      _id: 0,
      id: 0,
      title: "",
      shortDescription: "",
      longDescription: "",
      type: "",
      picture: "",
      color: "",
      note: "",
      deck: "",
      startDate: null,
      endDate: null,
    });
  }

  data(): ICardData {
    return new CardData(this);
  }

  update({startDate, endDate}: Partial<Card>): void {
    this.startDate = startDate;
    this.endDate = endDate;
  }
}

export class CardData implements ICardData {
  _id?: string;
  id?: string;
  title?: string;
  shortDescription?: string;
  longDescription?: string;
  type: string;
  picture?: string;
  color?: string;
  note?: string;
  deck?: string;
  startDate?: Date;
  endDate?: Date;

  constructor(data: ICardData) {
    this._id = data._id;
    this.id = data.id;
    this.title = data.title;
    this.shortDescription = data.shortDescription;
    this.longDescription = data.longDescription;
    this.type = data.type;
    this.picture = data.picture;
    this.color = data.color;
    this.note = data.note;
    this.deck = data.deck;
    this.startDate = data.startDate;
    this.endDate = data.endDate;
  }
}

export declare interface ICardData {
  _id?: string;
  id?: string;
  title?: string;
  shortDescription?: string;
  longDescription?: string;
  type: string;
  picture?: string;
  color?: string;
  note?: string;
  deck?: string;
  startDate?: Date;
  endDate?: Date;
}
