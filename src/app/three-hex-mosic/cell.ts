import LinkedList from './linkedList';

/**
 * Simple structure for holding grid coordinates and extra data about them.
 */
export default class Cell {
  q: number;
  r: number;
  s: number;
  h: number;

  tile = null; // optional link to the visual representance's class instance
  userData = {}; // populate with any extra data needed
  walkable = true; // if true, pathfinder will use as a through node

  // reset of these are used by the pathfinder and overwritten at runtime, so don't touch
  private _calcCost = 0;
  private _priority = 0;
  private _visited = false;
  private _parent = null;
  private uniqueId = LinkedList.generateID();
  /**
   *
   * @param q x grid coordinate (using different letters so that it won't be confused with pixel/world coordinates)
   * @param r y grid coordinate
   * @param s z grid coordinate
   * @param h 3D height of the cell, used by visual representation and pathfinder, cannot be less than 1
   */
  constructor(q = 0, r = 0, s = 0, h = 1) {
    this.q = q;
    this.r = r;
    this.s = s;
    this.h = h;
  }

  set(q, r, s) {
    this.q = q;
    this.r = r;
    this.s = s;
    return this;
  }

  copy(cell) {
    this.q = cell.q;
    this.r = cell.r;
    this.s = cell.s;
    this.h = cell.h;
    this.tile = cell.tile || null;
    this.userData = cell.userData || {};
    this.walkable = cell.walkable;
    return this;
  }

  add(cell) {
    this.q += cell.q;
    this.r += cell.r;
    this.s += cell.s;
    return this;
  }

  equals(cell) {
    return this.q === cell.q && this.r === cell.r && this.s === cell.s;
  }

  clearPath() {
    this._calcCost = 0;
    this._priority = 0;
    this._parent = null;
    this._visited = false;
  }
}
