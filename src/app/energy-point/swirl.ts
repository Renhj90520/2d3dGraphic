import * as THREE from 'three';

export default class Swirl extends THREE.Object3D {
  private counter = 0;
  private textuer: THREE.Texture;

  constructor() {
    super();
    this.textuer = new THREE.TextureLoader().load('assets/images/swirl.png');
    this.textuer.offset.y = -0.25;
    this.textuer.wrapS = THREE.RepeatWrapping;

    const geometry = new THREE.TorusGeometry(6, 3, 2, 100);
    const material = new THREE.MeshBasicMaterial({
      color: 0x007eff,
      map: this.textuer,
      transparent: true,
      blending: THREE.AdditiveBlending
    });

    const torus = new THREE.Mesh(geometry, material);
    torus.position.y = 0.01;
    torus.rotation.x = 90 * Math.PI / 180;
    this.add(torus);
  }

  public update() {
    this.counter++;
    const angle = this.counter * Math.PI / 180;
    this.textuer.offset.x = -angle * 0.2;
  }
}
