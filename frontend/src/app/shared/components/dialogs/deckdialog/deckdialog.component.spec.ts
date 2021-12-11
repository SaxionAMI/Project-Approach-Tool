import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckdialogComponent } from './deckdialog.component';

describe('DeckdialogComponent', () => {
  let component: DeckdialogComponent;
  let fixture: ComponentFixture<DeckdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeckdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
