import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VectorAddSubComponent } from './vector-add-sub.component';

describe('VectorAddSubComponent', () => {
  let component: VectorAddSubComponent;
  let fixture: ComponentFixture<VectorAddSubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VectorAddSubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VectorAddSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
