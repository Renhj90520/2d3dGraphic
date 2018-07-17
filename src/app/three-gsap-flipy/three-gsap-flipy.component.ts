import { Component, OnInit, ElementRef } from "@angular/core";
import { dataset } from "./dataset";
import * as THREE from "three";
import { TweenMax, Elastic } from "gsap";
@Component({
  selector: "app-three-gsap-flipy",
  templateUrl: "./three-gsap-flipy.component.html",
  styleUrls: ["./three-gsap-flipy.component.css"]
})
export class ThreeGsapFlipyComponent implements OnInit {
  scene;
  renderer;
  camera;

  CUBE_SIZE = 20;
  GRID = 16;
  TOTAL_CUBES = this.GRID * this.GRID;
  WALL_SIZE = this.GRID * this.CUBE_SIZE;
  HALF_WALL_SIZE = this.WALL_SIZE / 2;
  MAIN_COLOR = 0xffffff;
  cubes = [];
  constructor(private el: ElementRef) {}

  initTHREE() {
    const width = this.el.nativeElement.clientWidth;
    const height = this.el.nativeElement.clientHeight;
    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.el.nativeElement.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
    this.camera.position.set(0, 0, 400);

    const axesHelper = new THREE.AxesHelper(1000000);
    this.scene.add(axesHelper);
  }

  update() {
    this.renderer.render(this.scene, this.camera);
  }
  initCubes() {
    let col = 0;
    let row = 0;
    const group = new THREE.Object3D();
    const minDuration = 3;
    const maxDuration = 6;
    const minDelay = 0.5;
    const maxDelay = 6;
    const attrOption = ["x", "y"];
    this.addLight(group);
    for (let i = 0; i < this.TOTAL_CUBES; i++) {
      const color = this.getRgbColor(dataset[i]);
      const geometry = new THREE.BoxGeometry(
        this.CUBE_SIZE * 0.9,
        this.CUBE_SIZE * 0.9,
        1
      );

      const material = new THREE.MeshLambertMaterial({ color });
      const mesh = new THREE.Mesh(geometry, material);
      this.cubes.push(mesh);
      if (i % this.GRID === 0) {
        col = 1;
        row++;
      } else {
        col++;
      }

      const x = -(
        (this.GRID * this.CUBE_SIZE) / 2 -
        this.CUBE_SIZE * col +
        this.CUBE_SIZE / 2
      );
      const y =
        (this.GRID * this.CUBE_SIZE) / 2 -
        this.CUBE_SIZE * row +
        this.CUBE_SIZE / 2;

      mesh.position.set(x, y, 0);
      group.position.y = 50;
      group.rotation.set((-60 * Math.PI) / 180, 0, (-45 * Math.PI) / 180);
      group.add(mesh);
      const attr = attrOption[Math.floor(Math.random() * attrOption.length)];
      const direction = Math.random() < 0.5 ? -Math.PI : Math.PI;
      const config = {
        ease: Elastic.easeOut,
        delay: this.randomRange(minDelay, maxDelay),
        repeat: -1
      };
      config[attr] = direction;
      TweenMax.to(
        mesh.rotation,
        this.randomRange(minDuration, maxDuration),
        config
      );
    }

    this.scene.add(group);
  }

  addLight(group) {
    const light = new THREE.DirectionalLight(this.MAIN_COLOR, 1.25);
    const softlight = new THREE.DirectionalLight(this.MAIN_COLOR, 1.5);
    light.position.set(
      -this.WALL_SIZE,
      -this.WALL_SIZE,
      this.CUBE_SIZE * this.GRID
    );
    softlight.position.set(
      this.WALL_SIZE,
      this.WALL_SIZE,
      this.CUBE_SIZE * this.GRID
    );
    group.add(light);
    group.add(softlight);
  }

  ngOnInit() {
    this.initTHREE();
    this.initCubes();
    TweenMax.ticker.addEventListener("tick", this.update.bind(this));
  }

  getRgbColor(colorType) {
    var colorHash = {
      BK: 0xdcaa6b, // black
      WH: 0xffffff, // white
      BG: 0xffcccc, // beige
      BR: 0x800000, // brown
      RD: 0xff0000, // red
      YL: 0xffff00, // yellow
      GN: 0x00ff00, // green
      WT: 0x00ffff, // water
      BL: 0x0000ff, // blue
      PR: 0x800080 // purple
    };
    return colorHash[colorType];
  }
  randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
