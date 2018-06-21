import { Component, OnInit, ViewChild } from '@angular/core';
import ShootingStar from './shooting-star';
import Star from './star';

@Component({
  selector: 'app-canvas-starry-sky',
  templateUrl: './canvas-starry-sky.component.html',
  styleUrls: ['./canvas-starry-sky.component.css']
})
export class CanvasStarrySkyComponent implements OnInit {
  @ViewChild('canvas') canvasEl;
  canvas;
  canvasW;
  canvasH;
  ctx;
  shootingStar1;
  shootingStar2;
  starLocations = [];
  stars = [];
  constructor() {}
  initCanvas() {
    this.canvas = this.canvasEl.nativeElement;
    this.canvasW = this.canvas.width;
    this.canvasH = this.canvas.height;
    this.ctx = this.canvas.getContext('2d');
    this.shootingStar1 = new ShootingStar(10, 10, 6, 6, 2, '#2c62c2');
    this.shootingStar2 = new ShootingStar(100, 100, -6, 6, 2, '#2c62c2');
    const sx = this.canvasW / 2;
    const sy = this.canvasH / 2;
    this.starLocations = [{ x: sx, y: sy }];
    this.createStars();
    setInterval(() => {
      this.shootingStar1.reset(this.canvasW, this.canvasH);
    }, 3000);
    setInterval(() => {
      this.shootingStar2.reset(this.canvasW, this.canvasH);
    }, 5000);
  }
  drawBackground() {
    this.ctx.fillStyle = 'rgba(11,21,56,.3)';
    this.ctx.fillRect(0, 0, this.canvasW, this.canvasH);
  }
  update() {
    this.drawBackground();
    this.shootingStar1.update(this.ctx);
    this.shootingStar1.update(this.ctx);

    for (let i = 0; i < this.stars.length; i++) {
      const star = this.stars[i];
      star.draw(this.ctx);
    }

    requestAnimationFrame(() => {
      this.update();
    });
  }

  createStars() {
    for (let i = 0; i < 10; ++i) {
      const bestLocation = this.sample(this.starLocations);
      this.starLocations.push(bestLocation);
    }
    for (let j = 0; j < this.starLocations.length; j++) {
      const location = this.starLocations[j];
      this.stars.push(
        new Star(location[0], location[1], Math.floor(Math.random() * 4) + 2, 1)
      );
    }
  }
  // use best candidate algorithm to evenly distribute across the canvas
  sample(samples) {
    let bestCandidate,
      bestDistance = 0;
    for (let i = 0; i < 10; ++i) {
      const c = [
        ((Math.random() - 0.5) * this.canvasW) / 2 + this.canvasW / 2,
        ((Math.random() - 0.5) * this.canvasH) / 2 + this.canvasH / 2
      ];
      const best = this.findClosest(samples, c);
      const d = this.distance(best, c);

      if (d > bestDistance) {
        bestDistance = d;
        bestCandidate = c;
      }
    }
    return bestCandidate;
  }
  findClosest(points, b) {
    let distance = null;
    let closestPoint;
    for (let i = 0; i < points.length; ++i) {
      const p = points[i];
      const dx = p.x - b[0];
      const dy = p.y - b[1];
      const currDistance = Math.sqrt(dx * dx + dy * dy);
      if (distance == null || distance > currDistance) {
        distance = currDistance;
        closestPoint = p;
      }
    }
    return closestPoint;
  }
  distance(a, b) {
    const dx = a.x - b[0];
    const dy = a.y - b[1];
    return Math.sqrt(dx * dx + dy * dy);
  }
  ngOnInit() {
    this.initCanvas();
    this.update();
  }
}
