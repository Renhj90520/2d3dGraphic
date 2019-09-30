import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeHexMosaicComponent } from './three-hex-mosaic.component';

describe('ThreeHexMosaicComponent', () => {
  let component: ThreeHexMosaicComponent;
  let fixture: ComponentFixture<ThreeHexMosaicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeHexMosaicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeHexMosaicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
