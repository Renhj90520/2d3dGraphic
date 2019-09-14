import { Component, OnInit, ElementRef } from "@angular/core";
import * as THREE from "three";

@Component({
  selector: "app-three-sprite-sphere",
  templateUrl: "./three-sprite-sphere.component.html",
  styleUrls: ["./three-sprite-sphere.component.css"]
})
export class ThreeSpriteSphereComponent implements OnInit {
  scene;
  renderer;
  camera;
  SEPARATION = 200;
  AMOUNTX = 20;
  AMOUNTY = 6;

  particles = [];
  count = 0;
  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.initThree();
    this.addSphere();
    this.update();
  }

  initThree() {
    const width = this.el.nativeElement.clientWidth;
    const height = this.el.nativeElement.clientHeight;
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, width / height, 1, 10000);
    this.camera.position.z = 1000;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(width, height);
    this.el.nativeElement.appendChild(this.renderer.domElement);
  }

  addSphere() {
    const PI2 = Math.PI * 2;

    const canvas = document.createElement("canvas");
    canvas.width = 2;
    canvas.height = 2;
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(0, 0, 1, 0, PI2, true);
    ctx.fillStyle = "#fff";
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({
      color: 0xffffff,
      map: texture
    });
    let particle;
    for (let i = 0; i < 600; i++) {
      particle = new THREE.Sprite(material);
      particle.position.x = Math.random() * 2 - 1;
      particle.position.y = Math.random() * 2 - 1;
      particle.position.z = Math.random() * 2 - 1;
      particle.position.normalize();
      particle.position.multiplyScalar(Math.random() * 10 + 500);
      particle.scale.multiplyScalar(3);
      this.particles.push(particle);
      this.scene.add(particle);
    }

    //lines
    for (let i = 0; i < 600; i++) {
      const geometry = new THREE.Geometry();
      const vertex = new THREE.Vector3(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1
      );

      vertex.normalize();
      vertex.multiplyScalar(500);
      geometry.vertices.push(vertex);

      const vertex2 = vertex.clone();
      vertex2.multiplyScalar(Math.random() * 0.2 + 1);
      geometry.vertices.push(vertex2);
      const line = new THREE.Line(
        geometry,
        new THREE.LineBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: Math.random()
        })
      );
      this.scene.add(line);
    }
  }

  update() {
    this.renderer.render(this.scene, this.camera);

    this.camera.rotation.x += 0.5;
    this.camera.rotation.y += 0.5;

    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    for (let i = 0; i < this.particles.length; i++) {
      const particle = this.particles[i];
      particle.position.normalize();
      particle.position.multiplyScalar(
        Math.sin((i + this.count) * 0.3) * 10 + 500
      );
      particle.scale.x = particle.scale.y =
        (Math.sin(i + this.count) * 0.3 + 1) * 4 +
        (Math.sin(i + this.count) * 0.5 + 1) * 4;
    }
    this.count += 0.1;
    requestAnimationFrame(this.update.bind(this));
  }
}
