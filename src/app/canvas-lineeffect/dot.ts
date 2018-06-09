import Color from './color';

export default class Dot {
  x;
  y;
  vx;
  vy;
  radius;
  color;
  constructor(canvasW, canvasH) {
    this.x = Math.random() * canvasW;
    this.y = Math.random() * canvasH;

    this.vx = -0.5 + Math.random();
    this.vy = -0.5 + Math.random();
    this.radius = Math.random() * 2;
    this.color = new Color();
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color.style;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
  }
}
