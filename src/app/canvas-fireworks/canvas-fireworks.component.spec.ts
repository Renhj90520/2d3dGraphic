import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasFireworksComponent } from './canvas-fireworks.component';

describe('CanvasFireworksComponent', () => {
  let component: CanvasFireworksComponent;
  let fixture: ComponentFixture<CanvasFireworksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasFireworksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasFireworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
