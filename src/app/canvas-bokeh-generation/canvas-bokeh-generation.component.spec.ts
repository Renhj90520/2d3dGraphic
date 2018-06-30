import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasBokehGenerationComponent } from './canvas-bokeh-generation.component';

describe('CanvasBokehGenerationComponent', () => {
  let component: CanvasBokehGenerationComponent;
  let fixture: ComponentFixture<CanvasBokehGenerationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasBokehGenerationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasBokehGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
