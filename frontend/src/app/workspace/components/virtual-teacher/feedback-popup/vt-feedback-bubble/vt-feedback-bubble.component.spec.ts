import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VTFeedbackBubbleComponent } from './vt-feedback-bubble.component';

describe('VTFeedbackBubbleComponent', () => {
  let component: VTFeedbackBubbleComponent;
  let fixture: ComponentFixture<VTFeedbackBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VTFeedbackBubbleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VTFeedbackBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
