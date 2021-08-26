import { Component, OnInit, ViewChild } from '@angular/core';
import Particle from './particle';

@Component({
  selector: 'app-canvas-particle-trail',
  templateUrl: './canvas-particle-trail.component.html',
  styleUrls: ['./canvas-particle-trail.component.css']
})
export class CanvasParticleTrailComponent implements OnInit {
  @ViewChild('canvas')
  canvasEl;
  canvas;
  ctx;
  canvasWidth;
  canvasHeight;

  numberParticlesStart = 1000;
  velocity = 0.9;
  circleWidth = 50;
  particles = [];
  constructor() {}

  ngOnInit() {
    this.initCanvas();
    this.initParticles();
    this.update();

    this.canvas.addEventListener('click', () => {
      this.particles.length = 0;
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.initParticles();
    });
  }

  initCanvas() {
    this.canvas = this.canvasEl.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;
  }

  initParticles() {
    for (let i = 0; i < this.numberParticlesStart; i++) {
      const angle = Math.random() * 360;
      this.particles.push(
        new Particle(
          this.canvasWidth * 0.5 + Math.cos(angle) * this.circleWidth,
          this.canvasHeight * 0.5 - Math.sin(angle) * this.circleWidth,
          this.canvasWidth,
          this.canvasHeight
        )
      );
    }
  }

  update() {
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].update();
      this.particles[i].render(this.ctx);
    }

    requestAnimationFrame(this.update.bind(this));
  }
}
