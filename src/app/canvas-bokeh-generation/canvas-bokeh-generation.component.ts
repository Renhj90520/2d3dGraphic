import { Component, OnInit, ViewChild } from '@angular/core';
import Part from './part';
import Bokeh from './bokeh';

@Component({
  selector: 'app-canvas-bokeh-generation',
  templateUrl: './canvas-bokeh-generation.component.html',
  styleUrls: ['./canvas-bokeh-generation.component.css']
})
export class CanvasBokehGenerationComponent implements OnInit {
  @ViewChild('canvas1', { static: false }) canvas1El;
  @ViewChild('canvas2', { static: false }) canvas2El;
  canvas1;
  canvas2;
  canvasW;
  canvasH;
  ctx1;
  ctx2;
  parts = [];
  bokeh;
  constructor() {}

  initCanvas() {
    this.canvas1 = this.canvas1El.nativeElement;
    this.canvasW = this.canvas1.width;
    this.canvasH = this.canvas1.height;
    this.ctx1 = this.canvas1.getContext('2d');

    this.canvas2 = this.canvas2El.nativeElement;
    this.ctx2 = this.canvas2.getContext('2d');

    this.bokeh = new Bokeh(this.canvasW, this.canvasH);
    this.bokeh.draw(this.ctx1);
  }
  initParts() {
    this.parts.length = 0;
    for (let j = 0; j < Math.floor((this.canvasW + this.canvasH) * 0.03); j++) {
      this.parts.push(new Part(this.canvasW, this.canvasH));
    }
  }
  update() {
    this.ctx2.clearRect(0, 0, this.canvasW, this.canvasH);
    this.ctx2.globalCompositeOperation = 'source-over';
    this.ctx2.shadowBlur = 0;
    this.ctx2.drawImage(this.canvas1, 0, 0);
    this.ctx2.globalCompositeOperation = 'lighter';
    // this.ctx2.shadowBlur = 5;
    // this.ctx2.shadowColor = '#fff';
    for (let k = 0; k < this.parts.length; k++) {
      const part = this.parts[k];
      part.draw(this.ctx2);
    }
    requestAnimationFrame(() => {
      this.update();
    });
  }
  ngOnInit() {
    this.initCanvas();
    this.initParts();
    this.update();
  }
}
