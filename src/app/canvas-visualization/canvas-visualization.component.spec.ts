import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CanvasVisualizationComponent } from './canvas-visualization.component';

describe('CanvasVisualizationComponent', () => {
  let component: CanvasVisualizationComponent;
  let fixture: ComponentFixture<CanvasVisualizationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasVisualizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
