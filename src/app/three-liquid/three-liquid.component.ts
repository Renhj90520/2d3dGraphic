import { Component, OnInit, ElementRef } from "@angular/core";
import * as THREE from "three";
import Ocean from "./ocean";
import Boat from "./boat";
@Component({
  selector: "app-three-liquid",
  templateUrl: "./three-liquid.component.html",
  styleUrls: ["./three-liquid.component.css"]
})
export class ThreeLiquidComponent implements OnInit {
  scene;
  camera;
  renderer;
  ocean;
  boatGroup = new THREE.Object3D();
  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.initTHREE();
    this.addOcean();
    this.addBoat();
    this.addLights();
    this.update();
  }

  initTHREE() {
    const width = this.el.nativeElement.clientWidth;
    const height = this.el.nativeElement.clientHeight;
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.renderer.shadowMap.enabled = true;
    this.el.nativeElement.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(20, width / height, 1, 1000);
    this.camera.position.set(0, 2, 10);
    this.scene.fog = new THREE.Fog(0x000000, 5, 20);
    this.scene.background = new THREE.Color(0x000000);

    const gridHelper = new THREE.GridHelper(20, 20);
    gridHelper.position.y = -1;
    this.scene.add(gridHelper);
  }

  addLights() {
    const ambientLights = new THREE.HemisphereLight(0xffd3d3, 0xf00589, 2);
    this.scene.add(ambientLights);

    const backlight = new THREE.PointLight(0xf00589, 1);
    backlight.position.set(-5, -20, -20);
    this.scene.add(backlight);

    const frontlight = new THREE.PointLight(0xf00589, 0.1);
    frontlight.position.set(0, 2, -2);
    this.scene.add(frontlight);
  }

  addOcean() {
    this.ocean = new Ocean();
    this.scene.add(this.ocean);
  }

  addBoat() {
    for (let i = 0; i < 5; i++) {
      const boat = new Boat();
      boat.movePosition(5);
      boat.sizeELement();
      this.boatGroup.add(boat);
    }
    this.scene.add(this.boatGroup);
  }

  update() {
    this.renderer.render(this.scene, this.camera);

    this.ocean.moveVertices();
    const time = Date.now() * 0.003;

    for (let i = 0; i < this.boatGroup.children.length; i++) {
      const boat: any = this.boatGroup.children[i];
      boat.rotation.z = (Math.sin(time / boat.vel) * boat.amp * Math.PI) / 180;
      boat.rotation.x = (Math.cos(time) * boat.vel * Math.PI) / 180;
      boat.position.y = Math.sin(time / boat.vel) * boat.pos;
    }
    this.scene.rotation.y += 0.001;
    requestAnimationFrame(this.update.bind(this));
  }
}
