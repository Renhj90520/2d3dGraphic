import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ThreeEarthComponent } from './three-earth.component';

describe('ThreeEarthComponent', () => {
  let component: ThreeEarthComponent;
  let fixture: ComponentFixture<ThreeEarthComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeEarthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeEarthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
