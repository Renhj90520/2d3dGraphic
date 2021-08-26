import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ThreeMyworldComponent } from './three-myworld.component';

describe('ThreeMyworldComponent', () => {
  let component: ThreeMyworldComponent;
  let fixture: ComponentFixture<ThreeMyworldComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeMyworldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeMyworldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
