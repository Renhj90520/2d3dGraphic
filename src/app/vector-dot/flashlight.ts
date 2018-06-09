import * as THREE from 'three';

export default class FlashLight extends THREE.Object3D {
  ROTATION_SPEED = 2.5;
  _frontVector;
  get frontVector() {
    return this._frontVector;
  }

  _aperture;
  get aperture() {
    return this._aperture;
  }
  _angle;
  constructor() {
    super();

    this._frontVector = new THREE.Vector3(0, 1, 0);
    this._aperture = 0.2;
    this._angle = 0;

    const hand = new THREE.Mesh(
      new THREE.CylinderGeometry(1, 1, 3, 10),
      new THREE.MeshBasicMaterial({ color: 0xcccccc })
    );
    hand.rotation.z = -90 * Math.PI / 180;
    this.add(hand);

    const head = new THREE.Mesh(
      new THREE.CylinderGeometry(1.5, 1, 1.5, 10),
      new THREE.MeshBasicMaterial({ color: 0xaaaaaa })
    );
    head.rotation.z = -90 * Math.PI / 180;
    head.position.x = 2;
    this.add(head);

    const loader = new THREE.TextureLoader();
    const beamTexture = loader.load('assets/images/beam.png');
    const beam = new THREE.Mesh(
      new THREE.CylinderBufferGeometry(15, 0.5, 20, 40, 10, true),
      new THREE.MeshBasicMaterial({
        color: 0xffff55,
        opacity: 0.3,
        transparent: true,
        map: beamTexture,
        depthWrite: false,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending
      })
    );

    beam.rotation.z = -90 * Math.PI / 180;
    beam.position.x = 12;
    this.add(beam);
  }

  update() {
    this._angle += this.ROTATION_SPEED;
    const radian = this._angle * Math.PI / 180;
    this.rotation.z = radian;
    const x = Math.cos(radian);
    const y = Math.sin(radian);
    this._frontVector = new THREE.Vector3(x, y, 0);
  }
}
