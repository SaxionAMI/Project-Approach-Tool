import { Directive, HostListener } from "@angular/core";

@Directive({
  selector: "[appClickStopPropagation]",
})
export class ClickStopPropagationDirective {
  @HostListener("mousedown", ["$event"])
  /**
   * when a mouse clicks done, this event stops propagation.
   * @param  {any} event
   * @returns void
   */
  public onMousedown(event: any): void {
    event.stopPropagation();
  }
}
