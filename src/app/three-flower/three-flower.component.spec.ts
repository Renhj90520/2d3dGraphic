import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ThreeFlowerComponent } from './three-flower.component';

describe('ThreeFlowerComponent', () => {
  let component: ThreeFlowerComponent;
  let fixture: ComponentFixture<ThreeFlowerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeFlowerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeFlowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
