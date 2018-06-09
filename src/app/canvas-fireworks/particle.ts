import { EventEmitter } from '@angular/core';

export default class Particle {
  x;
  y;

  coordinates = [];
  coordinateCount = 5;
  angle = this.random(0, Math.PI * 2);
  speed = this.random(1, 10);
  friction = 0.95;
  gravity = 1;
  hue;
  brightness = this.random(50, 80);
  alpha = 1;
  decay = this.random(0.015, 0.03);
  onbomb = new EventEmitter<Particle>();

  constructor(x, y, hue) {
    this.x = x;
    this.y = y;
    this.hue = this.random(hue - 20, hue + 20);
    while (this.coordinateCount--) {
      this.coordinates.push([x, y]);
    }
  }

  update(particles, index) {
    this.coordinates.pop();
    this.coordinates.unshift([this.x, this.y]);
    this.speed *= this.friction;
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed + this.gravity;
    this.alpha -= this.decay;
    if (this.alpha <= this.decay) {
      particles.splice(index, 1);
    }
  }
  draw(ctx) {
    ctx.beginPath();
    const length = this.coordinates.length;
    ctx.moveTo(
      this.coordinates[length - 1][0],
      this.coordinates[length - 1][1]
    );
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle = `hsla(${this.hue},100%,${this.brightness}%,${
      this.alpha
    })`;
    ctx.stroke();
  }
  random(min, max) {
    return Math.random() * (max - min + 1) + min;
  }
}
