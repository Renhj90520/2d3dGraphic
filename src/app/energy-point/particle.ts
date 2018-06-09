import * as THREE from 'three';
import Util from './util';

export default class Particel extends THREE.Sprite {
  private counter = 0;
  private velocity: THREE.Vector3;
  constructor() {
    super(
      new THREE.SpriteMaterial({
        color: 0x007eff,
        map: new THREE.TextureLoader().load('assets/images/particle.png'),
        transparent: true,
        blending: THREE.AdditiveBlending
      })
    );
    this.init();
  }

  private init() {
    this.position.set(0, 0, 0);
    this.scale.set(1, 1, 1);
    this.velocity = new THREE.Vector3(
      Util.random(-0.015, 0.015),
      Util.random(0.05, 0.1),
      Util.random(-0.015, 0.015)
    );
    this.material.opacity = 1;
  }

  public update() {
    this.counter++;
    this.position.add(this.velocity.clone());
    this.material.opacity -= 0.009;

    const rad = Math.sin(this.counter * 30 * Math.PI / 180);
    const scale = 0.5 + rad;
    this.scale.set(scale, scale, scale);

    if (this.material.opacity <= 0) {
      this.init();
    }
  }
}
