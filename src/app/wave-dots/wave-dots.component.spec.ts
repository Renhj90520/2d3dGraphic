import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaveDotsComponent } from './wave-dots.component';

describe('WaveDotsComponent', () => {
  let component: WaveDotsComponent;
  let fixture: ComponentFixture<WaveDotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaveDotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaveDotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
