import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VtRuleActionSelectorComponent } from './vt-rule-action-selector.component';

describe('VtRuleActionSelectorComponent', () => {
  let component: VtRuleActionSelectorComponent;
  let fixture: ComponentFixture<VtRuleActionSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VtRuleActionSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VtRuleActionSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
