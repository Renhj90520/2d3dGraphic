import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VectorCrossComponent } from './vector-cross.component';

describe('VectorCrossComponent', () => {
  let component: VectorCrossComponent;
  let fixture: ComponentFixture<VectorCrossComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VectorCrossComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VectorCrossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
