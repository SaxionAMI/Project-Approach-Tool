import { EventEmitter } from "@angular/core";

export declare interface IValidatable<T> {
    onValidated: EventEmitter<T>;
    isValid: boolean;
    validate();
}