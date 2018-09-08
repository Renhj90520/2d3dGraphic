import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeAirplaneColoredComponent } from './three-airplane-colored.component';

describe('ThreeAirplaneColoredComponent', () => {
  let component: ThreeAirplaneColoredComponent;
  let fixture: ComponentFixture<ThreeAirplaneColoredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeAirplaneColoredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeAirplaneColoredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
