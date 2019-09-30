import { ThrowStmt } from '@angular/compiler';

export default class LinkedList {
  first;
  last;
  length = 0;
  objToNodeMap = {};
  uniqueId = Date.now() + '' + Math.floor(1e3 * Math.random());
  sortArray = [];

  static generateID() {
    return (
      Math.random()
        .toString(36)
        .slice(2) + Date.now()
    );
  }

  getNode(obj) {
    return this.objToNodeMap[obj.uniqueId];
  }

  addNode(obj) {
    const node = new Node();
    if (!obj.uniqueId) {
      obj.uniqueId = LinkedList.generateID();
    }

    node.obj = obj;
    node.free = false;
    this.objToNodeMap[obj.uniqueId] = node;

    return node;
  }
  swapObjects(node, newObj) {
    this.objToNodeMap[node.obj.uniqueId] = null;
    this.objToNodeMap[newObj.uniqueId] = node;
    node.obj = newObj;
  }
  add(obj) {
    let node = this.objToNodeMap[obj.uniqueId];
    if (node) {
      if (!node.free) return;
      node.obj = obj;
      node.free = false;
      node.next = null;
      node.prev = null;
    } else {
      node = this.addNode(obj);
    }

    if (this.first) {
      {
        if (!this.last) {
          throw new Error(
            "[LinkedList.add] No last in the list -- that shouldn't happen here"
          );
        }
        this.last.next = node;
        node.prev = this.last;
        this.last = node;
        node.next = null;
      }
    } else {
      this.first = node;
      this.last = node;
      node.next = null;
      node.prev = null;
    }
    this.length++;
  }
  has(obj) {
    return !!this.objToNodeMap[obj.uniqueId];
  }
  moveUp(obj) {
    const node = this.getNode(obj);
    if (!node) {
      throw "Oops, trying to move an object that isn't in the list";
    }
    if (node.prev) {
      const i = node.prev;
      const s = i.prev;
      node == this.last && (this.last = i);
      const n = node.next;
      s && (s.next = node);
      node.next = i;
      node.prev = i.prev;
      i.next = n;
      i.prev = node;
      this.first == i && (this.first = node);
    }
  }

  moveDown(obj) {
    const node = this.getNode(obj);
    if (!node) throw "Oops, trying to move an object that isn't in the list";

    if (node.next) {
      const i = node.next;
      this.moveUp(i.obj);
      this.last == i && (this.last = node);
    }
  }
  sort(e) {
    let t,
      i,
      s = this.sortArray,
      n = this.first;
    for (s.length = 0; n; ) {
      s.push(n.obj);
      n = n.next;
    }
    for (this.clear(), s.sort(e), i = s.length, t = 0; i > t; t++) {
      this.add(s[t]);
    }
  }

  remove(e) {
    const t = this.getNode(e);
    if (!t || t.free) {
      return false;
    } else {
      t.prev && (t.prev.next = t.next);
      t.next && (t.next.prev = t.prev);
      t.prev || (this.first = t.next);
      t.next || (this.last = t.prev);
      t.free = true;
      t.prev = null;
      t.next = null;
      this.length--;
      return true;
    }
  }

  shift() {
    const e = this.first;
    if (this.length === 0) {
      return null;
    } else {
      e.prev && (e.prev.next = e.next);
      e.next && (e.next.prev = e.prev);
      this.first = e.next;
      e.next || (this.last = null);
      e.free = true;
      e.prev = null;
      e.next = null;
      this.length--;
      return e.obj;
    }
  }

  pop() {
    const e = this.last;
    if (this.length === 0) {
      return null;
    } else {
      e.prev && (e.prev.next = e.next);
      e.next && (e.next.prev = e.prev);
      this.last = e.prev;
      e.prev || (this.first = null);
      e.free = true;
      e.prev = null;
      e.next = null;
      this.length--;
      return e.obj;
    }
  }

  concat(e) {
    for (let t = e.first; t; ) {
      this.add(t.obj);
      t = t.next;
    }
  }

  clear() {
    for (let e = this.first; e; ) {
      e.free = false;
      e = e.next;
    }

    this.first = null;
    this.length = 0;
  }

  dispose() {
    for (let e = this.first; e; ) {
      e.obj = null;
      e = e.next;
    }
    this.first = null;
    this.objToNodeMap = null;
  }
}

class Node {
  obj;
  next;
  prev;
  free = false;
}
