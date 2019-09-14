import { Component, OnInit, ElementRef } from '@angular/core';
import * as THREE from 'three';
import { LegacyJSONLoader } from 'three/examples/jsm/loaders/deprecated/LegacyJSONLoader';
@Component({
  selector: 'app-three-airplane-colored',
  templateUrl: './three-airplane-colored.component.html',
  styleUrls: ['./three-airplane-colored.component.css']
})
export class ThreeAirplaneColoredComponent implements OnInit {
  scene;
  camera;
  renderer;
  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.initThree();
    this.addLights();
    this.addFloor();
    this.addPlane();
    this.update();
  }

  initThree() {
    const width = this.el.nativeElement.clientWidth;
    const height = this.el.nativeElement.clientHeight;

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0x2e2e2e, 2, 10);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setClearColor(0x151515, 1);
    this.renderer.setSize(width, height);
    this.el.nativeElement.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    this.camera.position.set(0, 1, 5);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    const grid: any = new THREE.GridHelper(10, 10);
    grid.material.color = new THREE.Color(0x00ff00);
    this.scene.add(grid);
  }

  addLights() {
    const light1 = new THREE.DirectionalLight(0xffffff, 1);
    light1.position.set(1, 3, 2).normalize();
    this.scene.add(light1);

    const light2 = new THREE.DirectionalLight(0xffffff, 1);
    light2.position.set(-1, -3, -2).normalize();
    this.scene.add(light2);
  }

  addPlane() {
    const loader = new LegacyJSONLoader();
    loader.load('assets/delta.js', result => {
      const geo = result.geometry;
      const material = new THREE.MeshLambertMaterial({
        vertexColors: THREE.FaceColors
      });

      const plane = new THREE.Mesh(geo, material);
      plane.scale.set(0.05, 0.05, 0.05);
      plane.position.set(0, 0, 0);
      plane.receiveShadow = true;
      plane.castShadow = true;
      plane.rotateY(-Math.PI / 2);
      this.scene.add(plane);
    });
  }

  addFloor() {
    const geometry = new THREE.BoxGeometry(20, 0.2, 20, 100, 2, 100);
    const material = new THREE.MeshBasicMaterial({
      wireframe: false,
      color: 'gray'
    });

    const box = new THREE.Mesh(geometry, material);
    for (let i = 0; i < geometry.vertices.length; i++) {
      const vertex = geometry.vertices[i];
      if (vertex.y > 0 && Math.random() > 0.25) {
        vertex.y = Math.floor(Math.random() * 0.5);
      }
    }
    this.scene.add(box);
  }
  update() {
    this.renderer.render(this.scene, this.camera);

    requestAnimationFrame(this.update.bind(this));
  }
}
