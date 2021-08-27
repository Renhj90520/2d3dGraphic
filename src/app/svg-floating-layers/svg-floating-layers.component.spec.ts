import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgFloatingLayersComponent } from './svg-floating-layers.component';

describe('SvgFloatingLayersComponent', () => {
  let component: SvgFloatingLayersComponent;
  let fixture: ComponentFixture<SvgFloatingLayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SvgFloatingLayersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgFloatingLayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
