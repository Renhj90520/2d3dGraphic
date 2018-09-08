import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeLotusComponent } from './three-lotus.component';

describe('ThreeLotusComponent', () => {
  let component: ThreeLotusComponent;
  let fixture: ComponentFixture<ThreeLotusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeLotusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeLotusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
