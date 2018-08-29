import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeBuffergeometryComponent } from './three-buffergeometry.component';

describe('ThreeBuffergeometryComponent', () => {
  let component: ThreeBuffergeometryComponent;
  let fixture: ComponentFixture<ThreeBuffergeometryComponent>;

  beforeEach(async(() => {
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
