import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ThreeBuffergeometryComponent } from './three-buffergeometry.component';

describe('ThreeBuffergeometryComponent', () => {
  let component: ThreeBuffergeometryComponent;
  let fixture: ComponentFixture<ThreeBuffergeometryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeBuffergeometryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeBuffergeometryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
