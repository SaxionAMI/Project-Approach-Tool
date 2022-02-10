import { Group } from "../../group.model";
import { VTCardData } from "./VTCardData";

export class VTGroupData {
    cards: VTCardData[];
    id: string;
    constructor(group: Group) {
        this.cards = group.cards.map(x => new VTCardData(x));
        this.id = group.id.toString();
    }
}