import { Component, OnInit, ViewChild } from '@angular/core';
import Firework from './firework';

@Component({
  selector: 'app-canvas-crazy-fireworks',
  templateUrl: './canvas-crazy-fireworks.component.html',
  styleUrls: ['./canvas-crazy-fireworks.component.css']
})
export class CanvasCrazyFireworksComponent implements OnInit {
  @ViewChild('canvas') canvasEl;
  canvas;
  canvasW;
  canvasH;
  ctx;
  fireworks = [];
  constructor() {}

  initCanvas() {
    this.canvas = this.canvasEl.nativeElement;
    this.canvasW = this.canvas.width;
    this.canvasH = this.canvas.height;
    this.ctx = this.canvas.getContext('2d');
    this.createFireworks();
  }
  createFireworks() {
    for (let i = 0; i < 3; i++) {
      this.fireworks.push(new Firework(this.canvasW, this.canvasH));
    }
  }
  update() {
    // clear
    this.ctx.globalCompositeOperation = 'source-over';
    this.ctx.globalAlpha = 0.18;
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.canvasW, this.canvasH);

    // re-draw
    this.ctx.globalCompositeOperation = 'lighter';
    this.ctx.globalAlpha = 1;
    for (let i = 0; i < this.fireworks.length; i++) {
      const firework = this.fireworks[i];
      firework.draw(this.ctx);
      firework.update(this.ctx);
    }
    requestAnimationFrame(() => {
      this.update();
    });
  }
  ngOnInit() {
    this.initCanvas();
    this.update();
  }
}
