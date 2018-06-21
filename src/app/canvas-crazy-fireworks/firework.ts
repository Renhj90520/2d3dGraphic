import Particle from './particle';

export default class Firework {
  x;
  y;
  vx = Math.random() - 0.5;
  vy = -(Math.random() + 3);
  size = Math.random() + 1.5;
  alpha = 1;
  range = 100;
  life = Math.round((Math.random() * this.range) / 2) + this.range / 2;
  color = '#fd1';
  ax = Math.random() * 0.02 - 0.01;
  far;

  initialX;
  initialY;
  initialVX;

  particles = [];

  particleNum = 15;

  constructor(canvasW, canvasH) {
    this.initialX = this.x =
      (Math.random() * this.range) / 2 - this.range / 4 + canvasW / 2;
    this.initialY = this.y = Math.random() * this.range * 2 + canvasH;
    this.initialVX = this.vx;
    this.size = Math.random() + 0.5;
    this.far = Math.random() * this.range + canvasH / 2 - this.range;
  }

  update(ctx) {
    if (this.y < this.far) {
      for (let i = 0; i < this.particleNum; i++) {
        this.particles.push(new Particle(this.x, this.y));
      }
      this.reset();
    }
    this.x += this.vx;
    this.y += this.vy;
    this.vx += this.ax;

    for (let i = 0; i < this.particles.length; i++) {
      const particle = this.particles[i];
      if (particle) {
        particle.draw(ctx);
        particle.update(this.particles, i);
      }
    }
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  reset() {
    this.x = this.initialX;
    this.y = this.initialY;
    this.vx = this.initialVX;
    this.ax = Math.random() * 0.02 - 0.01;
  }
}
