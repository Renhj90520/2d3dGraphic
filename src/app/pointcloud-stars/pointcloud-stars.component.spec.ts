import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointcloudStarsComponent } from './pointcloud-stars.component';

describe('PointcloudStarsComponent', () => {
  let component: PointcloudStarsComponent;
  let fixture: ComponentFixture<PointcloudStarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointcloudStarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointcloudStarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
