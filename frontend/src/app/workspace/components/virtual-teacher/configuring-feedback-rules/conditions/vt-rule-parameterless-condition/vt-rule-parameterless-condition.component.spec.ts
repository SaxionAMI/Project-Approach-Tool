import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VtRuleParameterlessConditionComponent } from './vt-rule-parameterless-condition.component';

describe('VtRuleParameterlessConditionComponent', () => {
  let component: VtRuleParameterlessConditionComponent;
  let fixture: ComponentFixture<VtRuleParameterlessConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VtRuleParameterlessConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VtRuleParameterlessConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
