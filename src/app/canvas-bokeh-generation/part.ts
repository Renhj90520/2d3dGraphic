import { rand, hsla } from './utils';
export default class Part {
  radius;
  x;
  y;
  angle;
  vel;
  tick;
  sizebase;
  canvasW;
  canvasH;
  constructor(canvasW, canvasH) {
    this.canvasW = canvasW;
    this.canvasH = canvasH;
    this.sizebase = canvasW + canvasH;
    const radiusMin = 1;
    const radiusMax = this.sizebase * 0.04;
    this.radius = rand(radiusMin, radiusMax);
    this.x = rand(0, canvasW);
    this.y = rand(0, canvasH);
    this.angle = rand(0, Math.PI * 2);
    this.vel = rand(0.1, 0.5);
    this.tick = rand(0, 10000);
  }

  update() {
    this.x += Math.cos(this.angle) * this.vel;
    this.y += Math.sin(this.angle) * this.vel;
    this.angle += rand(-0.05, 0.05);

    // out of right edge
    if (this.x - this.radius > this.canvasW) {
      this.x = -this.radius;
    }

    // out of left edge
    if (this.x + this.radius < 0) {
      this.x = this.canvasW + this.radius;
    }

    // out of top edge
    if (this.y - this.radius > this.canvasH) {
      this.y = -this.radius;
    }

    // out of bottom edge
    if (this.y + this.radius < 0) {
      this.y = this.canvasH + this.radius;
    }

    this.tick++;
  }

  draw(ctx) {
    this.update();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    const alpha = 0.075 + Math.cos(this.tick * 0.02) * 0.05;
    ctx.fillStyle = hsla(0, 0, 100, alpha);
    ctx.fill();
  }
}
