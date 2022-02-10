import { Filter } from "./filter.interface";

export class ThreeWayFilter implements Filter{
    readonly name: string;
    private filter: Function;
    private iconWhenOff: string;
    private iconWhenOn: string;
    private iconWhenMaybe: string;
    private filterState: number = 0;
  
    constructor(name: string, filter: Function, iconWhenOff: string, iconWhenOn: string, iconWhenMaybe: string) {
        this.name = name;
        this.filter = filter;
        this.iconWhenOff = iconWhenOff;
        this.iconWhenOn = iconWhenOn;
        this.iconWhenMaybe = iconWhenMaybe;
    }
    reset() {
        this.filterState = 0;
    }
  
    apply(collection) {
      switch(this.filterState) {
        default:
        case 0: return collection;
        case 1: return collection.filter(x => this.filter(x));
        case 2: return collection.filter(x => !this.filter(x));
      }
    }

    cycle() {
        switch(this.filterState) {
            case 0: {
                this.filterState = 1;
                break;
            }
            case 1: {
                this.filterState = 2;
                break;
            }
            default:
            case 2: {
                this.filterState = 0;
                break;
            }
        }
    }
  
    get icon() {
      switch(this.filterState) {
        case 0: return this.iconWhenOff;
        case 1: return this.iconWhenOn;
        case 2: return this.iconWhenMaybe;
      }
    }

    get active() {
        return this.filterState > 0;
    }

    get state() {
        return this.filterState;
    }
  }