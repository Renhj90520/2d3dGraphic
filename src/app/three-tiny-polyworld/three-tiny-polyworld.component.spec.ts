import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeTinyPolyworldComponent } from './three-tiny-polyworld.component';

describe('ThreeTinyPolyworldComponent', () => {
  let component: ThreeTinyPolyworldComponent;
  let fixture: ComponentFixture<ThreeTinyPolyworldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeTinyPolyworldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeTinyPolyworldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
