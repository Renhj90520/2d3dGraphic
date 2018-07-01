export default class Arc {
  borderWidth = 5;
  color;
  radius = 1;
  x;
  y;
  offset = 1;
  step = 10;
  frame;
  canvasW;
  canvasH;
  constructor(canvasW, canvasH, index, color) {
    this.canvasW = canvasW;
    this.canvasH = canvasH;

    this.x = this.canvasW / 2;
    this.y = this.canvasH / 2;
    this.frame = this.step * index;
    this.radius -= index * 0.1;
    this.radius = (this.x - this.borderWidth) * this.radius;
    this.color = JSON.parse(JSON.stringify(color));
  }

  update(frame, speed, ctx) {
    const start = this.getPos(this.offset * Math.PI, frame, speed);
    const end = this.getPos(this.offset * Math.PI * 2, frame, speed);
    this.draw(ctx, start, end);
  }

  draw(ctx, start, end) {
    ctx.closePath();
    ctx.beginPath();
    ctx.lineWidth = this.borderWidth;
    ctx.strokeStyle = `rgb(${this.color.r},${this.color.g},${this.color.b})`;
    ctx.arc(this.x, this.y, this.radius, start, end, false);
    ctx.stroke();
  }

  getPos(pos, frame, speed) {
    if (frame < this.frame) {
      frame = 0;
    } else {
      frame -= this.frame;
      if (frame > speed) {
        frame = 0;
      }
    }
    const animPos = (frame / speed) * Math.PI * 2;
    let newPos = pos + animPos;
    if (newPos > Math.PI * 2) {
      newPos -= Math.PI * 2;
    }
    return newPos;
  }
}
