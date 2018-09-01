import { Component, OnInit, ElementRef } from "@angular/core";
import { dataset } from "./dataset";
import * as THREE from "three";
@Component({
  selector: "app-three-super-marry",
  templateUrl: "./three-super-marry.component.html",
  styleUrls: ["./three-super-marry.component.css"]
})
export class ThreeSuperMarryComponent implements OnInit {
  scene;
  camera;
  renderer;

  X_START_POS = 0;
  Y_START_POS = 0;
  Z_START_POS = 0;

  mesh;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.initThree();
    this.addLights();
    this.addMesh();
    this.update();
  }
  initThree() {
    const width = this.el.nativeElement.clientWidth;
    const height = this.el.nativeElement.clientHeight;
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0x050505, 2000, 3500);

    this.camera = new THREE.PerspectiveCamera(27, width / height, 1, 3500);
    this.camera.position.z = 2750;

    this.renderer = new THREE.WebGLRenderer({ antialias: false });
    this.renderer.setClearColor(this.scene.fog.color, 1);
    this.renderer.setSize(width, height);
    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;

    this.el.nativeElement.appendChild(this.renderer.domElement);
  }

  addLights() {
    const light1 = new THREE.AmbientLight(0x444444);
    this.scene.add(light1);
    const light2 = new THREE.DirectionalLight(0xffffff, 0.5);
    light2.position.set(1, 1, 1);
    this.scene.add(light2);
    const light3 = new THREE.DirectionalLight(0xffffff, 1.5);
    light3.position.set(0, -1, 0);
    this.scene.add(light3);
  }
  addMesh() {
    const triangles = 160000;
    const geometry = new THREE.BufferGeometry();
    const indices = new Uint32Array(triangles * 3);
    for (let i = 0; i < indices.length; i++) {
      indices[i] = i;
    }
    const positions = new Float32Array(triangles * 3 * 3);
    const normals = new Float32Array(triangles * 3 * 3);
    const colors = new Float32Array(triangles * 3 * 3);

    const color = new THREE.Color();

    // triangles spread in the cube
    const n = 800,
      n2 = n / 2;
    const d = 12,
      d2 = d / 2;
    const pA = new THREE.Vector3();
    const pB = new THREE.Vector3();
    const pC = new THREE.Vector3();

    const cb = new THREE.Vector3();
    const ab = new THREE.Vector3();
    for (let i = 0; i < positions.length; i += 9) {
      const x = Math.random() * n - n2; // -400 ~ 400
      const y = Math.random() * n - n2;
      const z = Math.random() * n - n2;

      const vertex = new THREE.Vector3(x, y, z);

      if (vertex.length() < 400) {
        const ax = x + Math.random() * d - d2; // -400~400+-6~6=-406~406
        const ay = y + Math.random() * d - d2;
        const az = z + Math.random() * d - d2;

        const bx = x + Math.random() * d - d2;
        const by = y + Math.random() * d - d2;
        const bz = z + Math.random() * d - d2;

        const cx = x + Math.random() * d - d2;
        const cy = y + Math.random() * d - d2;
        const cz = z + Math.random() * d - d2;

        positions[i] = ax;
        positions[i + 1] = ay;
        positions[i + 2] = az;

        positions[i + 3] = bx;
        positions[i + 4] = by;
        positions[i + 5] = bz;

        positions[i + 6] = cx;
        positions[i + 7] = cy;
        positions[i + 8] = cz;

        pA.set(ax, ay, az);
        pB.set(bx, by, bz);
        pC.set(cx, cy, cz);

        cb.subVectors(pC, pB);
        ab.subVectors(pA, pB);
        cb.cross(ab);

        cb.normalize();

        const nx = cb.x;
        const ny = cb.y;
        const nz = cb.z;

        normals[i] = nx;
        normals[i + 1] = ny;
        normals[i + 2] = nz;

        normals[i + 3] = nx;
        normals[i + 4] = ny;
        normals[i + 5] = ny;

        normals[i + 6] = nx;
        normals[i + 7] = ny;
        normals[i + 8] = ny;

        const vx = x / n + 0.5;
        const vy = y / n + 0.5;
        const vz = z / n + 0.5;
        color.setRGB(vx, vy, vz);

        colors[i] = color.r;
        colors[i + 1] = color.g;
        colors[i + 2] = color.b;
        colors[i + 3] = color.r;
        colors[i + 4] = color.g;
        colors[i + 5] = color.b;
        colors[i + 6] = color.r;
        colors[i + 7] = color.g;
        colors[i + 8] = color.b;

        const x0 = Math.floor(x / 25) + 8;
        const y0 = Math.floor(y / 25) + 8;
        const z0 = Math.floor(z / 25) + 8;

        if (
          x0 >= 0 + this.X_START_POS &&
          y0 >= 0 + this.Y_START_POS &&
          x0 < 16 + this.X_START_POS &&
          y0 < 16 + this.Y_START_POS
        ) {
          const pos =
            15 - x0 - this.X_START_POS + (15 - y0 - this.Y_START_POS) * 16;
          if (dataset[pos] !== "BK") {
            const c = dataset[pos];
            colors[i + 0] = this.getSingleColorDepth(c, "r");
            colors[i + 1] = this.getSingleColorDepth(c, "g");
            colors[i + 2] = this.getSingleColorDepth(c, "b");
            colors[i + 3] = this.getSingleColorDepth(c, "r");
            colors[i + 4] = this.getSingleColorDepth(c, "g");
            colors[i + 5] = this.getSingleColorDepth(c, "b");
            colors[i + 6] = this.getSingleColorDepth(c, "r");
            colors[i + 7] = this.getSingleColorDepth(c, "g");
            colors[i + 8] = this.getSingleColorDepth(c, "b");
          }
        }
      }
    }

    geometry.setIndex(new THREE.BufferAttribute(indices, 1));
    geometry.addAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.addAttribute("normal", new THREE.BufferAttribute(normals, 3));
    geometry.addAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.computeBoundingSphere();

    const material = new THREE.MeshPhongMaterial({
      color: 0xaaaaaa,
      specular: 0xffffff,
      shininess: 250,
      side: THREE.DoubleSide,
      vertexColors: THREE.VertexColors
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.mesh);
  }
  update() {
    this.renderer.render(this.scene, this.camera);
    const time = Date.now() * 0.001;
    this.mesh.rotation.y = time * 0.5;
    requestAnimationFrame(this.update.bind(this));
  }
  getRgbColor(colorType) {
    var colorHash = {
      BK: "#000000", // black
      WH: "#FFFFFF", // white
      BG: "#FFCCCC", // beige
      BR: "#800000", // brown
      RD: "#FF0000", // red
      YL: "#FFFF00", // yellow
      GN: "#00FF00", // green
      WT: "#00FFFF", // water
      BL: "#0000FF", // blue
      PR: "#800080" // purple
    };
    return colorHash[colorType];
  }
  getSingleColorDepth(colorType, rgbType) {
    var result = 0;
    var rgb = this.getRgbColor(colorType);
    rgb = rgb.replace("#", "");
    var r = parseInt("0x" + rgb.substr(0, 2), 16);
    var g = parseInt("0x" + rgb.substr(2, 2), 16);
    var b = parseInt("0x" + rgb.substr(4, 2), 16);
    switch (rgbType) {
      case "r":
        result = r / 255;
        break;
      case "g":
        result = g / 255;
        break;
      case "b":
        result = b / 255;
        break;
    }
    return result;
  }
}
