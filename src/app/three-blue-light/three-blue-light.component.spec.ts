import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeBlueLightComponent } from './three-blue-light.component';

describe('ThreeBlueLightComponent', () => {
  let component: ThreeBlueLightComponent;
  let fixture: ComponentFixture<ThreeBlueLightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeBlueLightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeBlueLightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
