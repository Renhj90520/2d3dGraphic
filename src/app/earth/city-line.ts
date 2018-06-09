import * as THREE from 'three';
import CityPoint from './city-point';
import GeoUtil from './geoutil';

export default class CityLine extends THREE.Group {
  private _line: THREE.Line;
  private _geometry: THREE.Geometry;

  constructor(private _startTarget, private _endTarget) {
    super();
    this._geometry = new THREE.Geometry();
    this._line = new THREE.Line(
      this._geometry,
      new THREE.LineBasicMaterial({
        linewidth: 10,
        color: 0x00ffff,
        transparent: true,
        opacity: 0.5
      })
    );
    this.add(this._line);
  }

  update() {
    this._geometry.verticesNeedUpdate = true;
    this._geometry.vertices = GeoUtil.getOrbitPoints(
      this._startTarget.position,
      this._endTarget.position
    );
  }
}
