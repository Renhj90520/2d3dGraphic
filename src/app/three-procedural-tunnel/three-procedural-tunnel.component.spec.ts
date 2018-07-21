import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeProceduralTunnelComponent } from './three-procedural-tunnel.component';

describe('ThreeProceduralTunnelComponent', () => {
  let component: ThreeProceduralTunnelComponent;
  let fixture: ComponentFixture<ThreeProceduralTunnelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeProceduralTunnelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeProceduralTunnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
