import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SnowShaderComponent } from './snow-shader.component';

describe('SnowShaderComponent', () => {
  let component: SnowShaderComponent;
  let fixture: ComponentFixture<SnowShaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SnowShaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnowShaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
