import { Component, OnInit, ElementRef } from "@angular/core";
import * as THREE from "three";
import KaleidoShader from "./KaleidoShader";

@Component({
  selector: "app-three-kaleidoscope",
  templateUrl: "./three-kaleidoscope.component.html",
  styleUrls: ["./three-kaleidoscope.component.css"]
})
export class ThreeKaleidoscopeComponent implements OnInit {
  scene;
  camera;
  renderer;
  size = 2;
  num = 20;
  boundaries = 20;
  group = new THREE.Object3D();
  width;
  height;
  // composer;

  constructor(private el: ElementRef) {}

  initTHREE() {
    this.width = this.el.nativeElement.clientWidth;
    this.height = this.el.nativeElement.clientHeight;
    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.width, this.height);

    this.el.nativeElement.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    this.camera.position.set(0, 0, 40);
  }

  initGroup() {
    this.group = new THREE.Object3D();
    const geometry = new THREE.IcosahedronGeometry(this.size, 0);
    const material = new THREE.MeshNormalMaterial({ wireframe: false });

    for (let k = 0; k < this.num; k++) {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        THREE.Math.randInt(-this.boundaries, this.boundaries),
        THREE.Math.randInt(-this.boundaries, this.boundaries),
        THREE.Math.randInt(-this.boundaries, this.boundaries)
      );
      this.group.add(mesh);
    }
    this.scene.add(this.group);
  }
  addLight() {
    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 0, 250);
    this.scene.add(light);
  }
  initPostProcessing() {
    const renderTarget = new THREE.WebGLRenderTarget(this.width, this.height, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBFormat,
      stencilBuffer: false
    });
    // this.composer = new THREE.EffectComposer(this.renderer, renderTarget);
    // this.composer.addPass(new THREE.RenderPass(this.scene, this.camera));

    // const effect = new THREE.ShaderPass(new KaleidoShader());
  }
  update() {
    this.renderer.render(this.scene, this.camera);
    this.group.rotation.x += 0.01;
    this.group.rotation.y += 0.01;
    this.group.rotation.z += 0.01;
    requestAnimationFrame(() => {
      this.update();
    });
  }
  ngOnInit() {
    this.initTHREE();
    this.addLight();
    this.initGroup();
    this.update();
  }
}
