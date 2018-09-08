import { Component, OnInit, ElementRef } from "@angular/core";
import * as THREE from "three";
@Component({
  selector: "app-three-airplane",
  templateUrl: "./three-airplane.component.html",
  styleUrls: ["./three-airplane.component.css"]
})
export class ThreeAirplaneComponent implements OnInit {
  scene;
  camera;
  renderer;
  plane;
  camPosIndex = 0;
  curve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(0, 0, 5),
    new THREE.Vector3(0, 10, -15),
    new THREE.Vector3(0, 0, -30)
  );
  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.initThree();
    this.addMap();
    this.addPlane();
    this.addLights();
    this.update();
  }

  initThree() {
    const width = this.el.nativeElement.clientWidth;
    const height = this.el.nativeElement.clientHeight;
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0x2e2e2e, 2, 10);
    this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    this.camera.position.x = -2;
    this.camera.position.y = 5;
    this.camera.position.z = -25;
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0x151515, 1);
    this.el.nativeElement.appendChild(this.renderer.domElement);

    const grid: any = new THREE.GridHelper(10, 10);
    grid.material.color = new THREE.Color(0x00ff00);
    this.scene.add(grid);
  }

  addLights() {
    const light1 = new THREE.DirectionalLight(0xefefff, 1.5);
    light1.position.set(1, 1, 1).normalize();
    this.scene.add(light1);

    const light2 = new THREE.DirectionalLight(0xffefef, 1.5);
    light2.position.set(-1, -1, -1).normalize();
    this.scene.add(light2);
  }

  addPlane() {
    const loader = new THREE.JSONLoader();
    loader.load("assets/delta.js", (geo, mat) => {
      const material = new THREE.MeshPhongMaterial({
        color: 0xefefff,
        specular: 0x050505,
        shininess: 100
      });

      this.plane = new THREE.Mesh(geo, material);
      this.plane.receiveShadow = true;
      this.plane.castShadow = true;
      this.plane.rotateY(Math.PI);
      this.plane.position.x = 5;
      this.plane.position.y = 0;
      this.plane.position.z = 0;

      this.plane.scale.x = 0.25;
      this.plane.scale.y = 0.25;
      this.plane.scale.z = 0.25;
      this.scene.add(this.plane);
    });
  }
  addMap() {
    const loader = new THREE.JSONLoader();
    loader.load("assets/map.js", (geo, mat) => {
      const material = new THREE.MeshBasicMaterial({
        color: 0xff00ff,
        side: THREE.BackSide,
        wireframe: true
      });

      const map = new THREE.Mesh(geo, material);
      map.scale.set(0.025, 0.025, 0.025);
      map.receiveShadow = true;
      map.castShadow = true;
      map.rotateY(-Math.PI / 2);
      this.scene.add(map);
    });
  }

  update() {
    this.renderer.render(this.scene, this.camera);

    this.camPosIndex++;
    if (this.camPosIndex > 500) {
      this.camPosIndex = 0;
    }

    const camPos = this.curve.getPoint(this.camPosIndex / 500);
    if (this.plane) {
      this.plane.position.set(camPos.x, camPos.y, camPos.z);
    }
    this.camera.lookAt(this.curve.getPoint((this.camPosIndex + 1) / 500));

    requestAnimationFrame(this.update.bind(this));
  }
}
