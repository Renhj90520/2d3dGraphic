import * as THREE from 'three';

export default class ParticleEmiter extends THREE.Object3D {
  PARTICLE_NUM = 3000;
  COLOR_LIST = [0xffff00, 0xffffdd, 0xffffff];
  RADIUS = 50;

  _particleStore;
  _texture;
  constructor() {
    super();

    this._particleStore = [];
    this._texture = null;

    const loader = new THREE.TextureLoader();
    this._texture = loader.load('assets/images/particle.png');

    for (let index = 0; index < this.PARTICLE_NUM; index++) {
      const particle = this.createParticle();
      this.add(particle);
      this._particleStore.push(particle);
    }
  }
  createParticle() {
    const rand = Math.floor(Math.random() * 3);
    const color = this.COLOR_LIST[rand];

    const material = new THREE.SpriteMaterial({
      color: color,
      map: this._texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.3
    });

    const sprite = new THREE.Sprite(material);
    const phi = (Math.random() * 180 - 90) * Math.PI / 180;
    const theta = Math.random() * 360 * Math.PI / 180;
    const radius = this.RADIUS;

    sprite.position.x = radius * Math.cos(phi) * Math.cos(theta) * -1;
    sprite.position.y = radius * Math.sin(phi);
    sprite.position.z = radius * Math.cos(phi) * Math.sin(theta);

    sprite.scale.multiplyScalar(Math.random() * 5 + 1);

    return sprite;
  }

  update(lightFrontVector, aperture) {
    const target = lightFrontVector.clone();

    this._particleStore.map(p => {
      const dot = p.position
        .clone()
        .normalize()
        .dot(target);
      let opacity = (dot - (1 - aperture)) / aperture;
      opacity *= Math.random();
      p.material.opacity = opacity;
    });
  }
}
