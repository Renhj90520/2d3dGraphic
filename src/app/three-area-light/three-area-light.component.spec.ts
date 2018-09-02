import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeAreaLightComponent } from './three-area-light.component';

describe('ThreeAreaLightComponent', () => {
  let component: ThreeAreaLightComponent;
  let fixture: ComponentFixture<ThreeAreaLightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeAreaLightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeAreaLightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
