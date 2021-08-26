import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WaveDotsComponent } from './wave-dots.component';

describe('WaveDotsComponent', () => {
  let component: WaveDotsComponent;
  let fixture: ComponentFixture<WaveDotsComponent>;

  beforeEach(waitForAsync(() => {
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
