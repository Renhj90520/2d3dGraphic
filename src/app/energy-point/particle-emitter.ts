import * as THREE from 'three';
import Particle from './particle';
export default class ParticleEmitter extends THREE.Object3D {
  private counter = 0;
  private pool: Particle[] = [];
  private particleNum = 10;
  private interval = 15;
  constructor() {
    super();
  }

  public update() {
    this.counter++;
    const length = this.pool.length;
    for (let i = 0; i < length; i++) {
      const particel = this.pool[i];
      particel.update();
    }

    if (this.counter % this.interval === 0) {
      this.addParticle();
    }
  }

  addParticle() {
    if (this.pool.length > this.particleNum) {
      return;
    }
    const particle = new Particle();
    this.pool.push(particle);
    this.add(particle);
  }
}
