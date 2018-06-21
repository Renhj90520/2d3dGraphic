export default class Particle {
  x;
  y;
  size = Math.random() + 1.5;
  color = this.randomColor();

  vx = Math.random() * 5 - 2.5;
  vy = Math.random() * -5 + 1.5;
  ay = 0.05;
  range = 100;
  alpha = 1;
  initialLife;
  initialSize;
  life = Math.round((Math.random() * this.range) / 2) + this.range / 2;

  constructor(x, y) {
    this.color = this.randomColor();
    this.x = x;
    this.y = y;
    this.initialLife = this.life;
    this.initialSize = this.size;
  }

  update(particles, index) {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.ay;
    this.alpha = this.life / this.initialLife;
    this.size = this.alpha * this.initialSize;
    this.alpha = this.alpha > 0.6 ? 1 : this.alpha;
    this.life--;
    if (this.life <= 0) {
      particles.splice(index, 1);
    }
  }

  draw(ctx) {
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    return `rgb(${r},${g},${b})`;
  }
}
