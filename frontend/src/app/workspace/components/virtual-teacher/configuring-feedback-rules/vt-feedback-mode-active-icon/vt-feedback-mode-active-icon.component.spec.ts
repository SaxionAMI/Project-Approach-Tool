import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VtFeedbackModeActiveIconComponent } from './vt-feedback-mode-active-icon.component';

describe('VtFeedbackModeActiveIconComponent', () => {
  let component: VtFeedbackModeActiveIconComponent;
  let fixture: ComponentFixture<VtFeedbackModeActiveIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VtFeedbackModeActiveIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VtFeedbackModeActiveIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
