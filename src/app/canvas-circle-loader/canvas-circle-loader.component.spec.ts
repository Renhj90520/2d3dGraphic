import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CanvasCircleLoaderComponent } from './canvas-circle-loader.component';

describe('CanvasCircleLoaderComponent', () => {
  let component: CanvasCircleLoaderComponent;
  let fixture: ComponentFixture<CanvasCircleLoaderComponent>;

  beforeEach(waitForAsync(() => {
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
