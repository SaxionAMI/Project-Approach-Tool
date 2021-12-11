import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VtRuleCountMethodsInStrategyConditionComponent } from './vt-rule-count-methods-in-strategy-condition.component';

describe('VtRuleCountMethodsInStrategyConditionComponent', () => {
  let component: VtRuleCountMethodsInStrategyConditionComponent;
  let fixture: ComponentFixture<VtRuleCountMethodsInStrategyConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VtRuleCountMethodsInStrategyConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VtRuleCountMethodsInStrategyConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
