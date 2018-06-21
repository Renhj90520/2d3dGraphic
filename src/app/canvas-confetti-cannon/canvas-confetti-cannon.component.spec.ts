import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasConfettiCannonComponent } from './canvas-confetti-cannon.component';

describe('CanvasConfettiCannonComponent', () => {
  let component: CanvasConfettiCannonComponent;
  let fixture: ComponentFixture<CanvasConfettiCannonComponent>;

  beforeEach(async(() => {
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
