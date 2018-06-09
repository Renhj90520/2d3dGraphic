import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasVisualizationComponent } from './canvas-visualization.component';

describe('CanvasVisualizationComponent', () => {
  let component: CanvasVisualizationComponent;
  let fixture: ComponentFixture<CanvasVisualizationComponent>;

  beforeEach(async(() => {
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
