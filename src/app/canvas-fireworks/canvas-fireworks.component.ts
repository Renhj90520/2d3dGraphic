import { Component, OnInit, ViewChild } from '@angular/core';
import Firework from './firework';
import Particle from './particle';

@Component({
  selector: 'app-canvas-fireworks',
  templateUrl: './canvas-fireworks.component.html',
  styleUrls: ['./canvas-fireworks.component.css']
})
export class CanvasFireworksComponent implements OnInit {
  @ViewChild('canvas') canvasEl;
  canvas;
  canvasWidth;
  canvasHeight;
  ctx;

  fireworks = [];
  timeTick = 0;
  timeTotal = 80;
  hue = 120;

  particles = [];
  ismousedown = false;
  mx;
  my;
  limiterTick = 0;
  limiterTotal = 5;
  constructor() {}
  initCanvas() {
    this.canvas = this.canvasEl.nativeElement;
    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;
    this.ctx = this.canvas.getContext('2d');
  }
  createParticles(x, y) {
    let particleCount = 30;
    while (particleCount--) {
      this.particles.push(new Particle(x, y, this.hue));
    }
  }
  update() {
    this.drawbackgound();
    let i = this.fireworks.length;
    while (i--) {
      if (this.fireworks[i]) {
        this.fireworks[i].draw(this.ctx, this.hue);
        this.fireworks[i].update(this.fireworks, i, this);
      }
    }

    let j = this.particles.length;
    while (j--) {
      if (this.particles[j]) {
        this.particles[j].draw(this.ctx);
        this.particles[j].update(this.particles, j);
      }
    }
    if (this.timeTick >= this.timeTotal) {
      if (!this.ismousedown) {
        this.fireworks.push(
          new Firework(
            this.canvasWidth / 2,
            this.canvasHeight,
            this.rand(0, this.canvasWidth),
            this.rand(0, this.canvasHeight / 2)
          )
        );
        this.timeTick = 0;
      }
    } else {
      this.timeTick++;
    }

    if (this.limiterTick >= this.limiterTotal) {
      if (this.ismousedown) {
        this.fireworks.push(
          new Firework(
            this.canvasWidth / 2,
            this.canvasHeight,
            this.mx,
            this.my
          )
        );
        this.limiterTick = 0;
      }
    } else {
      this.limiterTick++;
    }
    this.hue += 0.5;
    requestAnimationFrame(() => {
      this.update();
    });
  }
  drawbackgound() {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
  }
  rand(min, max) {
    return Math.random() * (max - min + 1) + min;
  }
  ngOnInit() {
    this.initCanvas();
    this.update();
  }
  mousedown(e) {
    e.preventDefault();
    this.ismousedown = true;
  }

  mousemove(e) {
    this.mx = e.pageX - this.canvas.offsetLeft;
    this.my = e.pageY - this.canvas.offsetTop;
  }
  mouseup(e) {
    e.preventDefault();
    this.ismousedown = false;
  }
}
