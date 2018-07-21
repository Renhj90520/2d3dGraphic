import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeScalingBallComponent } from './three-scaling-ball.component';

describe('ThreeScalingBallComponent', () => {
  let component: ThreeScalingBallComponent;
  let fixture: ComponentFixture<ThreeScalingBallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeScalingBallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeScalingBallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
