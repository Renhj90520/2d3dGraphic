import { Component, OnInit, ViewChild } from '@angular/core';
import Dots from './dots';

@Component({
  selector: 'app-canvas-lineeffect',
  templateUrl: './canvas-lineeffect.component.html',
  styleUrls: ['./canvas-lineeffect.component.css']
})
export class CanvasLineeffectComponent implements OnInit {
  @ViewChild('canvas') canvasEl;
  canvas;
  canvasWidth;
  canvasHeight;
  ctx;
  dots;
  mouseX;
  mouseY;
  constructor() {}
  initCanvas() {
    this.canvas = this.canvasEl.nativeElement;
    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.lineWidth = 0.3;
    this.dots = new Dots(this.canvasWidth, this.canvasHeight);
    this.mouseX = this.canvasWidth / 2;
    this.mouseY = this.canvasHeight / 2;
  }

  update() {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.dots.moveDots();
    this.dots.connectDots(this.ctx, this.mouseX, this.mouseY);
    this.dots.drawDots(this.ctx);
    requestAnimationFrame(() => {
      this.update();
    });
  }
  ngOnInit() {
    this.initCanvas();
    this.update();
  }
  mousemove(e) {
    this.mouseX = e.pageX - this.canvas.offsetLeft;
    this.mouseY = e.pageY - this.canvas.offsetTop;
  }
}
