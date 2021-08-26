import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CanvasStarrySkyComponent } from './canvas-starry-sky.component';

describe('CanvasStarrySkyComponent', () => {
  let component: CanvasStarrySkyComponent;
  let fixture: ComponentFixture<CanvasStarrySkyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasStarrySkyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasStarrySkyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
