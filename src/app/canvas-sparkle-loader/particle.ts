export default class Particle {
  radius = 7;
  x;
  y;
  angle;
  speed;
  accel;
  decay = 0.01;
  life = 1;
  ctx;
  constructor(x, y, angle, speed, accel, ctx) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.speed = speed;
    this.accel = accel;
    this.ctx = ctx;
  }

  step() {
    this.speed += this.accel;
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    this.angle += Math.PI / 64;
    this.accel *= 1.01;
    this.life -= this.decay;
  }

  draw(tick, lastX?, lastY?) {
    this.ctx.fillStyle = this.ctx.strokeStyle = `hsla(${tick +
      this.life * 120},100%,60%,${this.life})`;
    this.ctx.beginPath();
    if (lastX && lastY) {
      this.ctx.moveTo(this.x, this.y);
      this.ctx.lineTo(lastX, lastY);
    }
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.arc(
      this.x,
      this.y,
      Math.max(0.001, this.life * this.radius),
      0,
      Math.PI * 2,
      false
    );
    this.ctx.fill();
        const size = Math.random() * 1.25;
        this.ctx.fillRect(
        this.x + (Math.random() - 0.5) * 35 * this.life,
        this.y + (Math.random() - 0.5) * 35 * this.life,
        size,
        size
        );
  }
}
