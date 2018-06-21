export default class Star {
  rot = (Math.PI / 2) * 3;
  cx;
  cy;
  spikes = 4;
  outerRadius;
  innerRadius;
  step = Math.PI / this.spikes;

  constructor(cx, cy, outerRadius, innerRadius) {
    this.cx = cx;
    this.cy = cy;
    this.outerRadius = outerRadius;
    this.innerRadius = innerRadius;
  }

  draw(ctx) {
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(this.cx, this.cy - this.outerRadius);
    for (let i = 0; i < this.spikes; i++) {
      const outerX = this.cx + Math.cos(this.rot) * this.outerRadius;
      const outerY = this.cy + Math.sin(this.rot) * this.outerRadius;
      ctx.lineTo(outerX, outerY);
      this.rot += this.step;

      const innerX = this.cx + Math.cos(this.rot) * this.innerRadius;
      const innerY = this.cy + Math.sin(this.rot) * this.innerRadius;
      ctx.lineTo(innerX, innerY);
      this.rot += this.step;
    }
    ctx.lineTo(this.cx, this.cy - this.outerRadius);
    ctx.closePath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'rgb(32,66,136)';
    ctx.stroke();
    ctx.fillStyle = 'skyblue';
    ctx.fill();
  }
}
