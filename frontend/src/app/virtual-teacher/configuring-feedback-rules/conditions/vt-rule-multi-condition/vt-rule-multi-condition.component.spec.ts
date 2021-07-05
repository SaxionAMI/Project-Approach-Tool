import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VtRuleMultiConditionComponent } from './vt-rule-multi-condition.component';

describe('VtRuleMultiConditionComponent', () => {
  let component: VtRuleMultiConditionComponent;
  let fixture: ComponentFixture<VtRuleMultiConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VtRuleMultiConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VtRuleMultiConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
