import * as THREE from 'three';
import Pillar from './pillar';
import Swirl from './swirl';
import ParticleEmiter from './particle-emitter';

export default class SavePoint extends THREE.Object3D {
  private pillar;
  private pillar1;
  private swirl;
  private particleEmiter;
  constructor() {
    super();

    this.pillar = new Pillar(3, 3, 10);
    this.add(this.pillar);

    this.pillar1 = new Pillar(8, 5, 2.5);
    this.add(this.pillar1);

    this.swirl = new Swirl();
    this.add(this.swirl);

    this.particleEmiter = new ParticleEmiter();
    this.add(this.particleEmiter);

    const groundTexture = new THREE.TextureLoader().load(
      'assets/images/ground.png'
    );
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 10, 32, 32),
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        map: groundTexture,
        side: THREE.DoubleSide,
        transparent: true,
        blending: THREE.AdditiveBlending
      })
    );

    ground.scale.multiplyScalar(1.35);
    ground.rotation.x = 90 * Math.PI / 180;
    ground.position.set(0, 0.02, 0);
    this.add(ground);
  }

  update() {
    this.pillar.update();
    this.pillar1.update();
    this.particleEmiter.update();
    this.swirl.update();
  }
}
