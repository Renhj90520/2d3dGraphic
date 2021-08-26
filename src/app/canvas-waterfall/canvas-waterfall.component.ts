import { Component, OnInit, ViewChild } from '@angular/core';
import Particle from './particle';

@Component({
  selector: 'app-canvas-waterfall',
  templateUrl: './canvas-waterfall.component.html',
  styleUrls: ['./canvas-waterfall.component.css']
})
export class CanvasWaterfallComponent implements OnInit {
  @ViewChild('canvas') canvasEl;
  canvasWidth;
  canvasHeight;
  canvas;
  ctx;
  particles = [];
  particleRate = 6;
  constructor() {}

  initCanvas() {
    this.canvas = this.canvasEl.nativeElement;
    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;
    this.ctx = this.canvas.getContext('2d');
  }
  createParticle() {
    let i = this.particleRate;
    while (i--) {
      this.particles.push(
        new Particle(this.ctx, this.canvasWidth, this.canvasHeight)
      );
    }
  }
  removeParticle() {
    let i = this.particleRate;
    while (i--) {
      const p = this.particles[i];
      if (p.y > this.canvasHeight - 20 - p.height) {
        p.renderBubble();
        this.particles.splice(i, 1);
      }
    }
  }
  updateParticles() {
    let i = this.particles.length;
    while (i--) {
      const p = this.particles[i];
      p.update();
    }
  }
  renderParticles() {
    let i = this.particles.length;
    while (i--) {
      const p = this.particles[i];
      p.render();
    }
  }
  clearCanvas() {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.ctx.globalCompositeOperation = 'destination-out';
    this.ctx.fillStyle = 'rgba(255,255,255,.06)';
    this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.ctx.globalCompositeOperation = 'lighter';
  }
  update() {
    this.clearCanvas();
    this.createParticle();
    this.updateParticles();
    this.renderParticles();
    this.removeParticle();
    requestAnimationFrame(() => {
      this.update();
    });
  }
  ngOnInit() {
    this.initCanvas();
    this.update();
  }
}
