import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VtDashboardComponent } from './vt-dashboard.component';

describe('VtDashboardComponent', () => {
  let component: VtDashboardComponent;
  let fixture: ComponentFixture<VtDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VtDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VtDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
