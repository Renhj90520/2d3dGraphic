import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeGsapFlipyComponent } from './three-gsap-flipy.component';

describe('ThreeGsapFlipyComponent', () => {
  let component: ThreeGsapFlipyComponent;
  let fixture: ComponentFixture<ThreeGsapFlipyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeGsapFlipyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeGsapFlipyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
