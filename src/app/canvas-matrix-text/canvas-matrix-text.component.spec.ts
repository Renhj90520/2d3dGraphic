import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CanvasMatrixTextComponent } from './canvas-matrix-text.component';

describe('CanvasMatrixTextComponent', () => {
  let component: CanvasMatrixTextComponent;
  let fixture: ComponentFixture<CanvasMatrixTextComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasMatrixTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasMatrixTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
