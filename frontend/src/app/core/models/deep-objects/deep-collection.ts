import { DeepObject } from "./deep-object";

export class DeepCollection {
    static deepEquals<T extends DeepObject<T>>(c1: T[], c2: T[]) {
        if (c1.length != c2.length) return false;
        for(let i = 0; i < c1.length; i++) {
            const item = c1[i];
            if (c2.findIndex(x => x.deepEquals(item)) < 0) return false;
        }
        return true;
    }

    static deepCopy<T extends DeepObject<T>>(collection: T[]): T[] {
        return collection.map(x => x.deepCopy());
    }
}