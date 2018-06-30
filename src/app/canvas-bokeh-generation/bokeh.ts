import { rand, hsla } from './utils';

export default class Bokeh {
  canvasW;
  canvasH;
  hue = rand(0, 360);
  count;
  radiusMin = 1;
  radiusMax;
  blurMin = 10;
  blurMax;
  hueMin = this.hue;
  hueMax = this.hue + 100;
  saturationMin = 10;
  saturationMax = 70;
  lightnessMin = 20;
  lightnessMax = 50;
  alphaMin = 0.1;
  alphaMax = 0.5;

  constructor(canvasW, canvasH) {
    this.canvasW = canvasW;
    this.canvasH = canvasH;
    const sizebase = canvasW + canvasH;
    this.count = Math.floor(sizebase * 0.3);
    this.radiusMax = sizebase * 0.04;
    this.blurMax = sizebase * 0.04;
  }

  draw(ctx) {
    let c = this.count;

    ctx.clearRect(0, 0, this.canvasW, this.canvasH);
    ctx.globalCompositeOperation = 'lighter';
    while (c--) {
      const radius = rand(this.radiusMin, this.radiusMax);
      const blur = rand(this.blurMin, this.blurMax);
      const x = rand(0, this.canvasW);
      const y = rand(0, this.canvasH);
      const hue = rand(this.hueMin, this.hueMax);
      const saturation = rand(this.saturationMin, this.saturationMax);
      const ligthness = rand(this.lightnessMin, this.lightnessMax);
      const alpha = rand(this.alphaMin, this.alphaMax);

      ctx.shadowColor = hsla(hue, saturation, ligthness, alpha);
      ctx.shadowBlur = blur;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }
  }
}
