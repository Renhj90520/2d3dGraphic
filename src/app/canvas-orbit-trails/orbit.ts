export default class Orbit {
  private _x: number;
  public get x(): number {
    return this._x;
  }
  public set x(v: number) {
    this._x = v;
  }

  private _y: number;
  public get y(): number {
    return this._y;
  }
  public set y(v: number) {
    this._y = v;
  }

  lastX: number;
  lastY: number;

  colorAngle = 0;
  angle = 0;
  radius = 0;
  speed = 0;
  alpha = 0;
  size = 0;
  public init(canvasWidth, canvasHeight) {
    const dx = canvasWidth / 2 - this.x;
    const dy = canvasHeight / 2 - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    this.angle = Math.atan2(dy, dx);
    this.lastX = this.x;
    this.lastY = this.y;

    this.radius = distance;
    this.speed = this.rand(10, 5) / 1000 * distance / 750 + 0.015;
    this.alpha = 1 - Math.abs(distance) / canvasWidth;
    this.size = this.rand(3, 1) / 2;
  }

  draw(ctx) {
    ctx.strokeStyle = `hsla(${this.colorAngle},100%,50%,1)`;
    ctx.lineWidth = this.size;
    ctx.beginPath();
    ctx.moveTo(this.lastX, this.lastY);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
  }
  update(canvasW, canvasH) {
    this.lastX = this.x;
    this.lastY = this.y;

    const x1 = canvasW / 2;
    const y1 = canvasH / 2;
    const rise = y1 - this.y;
    const run = x1 - this.x;
    const slope = -(rise / run);
    const radian = Math.atan(slope);
    let angleH = Math.floor(radian * 180 / Math.PI);
    // 二三象限
    if (this.x < x1 && (this.y < y1 || this.y > y1)) {
      angleH += 180;
    }

    // 第四象限
    if (this.x > x1 && this.y > y1) {
      angleH += 360;
    }

    // y轴正坐标
    if (this.x < y1 && slope === Number.POSITIVE_INFINITY) {
      angleH = 270;
    }
    if (this.y > y1 && slope === Number.NEGATIVE_INFINITY) {
      angleH = 90;
    }

    if (this.x > x1 && slope === 0) {
      angleH = 180;
    }
    this.colorAngle = angleH;
    this.x = canvasW / 2 + Math.sin(this.angle * -1) * this.radius;
    this.y = canvasH / 2 + Math.cos(this.angle * -1) * this.radius;
    this.angle += this.speed;
  }
  rand(max, min) {
    return Math.random() * (max - min + 1) + min;
  }
}
