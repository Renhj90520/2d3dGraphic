import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeSpriteSphereComponent } from './three-sprite-sphere.component';

describe('ThreeSpriteSphereComponent', () => {
  let component: ThreeSpriteSphereComponent;
  let fixture: ComponentFixture<ThreeSpriteSphereComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeSpriteSphereComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeSpriteSphereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
