import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CanvasAzureLoadingComponent } from './canvas-azure-loading.component';

describe('CanvasAzureLoadingComponent', () => {
  let component: CanvasAzureLoadingComponent;
  let fixture: ComponentFixture<CanvasAzureLoadingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasAzureLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasAzureLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
