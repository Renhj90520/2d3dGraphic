import { Component, OnInit, ElementRef } from '@angular/core';
import * as THREE from 'three';
@Component({
  selector: 'app-three-hex-mosic',
  templateUrl: './three-hex-mosic.component.html',
  styleUrls: ['./three-hex-mosic.component.css']
})
export class ThreeHexMosicComponent implements OnInit {
  scene;
  camera;
  renderer;

  clock;
  mouse = new THREE.Vector2(0, 0);
  raycaster = new THREE.Raycaster();
  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.initThree();
    this.addLights();
    this.addMosic();
    this.update();
  }
  addMosic() {
    const scale = new THREE.Vector2(1, 1);
    const texture = new THREE.TextureLoader().load(
      '/assets/images/mosic_main.jpg',
      () => {}
    );
  }
  addLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff);
    this.scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1, 20);
    pointLight.position.set(0, 0, 0);
    this.scene.add(pointLight);
  }

  initThree() {
    const width = this.el.nativeElement.clientWidth;
    const height = this.el.nativeElement.clientHeight;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xffffff);

    this.camera = new THREE.PerspectiveCamera(45, 0, 0.1, 1000);
    this.camera.position.z = 10;
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0xffffff);
    this.renderer.setSize(width, height);
    this.el.nativeElement.appendChild(this.renderer.domElement);

    this.clock = new THREE.Clock();
  }
  update() {
    this.renderer.render(this.scene, this.camera);

    requestAnimationFrame(this.update.bind(this));
  }
}

class Utils {
  static groupByArray(xs, key) {
    return xs.reduce((rv, x) => {
      const v = key instanceof Function ? key(x) : x[key];
      const el = rv.find(r => r && r.key === v);
      if (el) {
        el.values.push(x);
      } else {
        rv.push({ key: v, values: [x] });
      }
      return rv;
    }, []);
  }

  static getSizeToCover(width, height, maxWidth, maxHeight) {
    const ratio = Math.max(maxWidth / width, maxHeight / height);
    return [width * ratio, height * ratio];
  }

  static visibleHeightAtZDepth(camera, depth = 0) {
    const cameraOffset = camera.position.z;
    if (depth < cameraOffset) {
      depth -= cameraOffset;
    } else {
      depth += cameraOffset;
    }

    const vFOV = (camera.fov * Math.PI) / 180;
    return 2 * Math.tan(vFOV / 2) * Math.abs(depth);
  }

  static visibleWidthAtZDepth(camera, depth = 0) {
    const height = this.visibleHeightAtZDepth(camera, depth);
    return height * camera.aspect;
  }
}

class Object3DResizer {
  camera: THREE.PerspectiveCamera;
  obj: any;
  scale: THREE.Vector2;

  constructor(camera, obj) {
    this.camera = camera;
    this.obj = obj;
    this.scale = new THREE.Vector2(1, 1);
    this.setSize(1, 1);
  }
  setSize(width, height) {
    this.scale.set(width, height);
    this.update();
  }
  update() {
    const w = Utils.visibleWidthAtZDepth(this.camera);
    const h = Utils.visibleHeightAtZDepth(this.camera);
  }
}
