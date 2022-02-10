import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VtRuleOpenWebpageComponent } from './vt-rule-open-webpage.component';

describe('VtRuleOpenWebpageComponent', () => {
  let component: VtRuleOpenWebpageComponent;
  let fixture: ComponentFixture<VtRuleOpenWebpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VtRuleOpenWebpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VtRuleOpenWebpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
