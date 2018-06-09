import * as THREE from 'three';
import GeoUtil from './geoutil';

export default class CityPoint extends THREE.Group {
  private _radius = 110;
  public sphere: THREE.Mesh;
  public pointLight: THREE.PointLight;
  public get radius() {
    return this._radius;
  }

  private _latitude = 0;
  public get latitude() {
    return this._latitude;
  }
  public set latitude(value) {
    this._latitude = value;
  }

  private _longitude = 0;
  public get longitude() {
    return this._longitude;
  }
  public set longitude(value) {
    this._longitude = value;
  }

  constructor(color: number) {
    super();

    const sphereGeo = new THREE.SphereGeometry(2, 35, 35);
    const material = new THREE.MeshLambertMaterial({ color });
    this.sphere = new THREE.Mesh(sphereGeo, material);
    this.sphere.receiveShadow = true;
    this.add(this.sphere);

    this.pointLight = new THREE.PointLight(color, 2, 0);
    this.add(this.pointLight);
  }

  public update() {
    const position = GeoUtil.translateGeoCoords(
      this.latitude,
      this.longitude,
      this._radius
    );
    this.position.copy(position);
  }
}
