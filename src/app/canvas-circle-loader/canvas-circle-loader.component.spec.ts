import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasCircleLoaderComponent } from './canvas-circle-loader.component';

describe('CanvasCircleLoaderComponent', () => {
  let component: CanvasCircleLoaderComponent;
  let fixture: ComponentFixture<CanvasCircleLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasCircleLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasCircleLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
