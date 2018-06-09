import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasOrbitTrailsComponent } from './canvas-orbit-trails.component';

describe('CanvasOrbitTrailsComponent', () => {
  let component: CanvasOrbitTrailsComponent;
  let fixture: ComponentFixture<CanvasOrbitTrailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasOrbitTrailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasOrbitTrailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
