import { Component, OnInit, ElementRef } from "@angular/core";
import * as THREE from "three";

@Component({
  selector: "app-three-buffergeometry",
  templateUrl: "./three-buffergeometry.component.html",
  styleUrls: ["./three-buffergeometry.component.css"]
})
export class ThreeBuffergeometryComponent implements OnInit {
  scene;
  camera;
  renderer;
  particlesData = [];
  particleCount = 800;
  maxParticleCount = 1000;
  r = 1000;
  halfR = this.r / 2;
  particlePositions;
  pointCloud;
  lineMesh;
  positions;
  colors;
  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.initThree();
    // this.addBoxHelper();
    this.addParticles();
    this.update();
  }

  initThree() {
    const width = this.el.nativeElement.clientWidth;
    const height = this.el.nativeElement.clientHeight;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 4000);
    this.camera.position.z = 1750;
    this.renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    this.renderer.setSize(width, height);
    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;

    this.el.nativeElement.appendChild(this.renderer.domElement);
  }

  addBoxHelper() {
    const helper = new THREE.BoxHelper(
      new THREE.Mesh(
        new THREE.BoxGeometry(this.r, this.r, this.r),
        new THREE.MeshBasicMaterial({
          color: 0x080808,
          blending: THREE.AdditiveBlending,
          transparent: true
        })
      )
    );
    this.scene.add(helper);
  }

  addParticles() {
    const segments = this.maxParticleCount * this.maxParticleCount;
    this.positions = new Float32Array(segments * 3);
    this.colors = new Float32Array(segments * 3);

    const pMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 3,
      blending: THREE.AdditiveBlending,
      transparent: true,
      sizeAttenuation: false
    });

    const particles = new THREE.BufferGeometry();
    this.particlePositions = new Float32Array(this.maxParticleCount * 3);
    for (let i = 0; i < this.maxParticleCount; i++) {
      const x = Math.random() * this.r - this.r / 2;
      const y = Math.random() * this.r - this.r / 2;
      const z = Math.random() * this.r - this.r / 2;

      this.particlePositions[i * 3] = x;
      this.particlePositions[i * 3 + 1] = y;
      this.particlePositions[i * 3 + 2] = z;

      this.particlesData.push({
        velocity: new THREE.Vector3(
          -1 + Math.random() * 2,
          -1 + Math.random() * 2,
          -1 + Math.random() * 2
        ),
        numConnections: 0
      });
    }

    particles.groups.push({
      start: 0,
      count: this.particleCount,
      materialIndex: 0
    });

    particles.addAttribute(
      "position",
      new THREE.BufferAttribute(this.particlePositions, 3).setDynamic(true)
    );

    this.pointCloud = new THREE.Points(particles, pMaterial);
    (<THREE.BufferAttribute>(
      (<THREE.BufferGeometry>this.pointCloud.geometry).attributes.position
    )).needsUpdate = true;
    this.scene.add(this.pointCloud);

    const geometry = new THREE.BufferGeometry();
    geometry.addAttribute(
      "position",
      new THREE.BufferAttribute(this.positions, 3).setDynamic(true)
    );

    geometry.addAttribute(
      "color",
      new THREE.BufferAttribute(this.colors, 3).setDynamic(true)
    );
    geometry.computeBoundingSphere();
    geometry.groups.push({
      start: 0,
      count: 0,
      materialIndex: 0
    });

    const material = new THREE.LineBasicMaterial({
      vertexColors: THREE.VertexColors,
      blending: THREE.AdditiveBlending,
      transparent: true
    });

    this.lineMesh = new THREE.LineSegments(geometry, material);
    this.scene.add(this.lineMesh);
  }

  animate() {
    let vertexpos = 0;
    let colorpos = 0;
    let numConnected = 0;

    for (let i = 0; i < this.particleCount; i++) {
      this.particlesData[i].numConnections = 0;
    }

    for (let i = 0; i < this.particleCount; i++) {
      const particleData = this.particlesData[i];
      this.particlePositions[i * 3] += particleData.velocity.x;
      this.particlePositions[i * 3 + 1] += particleData.velocity.y;
      this.particlePositions[i * 3 + 2] += particleData.velocity.z;

      if (
        this.particlePositions[i * 3 + 1] < -this.halfR ||
        this.particlePositions[i * 3 + 1] > this.halfR
      ) {
        particleData.velocity.y = -particleData.velocity.y;
      }

      if (
        this.particlePositions[i * 3] < -this.halfR ||
        this.particlePositions[i * 3] > this.halfR
      ) {
        particleData.velocity.x = -particleData.velocity.x;
      }

      if (
        this.particlePositions[i * 3 + 2] < -this.halfR ||
        this.particlePositions[i * 3 + 2] > this.halfR
      ) {
        particleData.velocity.z = -particleData.velocity.z;
      }

      for (let j = i + 1; j < this.particleCount; j++) {
        const particleDataB = this.particlesData[j];

        const dx =
          this.particlePositions[i * 3] - this.particlePositions[j * 3];
        const dy =
          this.particlePositions[i * 3 + 1] - this.particlePositions[j * 3 + 1];
        const dz =
          this.particlePositions[i * 3 + 2] - this.particlePositions[j * 3 + 2];

        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 150) {
          particleData.numConnections++;
          particleDataB.numConnections++;
          const alpha = 1.0 - dist / 150;
          this.positions[vertexpos++] = this.particlePositions[i * 3];
          this.positions[vertexpos++] = this.particlePositions[i * 3 + 1];
          this.positions[vertexpos++] = this.particlePositions[i * 3 + 2];

          this.positions[vertexpos++] = this.particlePositions[j * 3];
          this.positions[vertexpos++] = this.particlePositions[j * 3 + 1];
          this.positions[vertexpos++] = this.particlePositions[j * 3 + 2];

          this.colors[colorpos++] = alpha;
          this.colors[colorpos++] = alpha;
          this.colors[colorpos++] = alpha;
          this.colors[colorpos++] = alpha;
          this.colors[colorpos++] = alpha;
          this.colors[colorpos++] = alpha;

          numConnected++;
        }
      }
    }
    this.lineMesh.geometry.groups[0].count = numConnected * 2;
    this.lineMesh.geometry.attributes.position.needsUpdate = true;
    this.lineMesh.geometry.attributes.color.needsUpdate = true;
    (<THREE.BufferAttribute>(
      (<THREE.BufferGeometry>this.pointCloud.geometry).attributes.position
    )).needsUpdate = true;
  }

  update() {
    this.renderer.render(this.scene, this.camera);

    this.animate();
    requestAnimationFrame(this.update.bind(this));
  }
}
