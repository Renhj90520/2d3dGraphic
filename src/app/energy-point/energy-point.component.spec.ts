import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyPointComponent } from './energy-point.component';

describe('EnergyPointComponent', () => {
  let component: EnergyPointComponent;
  let fixture: ComponentFixture<EnergyPointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnergyPointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnergyPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
