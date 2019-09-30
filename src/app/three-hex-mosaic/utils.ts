export function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

export function sign(val) {
  return val && val / Math.abs(val);
}

export function random(min?, max?) {
  if (arguments.length === 1) {
    return Math.random() * min - min * 0.5;
  }
  return Math.random() * (max - min) + min;
}

export function randomInt(min?, max?) {
  if (arguments.length === 1) {
    return (Math.random() * min - min * 0.5) | 0;
  }

  return (Math.random() * (max - min + 1) + min) | 0;
}

export function normalize(v, min, max) {
  return (v - min) / (max - min);
}

export function getShortRotation(angle) {
  angle % (Math.PI * 2);
  if (angle > Math.PI) {
    angle -= Math.PI * 2;
  } else if (angle < -Math.PI) {
    angle += Math.PI * 2;
  }
  return angle;
}

export function generateID() {
  return (
    Math.random()
      .toString(36)
      .slice(2) + Date.now()
  );
}

export function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj.nodeType || obj === obj.window) {
    return false;
  }

  try {
    if (
      obj.constructor &&
      !Object.prototype.hasOwnProperty.call(
        obj.constructor.prototype,
        'isPrototypeOf'
      )
    ) {
      return false;
    }
  } catch (err) {
    return false;
  }
  return true;
}

export function merge(target, src) {
  const array = Array.isArray(src);
  let dst: any = (array && []) || {};
  if (array) {
    target = target || [];
    dst = dst.concat(target);
    src.forEach((e, i) => {
      if (typeof dst[i] === 'undefined') {
        dst[i] = e;
      } else if (isPlainObject(e)) {
        dst[i] = merge(target[i], e);
      } else {
        if (target.indexOf(e) === -1) {
          dst.push(e);
        }
      }
    });
    return dst;
  }
  if (target && isPlainObject(target)) {
    Object.keys(target).forEach(key => {
      dst[key] = target[key];
    });
  }

  Object.keys(src).forEach(key => {
    if (!src[key] || !isPlainObject(src[key])) {
      dst[key] = src[key];
    } else {
      if (!target[key]) {
        dst[key] = src[key];
      } else {
        dst[key] = merge(target[key], src[key]);
      }
    }
  });
  return dst;
}

export function now() {
  return window.performance.now();
}

export function empty(node) {
  while (node.lastChild) {
    node.removeChild(node.lastChild);
  }
}

export function radixSort(arr, idxBegin = 0, idxEnd?, bit = 31) {
  idxEnd = idxEnd || arr.length;
  if (idxBegin >= idxEnd - 1 || bit < 0) {
    return;
  }

  let idx = idxBegin;
  let idxOnes = idxEnd;
  const mask = 0x1 << bit;
  while (idx < idxOnes) {
    if (arr[idx] & mask) {
      --idxOnes;
      let tmp = arr[idx];
      arr[idx] = arr[idxOnes];
      arr[idxOnes] = tmp;
    } else {
      ++idx;
    }
  }
  radixSort(arr, idxBegin, idxOnes, bit - 1);
  radixSort(arr, idxOnes, idxEnd, bit - 1);
}

export function randomizeRGB(base, range) {
  const rgb = base.split(',');
  let color = 'rgb(';
  range = randomInt(range);
  for (let i = 0; i < 3; i++) {
    let c = parseInt(rgb[i]) + range;
    if (c < 0) {
      c = 0;
    } else if (c > 255) {
      c = 255;
    }
    color += c + ',';
  }

  color = color.substring(0, color.length - 1);
  color += ')';
  return color;
}
