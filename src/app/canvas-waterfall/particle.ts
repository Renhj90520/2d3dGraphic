export default class Particle {
  newWidth = this.rand(1, 20);
  newHeight = this.rand(1, 45);
  x;
  y;
  ctx;
  canvasWidth;
  canvasHeight;
  vx = 0;
  vy = 0;
  width = this.newWidth;
  height = this.newHeight;
  hue = this.rand(200, 220);
  saturation = this.rand(30, 60);
  lightness = this.rand(30, 60);
  gravity = 0.15;
  constructor(ctx, canvasWidth, canvasHeight) {
    this.ctx = ctx;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.x = this.rand(
      10 + this.newWidth / 2,
      this.canvasWidth - 10 - this.newWidth / 2
    );
    this.y = -this.newHeight;
  }

  update() {
    this.vx += this.vx;
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;
  }
  render() {
    this.ctx.strokeStyle = `hsla(${this.hue},${this.saturation}%,${
      this.lightness
    }%,.05)`;
    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(this.x, this.y + this.height);
    this.ctx.lineWidth = this.width / 2;
    this.ctx.lineCap = 'round';
    this.ctx.stroke();
  }

  renderBubble() {
    this.ctx.fillStyle = `hsla(${this.hue},${this.saturation}%,${
      this.lightness
    }%,.3)`;
    this.ctx.beginPath();
    this.ctx.arc(
      this.x + this.width / 2,
      this.canvasHeight - 20 - this.rand(0, 10),
      this.rand(1, 8),
      0,
      Math.PI * 2,
      false
    );
    this.ctx.fill();
  }
  rand(min, max) {
    return Math.random() * (max - min + 1) + min;
  }
}
