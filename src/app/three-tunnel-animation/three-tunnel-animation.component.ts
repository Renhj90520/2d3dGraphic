import { Component, OnInit, ElementRef } from "@angular/core";
import * as THREE from "three";
@Component({
  selector: "app-three-tunnel-animation",
  templateUrl: "./three-tunnel-animation.component.html",
  styleUrls: ["./three-tunnel-animation.component.css"]
})
export class ThreeTunnelAnimationComponent implements OnInit {
  scene;
  camera;
  renderer;
  points = [
    [18.1, 58.2],
    [93.6, 8.6],
    [145.3, 89.5],
    [75.9, 148],
    [81.7, 90.2],
    [18.1, 58.2]
  ];
  pointsVector = [];
  path;
  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.initThree();
    this.addTunnel();
    this.update();
  }
  initThree() {
    const width = this.el.nativeElement.clientWidth;
    const height = this.el.nativeElement.clientHeight;
    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.el.nativeElement.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.001, 1000);
    this.camera.position.z = 100;

    for (let i = 0; i < this.points.length; i++) {
      const point = this.points[i];
      const x = point[0];
      const y = 0;
      const z = point[1];
      this.pointsVector.push(new THREE.Vector3(x, y, z));
    }

    this.path = new THREE.CatmullRomCurve3(this.pointsVector);
  }

  addTunnel() {
    const colors = [0x8664d4, 0x3dc2cc, 0x4d86cc];
    let material;
    for (let i = 0; i < colors.length; i++) {
      const color = colors[i];
      const innergeo = new THREE.TubeBufferGeometry(
        this.path,
        100,
        i * 2 + 4,
        10,
        true
      );
      material = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        wireframe: true,
        opacity: (1 - i / 5) * 0.5 + 0.1
      });

      const tube = new THREE.Mesh(innergeo, material);
      this.scene.add(tube);
    }

    const geometry = new THREE.TubeGeometry(this.path, 1, 2, 20, true);
    const tube = new THREE.Mesh(geometry, material);
    this.scene.add(tube);
  }
  percentage = 0;
  update() {
    this.renderer.render(this.scene, this.camera);
    this.percentage += 0.001;
    const p1 = this.path.getPointAt(this.percentage % 1);
    const p2 = this.path.getPointAt((this.percentage + 0.01) % 1);

    this.camera.position.set(p1.x, p1.y, p1.z);
    this.camera.lookAt(p2);
    requestAnimationFrame(this.update.bind(this));
  }
}
