import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FragmentShaderComponent } from './fragment-shader.component';

describe('FragmentShaderComponent', () => {
  let component: FragmentShaderComponent;
  let fixture: ComponentFixture<FragmentShaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FragmentShaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FragmentShaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
