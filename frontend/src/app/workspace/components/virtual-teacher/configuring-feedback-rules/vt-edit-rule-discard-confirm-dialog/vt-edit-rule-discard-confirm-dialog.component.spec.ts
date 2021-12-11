import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VtEditRuleDiscardConfirmDialogComponent } from './vt-edit-rule-discard-confirm-dialog.component';

describe('VtEditRuleDiscardConfirmDialogComponent', () => {
  let component: VtEditRuleDiscardConfirmDialogComponent;
  let fixture: ComponentFixture<VtEditRuleDiscardConfirmDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VtEditRuleDiscardConfirmDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VtEditRuleDiscardConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
