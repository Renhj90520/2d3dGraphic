export default class Particle {
  x;
  y;
  vel;
  canvasW;
  canvasH;
  particleSpeed = 0.3;
  velocity = 0.9;

  color = "rgba(255,255,255,0.05)";
  constructor(x, y, canvasW, canvasH) {
    this.x = x;
    this.y = y;
    this.canvasW = canvasW;
    this.canvasH = canvasH;
    this.vel = {
      x: this.getRandom(-20, 20) / 100,
      y: this.getRandom(-20, 20) / 100,
      min: this.getRandom(2, 10),
      max: this.getRandom(10, 100) / 10
    };
  }

  getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
    ctx.fill();
  }

  update() {
    const forceDirection = {
      x: this.getRandom(-1, 1),
      y: this.getRandom(-1, 1)
    };

    if (Math.abs(this.vel.x + forceDirection.x) < this.vel.max) {
      this.vel.x += forceDirection.x;
    }
    if (Math.abs(this.vel.y + forceDirection.y) < this.vel.max) {
      this.vel.y += forceDirection.y;
    }

    this.x += this.vel.x * this.particleSpeed;
    this.y += this.vel.y * this.particleSpeed;

    if (Math.abs(this.vel.x) > this.vel.min) {
      this.vel.x *= this.velocity;
    }

    if (Math.abs(this.vel.y) > this.vel.min) {
      this.vel.y *= this.velocity;
    }
    this.testBorder();
  }

  testBorder() {
    if (this.x > this.canvasW) {
      this.setPosition(this.x, "x");
    } else if (this.x < 0) {
      this.setPosition(this.canvasW, "x");
    }

    if (this.y > this.canvasH) {
      this.setPosition(this.y, "y");
    } else if (this.y < 0) {
      this.setPosition(this.canvasH, "y");
    }
  }
  setPosition(pos, coor) {
    if (coor === "x") {
      this.x = pos;
    } else if (coor === "y") {
      this.y = pos;
    }
  }
}
