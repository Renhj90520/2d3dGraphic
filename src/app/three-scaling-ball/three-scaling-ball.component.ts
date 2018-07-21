import { Component, OnInit, ElementRef } from "@angular/core";
import * as THREE from "three";
import Utils from "./utils";
import Mover from "./mover";
@Component({
  selector: "app-three-scaling-ball",
  templateUrl: "./three-scaling-ball.component.html",
  styleUrls: ["./three-scaling-ball.component.css"]
})
export class ThreeScalingBallComponent implements OnInit {
  scene;
  camera;
  renderer;
  points;
  movers = [];
  constructor(private el: ElementRef) {}
  initThree() {
    const width = this.el.nativeElement.clientWidth;
    const height = this.el.nativeElement.clientHeight;
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.el.nativeElement.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(35, width / height, 1, 10000);
    this.camera.up.set(0, 1, 0);
    const rad1 = Utils.getRadian(30);
    const rad2 = Utils.getRadian(30);
    const range = 1000;

    const points = Utils.getSpherical(rad1, rad2, range);
    this.camera.position.set(points[0], points[1], points[2]);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
  }
  initPoints() {
    const geometry = new THREE.Geometry();
    const material = new THREE.PointsMaterial({
      color: 0x116644,
      size: 10,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthTest: false
    });
    for (let k = 0; k < 120; k++) {
      for (let j = 0; j < 120; j++) {
        const rad1 = Utils.getRadian(k * 3);
        const rad2 = Utils.getRadian(j * 3);
        const mover = new Mover(rad1, rad2);
        this.movers.push(mover);
        geometry.vertices.push(mover.position);
      }
    }

    this.points = new THREE.Points(geometry, material);
    this.scene.add(this.points);
  }

  points_range_rad = 0;

  updatePoints() {
    const points_vertices = [];
    this.points_range_rad -= Utils.getRadian(2);
    this.movers.forEach(m => {
      m.range = Math.sin(this.points_range_rad) * 100 + 150;
      m.move();
      points_vertices.push(m.position);
    });
    this.points.geometry.vertices = points_vertices;
    this.points.geometry.verticesNeedUpdate = true;
  }
  update() {
    this.renderer.clear();
    this.updatePoints();
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => {
      this.update();
    });
  }

  ngOnInit() {
    this.initThree();
    this.initPoints();
    this.update();
  }
}
