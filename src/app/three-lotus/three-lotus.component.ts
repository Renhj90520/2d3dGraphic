import { Component, OnInit, ElementRef } from "@angular/core";
import * as THREE from "three";
@Component({
  selector: "app-three-lotus",
  templateUrl: "./three-lotus.component.html",
  styleUrls: ["./three-lotus.component.css"]
})
export class ThreeLotusComponent implements OnInit {
  scene;
  camera;
  renderer;
  PETALS_NUM = 15;
  lotus;
  petals = [];
  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.initThree();
    this.addlotus();
    this.update();
  }

  initThree() {
    const width = this.el.nativeElement.clientWidth;
    const height = this.el.nativeElement.clientHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
    this.camera.position.z = 300;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.physicallyBasedShading = true;
    this.renderer.setClearColor(0xcccccc, 1);
    this.renderer.setSize(width, height);

    this.el.nativeElement.appendChild(this.renderer.domElement);
  }

  addlotus() {
    this.lotus = new THREE.Object3D();

    this.scene.add(this.lotus);

    const radius = 40;
    const segments = 32;
    const geometry = new THREE.CircleGeometry(radius, segments);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(20, 0, 0));

    const texture = new THREE.Texture(this.generateTexture());
    texture.needsUpdate = true;

    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      side: THREE.DoubleSide,
      blending: THREE.NormalBlending,
      fog: true
    });

    for (let i = 0; i < this.PETALS_NUM; i++) {
      const petal = new THREE.Mesh(geometry, material);
      petal.rotation.y = (i * 360) / this.PETALS_NUM;

      this.petals.push(petal);
      this.lotus.add(petal);
    }
  }

  generateTexture() {
    const size = 150;

    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createRadialGradient(
      size / 2,
      size,
      0.0,
      size / 2,
      size / 2,
      size / 2
    );

    gradient.addColorStop(0.0, "rgba(0,0,0,1.000)");
    gradient.addColorStop(0.7, "rgba(0,0,0,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    return canvas;
  }

  update() {
    this.renderer.render(this.scene, this.camera);

    this.rotateAroundWorldAxis(
      this.lotus,
      new THREE.Vector3(0, 1, 0),
      Math.PI / 180 / 2
    );

    requestAnimationFrame(this.update.bind(this));
  }

  rotateAroundWorldAxis(object, axis, radians) {
    const rotWorldMatrix = new THREE.Matrix4();
    rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);
    rotWorldMatrix.multiply(object.matrix);
    object.matrix = rotWorldMatrix;
    object.rotation.setFromRotationMatrix(object.matrix);
  }
}
