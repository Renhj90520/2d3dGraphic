export default class Particle {
  speed = { x: -2.5 + Math.random() * 5, y: -2.5 + Math.random() * 5 };
  location;
  radius = 12 + Math.random() * 4;
  color = {
    c1: this.getRandomColor(),
    c2: this.getRandomColor()
  };
  canvasW;
  canvasH;
  constructor(canvasW, canvasH) {
    this.canvasW = canvasW;
    this.canvasH = canvasH;
    this.location = {
      x: this.getRandomInt(canvasW, -50),
      y: this.getRandomInt(canvasH, -50)
    };
  }

  update(ctx) {
    this.speed.x += this.getRandomInt(-0.001, 0.001);
    this.speed.y += this.getRandomInt(-0.001, 0.001);
    this.draw(ctx);
    this.location.x += this.speed.x;
    this.location.y += this.speed.y;
    if (this.location.x >= this.canvasW || this.location.x <= 0) {
      this.location.x += -this.speed.x;
    }
    if (this.location.y >= this.canvasH || this.location.y <= 0) {
      this.location.y += -this.speed.y;
    }
  }
  draw(ctx) {
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.beginPath();
    const gradient = ctx.createRadialGradient(
      this.location.x,
      this.location.y,
      0,
      this.location.x,
      this.location.y,
      this.radius
    );
    gradient.addColorStop(0, this.color.c1);
    gradient.addColorStop(0.5, this.color.c2);
    gradient.addColorStop(1, 'rgba(250,76,43,0)');
    ctx.fillStyle = gradient;
    ctx.strokeStyle = gradient;
    ctx.arc(
      this.location.x,
      this.location.y,
      this.radius,
      0,
      Math.PI * 2,
      false
    );
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  getRandomColor() {
    return (
      '#' +
      Math.random()
        .toString(16)
        .slice(2, 8)
    );
  }
}
