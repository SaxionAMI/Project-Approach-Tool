import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-vt-feedback-mode-active-icon',
  templateUrl: './vt-feedback-mode-active-icon.component.html',
  styleUrls: ['./vt-feedback-mode-active-icon.component.css']
})
export class VtFeedbackModeActiveIconComponent implements OnInit {

  @Input() active: boolean;
  @Input() mode: string
  @Input() state: number = -1;
  get icon(): string {
    switch (this.mode) {
      case 'creating':
        return 'add';
      case 'editing':
        return 'build';
      case 'reviewing':
        return 'search';
    }
  }

  get iconClass() {
    if (this.state >= 0) {
      switch(this.state) {
        case 0: return 'off';
        case 1: return 'active';
        case 2: return '';
      }
    }
    else {
      if (this.active) return 'active';
      else return '';
    }
  }

  constructor() { }

  ngOnInit(): void {

  }

}
