import { Component, OnInit, ViewChild } from '@angular/core';
import Particle from './particle';

@Component({
  selector: 'app-canvas-sparkle-trail',
  templateUrl: './canvas-sparkle-trail.component.html',
  styleUrls: ['./canvas-sparkle-trail.component.css']
})
export class CanvasSparkleTrailComponent implements OnInit {
  @ViewChild('canvas', { static: false }) canvasEl;
  canvasWidth;
  canvasHeight;
  ctx;
  particle;
  constructor() {}

  initCanvas() {
    const canvas = this.canvasEl.nativeElement;
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;

    this.ctx = canvas.getContext('2d');
    this.particle = new Particle(this.ctx);
    this.particle.x = this.canvasWidth / 2 + 5;
    this.particle.y = this.canvasHeight / 2 + 22;
  }

  drawBackground() {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  update() {
    this.drawBackground();
    this.clear();
    this.particle.draw();
    requestAnimationFrame(() => {
      this.update();
    });
  }
  clear() {
    this.ctx.globalCompositeOperation = 'destination-out';
    this.ctx.fillStyle = 'rgba(0,0,0,.1)';
    this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.ctx.globalCompositeOperation = 'lighter';
  }

  ngOnInit() {
    this.initCanvas();

    this.update();
  }
}
