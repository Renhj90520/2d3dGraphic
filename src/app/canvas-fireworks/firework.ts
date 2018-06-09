import { EventEmitter } from '@angular/core';

export default class Firework {
  x;
  y;
  sx;
  sy;
  tx;
  ty;
  speed = 2;
  // track the past coordinate of each firework to create a trail effect,
  // increase the coordinate count to create more prominent trails
  coordinates = [];
  coordinateCount = 3;
  angle;
  acceleration = 1.05;
  brightness = this.random(50, 70);
  targetRadius = 1;

  distanceTraveled = 0;
  distanceToTarget;
  bomb = new EventEmitter<Firework>();
  constructor(sourceX, sourceY, targetX, targetY) {
    this.x = this.sx = sourceX;
    this.y = this.sy = sourceY;
    this.tx = targetX;
    this.ty = targetY;
    this.distanceToTarget = this.calculateDistance(
      this.sx,
      this.sy,
      this.tx,
      this.ty
    );
    this.angle = Math.atan2(targetY - sourceY, targetX - sourceX);
    while (this.coordinateCount--) {
      this.coordinates.push([this.x, this.y]);
    }
  }

  update(fireworks, index, component) {
    // remove the last item in coordinate array
    this.coordinates.pop();
    // add current coordinates to the start of the array
    this.coordinates.unshift([this.x, this.y]);

    if (this.targetRadius < 8) {
      this.targetRadius += 0.3;
    } else {
      this.targetRadius = 1;
    }

    this.speed *= this.acceleration;

    // get the current velocities based on angle and speed
    const vx = Math.cos(this.angle) * this.speed;
    const vy = Math.sin(this.angle) * this.speed;

    this.distanceTraveled = this.calculateDistance(
      this.sx,
      this.sy,
      this.x + vx,
      this.y + vy
    );

    if (this.distanceTraveled >= this.distanceToTarget) {
      component.createParticles(this.tx, this.ty);
      fireworks.splice(index, 1);
    } else {
      this.x += vx;
      this.y += vy;
    }
  }
  draw(ctx, hue) {
    ctx.beginPath();
    const length = this.coordinates.length;
    ctx.moveTo(
      this.coordinates[length - 1][0],
      this.coordinates[length - 1][1]
    );
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle = `hsl(${hue},100%,${this.brightness}%)`;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(this.tx, this.ty, this.targetRadius, 0, Math.PI * 2);
    ctx.stroke();
  }
  calculateDistance(sx, sy, tx, ty) {
    const xDistance = sx - tx;
    const yDistance = sy - ty;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
  }
  random(min, max) {
    return Math.random() * (max - min + 1) + min;
  }
}
