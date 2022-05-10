import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VtRuleFeedbackBubbleActionComponent } from './vt-rule-feedback-bubble-action.component';

describe('VtRuleFeedbackBubbleActionComponent', () => {
  let component: VtRuleFeedbackBubbleActionComponent;
  let fixture: ComponentFixture<VtRuleFeedbackBubbleActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VtRuleFeedbackBubbleActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VtRuleFeedbackBubbleActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
