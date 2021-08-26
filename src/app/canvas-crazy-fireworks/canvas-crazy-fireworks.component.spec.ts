import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CanvasCrazyFireworksComponent } from './canvas-crazy-fireworks.component';

describe('CanvasCrazyFireworksComponent', () => {
  let component: CanvasCrazyFireworksComponent;
  let fixture: ComponentFixture<CanvasCrazyFireworksComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasCrazyFireworksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasCrazyFireworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
