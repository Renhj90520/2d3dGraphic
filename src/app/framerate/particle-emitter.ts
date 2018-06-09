import * as THREE from 'three';
import Particle from './particle';
import TimerModel from './timer-model';

export default class ParticleEmitter extends THREE.Object3D {
  private _texture: THREE.Texture;
  private _particleNum: number;
  private _interval = 15;
  private _angle = 0;
  private _radius = 2;
  private _colorList = [0x88ccff, 0xffffdd, 0x44eeff];

  constructor() {
    super();
    this._particleNum = 500;
    const loader = new THREE.TextureLoader();
    this._texture = loader.load('assets/images/particle.png');
  }

  private addParticle() {
    if (this.children.length > 500) {
      return;
    }

    const rad = Math.floor(Math.random() * 3);
    const color = this._colorList[rad];
    const particle = new Particle(this._texture, color);
    particle.visible = false;
    this.add(particle);
  }
  public update() {
    if (this._texture) {
      const incrementNum = 7 * TimerModel.getInstance().timeRatio;
      this._angle += incrementNum;

      const notAliveNum = (
        this.children.filter((particle: Particle) => !particle.isAlive) || []
      ).length;

      let initNum = 0;
      this.children.forEach((particle: Particle, index: number) => {
        if (particle.isAlive) {
          particle.update();
        } else {
          particle.init(
            this._radius,
            this._angle - incrementNum / notAliveNum * initNum
          );
          initNum++;
        }

        const perLength = Math.floor(4000 / 500);
        if (index % perLength === 0) {
          particle.visible = true;
        } else {
          particle.visible = false;
        }
      });
      if (this.children.length < 4000) {
        for (let i = 0; i < 20; i++) {
          this.addParticle();
        }
      }
    }
  }
}
