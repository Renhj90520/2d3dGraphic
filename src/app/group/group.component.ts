import { Component, OnInit, ElementRef } from '@angular/core';
import * as THREE from 'three';
import { PerspectiveCamera } from 'three';
import BallGroup from './ball-group';
@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  scene;
  camera;
  renderer;
  ballgroup;
  geometry;
  targetMesh;
  constructor(private el: ElementRef) {}
  setUpThree() {
    const width = this.el.nativeElement.clientWidth;
    const height = this.el.nativeElement.clientHeight;
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setClearColor(0x000000);
    this.renderer.setSize(width, height);
    this.el.nativeElement.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(30, width / height, 1, 10000);
    this.camera.position.z = 1000;
    this.camera.position.y = 200;
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    this.ballgroup = new BallGroup();
    this.scene.add(this.ballgroup);

    this.targetMesh = this.ballgroup.children[0];
    this.geometry = new THREE.Geometry();
    this.geometry.vertices.push(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 0)
    );
    const line = new THREE.Line(this.geometry, new THREE.LineBasicMaterial());
    this.scene.add(line);

    const axesHelper = new THREE.AxesHelper(300);
    this.scene.add(axesHelper);
    this.update();
  }

  update() {
    this.renderer.render(this.scene, this.camera);
    const world = new THREE.Vector3();
    this.targetMesh.getWorldPosition(world);
    this.geometry.vertices[0].copy(world);
    this.geometry.verticesNeedUpdate = true;

    this.ballgroup.update();
    requestAnimationFrame(() => {
      this.update();
    });
  }
  ngOnInit() {
    this.setUpThree();
  }
}
