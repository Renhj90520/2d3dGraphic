import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GradientBackComponent } from './gradient-back.component';

describe('GradientBackComponent', () => {
  let component: GradientBackComponent;
  let fixture: ComponentFixture<GradientBackComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GradientBackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradientBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
