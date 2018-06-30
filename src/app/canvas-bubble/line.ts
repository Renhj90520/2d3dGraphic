export default class Line {
  x;
  y;
  offsetX;
  offsetY;
  length = 5;
  popDistance = 10;
  popDistanceReturn = 0;
  inversePop = false;
  popping = false;
  bubble;
  index;
  resetValues() {
    this.length = 5;
    this.popDistance = 0;
    this.popDistanceReturn = 0;
    this.inversePop = false;
    this.popping = false;

    this.updateValues();
  }

  updateValues() {
    this.x =
      this.bubble.position.x +
      (this.bubble.radius + this.popDistanceReturn) *
        Math.cos((2 * Math.PI * this.index) / this.bubble.lines.length);
    this.y =
      this.bubble.position.y +
      (this.bubble.radius + this.popDistanceReturn) *
        Math.sin((2 * Math.PI * this.index) / this.bubble.lines.length);

    this.offsetX = this.length;
    this.offsetY = this.length;
  }

  draw(ctx) {
    this.updateValues();

    ctx.beginPath();
    ctx.strokeStyle = '#8bc9ee';
    ctx.lineWidth = 2;
    ctx.moveTo(this.x, this.y);
    if (this.x < this.bubble.position.x) {
      this.offsetX = this.length * -1;
    }
    if (this.y < this.bubble.position.y) {
      this.offsetY = this.length * -1;
    }

    if (this.x === this.bubble.position.x) {
      this.offsetX = 0;
    }
    if (this.y === this.bubble.position.y) {
      this.offsetY = 0;
    }

    ctx.lineTo(this.x + this.offsetX, this.y + this.offsetY);
    ctx.stroke();
  }
}
