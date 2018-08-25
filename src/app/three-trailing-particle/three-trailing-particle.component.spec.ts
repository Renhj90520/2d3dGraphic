import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeTrailingParticleComponent } from './three-trailing-particle.component';

describe('ThreeTrailingParticleComponent', () => {
  let component: ThreeTrailingParticleComponent;
  let fixture: ComponentFixture<ThreeTrailingParticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeTrailingParticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeTrailingParticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
