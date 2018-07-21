import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeKaleidoscopeComponent } from './three-kaleidoscope.component';

describe('ThreeKaleidoscopeComponent', () => {
  let component: ThreeKaleidoscopeComponent;
  let fixture: ComponentFixture<ThreeKaleidoscopeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeKaleidoscopeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeKaleidoscopeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
