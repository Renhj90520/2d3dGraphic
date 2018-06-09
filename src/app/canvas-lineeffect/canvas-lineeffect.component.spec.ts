import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasLineeffectComponent } from './canvas-lineeffect.component';

describe('CanvasLineeffectComponent', () => {
  let component: CanvasLineeffectComponent;
  let fixture: ComponentFixture<CanvasLineeffectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasLineeffectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasLineeffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
