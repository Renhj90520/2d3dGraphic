import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ThreeFireComponent } from './three-fire.component';

describe('ThreeFireComponent', () => {
  let component: ThreeFireComponent;
  let fixture: ComponentFixture<ThreeFireComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeFireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeFireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
