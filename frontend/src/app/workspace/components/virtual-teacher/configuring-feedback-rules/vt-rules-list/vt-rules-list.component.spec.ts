import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VtRulesListComponent } from './vt-rules-list.component';

describe('VtRulesListComponent', () => {
  let component: VtRulesListComponent;
  let fixture: ComponentFixture<VtRulesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VtRulesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VtRulesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
