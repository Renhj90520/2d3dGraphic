import { merge, generateID, randomizeRGB } from './utils';
import * as THREE from 'three';

const TILE = 'tile';
const DEG_TO_RAD = Math.PI / 180;
export default class Tile {
  cell: any;
  uniqueId: string;
  geometry: any;
  material: any;
  objectType: string;
  entity: any;
  userData: {};
  selected: boolean;
  highlight: string;
  mesh: THREE.Mesh;
  position: THREE.Vector3;
  rotation: THREE.Euler;
  emissive: any;
  constructor(config) {
    let settings: any = { cell: null, geometry: null, material: null };
    settings = merge(settings, config);
    if (!settings.cell || !settings.geometry) {
      throw new Error('Missing Tile configuration');
    }

    this.cell = settings.cell;
    if (this.cell.tile && this.cell.tile !== this) {
      this.cell.tile.dispose();
    }
    this.cell.tile = this;

    this.uniqueId = generateID();
    this.geometry = settings.geometry;
    this.material = settings.material;
    if (!this.material) {
      this.material = new THREE.MeshPhongMaterial({
        color: randomizeRGB('30, 30, 30', 13)
      });
    }
    this.objectType = TILE;
    this.entity = null;
    this.userData = {};
    this.selected = false;
    this.highlight = '0x0084cc';

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.userData.structure = this;

    this.position = this.mesh.position;
    this.rotation = this.mesh.rotation;

    this.rotation.x = -90 * DEG_TO_RAD;
    this.mesh.scale.set(settings.scale, settings.scalar, 1);

    if (this.material.emissive) {
      this.emissive = this.material.emissive.getHex();
    } else {
      this.emissive = null;
    }
  }

  select() {
    if (this.material.emissive) {
      this.material.emissive.setHex(this.highlight);
    }
    this.selected = true;
    return this;
  }
  deselect() {
    if (this.emissive !== null && this.material.emissive) {
      this.material.emissive.setHex(this.emissive);
    }
    this.selected = false;
    return this;
  }

  toggle() {
    if (this.selected) {
      this.deselect();
    } else {
      this.select();
    }
    return this;
  }

  dispose() {
    if (this.cell && this.cell.tile) {
      this.cell.tile = null;
    }
    this.cell = null;
    this.position = null;
    this.rotation = null;
    if (this.mesh.parent) {
      this.mesh.parent.remove(this.mesh);
    }
    this.mesh.userData.structure = null;
    this.mesh = null;
    this.material = null;
    this.userData = null;
    this.entity = null;
    this.geometry = null;
    this.emissive = null;
  }
}
