import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeExplodeTextComponent } from './three-explode-text.component';

describe('ThreeExplodeTextComponent', () => {
  let component: ThreeExplodeTextComponent;
  let fixture: ComponentFixture<ThreeExplodeTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeExplodeTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeExplodeTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
