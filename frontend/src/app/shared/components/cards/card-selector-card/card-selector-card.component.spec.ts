import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSelectorCardComponent } from './card-selector-card.component';

describe('CardSelectorCardComponent', () => {
  let component: CardSelectorCardComponent;
  let fixture: ComponentFixture<CardSelectorCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardSelectorCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardSelectorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
