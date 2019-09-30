import { Component, OnInit, ViewChild } from '@angular/core';
import Particle from './particle';

@Component({
  selector: 'app-canvas-sparkle-loader',
  templateUrl: './canvas-sparkle-loader.component.html',
  styleUrls: ['./canvas-sparkle-loader.component.css']
})
export class CanvasSparkleLoaderComponent implements OnInit {
  @ViewChild('canvas', { static: false }) canvasEl;
  canvas;
  ctx;
  canvasWidth;
  canvasHeight;
  particles = [];
  tick = 0;
  globalRotation = 0;
  globalAngle = 0;
  min;
  constructor() {}

  initCanvas() {
    this.canvas = this.canvasEl.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;
    this.min = this.canvasWidth * 0.5;
  }
  step() {
    this.particles.push(
      new Particle(
        this.canvasWidth / 2 + Math.cos(this.tick / 20) * this.min / 2,
        this.canvasHeight / 2 + Math.sin(this.tick / 20) * this.min / 2,
        this.globalRotation + this.globalAngle,
        0,
        0.01,
        this.ctx
      )
    );
    this.particles.forEach((particle, index) => {
      particle.step();
      if (particle.life <= 0) {
        this.particles.splice(index, 1);
      }
    });
    this.globalRotation += Math.PI / 6;
    this.globalAngle += Math.PI / 6;
  }
  draw() {
    // this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.particles.forEach((particle, index) => {
      const previous = this.particles[index - 1];
      if (previous) {
        particle.draw(this.tick, previous.x, previous.y);
      } else {
        particle.draw(this.tick);
      }
    });
  }
  update() {
    this.step();
    this.draw();
    this.tick++;
    requestAnimationFrame(() => {
      this.update();
    });
  }
  ngOnInit() {
    this.initCanvas();
    this.update();
  }
}
