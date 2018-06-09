import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MagicBallComponent } from './magic-ball.component';

describe('MagicBallComponent', () => {
  let component: MagicBallComponent;
  let fixture: ComponentFixture<MagicBallComponent>;

  beforeEach(async(() => {
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
