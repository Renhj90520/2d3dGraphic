import * as THREE from 'three';

export default class OutGlow extends THREE.Object3D {
  constructor() {
    super();

    const loader = new THREE.TextureLoader();
    const map = loader.load('assets/images/Particle01.png');
    const material = new THREE.SpriteMaterial({
      map: map,
      color: 0xffffff,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.8
    });
    const sprite = new THREE.Sprite(material);
    sprite.scale.multiplyScalar(11);
    this.add(sprite);
  }
}
