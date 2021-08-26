import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ThreeLiquidComponent } from './three-liquid.component';

describe('ThreeLiquidComponent', () => {
  let component: ThreeLiquidComponent;
  let fixture: ComponentFixture<ThreeLiquidComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeLiquidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeLiquidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
