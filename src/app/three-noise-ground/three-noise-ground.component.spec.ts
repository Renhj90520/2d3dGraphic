import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ThreeNoiseGroundComponent } from './three-noise-ground.component';

describe('ThreeNoiseGroundComponent', () => {
  let component: ThreeNoiseGroundComponent;
  let fixture: ComponentFixture<ThreeNoiseGroundComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeNoiseGroundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeNoiseGroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
