import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-canvas-matrix-text',
  templateUrl: './canvas-matrix-text.component.html',
  styleUrls: ['./canvas-matrix-text.component.css']
})
export class CanvasMatrixTextComponent implements OnInit {
  @ViewChild('canvas') canvasEl;
  canvas;
  canvasW;
  canvasH;
  ctx;
  yPositions;
  constructor() {}
  initCanvas() {
    this.canvas = this.canvasEl.nativeElement;
    this.canvasW = this.canvas.width;
    this.canvasH = this.canvas.height;
    this.ctx = this.canvas.getContext('2d');
    this.yPositions = Array(100)
      .join('0')
      .split('');
  }

  update() {
    this.ctx.fillStyle = `rgba(0,0,0,.05)`;
    this.ctx.fillRect(0, 0, this.canvasW, this.canvasH);
    this.ctx.fillStyle = '#0f0';
    this.ctx.font = '10px Georgia';
    this.yPositions.forEach((y, index) => {
      const text = String.fromCharCode(1e2 + Math.random() * 33);
      const x = index * 10 + 10;
      this.ctx.fillText(text, x, y);
      if (y > 100 + Math.random() * 1e4) {
        this.yPositions[index] = 0;
      } else {
        this.yPositions[index] += 10;
      }
    });
    requestAnimationFrame(() => {
      this.update();
    });
  }
  ngOnInit() {
    this.initCanvas();
    this.update();
  }
}
