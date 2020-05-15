import { Directive, HostListener } from "@angular/core";

@Directive({
  selector: '[appClickStopPropagation]'
})
export class ClickStopPropagationDirective {

  @HostListener("mousedown", ["$event"])
  public onMousedown(event: any): void {
    event.persist();
    event.stopPropagation();
  }

}
