export declare interface DeepObject<T> {
    /**
     * Make a full, deep copy of this condition and its children. 
     * @usage Keeping a deep copy of an object is useful for detecting if an object has been modified, and to allow safe modifications without altering the original object.
     * @note to avoid accidental modification of the original object via memory references, all child objects are also deep-copied. If this is not desired, use this type's constructor via the `new` keyword instead.
     * @returns A full, deep copy of this condition.
     */
    deepCopy(): T;

    /**
     * Perform a deep value comparison between two objects.
     * @note Compares on a value level --- two objects are considered identical when their values are identical, even if they are stored in separate memory addresses.
     * @usage Deep value comparison is useful for detecting if an object has been modified, by comparing it to a deep copy that was taken of itself before it was modified.
     * @returns Only returns true when both objects are EXACTLY identical on a value level; otherwise returns false.
     */
    deepEquals(other: T): boolean;
}