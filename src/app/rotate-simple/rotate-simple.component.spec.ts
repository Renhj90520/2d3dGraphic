import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RotateSimpleComponent } from './rotate-simple.component';

describe('RotateSimpleComponent', () => {
  let component: RotateSimpleComponent;
  let fixture: ComponentFixture<RotateSimpleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RotateSimpleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RotateSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
