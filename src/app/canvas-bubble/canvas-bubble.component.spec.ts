import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CanvasBubbleComponent } from './canvas-bubble.component';

describe('CanvasBubbleComponent', () => {
  let component: CanvasBubbleComponent;
  let fixture: ComponentFixture<CanvasBubbleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasBubbleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
