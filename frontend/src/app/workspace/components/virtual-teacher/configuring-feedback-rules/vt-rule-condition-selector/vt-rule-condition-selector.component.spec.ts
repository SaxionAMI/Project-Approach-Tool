import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VtRuleConditionSelectorComponent } from './vt-rule-condition-selector.component';

describe('VtRuleConditionSelectorComponent', () => {
  let component: VtRuleConditionSelectorComponent;
  let fixture: ComponentFixture<VtRuleConditionSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VtRuleConditionSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VtRuleConditionSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
