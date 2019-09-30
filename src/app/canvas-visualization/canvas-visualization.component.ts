import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-canvas-visualization',
  templateUrl: './canvas-visualization.component.html',
  styleUrls: ['./canvas-visualization.component.css']
})
export class CanvasVisualizationComponent implements OnInit {
  @ViewChild('canvas', { static: false }) canvasEl;

  canvas;
  ctx;
  canvasWidth;
  canvasHeight;

  trail = [];
  maxTrail = 200;
  radius = 1;
  speed = 0.4;
  angle = 0;
  arcX = 0;
  arcY = 0;
  growRadius = true;
  seconds = 0;
  milliseconds = 0;
  constructor() {}
  initCanvas() {
    this.canvas = this.canvasEl.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;
    this.ctx.lineWidth = 0.1;
    this.ctx.lineJoin = 'round';
  }

  drawBackground() {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
  }
  update() {
    this.clear();
    this.drawBackground();
    this.updateArc();
    this.updateTrail();
    this.renderTrail();
    requestAnimationFrame(() => {
      this.update();
    });
  }
  createPoint(x, y) {
    this.trail.push({ x, y });
  }

  updateTrail() {
    if (this.trail.length < this.maxTrail) {
      this.createPoint(this.arcX, this.arcY);
    }
    if (this.trail.length >= this.maxTrail) {
      this.trail.splice(0, 1);
    }
  }
  updateArc() {
    this.arcX = this.canvasWidth / 2 + Math.sin(this.angle) * this.radius;
    this.arcY = this.canvasHeight / 2 + Math.cos(this.angle) * this.radius;
    const d = new Date();
    this.seconds = d.getSeconds();
    this.milliseconds = d.getMilliseconds();
    this.angle += this.speed * (this.seconds + 1 + this.milliseconds / 1000);

    if (this.radius <= 1) {
      this.growRadius = true;
    }

    if (this.radius >= 200) {
      this.growRadius = false;
    }
    if (this.growRadius) {
      this.radius += 1;
    } else {
      this.radius -= 1;
    }
  }

  renderTrail() {
    let i = this.trail.length;
    this.ctx.beginPath();
    while (i--) {
      const point = this.trail[i];
      const nextPoint =
        i === this.trail.length ? this.trail[i + 1] : this.trail[i];
      const c = (point.x + nextPoint.x) / 2;
      const d = (point.y + nextPoint.y) / 2;
      this.ctx.quadraticCurveTo(
        Math.round(this.arcX),
        Math.round(this.arcY),
        c,
        d
      );
    }

    this.ctx.strokeStyle = `hsla(${this.rand(170, 300)},100%,${this.rand(
      50,
      75
    )}%,1)`;
    this.ctx.stroke();
    this.ctx.closePath();
  }
  clear() {
    this.ctx.globalCompositeOperation = 'destination-out';
    this.ctx.fillStyle = 'rgba(0,0,0,.1)';
    this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.ctx.globalCompositeOperation = 'lighter';
  }
  rand(min, max) {
    return Math.random() * (max - min + 1) + min;
  }
  ngOnInit() {
    this.initCanvas();
    this.update();
  }
}
