import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ThreeSuperMarryComponent } from './three-super-marry.component';

describe('ThreeSuperMarryComponent', () => {
  let component: ThreeSuperMarryComponent;
  let fixture: ComponentFixture<ThreeSuperMarryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeSuperMarryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeSuperMarryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
