import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { WorkspacelistComponent } from "./workspacelist.component";

describe("WorkspacelistComponent", () => {
  let component: WorkspacelistComponent;
  let fixture: ComponentFixture<WorkspacelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WorkspacelistComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspacelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
