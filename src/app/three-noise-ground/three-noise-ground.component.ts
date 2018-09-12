import { Component, OnInit, ElementRef } from "@angular/core";
import * as THREE from "three";
import Terrain from "./terrain";
@Component({
  selector: "app-three-noise-ground",
  templateUrl: "./three-noise-ground.component.html",
  styleUrls: ["./three-noise-ground.component.css"]
})
export class ThreeNoiseGroundComponent implements OnInit {
  scene;
  camera;
  renderer;
  terrain;
  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.initThree();
    this.addLight();
    this.addTerrain();
    this.update();
  }

  initThree() {
    const width = this.el.nativeElement.clientWidth;
    const height = this.el.nativeElement.clientHeight;

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0x000, 0, 45);
    this.renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    this.renderer.setSize(width, height);
    this.el.nativeElement.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(65, width / height, 0.01, 1000);

    this.camera.position.y = 2;
    this.camera.position.z = 25;
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    const axesHelper = new THREE.AxesHelper(100);
    this.scene.add(axesHelper);
  }

  addLight() {
    const ambientLight = new THREE.AmbientLight(0x202020);
    this.scene.add(ambientLight);
    const light1 = new THREE.DirectionalLight(0xffffff, 5);
    light1.position.set(0.5, 0.0, 2);
    this.scene.add(light1);
    const light2 = new THREE.DirectionalLight(0xffffff, 0.75 * 2);
    light2.position.set(-0.5, -0.5, -2);
    this.scene.add(light2);
  }

  addTerrain() {
    const terrainClass = new Terrain();
    const heightMap = terrainClass.allocateHeightMap(256, 256);
    terrainClass.simplexHeightMap(heightMap);
    const geometry = terrainClass.heightMapToPlaneGeometry(heightMap);
    terrainClass.heightMapToVertexColor(heightMap, geometry);

    const material = new THREE.MeshBasicMaterial({
      wireframe: true
    });

    this.terrain = new THREE.Mesh(geometry, material);
    this.terrain.lookAt(new THREE.Vector3(0, 1, 0));
    this.terrain.scale.y = 3.5;
    this.terrain.scale.x = 3;
    this.terrain.scale.z = 0.2;
    this.terrain.scale.multiplyScalar(10);
    this.scene.add(this.terrain);
  }

  update() {
    this.renderer.render(this.scene, this.camera);

    this.terrain.rotation.z += 0.002;
    requestAnimationFrame(this.update.bind(this));
  }
}
