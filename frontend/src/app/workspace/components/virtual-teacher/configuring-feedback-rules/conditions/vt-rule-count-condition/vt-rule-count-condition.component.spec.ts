import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VtRuleCountConditionComponent } from './vt-rule-count-condition.component';

describe('VtRuleCountConditionComponent', () => {
  let component: VtRuleCountConditionComponent;
  let fixture: ComponentFixture<VtRuleCountConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VtRuleCountConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VtRuleCountConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
