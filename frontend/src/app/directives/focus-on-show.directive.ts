import { Directive, OnInit, ElementRef } from "@angular/core";

@Directive({
  selector: "[appFocusOnShow]",
})
export class FocusOnShowDirective implements OnInit {
  constructor(private el: ElementRef) {
    if (!el.nativeElement["focus"]) {
      throw new Error("Element does not accept focus.");
    }
  }
  /**
   * This method will start on initializing
   * @returns void
   */
  ngOnInit(): void {
    const input: HTMLInputElement = this.el.nativeElement as HTMLInputElement;
    setTimeout(() => input.focus());
    input.select();
  }
}
