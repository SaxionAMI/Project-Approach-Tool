import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VtEditRuleDialogComponent } from './vt-edit-rule-dialog.component';

describe('VtEditRuleDialogComponent', () => {
  let component: VtEditRuleDialogComponent;
  let fixture: ComponentFixture<VtEditRuleDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VtEditRuleDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VtEditRuleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
