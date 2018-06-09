import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasWaterfallComponent } from './canvas-waterfall.component';

describe('CanvasWaterfallComponent', () => {
  let component: CanvasWaterfallComponent;
  let fixture: ComponentFixture<CanvasWaterfallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasWaterfallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasWaterfallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
