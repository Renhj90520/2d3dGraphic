import * as THREE from 'three';
import Util from './util';
import TimerModel from './timer-model';

export default class Particle extends THREE.Sprite {
  // frame每次的count值
  private _counter = 0;
  // particle的速度
  private _velocity: THREE.Vector3;
  //   private _startPosition: THREE.Vector3;

  private _lifePoint: number;
  public isAlive = false;
  private _incrementCountNum: number;
  private _maxScale: number;

  constructor(texture: THREE.Texture, color: number = 0x88ccff) {
    super(
      new THREE.SpriteMaterial({
        color,
        map: texture,
        transparent: true,
        blending: THREE.AdditiveBlending
      })
    );
  }

  public init(radius: number, angle: number) {
    const radian = angle * Math.PI / 180;
    const x = radius * Math.sin(radian);
    const z = radius * Math.cos(radian);
    const y = 4 * Math.sin(radian * 0.3);
    this.position.set(x, y, z);

    this._maxScale = Math.random() * 1.5 + 0.5;
    this.scale.set(0, 0, 0);
    this._velocity = new THREE.Vector3(
      Util.random(-0.07, 0.07),
      Util.random(0.03, 0.08),
      Util.random(-0.07, 0.07)
    );

    this.material.opacity = 1;
    this.isAlive = true;

    this._lifePoint = Math.random() * 50 + 10;
    this._counter = 0;
    this._incrementCountNum = Math.random() * 0.5 + 0.2;
  }

  public update() {
    const timeRatio = TimerModel.getInstance().timeRatio;
    this._counter += this._incrementCountNum * timeRatio;
    this.position.add(this._velocity.clone().multiplyScalar(timeRatio));
    this.material.opacity -= 0.009 * timeRatio;
    const rad = Math.sin(this._counter * 30 * Math.PI / 180);
    const scale = this._maxScale * rad;
    this.scale.set(scale, scale, scale);
    if (this._lifePoint < this._counter) {
      this.isAlive = false;
    }
  }

  public dispose() {
    this._counter = null;
    // this._startPosition = null;
    this._velocity = null;
    this.material = null;
  }
}
