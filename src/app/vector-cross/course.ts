import * as THREE from 'three';

export default class Course extends THREE.Object3D {
  _points;
  get points() {
    return this._points;
  }

  constructor() {
    super();
    this._points = [];
    const radius = 5;
    for (let index = 0; index < 362; index++) {
      const rad = index * Math.PI / 180;
      const sin = Math.sin(rad * 3);

      const x = radius * Math.cos(rad) * 2 + sin * 2;
      const y = radius * Math.sin(rad) + sin * 3;
      this._points.push(new THREE.Vector3(x, y, 0));
    }

    const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
    const geo = new THREE.Geometry();
    geo.vertices = this.points;
    const line = new THREE.Line(geo, material);
    this.add(line);
  }
}
