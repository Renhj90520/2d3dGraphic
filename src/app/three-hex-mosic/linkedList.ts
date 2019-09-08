import { ThrowStmt } from "@angular/compiler";

export default class LinkedList {
  first;
  last;
  length = 0;
  objToNodeMap = {};
  uniqueId = Date.now() + "" + Math.floor(1e3 * Math.random());
  sortArray = [];

  generateID() {
    return (
      Math.random()
        .toString(36)
        .slice(2) + Date.now()
    );
  }

  getNode(e) {
    return this.objToNodeMap[e.uniqueId];
  }

  addNode(i) {
    const node = new Node();
    if (!i.uniqueId) {
      i.uniqueId = this.generateID();
    }

    node.obj = i;
    node.free = false;
    this.objToNodeMap[i.uniqueId] = node;

    return node;
  }
  swapObjects(e, t) {
    this.objToNodeMap[e.obj.uniqueId] = null;
    this.objToNodeMap[t.uniqueId] = e;
    e.obj = t;
  }
  add(e) {
    let t = this.objToNodeMap[e.uniqueId];
    if (t) {
      if (!t.free) return;
      t.obj = e;
      t.free = false;
      t.next = null;
      t.prev = null;
    } else {
      t = this.addNode(e);
    }

    if (this.first) {
      {
        if (!this.last) {
          throw new Error(
            "[LinkedList.add] No last in the list -- that shouldn't happen here"
          );
        }
        this.last.next = t;
        t.prev = this.last;
        this.last = t;
        t.next = null;
      }
    } else {
      this.first = t;
      this.last = t;
      t.next = null;
      t.prev = null;
    }
    this.length++;
  }
  has(e) {
    return !!this.objToNodeMap[e.uniqueId];
  }
  moveUp(e) {
    const t = this.getNode(e);
    if (!t) {
      throw "Oops, trying to move an object that isn't in the list";
    }
    if (t.prev) {
      const i = t.prev;
      const s = i.prev;
      t == this.last && (this.last = i);
      const n = t.next;
      s && (s.next = t);
      t.next = i;
      t.prev = i.prev;
      i.next = n;
      i.prev = t;
      this.first == i && (this.first = t);
    }
  }

  moveDown(e) {
    const t = this.getNode(e);
    if (!t) throw "Oops, trying to move an object that isn't in the list";

    if (t.next) {
      const i = t.next;
      this.moveUp(i.obj);
      this.last == i && (this.last = t);
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
