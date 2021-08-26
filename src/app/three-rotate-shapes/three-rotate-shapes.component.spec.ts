import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ThreeRotateShapesComponent } from './three-rotate-shapes.component';

describe('ThreeRotateShapesComponent', () => {
  let component: ThreeRotateShapesComponent;
  let fixture: ComponentFixture<ThreeRotateShapesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeRotateShapesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeRotateShapesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
