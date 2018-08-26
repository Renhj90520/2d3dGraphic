import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasParticleTrailComponent } from './canvas-particle-trail.component';

describe('CanvasParticleTrailComponent', () => {
  let component: CanvasParticleTrailComponent;
  let fixture: ComponentFixture<CanvasParticleTrailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasParticleTrailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasParticleTrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
