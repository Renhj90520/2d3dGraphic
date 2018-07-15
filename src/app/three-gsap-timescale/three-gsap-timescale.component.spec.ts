import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeGsapTimescaleComponent } from './three-gsap-timescale.component';

describe('ThreeGsapTimescaleComponent', () => {
  let component: ThreeGsapTimescaleComponent;
  let fixture: ComponentFixture<ThreeGsapTimescaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeGsapTimescaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeGsapTimescaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
