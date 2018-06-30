import { Component, OnInit, ViewChild } from '@angular/core';
import Bubble from './bubble';

@Component({
  selector: 'app-canvas-bubble',
  templateUrl: './canvas-bubble.component.html',
  styleUrls: ['./canvas-bubble.component.css']
})
export class CanvasBubbleComponent implements OnInit {
  @ViewChild('canvas') canvasEl;
  canvas;
  canvasW;
  canvasH;
  ctx;
  bubbles = [];
  bubblesNum = 20;
  mouseX = 0;
  mouseY = 0;
  constructor() {}

  initCanvas() {
    this.canvas = this.canvasEl.nativeElement;
    this.canvasW = this.canvas.width;
    this.canvasH = this.canvas.height;
    this.ctx = this.canvas.getContext('2d');
  }

  initBubbles() {
    for (let j = 0; j < this.bubblesNum; j++) {
      this.bubbles.push(new Bubble(this.canvasW, this.canvasH));
    }
  }

  update() {
    this.ctx.fillStyle = '#00afe9';
    this.ctx.fillRect(0, 0, this.canvasW, this.canvasH);
    for (let j = 0; j < this.bubbles.length; j++) {
      const bubble = this.bubbles[j];
      bubble.update();

      if (
        this.hintTest(
          this.mouseX,
          this.mouseY,
          bubble.position.x,
          bubble.position.y,
          bubble.radius
        )
      ) {
        for (let k = 0; k < bubble.lines.length; k++) {
          const line = bubble.lines[k];
          line.popDistance = bubble.radius * 0.5;
          line.popping = true;
          bubble.popping = true;
        }
      }
      bubble.draw(this.ctx);
    }

    requestAnimationFrame(() => {
      this.update();
    });
  }
  ngOnInit() {
    this.initCanvas();
    this.initBubbles();
    this.update();
  }

  mouseMove(e) {
    this.mouseX = e.offsetX;
    this.mouseY = e.offsetY;
  }
  hintTest(x1, y1, x2, y2, radius) {
    if (
      x1 > x2 - radius &&
      x1 < x2 + radius &&
      y1 < y2 + radius &&
      y1 > y2 - radius
    ) {
      return true;
    } else {
      return false;
    }
  }
}
