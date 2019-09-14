import { Component, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import Sprite from './sprite';
import { TweenLite } from 'gsap';
@Component({
  selector: 'app-canvas-confetti-cannon',
  templateUrl: './canvas-confetti-cannon.component.html',
  styleUrls: ['./canvas-confetti-cannon.component.css']
})
export class CanvasConfettiCannonComponent implements OnInit {
  @ViewChild('canvas', { static: false }) canvasEl;
  canvas;
  canvasW;
  canvasH;
  ctx;

  particles = [];
  particleNum = 20;
  vectors;
  drawVector = false;
  pointer: any = {};
  constructor() {}

  initCanvas() {
    this.canvas = this.canvasEl.nativeElement;
    this.canvasW = this.canvas.width;
    this.canvasH = this.canvas.height;
    this.ctx = this.canvas.getContext('2d');
    this.vectors = [
      { x: this.canvasW, y: this.canvasH * 1.25 },
      { x: this.canvasW, y: this.canvasH * 2 }
    ];
  }

  drawBackground() {
    this.ctx.clearRect(0, 0, this.canvasW, this.canvasH);
    const gradient = this.ctx.createLinearGradient(
      this.canvasW / 2,
      0,
      this.canvasW / 2,
      this.canvasH
    );
    gradient.addColorStop(0, '#9FF781');
    gradient.addColorStop(1, '#F3F781');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvasW, this.canvasH);
  }

  createParticles(x0, y0, angle, veclocity) {
    for (let j = 0; j < this.particleNum; j++) {
      const sprite = new Sprite(x0, y0, angle, veclocity);
      this.particles.push(sprite);
    }
  }
  update() {
    this.drawBackground();
    if (this.drawVector) {
      this.drawVectorLine();
      this.drawPower();
    }
    this.drawPointer();
    for (let j = 0; j < this.particles.length; j++) {
      const particle = this.particles[j];
      particle.draw(this.ctx);
    }
  }
  ngOnInit() {
    this.initCanvas();
    TweenLite.ticker.addEventListener('tick', () => this.update());
  }

  mousedown(e) {
    this.vectors[0].x = e.offsetX;
    this.vectors[0].y = e.offsetY;
    this.drawVector = true;
  }
  mousemove(e) {
    this.vectors[1] = {
      x: e.offsetX,
      y: e.offsetY
    };
    this.pointer = this.vectors[1];
  }
  mouseup(e) {
    this.vectors[1].x = e.offsetX;
    this.vectors[1].y = e.offsetY;

    this.drawVector = false;
    const x0 = this.vectors[0].x;
    const x1 = this.vectors[1].x;
    const y0 = this.vectors[0].y;
    const y1 = this.vectors[1].y;

    const distance = this.getDistance(x0, y0, x1, y1);
    const angle = this.getDegAngle(x0, y0, x1, y1) + 180;
    this.particleNum = distance / 5 + 5;
    const velocity = distance * 10;
    this.createParticles(x0, y0, angle, velocity);
    for (let j = 0; j < this.particles.length; j++) {
      const particle = this.particles[j];
      particle.tween(this.particles);
    }
  }

  getDistance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  }

  getDegAngle(x1, y1, x2, y2) {
    const y = y2 - y1;
    const x = x2 - x1;
    return (Math.atan2(y, x) * 180) / Math.PI;
  }

  drawVectorLine() {
    this.ctx.strokeStyle = 'pink';
    this.ctx.lineWidth = 2;

    const x0 = this.vectors[0].x;
    const y0 = this.vectors[0].y;
    const x1 = this.vectors[1].x;
    const y1 = this.vectors[1].y;

    this.ctx.beginPath();
    this.ctx.moveTo(x0, y0);
    this.ctx.lineTo(x1, y1);
    this.ctx.stroke();
  }

  drawPointer() {
    const centerX = this.pointer.x;
    const centerY = this.pointer.y;

    const radius = 15;
    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, false);
    this.ctx.fillStyle = 'transparent';
    this.ctx.fill();
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = 'white';
    this.ctx.stroke();
  }

  drawPower() {
    const x0 = this.vectors[0].x;
    const y0 = this.vectors[0].y;
    const x1 = this.vectors[1].x;
    const y1 = this.vectors[1].y;

    const distance = this.getDistance(x0, y0, x1, y1);
    const centerX = x0;
    const centerY = y0;
    const radius = distance / 20;

    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, false);
    this.ctx.fillStyle = 'transparent';
    this.ctx.fill();
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = '#333';
    this.ctx.stroke();
  }
}
