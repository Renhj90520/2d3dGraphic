import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FramerateComponent } from './framerate.component';

describe('FramerateComponent', () => {
  let component: FramerateComponent;
  let fixture: ComponentFixture<FramerateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FramerateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FramerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
