import { Component, OnInit, ElementRef } from "@angular/core";
import * as THREE from "three";
import { TimelineMax, Bounce, Expo } from "gsap";

@Component({
  selector: "app-three-gsap-timescale",
  templateUrl: "./three-gsap-timescale.component.html",
  styleUrls: ["./three-gsap-timescale.component.css"]
})
export class ThreeGsapTimescaleComponent implements OnInit {
  scene;
  camera;
  renderer;
  cameraLookAtTarget = new THREE.Vector3();
  cameraPositionTarget = new THREE.Vector3();
  rot = 0;

  cubes = [];
  cubesNum = 100;

  timeline = new TimelineMax();
  constructor(private el: ElementRef) {}

  initTHREE() {
    const width = this.el.nativeElement.clientWidth;
    const height = this.el.nativeElement.clientHeight;
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 20000);
    this.camera.position.z = -1000;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setClearColor(0x0);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(width, height);

    this.el.nativeElement.appendChild(this.renderer.domElement);
  }
  initCubes() {
    const geometry = new THREE.BoxGeometry(30, 30, 30, 1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      wireframe: true
    });
    for (let k = 0; k < this.cubesNum; k++) {
      const mesh = new THREE.Mesh(geometry, material);
      // const wfh = new THREE.WireframeHelper(mesh, 0xff0000);
      mesh.position.x =
        100 * Math.round((2000 * (Math.random() - 0.5)) / 100) + 50;
      mesh.position.z =
        100 * Math.round((2000 * (Math.random() - 0.5)) / 100) + 50;
      mesh.updateMatrix();
      this.scene.add(mesh);
      this.cubes.push(mesh);
      const sec = 2 * Math.random() * +3;
      this.timeline.set(mesh.position, { y: 220 }, 0);
      this.timeline.to(
        mesh.position,
        sec,
        { y: -100, ease: Bounce.easeOut },
        0
      );
    }
    this.createTimeScale();
  }

  initTimeLine() {
    this.timeline.repeat(-1);
    this.timeline.set(this, { rot: 135 }, 0);
    this.timeline.to(this, 7, { rot: 0, ease: Expo.easeInOut }, 0);
    this.timeline.set(this.cameraPositionTarget, { y: -100 }, 0);
    this.timeline.to(
      this.cameraPositionTarget,
      6,
      {
        y: 100,
        ease: Expo.easeInOut
      },
      0
    );
  }

  createTimeScale() {
    const totalTimeline = new TimelineMax();
    totalTimeline
      .set(this.timeline, { timeScale: 1.5 })
      .to(this.timeline, 1.5, { timeScale: 0.08, ease: Expo.easeInOut }, "+=.8")
      .to(this.timeline, 1.5, { timeScale: 1.5, ease: Expo.easeInOut }, "+=5");
  }
  update() {
    this.onTick();
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.update.bind(this));
  }
  onTick() {
    this.camera.position.x = 1000 * Math.cos((this.rot * Math.PI) / 180);
    this.camera.position.z = 1000 * Math.sin((this.rot * Math.PI) / 180);
    this.camera.position.y = this.cameraLookAtTarget.y;
    this.camera.lookAt(this.cameraLookAtTarget);
  }
  ngOnInit() {
    this.initTHREE();
    this.initTimeLine();
    this.initCubes();
    this.update();
  }
}
