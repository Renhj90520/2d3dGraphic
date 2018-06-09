import * as THREE from 'three';

export default class Aura extends THREE.Object3D {
  private map: THREE.Texture;
  constructor() {
    super();

    const geometry = new THREE.SphereGeometry(2.05, 20, 20);

    const loader = new THREE.TextureLoader();
    this.map = loader.load('assets/images/aura3_type2.png');
    this.map.wrapS = this.map.wrapT = THREE.RepeatWrapping;

    const material = new THREE.MeshBasicMaterial({
      map: this.map,
      transparent: true,
      blending: THREE.AdditiveBlending
    });

    const mesh = new THREE.Mesh(geometry, material);
    this.add(mesh);
  }
  public update() {
    if (this.map) {
      this.map.offset.x -= 0.005;
      this.map.offset.y -= 0.005;
    }
  }
}
