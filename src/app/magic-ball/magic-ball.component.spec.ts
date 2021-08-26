import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MagicBallComponent } from './magic-ball.component';

describe('MagicBallComponent', () => {
  let component: MagicBallComponent;
  let fixture: ComponentFixture<MagicBallComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MagicBallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MagicBallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
