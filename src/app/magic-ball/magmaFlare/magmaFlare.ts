import * as THREE from 'three';
import Magma from './magma';
import Aura from './aura';
import InGlow from './inglow';
import FlareEmitter from './flareemitter';
import SparkEmitter from './sparkemitter';
import OutGlow from './outglow';

export default class MagmaFlare extends THREE.Object3D {
  private _magama: Magma;
  private _aura: Aura;
  private _inglow: InGlow;
  private _flareemitter: FlareEmitter;
  private _sparkemitter: SparkEmitter;
  private _outglow: OutGlow;

  constructor() {
    super();

    this._magama = new Magma();
    this._aura = new Aura();
    this._inglow = new InGlow();
    this._flareemitter = new FlareEmitter();
    this._sparkemitter = new SparkEmitter();
    this._outglow = new OutGlow();

    this.add(this._magama);
    this.add(this._aura);
    this.add(this._inglow);
    this.add(this._flareemitter);
    this.add(this._sparkemitter);
    this.add(this._outglow);
  }

  public update() {
    this._magama.update();
    this._aura.update();
    this._flareemitter.update();
    this._sparkemitter.update();
  }
}
