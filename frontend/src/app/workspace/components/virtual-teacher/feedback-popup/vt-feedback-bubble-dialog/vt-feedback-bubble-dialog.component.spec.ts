import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VTFeedbackBubbleDialogComponent } from './vt-feedback-bubble-dialog.component';

describe('VTFeedbackBubbleDialogComponent', () => {
  let component: VTFeedbackBubbleDialogComponent;
  let fixture: ComponentFixture<VTFeedbackBubbleDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VTFeedbackBubbleDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VTFeedbackBubbleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
