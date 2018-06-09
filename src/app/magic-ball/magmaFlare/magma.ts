import * as THREE from 'three';

export default class Magma extends THREE.Object3D {
  private _map: THREE.Texture;
  constructor() {
    super();

    const geometry = new THREE.SphereGeometry(2, 20, 20);
    const loader = new THREE.TextureLoader();

    this._map = loader.load('assets/images/magma.png');
    this._map.wrapS = this._map.wrapT = THREE.RepeatWrapping;

    const material = new THREE.MeshBasicMaterial({ map: this._map });
    const mesh = new THREE.Mesh(geometry, material);
    this.add(mesh);
  }
  public update() {
    if (this._map) {
      this._map.offset.x += 0.007;
      this._map.offset.y += 0.008;
    }
  }
}
