import { Component, OnInit, ElementRef } from "@angular/core";
import * as THREE from "three";
import { HemisphereLightHelper } from "three";
import Land from "./land";
import Sun from "./sun";
import Sky from "./sky";
import Forest from "./forest";
import Airplane from "./airplane";
@Component({
  selector: "app-three-tiny-polyworld",
  templateUrl: "./three-tiny-polyworld.component.html",
  styleUrls: ["./three-tiny-polyworld.component.css"]
})
export class ThreeTinyPolyworldComponent implements OnInit {
  scene;
  camera;
  renderer;
  airplane;
  width;
  height;
  mousePos = { x: 0, y: 0 };
  land;
  sky;
  forest;
  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.initThree();
    this.addLights();
    this.addLand();
    this.addSun();
    this.addSky();
    this.addForest();
    this.addPlane();

    this.el.nativeElement.addEventListener("mousemove", e => {
      console.log(e);
      const tx = -1 + (e.layerX / this.width) * 2;
      const ty = 1 - (e.layerY / this.height) * 2;
      this.mousePos = { x: tx, y: ty };
    });
    this.update();
  }

  initThree() {
    this.width = this.el.nativeElement.clientWidth;
    this.height = this.el.nativeElement.clientHeight;

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);

    this.camera = new THREE.PerspectiveCamera(
      60,
      this.width / this.height,
      1,
      10000
    );
    this.camera.position.set(0, 150, 100);

    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setSize(this.width, this.height);
    this.renderer.shadowMap.enabled = true;

    this.el.nativeElement.appendChild(this.renderer.domElement);
  }
  addLights() {
    const hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9);
    const hemisphereLightyHelper = new THREE.HemisphereLightHelper(
      hemisphereLight,
      1000
    );

    this.scene.add(hemisphereLight);
    this.scene.add(hemisphereLightyHelper);

    const shadowLight = new THREE.DirectionalLight(0xffffff, 0.9);
    shadowLight.position.set(0, 350, 350);
    shadowLight.castShadow = true;

    shadowLight.shadow.camera.left = -650;
    shadowLight.shadow.camera.right = 650;
    shadowLight.shadow.camera.top = 650;
    shadowLight.shadow.camera.bottom = -650;
    shadowLight.shadow.camera.near = 1;
    shadowLight.shadow.camera.far = 1000;

    shadowLight.shadow.mapSize.width = 2048;
    shadowLight.shadow.mapSize.height = 2048;

    const shadowLightHelper = new THREE.DirectionalLightHelper(
      shadowLight,
      1300
    );
    this.scene.add(shadowLight);
    this.scene.add(shadowLightHelper);
  }

  addLand() {
    this.land = new Land();
    this.land.position.y = -600;
    this.scene.add(this.land);
  }

  addSun() {
    const sun = new Sun();
    sun.scale.set(1, 1, 0.3);
    sun.position.set(0, -30, -850);
    this.scene.add(sun);
  }

  addSky() {
    this.sky = new Sky();
    this.sky.position.y = -600;
    this.scene.add(this.sky);
  }

  addForest() {
    this.forest = new Forest();
    this.forest.position.y = -600;
    this.scene.add(this.forest);
  }

  addPlane() {
    this.airplane = new Airplane();
    this.airplane.scale.set(0.35, 0.35, 0.35);
    this.airplane.position.set(-40, 110, -250);
    this.scene.add(this.airplane);
  }
  updatePlane() {
    const targetY = this.normalize(this.mousePos.y, -0.75, 0.75, 50, 100);
    const targetX = this.normalize(this.mousePos.x, -0.75, 0.75, -100, -20);

    this.airplane.position.y += (targetY - this.airplane.position.y) * 0.1;
    this.airplane.position.x += (targetX - this.airplane.position.x) * 0.1;

    this.airplane.rotation.z = (targetY - this.airplane.position.y) * 0.0128;
    this.airplane.rotation.x = (this.airplane.position.y - targetY) * 0.0064;
    this.airplane.rotation.y = (this.airplane.position.x - targetX) * 0.0064;
    this.airplane.propeller.rotation.x += 0.3;
  }
  normalize(v, vmin, vmax, tmin, tmax) {
    const nv = Math.max(Math.min(v, vmax), vmin);
    const dv = vmax - vmin;
    const pc = (nv - vmin) / dv;
    const dt = tmax - tmin;
    const tv = tmin + pc * dt;
    return tv;
  }
  update() {
    this.renderer.render(this.scene, this.camera);
    this.airplane.update();
    this.updatePlane();
    this.land.rotation.z += 0.005;
    this.sky.rotation.z += 0.003;
    this.forest.rotation.z += 0.005;
    requestAnimationFrame(this.update.bind(this));
  }
}
