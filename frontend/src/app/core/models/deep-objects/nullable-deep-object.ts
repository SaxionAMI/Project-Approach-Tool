import { DeepObject } from "./deep-object";

export class NullableDeepObject {
    static deepEqualsOrNull<T extends DeepObject<T>> (a?: T, b?: T) {
        if (a == null && b == null) return true;
        else if (a == null && b != null) return false;
        else if (b == null && a != null) return false;
        else return a.deepEquals(b);
    }
}