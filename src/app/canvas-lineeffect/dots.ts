import Dot from './dot';
import Color from './color';

export default class Dots {
  num = 100;
  distance = 100;
  radius = 20;
  collection = [];
  canvasW;
  canvasH;
  constructor(canvasW, canvasH) {
    this.canvasW = canvasW;
    this.canvasH = canvasH;
    for (let i = 0; i < this.num; i++) {
      this.collection.push(new Dot(canvasW, canvasH));
    }
  }

  moveDots() {
    for (let i = 0; i < this.num; i++) {
      const dot = this.collection[i];
      if (dot.y < 0 || dot.y > this.canvasH) {
        dot.vx = dot.vx;
        dot.vy = -dot.vy;
      } else if (dot.x < 0 || dot.x > this.canvasW) {
        dot.vx = -dot.vx;
        dot.vy = dot.vy;
      }

      dot.x += dot.vx;
      dot.y += dot.vy;
    }
  }

  connectDots(ctx, mx, my) {
    for (let i = 0; i < this.num; i++) {
      for (let j = 0; j < this.num; j++) {
        const iDot = this.collection[i];
        const jDot = this.collection[j];

        if (
          Math.abs(iDot.x - jDot.x) < this.distance &&
          Math.abs(iDot.y - jDot.y) < this.distance
        ) {
          if (
            Math.abs(iDot.x - mx) < this.radius &&
            Math.abs(iDot.y - my) < this.radius
          ) {
            ctx.beginPath();
            ctx.strokeStyle = this.averageColorStyles(iDot, jDot);
            ctx.moveTo(iDot.x, iDot.y);
            ctx.lineTo(jDot.x, jDot.y);
            ctx.stroke();
            ctx.closePath();
          }
        }
      }
    }
  }

  averageColorStyles(doti, dotj) {
    const color1 = doti.color;
    const color2 = dotj.color;
    const r = this.mixComponents(color1.r, doti.radius, color2.r, dotj.radius);
    const g = this.mixComponents(color1.g, doti.radius, color2.g, dotj.radius);
    const b = this.mixComponents(color1.b, doti.radius, color2.b, dotj.radius);

    return Color.createColorStyle(Math.floor(r), Math.floor(g), Math.floor(b));
  }
  mixComponents(comp1, weight1, comp2, weight2) {
    return (comp1 * weight1 + comp2 * weight2) / (weight1 + weight2);
  }
  drawDots(ctx) {
    for (let i = 0; i < this.num; i++) {
      const dot = this.collection[i];
      dot.draw(ctx);
    }
  }
}
