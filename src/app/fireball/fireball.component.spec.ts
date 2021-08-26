import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FireballComponent } from './fireball.component';

describe('FireballComponent', () => {
  let component: FireballComponent;
  let fixture: ComponentFixture<FireballComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FireballComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FireballComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
