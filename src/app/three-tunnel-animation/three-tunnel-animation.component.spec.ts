import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ThreeTunnelAnimationComponent } from './three-tunnel-animation.component';

describe('ThreeTunnelAnimationComponent', () => {
  let component: ThreeTunnelAnimationComponent;
  let fixture: ComponentFixture<ThreeTunnelAnimationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeTunnelAnimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeTunnelAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
