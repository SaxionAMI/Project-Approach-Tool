import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VtRuleOpenCatalogTabComponent } from './vt-rule-open-catalog-tab.component';

describe('VtRuleOpenCatalogTabComponent', () => {
  let component: VtRuleOpenCatalogTabComponent;
  let fixture: ComponentFixture<VtRuleOpenCatalogTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VtRuleOpenCatalogTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VtRuleOpenCatalogTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
