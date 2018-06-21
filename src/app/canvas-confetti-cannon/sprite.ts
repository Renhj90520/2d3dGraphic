import * as _ from 'lodash';
import { TweenMax, Power4 } from 'gsap';

export default class Sprite {
  x;
  y;
  angle;
  velocity;
  color;
  tilt = _.random(10, -10);
  tiltAngleIncreamental = _.random(0.07, 0.05);
  tiltAngle = 0;
  r = _.random(4, 6);
  d = _.random(15, 25);

  DECAY = 4;
  SPREAD = 60;
  GRAVITY = 1200;
  constructor(x, y, angle, velocity) {
    const r = _.random(30, 255);
    const g = _.random(30, 230);
    const b = _.random(30, 230);
    this.color = `rgb(${r},${g},${b})`;

    this.x = x;
    this.y = y;
    this.angle = angle;
  }

  tween(sprites) {
    const minAngle = this.angle - this.SPREAD / 2;
    const maxAngle = this.angle + this.SPREAD / 2;

    const minVelocity = this.velocity / 4;
    const maxVelocity = this.velocity;

    const velocity = _.random(minVelocity, maxVelocity);
    const angle = _.random(minAngle, maxAngle);
    const friction = _.random(0.1, 0.25);
    const d = 0;
    const gravity = this.GRAVITY;

    TweenMax.to(this, this.DECAY, {
      physics2D: {
        velocity,
        angle,
        gravity,
        friction
      },
      d,
      ease: Power4.easeIn,
      onComplete: () => {
        _.pull(sprites, this);
      }
    });
  }

  update() {
    const tiltAngle = 0.0005 * this.d;

    this.angle += 0.01;
    this.tiltAngle += tiltAngle;
    this.tiltAngle += this.tiltAngleIncreamental;
    this.tilt = Math.sin(this.tiltAngle - this.r / 2) * this.r * 2;
    this.y += Math.sin(this.angle + this.r / 2) * 2;
    this.x += Math.cos(this.angle) / 2;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.lineWidth = this.d / 2;
    ctx.strokeStyle = this.color;
    ctx.moveTo(this.x + this.tilt + this.r, this.y);
    ctx.lineTo(this.x + this.tilt, this.y + this.tilt + this.r);
    ctx.stroke();
    this.update();
  }
}
