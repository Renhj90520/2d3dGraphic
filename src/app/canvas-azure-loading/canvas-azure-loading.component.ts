import { Component, OnInit, ViewChild } from '@angular/core';
import { colorHslToRgb, colorRgbToHsl } from './utils';
import Arc from './arc';

@Component({
  selector: 'app-canvas-azure-loading',
  templateUrl: './canvas-azure-loading.component.html',
  styleUrls: ['./canvas-azure-loading.component.css']
})
export class CanvasAzureLoadingComponent implements OnInit {
  @ViewChild('canvas') canvasEl;
  canvas;
  canvasW;
  canvasH;
  ctx;
  arcs = [];
  arcNUm = 4;
  speed = 55;
  frame = 0;
  startColor = {
    r: 0,
    g: 153,
    b: 204
  };
  constructor() {}
  initCanvas() {
    this.canvas = this.canvasEl.nativeElement;
    this.canvasW = this.canvas.width;
    this.canvasH = this.canvas.height;
    this.ctx = this.canvas.getContext('2d');
  }
  initArcs() {
    for (let j = 0; j < this.arcNUm; j++) {
      this.arcs.push(new Arc(this.canvasW, this.canvasH, j, this.startColor));
      this.luminateColor(this.startColor);
    }
  }
  luminateColor(color) {
    colorRgbToHsl(color);
    color.l += 0.15;
    colorHslToRgb(color);
  }

  update() {
    const pause = this.arcs.length * this.arcs[0].step;
    if (this.frame === this.speed + pause) {
      this.frame = 0;
    } else {
      let c;
      this.ctx.clearRect(0, 0, this.canvasW, this.canvasH);

      for (let j = 0; j < this.arcs.length; j++) {
        const arc = this.arcs[j];
        if (!c) {
          c = JSON.parse(JSON.stringify(arc.color));
          colorRgbToHsl(c);
          c.h += 0.01;
          if (c.h >= 1) {
            c.h = 0.001;
          }
          colorHslToRgb(c);
        }
        arc.color = JSON.parse(JSON.stringify(c));
        arc.update(this.frame, this.speed, this.ctx);
      }
    }
    requestAnimationFrame(() => {
      this.frame++;
      this.update();
    });
  }
  ngOnInit() {
    this.initCanvas();
    this.initArcs();
    this.update();
  }
}
