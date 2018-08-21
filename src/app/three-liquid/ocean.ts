import * as THREE from "three";
export default class Ocean extends THREE.Mesh {
  geometry;
  material;
  wire;
  mesh;
  waves = [];
  constructor() {
    super();
    this.geometry = new THREE.PlaneGeometry(25, 25, 25, 25);
    this.geometry.mergeVertices();
    const l = this.geometry.vertices.length;
    for (let i = 0; i < l; i++) {
      const v = this.geometry.vertices[i];

      this.waves.push({
        x: v.x,
        y: v.y,
        z: v.z,
        ang: Math.PI * 2,
        amp: Math.random() * 0.2,
        speed: 0.03 + Math.random() * 0.05
      });
    }

    const vmat = new THREE.MeshPhysicalMaterial({
      color: 0xf00589,
      wireframe: true,
      transparent: false,
      opacity: 1
    });

    const mat = new THREE.MeshPhysicalMaterial({
      color: 0xf00589,
      transparent: true,
      opacity: 0.85,
      wireframe: false
    });

    this.wire = new THREE.Mesh(this.geometry, vmat);
    this.mesh = new THREE.Mesh(this.geometry, mat);
    this.mesh.add(this.wire);
    this.add(this.mesh);
    this.receiveShadow = true;
    this.rotation.x = (-90 * Math.PI) / 180;
  }

  moveVertices() {
    const verts = this.geometry.vertices;
    const l = verts.length;
    for (let i = 0; i < l; i++) {
      const v = verts[i];
      const vpros = this.waves[i];
      v.x = vpros.x + Math.cos(vpros.ang) * vpros.amp;
      v.y = vpros.y + Math.sin(vpros.ang / 2) * vpros.amp;
      v.z = vpros.z + Math.cos(vpros.ang / 3) * vpros.amp;
      vpros.ang += vpros.speed;
    }

    this.geometry.verticesNeedsUpdate = true;
    this.geometry.morphTargesNeedsUpdate = true;
  }
}
