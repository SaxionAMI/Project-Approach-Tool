import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VtRuleFeedbackmodeSelectorComponent } from './vt-rule-feedbackmode-selector.component';

describe('VtRuleFeedbackmodeSelectorComponent', () => {
  let component: VtRuleFeedbackmodeSelectorComponent;
  let fixture: ComponentFixture<VtRuleFeedbackmodeSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VtRuleFeedbackmodeSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VtRuleFeedbackmodeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
