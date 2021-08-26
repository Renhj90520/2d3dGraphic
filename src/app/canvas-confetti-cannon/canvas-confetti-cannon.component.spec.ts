import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CanvasConfettiCannonComponent } from './canvas-confetti-cannon.component';

describe('CanvasConfettiCannonComponent', () => {
  let component: CanvasConfettiCannonComponent;
  let fixture: ComponentFixture<CanvasConfettiCannonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasConfettiCannonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasConfettiCannonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
