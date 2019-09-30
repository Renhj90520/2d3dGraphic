import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-canvas-circle-loader',
  templateUrl: './canvas-circle-loader.component.html',
  styleUrls: ['./canvas-circle-loader.component.css']
})
export class CanvasCircleLoaderComponent implements OnInit {
  @ViewChild('canvas', { static: false }) canvasEl;
  canvas;
  canvasW;
  canvasH;
  ctx;
  lineWidth = 0.5;
  rotation = (270 * Math.PI) / 280;
  speed = 6;
  lineNum = 50;
  constructor() {}

  ngOnInit() {
    this.initCanvas();
    this.update();
  }
  initCanvas() {
    this.canvas = this.canvasEl.nativeElement;
    this.canvasW = this.canvas.width;
    this.canvasH = this.canvas.height;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.strokeStyle = 'rgba(0,0,0,.75)';
  }
  drawLines() {
    this.ctx.save();
    this.ctx.globalCompositeOperation = 'source-over';
    this.ctx.translate(this.canvasW / 2, this.canvasH / 2);
    this.ctx.rotate(this.rotation);
    let i = this.lineNum;
    while (i--) {
      this.ctx.beginPath();
      this.ctx.arc(
        0,
        0,
        i + Math.random() * 35,
        Math.random(),
        Math.PI / 3 + Math.random() / 12,
        false
      );
      this.ctx.stroke();
    }
    this.ctx.restore();
  }
  updateLines() {
    this.rotation += this.speed / 100;
  }
  update() {
    this.ctx.globalCompositeOperation = 'destination-out';
    this.ctx.fillStyle = 'rgba(0,0,0,.03)';
    this.ctx.fillRect(0, 0, this.canvasW, this.canvasH);
    this.updateLines();
    this.drawLines();
    requestAnimationFrame(() => {
      this.update();
    });
  }
}
