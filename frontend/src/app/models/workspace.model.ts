import { Group } from './group.model';
import "leader-line";
declare let LeaderLine: any;



export class Workspace {
  id: number;
  title: string;
  goal: string;
  groups: Group[];
  storedLines: any[];
  image: string;

  constructor() {
    this.id =  Date.now();
  }
}
