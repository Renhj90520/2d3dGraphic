import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgBouncyLineComponent } from './svg-bouncy-line.component';

describe('SvgBouncyLineComponent', () => {
  let component: SvgBouncyLineComponent;
  let fixture: ComponentFixture<SvgBouncyLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgBouncyLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgBouncyLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
