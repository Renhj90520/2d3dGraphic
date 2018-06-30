import Line from './line';

export default class Bubble {
  position = { x: 0, y: 0 };
  radius = Math.random() * 6 + 8;
  xOffset;
  yOffset;
  distanceBetweenWaves = Math.random() * 40 + 50;
  count;
  color = '#8bc9ee';
  lines = [];
  popping = false;
  maxRotation = 85;
  rotation =
    Math.floor(Math.random() * 2 * this.maxRotation) - this.maxRotation;
  rotationDirection = 'forward';
  poplineNum = 6;
  popDistance = 1;
  canvasW;
  canvasH;
  speed = 1;
  constructor(canvasW, canvasH) {
    this.canvasW = canvasW;
    this.canvasH = canvasH;
    this.xOffset = Math.random() * canvasW - this.radius;
    this.yOffset = Math.random() * canvasH;
    this.count = this.canvasH + this.yOffset;
    this.initLines();
  }

  initLines() {
    for (let j = 0; j < this.poplineNum; j++) {
      const line = new Line();
      line.bubble = this;
      line.index = j;

      this.lines.push(line);
    }
  }

  resetPosition() {
    this.position = {
      x: 0,
      y: 0
    };
    this.radius = 8 + Math.random() * 6;
    this.xOffset = Math.random() * this.canvasW - this.radius;
    this.yOffset = Math.random() * this.canvasH;
    this.distanceBetweenWaves = 50 + Math.random() * 40;
    this.count = this.canvasH + this.yOffset;
    this.popping = false;
  }

  draw(ctx) {
    if (this.rotationDirection === 'forward') {
      if (this.rotation < this.maxRotation) {
        this.rotation++;
      } else {
        this.rotationDirection = 'backward';
      }
    } else {
      if (this.rotation > this.maxRotation * -1) {
        this.rotation--;
      } else {
        this.rotationDirection = 'forward';
      }
    }

    ctx.save();
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate((this.rotation * Math.PI) / 180);

    if (!this.popping) {
      ctx.beginPath();
      ctx.strokeStyle = '#8bc9ee';
      ctx.lineWidth = 1;
      ctx.arc(0, 0, this.radius - 3, 0, Math.PI * 1.5, true);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, this.radius, 0, Math.PI * 2, false);
      ctx.stroke();
    }

    ctx.restore();

    for (let j = 0; j < this.lines.length; j++) {
      const line = this.lines[j];

      if (line.popping) {
        if (line.length < this.popDistance && !line.inversePop) {
          line.popDistance += 0.06;
        } else {
          if (line.popDistance >= 0) {
            line.inversePop = true;
            line.popDistanceReturn += 3;
            line.popDistance -= 0.03;
          } else {
            line.resetValues();
            this.resetPosition();
          }
        }
        line.updateValues();
        line.draw(ctx);
      }
    }
  }

  update() {
    this.position.x =
      Math.sin(this.count / this.distanceBetweenWaves) * 50 + this.xOffset;
    this.position.y = this.count;
    if (this.count < 0 - this.radius) {
      this.count = this.canvasH + this.yOffset;
    } else {
      this.count -= this.speed;
    }
  }
}
