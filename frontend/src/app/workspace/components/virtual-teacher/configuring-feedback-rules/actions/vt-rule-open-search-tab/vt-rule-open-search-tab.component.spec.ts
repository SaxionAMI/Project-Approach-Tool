import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VtRuleOpenSearchTabComponent } from './vt-rule-open-search-tab.component';

describe('VtRuleOpenSearchTabComponent', () => {
  let component: VtRuleOpenSearchTabComponent;
  let fixture: ComponentFixture<VtRuleOpenSearchTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VtRuleOpenSearchTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VtRuleOpenSearchTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
