import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ThreeVoronoiZoomComponent } from './three-voronoi-zoom.component';

describe('ThreeVoronoiZoomComponent', () => {
  let component: ThreeVoronoiZoomComponent;
  let fixture: ComponentFixture<ThreeVoronoiZoomComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeVoronoiZoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeVoronoiZoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
