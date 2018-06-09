export default class Particle {
  private _x: string;
  public get x(): string {
    return this._x;
  }
  public set x(v: string) {
    this._x = v;
  }

  private _y: string;
  public get y(): string {
    return this._y;
  }
  public set y(v: string) {
    this._y = v;
  }
  radius = 90;
  speed = 2;
  rotation = 0;
  angleStart = 270;
  angleEnd = 90;

  hue = 220;
  thickness = 18;
  blur = 25;

  ctx;
  gradient1;
  gradient2;
  gradient3;
  gradient4;

  particles = [];
  particleMax = 100;
  constructor(ctx) {
    this.ctx = ctx;
    this.gradient1 = this.ctx.createLinearGradient(
      0,
      -this.radius,
      0,
      this.radius
    );
    this.gradient1.addColorStop(0, `hsla(${this.hue},60%,50%,.25)`);
    this.gradient1.addColorStop(1, `hsla(${this.hue},60%,50%,0)`);

    this.gradient2 = this.ctx.createLinearGradient(
      0,
      -this.radius,
      0,
      this.radius
    );
    this.gradient2.addColorStop(0, `hsla(${this.hue},100%,50%,0)`);
    this.gradient2.addColorStop(0.1, `hsla(${this.hue},100%,100%,0.7)`);
    this.gradient2.addColorStop(1, `hsla(${this.hue},100%,50%,0)`);

    this.gradient3 = this.ctx.createRadialGradient(
      0,
      this.radius,
      0,
      0,
      this.radius,
      30
    );
    this.gradient3.addColorStop(0, `hsla(330,50%,50%,.35)`);
    this.gradient3.addColorStop(1, `hsla(330,50%,50%,0)`);
    this.gradient4 = this.ctx.createRadialGradient(
      0,
      this.radius,
      0,
      0,
      this.radius,
      25
    );
    this.gradient4.addColorStop(0, `hsla(30,100%,50%,.2)`);
    this.gradient4.addColorStop(1, `hsla(30,100%,50%,0)`);
  }

  updateCircle() {
    if (this.rotation < 360) {
      this.rotation += this.speed;
    } else {
      this.rotation = 0;
    }
  }
  renderCircle() {
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.rotate(this.degreeToRadian(this.rotation));
    this.ctx.beginPath();
    this.ctx.arc(0, 0, this.radius, this.degreeToRadian(this.angleStart), true);
    this.ctx.lirenderCircleneWidth = this.thickness;
    this.ctx.strokeStyle = this.gradient1;
    this.ctx.stroke();
    this.ctx.restore();
  }
  renderCircleBorder() {
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.rotate(this.degreeToRadian(this.rotation));
    this.ctx.beginPath();
    this.ctx.lineWidth = 2;
    this.ctx.arc(
      0,
      0,
      this.radius + this.thickness / 2,
      this.degreeToRadian(this.angleStart),
      this.degreeToRadian(this.angleEnd),
      true
    );
    this.ctx.strokeStyle = this.gradient2;
    this.ctx.stroke();
    this.ctx.restore();
  }
  renderCircleFlare() {
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.rotate(this.degreeToRadian(this.rotation + 185));
    this.ctx.scale(1, 1);
    this.ctx.beginPath();
    this.ctx.arc(0, this.radius, 30, 0, Math.PI * 2, false);
    // this.ctx.closePath();
    this.ctx.fillStyle = this.gradient3;
    this.ctx.fill();
    this.ctx.restore();
  }
  renderCircleFLare2() {
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.rotate(this.degreeToRadian(this.rotation + 165));
    this.ctx.scale(1.5, 1);
    this.ctx.beginPath();
    this.ctx.arc(0, this.radius, 25, 0, Math.PI * 2, false);
    // this.ctx.closePath();
    this.ctx.fillStyle = this.gradient4;
    this.ctx.fill();
    this.ctx.restore();
  }
  createParticles() {
    if (this.particles.length < this.particleMax) {
      this.particles.push({
        x:
          this.x +
          this.radius * Math.cos(this.degreeToRadian(this.rotation - 85)) +
          (this.rand(0, this.thickness * 2) - this.thickness),
        y:
          this.y +
          this.radius * Math.sin(this.degreeToRadian(this.rotation - 85)) +
          (this.rand(0, this.thickness * 2) - this.thickness),
        vx: (this.rand(0, 100) - 50) / 1000,
        vy: (this.rand(0, 100) - 50) / 1000,
        radius: this.rand(1, 6) / 2,
        alpha: this.rand(10, 20) / 100
      });
    }
  }
  updateParticles() {
    let i = this.particles.length;
    while (i--) {
      const p = this.particles[i];
      p.vx += (this.rand(0, 100) - 50) / 750;
      p.vy += (this.rand(0, 100) - 50) / 750;
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.01;

      if (p.alpha < 0.02) {
        this.particles.splice(i, 1);
      }
    }
  }
  renderParticles() {
    let i = this.particles.length;
    while (i--) {
      const p = this.particles[i];
      this.ctx.beginPath();
      this.ctx.fillRect(p.x, p.y, p.radius, p.radius);
      this.ctx.closePath();
      this.ctx.fillStyle = 'hsla(0, 0%, 100%, ' + p.alpha + ')';
    }
  }
  draw() {
    this.updateCircle();
    this.renderCircle();
    this.renderCircleBorder();
    this.renderCircleFlare();
    this.renderCircleFLare2();
    this.createParticles();
    this.updateParticles();
    this.renderParticles();
  }

  update() {
    if (this.rotation < 360) {
      this.rotation += this.speed;
    } else {
      this.rotation = 0;
    }
  }

  degreeToRadian(degree) {
    return degree * Math.PI / 180;
  }
  rand(min, max) {
    return Math.random() * (max - min + 1) + min;
  }
}
