import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasSparkleLoaderComponent } from './canvas-sparkle-loader.component';

describe('CanvasSparkleLoaderComponent', () => {
  let component: CanvasSparkleLoaderComponent;
  let fixture: ComponentFixture<CanvasSparkleLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasSparkleLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasSparkleLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
