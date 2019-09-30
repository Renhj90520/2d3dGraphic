import { Component, OnInit, ViewChild } from '@angular/core';
import Orbit from './orbit';

@Component({
  selector: 'app-canvas-orbit-trails',
  templateUrl: './canvas-orbit-trails.component.html',
  styleUrls: ['./canvas-orbit-trails.component.css']
})
export class CanvasOrbitTrailsComponent implements OnInit {
  @ViewChild('canvas', { static: false }) canvasEl;
  ctx;
  canvasWidth;
  canvasHeight;
  orbs = [];
  prnNum = 30;
  radius;

  constructor() {}
  initCanvas() {
    const canvas = this.canvasEl.nativeElement;
    this.ctx = canvas.getContext('2d');
    // const dpr = window.devicePixelRatio;
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
  }
  drawBakground() {
    this.ctx.fillStyle = 'rgba(0,0,0,.1)';
    this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
  }
  addOrbits() {
    while (this.prnNum--) {
      const orbit = new Orbit();
      orbit.x = this.canvasWidth / 2;
      orbit.y = this.canvasHeight / 2 + this.prnNum * 2;
      orbit.init(this.canvasWidth, this.canvasHeight);
      this.orbs.push(orbit);
    }
  }
  update() {
    this.drawBakground();

    for (let i = 0; i < this.orbs.length; i++) {
      const orbit: Orbit = this.orbs[i];
      let updateCount = 3;
      while (updateCount--) {
        orbit.update(this.canvasWidth, this.canvasHeight);
        orbit.draw(this.ctx);
      }
    }
    requestAnimationFrame(() => {
      this.update();
    });
  }
  ngOnInit() {
    this.initCanvas();
    this.addOrbits();
    this.update();
  }
}
