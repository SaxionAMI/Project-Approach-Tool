import { Directive, Input, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDynamicComponentAnchor]'
})
export class DynamicComponentAnchor {
  constructor(public viewContainerRef: ViewContainerRef) { }

  @Input() id: string;
}
