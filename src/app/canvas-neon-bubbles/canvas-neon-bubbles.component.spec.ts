import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CanvasNeonBubblesComponent } from './canvas-neon-bubbles.component';

describe('CanvasNeonBubblesComponent', () => {
  let component: CanvasNeonBubblesComponent;
  let fixture: ComponentFixture<CanvasNeonBubblesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasNeonBubblesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasNeonBubblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
