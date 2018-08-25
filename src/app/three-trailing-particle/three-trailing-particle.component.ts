import { Component, OnInit, ElementRef } from "@angular/core";
import * as THREE from "three";

@Component({
  selector: "app-three-trailing-particle",
  templateUrl: "./three-trailing-particle.component.html",
  styleUrls: ["./three-trailing-particle.component.css"]
})
export class ThreeTrailingParticleComponent implements OnInit {
  scene;
  camera;
  renderer;

  particleCount = 256 * 4;
  particleSystem;
  sceneMousePosition = new THREE.Vector3(0, 0, 0);
  width;
  height;
  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.initThree();
    this.createParticleSystem();
    this.el.nativeElement.addEventListener(
      "mousemove",
      this.pointerMove.bind(this)
    );
    this.update();
  }

  initThree() {
    this.width = this.el.nativeElement.clientWidth;
    this.height = this.el.nativeElement.clientHeight;
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(0x111111);
    this.el.nativeElement.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      70,
      this.width / this.height,
      1,
      1000
    );
    this.camera.position.z = 100;
  }

  createParticleSystem() {
    const particles = new THREE.Geometry();
    for (let i = 0; i < this.particleCount; i++) {
      const coords = this.randomPoint(0, 0, 0, 16 + Math.random() * 12);
      const particle: any = new THREE.Vector3(coords[0], coords[1], coords[2]);

      const x = Math.random();
      const y = (1 - x) * Math.random();
      const z = 1 - x - y;

      particle.axis = new THREE.Vector3(x, y, z);
      particle.angle = (Math.PI / 2) * (0.004 + Math.random() * 0.01);
      particle.spherePosition = new THREE.Vector3(
        coords[0],
        coords[1],
        coords[2]
      );
      particle.lerpSpeed = 0.02 + Math.random() * 0.18;
      particles.vertices.push(particle);
    }

    const loader = new THREE.TextureLoader();
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 4,
      map: loader.load("assets/images/particle-test.png"),
      blending: THREE.AdditiveBlending,
      transparent: true,
      vertexColors: THREE.VertexColors,
      depthWrite: false
    });

    this.particleSystem = new THREE.Points(particles, particleMaterial);
    for (let i = 0; i < this.particleCount; i++) {
      const color = new THREE.Color(0xffffff);
      color.setHSL(i / 256, 0.5, 0.5);
      (<THREE.Geometry>this.particleSystem.geometry).colors[i] = color;
    }

    (<THREE.Geometry>this.particleSystem.geometry).verticesNeedUpdate = true;
    this.scene.add(this.particleSystem);
  }

  randomPoint(x0, y0, z0, radius) {
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    const x = x0 + radius * Math.sin(phi) * Math.cos(theta);
    const y = y0 + radius * Math.sin(phi) * Math.sin(theta);
    const z = z0 + radius * Math.cos(phi);
    return [x, y, z, u, v];
  }

  animateParticleSystem() {
    const verts = this.particleSystem.geometry.vertices;
    for (let i = 0; i < verts.length; i++) {
      const vert = verts[i];
      vert.spherePosition.applyAxisAngle(vert.axis, vert.angle);
      vert.x +=
        (this.sceneMousePosition.x + vert.spherePosition.x - vert.x) *
        vert.lerpSpeed;
      vert.y +=
        (this.sceneMousePosition.y + vert.spherePosition.y - vert.y) *
        vert.lerpSpeed;
      vert.z +=
        (this.sceneMousePosition.z + vert.spherePosition.z - vert.z) *
        vert.lerpSpeed;
    }
    this.particleSystem.geometry.verticesNeedUpdate = true;
  }
  update() {
    this.renderer.render(this.scene, this.camera);
    this.animateParticleSystem();
    requestAnimationFrame(this.update.bind(this));
  }

  pointerMove(e) {
    const pointerX = e.layerX;
    const pointerY = e.layerY;
    const vector = new THREE.Vector3();
    vector.set(
      (pointerX / this.width) * 2 - 1,
      (-pointerY / this.height) * 2 + 1,
      0.5
    );

    vector.unproject(this.camera);
    const dir = vector.sub(this.camera.position).normalize();
    const distance = -this.camera.position.z / dir.z;
    this.sceneMousePosition = this.camera.position
      .clone()
      .add(dir.multiplyScalar(distance));
  }
}
