import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeHexMosicComponent } from './three-hex-mosic.component';

describe('ThreeHexMosicComponent', () => {
  let component: ThreeHexMosicComponent;
  let fixture: ComponentFixture<ThreeHexMosicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeHexMosicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeHexMosicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
