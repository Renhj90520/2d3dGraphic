import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ThreePrimordialSoupComponent } from './three-primordial-soup.component';

describe('ThreePrimordialSoupComponent', () => {
  let component: ThreePrimordialSoupComponent;
  let fixture: ComponentFixture<ThreePrimordialSoupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreePrimordialSoupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreePrimordialSoupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
