import { Component, OnInit, ViewChild } from '@angular/core';
import Particle from './particle';

@Component({
  selector: 'app-canvas-neon-bubbles',
  templateUrl: './canvas-neon-bubbles.component.html',
  styleUrls: ['./canvas-neon-bubbles.component.css']
})
export class CanvasNeonBubblesComponent implements OnInit {
  @ViewChild('canvas', { static: false }) canvasEl;
  canvas;
  canvasW;
  canvasH;
  ctx;
  particles = [];
  constructor() {}
  initCanvas() {
    this.canvas = this.canvasEl.nativeElement;
    this.canvasW = this.canvas.width;
    this.canvasH = this.canvas.height;
    this.ctx = this.canvas.getContext('2d');
  }
  initParticles() {
    for (let k = 0; k < 30; k++) {
      this.particles.push(new Particle(this.canvasW, this.canvasH));
    }
  }

  update() {
    // this.ctx.clearRect(0, 0, this.canvasW, this.canvasH);
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.canvasW, this.canvasH);
    for (let j = 0; j < this.particles.length; j++) {
      const particle = this.particles[j];
      particle.update(this.ctx);
    }
    requestAnimationFrame(() => {
      this.update();
    });
  }
  ngOnInit() {
    this.initCanvas();
    this.initParticles();
    this.update();
  }
}
