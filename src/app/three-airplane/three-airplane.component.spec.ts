import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ThreeAirplaneComponent } from './three-airplane.component';

describe('ThreeAirplaneComponent', () => {
  let component: ThreeAirplaneComponent;
  let fixture: ComponentFixture<ThreeAirplaneComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeAirplaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeAirplaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
