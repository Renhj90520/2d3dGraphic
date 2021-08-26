import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VectorDotComponent } from './vector-dot.component';

describe('VectorDotComponent', () => {
  let component: VectorDotComponent;
  let fixture: ComponentFixture<VectorDotComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VectorDotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VectorDotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
