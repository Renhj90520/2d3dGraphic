import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CanvasSparkleTrailComponent } from './canvas-sparkle-trail.component';

describe('CanvasSparkleTrailComponent', () => {
  let component: CanvasSparkleTrailComponent;
  let fixture: ComponentFixture<CanvasSparkleTrailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasSparkleTrailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasSparkleTrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
