import { Component, OnInit, ElementRef } from '@angular/core';
import * as THREE from 'three';
import { HexGrid } from './HexGrid';
import { TweenMax, Power3 } from 'gsap';
@Component({
  selector: 'app-three-hex-mosic',
  templateUrl: './three-hex-mosic.component.html',
  styleUrls: ['./three-hex-mosic.component.css']
})
export class ThreeHexMosicComponent implements OnInit {
  scene;
  camera;
  renderer;

  clock;
  mouse = new THREE.Vector2(0, 0);
  raycaster = new THREE.Raycaster();
  background: ImagePlane;
  grid: any;
  loader: any;
  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.initThree();
    this.addLights();
    this.addMosaic();
    this.update();
    this.loader = THREE.DefaultLoadingManager;
    this.loader.onProgress = (url, itemsLoaded, itemsTotal) => {
      if (itemsLoaded === itemsTotal) {
        this.mosaicAnimationIn();
      }
    };
  }
  mosaicAnimationIn() {
    this.scene.add(this.background.mesh);
    this.scene.add(this.grid.groupObject);

    console.log(this.scene);
    this.grid.animateGridTilesIn();
  }
  addMosaic() {
    this.background = new ImagePlane(
      '/assets/images/mosaic_main.jpg',
      this.camera
    );
    this.background.scale.set(1.1, 1.1);
    this.grid = new HexGridBuilder(this.camera);
    console.log(this.grid);
    this.grid.setTexture('/assets/images/mosaic_sheet.jpg');
  }
  addLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff);
    this.scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1, 20);
    pointLight.position.set(0, 0, 0);
    this.scene.add(pointLight);
  }

  initThree() {
    const width = this.el.nativeElement.clientWidth;
    const height = this.el.nativeElement.clientHeight;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xffffff);

    this.camera = new THREE.PerspectiveCamera(45, 0, 0.1, 1000);
    this.camera.position.z = 10;
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0xffffff);
    this.renderer.setSize(width, height);
    this.el.nativeElement.appendChild(this.renderer.domElement);

    this.clock = new THREE.Clock();
  }
  update() {
    this.renderer.render(this.scene, this.camera);
    this.camera.lookAt(this.scene.position);

    requestAnimationFrame(this.update.bind(this));
  }
}

class Utils {
  static groupByArray(xs, key) {
    return xs.reduce((rv, x) => {
      const v = key instanceof Function ? key(x) : x[key];
      const el = rv.find(r => r && r.key === v);
      if (el) {
        el.values.push(x);
      } else {
        rv.push({ key: v, values: [x] });
      }
      return rv;
    }, []);
  }

  static getSizeToCover(width, height, maxWidth, maxHeight) {
    const ratio = Math.max(maxWidth / width, maxHeight / height);
    return [width * ratio, height * ratio];
  }

  static visibleHeightAtZDepth(camera, depth = 0) {
    const cameraOffset = camera.position.z;
    if (depth < cameraOffset) {
      depth -= cameraOffset;
    } else {
      depth += cameraOffset;
    }

    const vFOV = (camera.fov * Math.PI) / 180;
    return 2 * Math.tan(vFOV / 2) * Math.abs(depth);
  }

  static visibleWidthAtZDepth(camera, depth = 0) {
    const height = this.visibleHeightAtZDepth(camera, depth);
    return height * camera.aspect;
  }
}

class Object3DResizer {
  camera: THREE.PerspectiveCamera;
  obj: any;
  scale: THREE.Vector2;

  constructor(camera, obj) {
    this.camera = camera;
    this.obj = obj;
    this.scale = new THREE.Vector2(1, 1);
    this.setSize(1, 1);
  }
  setSize(width, height) {
    this.scale.set(width, height);
    this.update();
  }
  update() {
    const w = Utils.visibleWidthAtZDepth(this.camera);
    const h = Utils.visibleHeightAtZDepth(this.camera);
    this.obj.scale.x = w * this.scale.x;
    this.obj.scale.y = h * this.scale.y;
  }
}
class TextureResizer {
  texture: THREE.Texture;
  obj: any;
  scale: THREE.Vector2;
  originalSize: THREE.Vector2;
  constructor(texture, obj) {
    this.texture = texture;
    this.obj = obj;
    this.scale = new THREE.Vector2(1, 1);
    this.originalSize = new THREE.Vector2(1, 1);

    this.texture.center.set(0.5, 0.5);
    this.texture.wrapS = this.texture.wrapT = THREE.ClampToEdgeWrapping;
  }

  updateTextureSize() {
    const { naturalWidth: nW, naturalHeight: nH } = this.texture.image;
    if (nW > nH) {
      this.originalSize.x = 1;
      this.originalSize.y = nH / nW;
    } else {
      this.originalSize.x = nW / nH;
      this.originalSize.y = 1;
    }
  }

  update() {
    let formFactorX = 1;
    let formFactorY = 1;

    if (this.texture.image) {
      this.updateTextureSize();
      const [widthCover, heightCover] = Utils.getSizeToCover(
        this.originalSize.x,
        this.originalSize.y,
        this.obj.scale.x,
        this.obj.scale.y
      );

      formFactorX = widthCover / this.obj.scale.x;
      formFactorY = heightCover / this.obj.scale.y;
    }

    const scaleX = 1 / (this.scale.x * formFactorY);
    const scaleY = 1 / (this.scale.y * formFactorY);

    this.texture.repeat.set(scaleX, scaleY);
  }
}

class ImagePlane {
  scale: THREE.Vector2;
  texture: THREE.Texture;
  geometry: THREE.PlaneBufferGeometry;
  material: THREE.MeshLambertMaterial;
  mesh: THREE.Mesh;
  objResizer: Object3DResizer;
  textureResizer: TextureResizer;
  constructor(textureUrl, camera) {
    this.scale = new THREE.Vector2(1, 1);
    this.texture = new THREE.TextureLoader().load(
      textureUrl,
      this.updateSize.bind(this)
    );
    this.geometry = new THREE.PlaneBufferGeometry(1, 1, 1, 1);
    this.material = new THREE.MeshLambertMaterial({
      map: this.texture,
      wireframe: false
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.objResizer = new Object3DResizer(camera, this.mesh);
    this.textureResizer = new TextureResizer(this.texture, this.mesh);
  }

  updateSize() {
    this.objResizer.scale.copy(this.scale);
    this.objResizer.update();
    this.textureResizer.update();
  }
}

class HexGridBuilder {
  lastActiveCell;
  activeCells = [];
  groupObject = new THREE.Object3D();
  texture = new THREE.Texture();
  camera: THREE.PerspectiveCamera;
  gridLayout: HexGrid;

  normalFragShader = `
    varying vec2 vUv;
    uniform sampler2D texture;
    uniform vec3 color;
    uniform float opacity;

    void main() {
      gl_FragColor = texture2D(texture, vUv) * vec4(color, opacity);
    }
  `;

  overlayFragShader = `
    varying vec2 vUv;
    uniform sampler2D texture;
    uniform vec3 color;
    
    void main() {
      vec4 texColor = texture2D(texture, vUv);
      vec3 contrast = texColor.rgb * .7;
      vec3 bright = contrast + 0.0;
      float gray = dot(bright, vec3(.299, .587, .114));
      gl_FragColor = vec4(vec3(gray), .1) * vec4(color, 1.);
    }
  `;

  vertexShader = `
    varying vec2 vUv;
    uniform vec2 offset;
    uniform vec2 repeat;
    uniform vec3 color;

    void main() {
      vUv = uv * repeat + offset;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
    }
  `;

  passVertexShader = `
    varying vec2 vUv;
    
    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
    }
  `;
  constructor(camera) {
    this.camera = camera;
    this.initLayout();
    this.initGrid();
  }
  initLayout() {
    this.gridLayout = new HexGrid(null, 0.45);
    this.gridLayout.generate({ size: 8 });
  }
  initGrid() {
    const cellKeys = Object.keys(this.gridLayout.cells);
    cellKeys.forEach((k, idx) => {
      const cell = this.gridLayout.cells[k];
      const mesh = this.getMeshFromCell(cell, true, idx);
      mesh.userData.isOver = false;
      this.groupObject.add(mesh);
    });

    this.groupObject.rotation.x = -Math.PI / 2;
    this.groupObject.position.z = 2.5;
  }
  setTexture(textureUrl) {
    this.texture = new THREE.TextureLoader().load(
      textureUrl,
      this.updateSize.bind(this)
    );

    this.groupObject.children.forEach((c: any) => {
      c.material.uniforms.texture.value = this.texture;
    });
  }
  updateSize() {
    const h = Utils.visibleHeightAtZDepth(this.camera, 1.5);
    const w = Utils.visibleWidthAtZDepth(this.camera, 1.5);
    const aspect = w / h;
    const gridSize = 16 * 0.55;
    this.groupObject.scale.set(w / gridSize, 1, (h / gridSize) * aspect);
  }
  getMeshFromCell(cell, overlayMaterial, idx) {
    const mat = this.getTileMaterial(overlayMaterial, idx);
    const mesh = new THREE.Mesh(this.gridLayout.cellShapeGeo, mat);

    mesh.position.copy(this.gridLayout.cellToPixel(cell));
    mesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
    mesh.scale.set(0.96, 0.96, 1);
    mesh.userData.cell = cell;
    mesh.userData.frameIndex = idx;
    return mesh;
  }
  getTileMaterial(overlay, idx) {
    const framesCount = 64;
    const tilesX = 8;
    const tilesY = 8;
    const halfX = 1 / tilesX / 2;
    const halfY = 1 / tilesY / 2;
    idx = idx % framesCount;
    const xIndex = idx % tilesX;
    const yIndex = idx % tilesY;
    const x = 1 - xIndex / tilesX - halfX;
    const y = 1 - yIndex / tilesY - halfY;

    const uniforms = {
      texture: { type: 't', value: this.texture },
      offset: { type: 'v2', value: new THREE.Vector2(x, y) },
      repeat: { type: 'v2', value: new THREE.Vector2(1 / tilesX, 1 / tilesY) },
      opacity: { type: 'f', value: 1 },
      color: { type: 'c', value: new THREE.Color(0xffffff) }
    };

    const fragmentShader = overlay
      ? this.overlayFragShader
      : this.normalFragShader;

    const mat = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: this.vertexShader,
      fragmentShader,
      transparent: true
    });

    if (overlay) {
      mat.blending = THREE.CustomBlending;
      mat.blendSrc = THREE.SrcColorFactor;
      mat.blendDst = THREE.DstColorFactor;
      mat.blendEquation = THREE.AddEquation;
    }

    // mat.offset = mat.uniforms.offset.value;
    // mat.repeat = mat.uniforms.repeat.value;
    // mat.color = mat.uniforms.color.value;
    return mat;
  }

  animateGridTilesIn() {
    const tiles = this.groupObject.children.map(c => {
      const cell = c.userData.cell;
      const d = Math.max(Math.abs(cell.q), Math.abs(cell.r), Math.abs(cell.s));
      return { target: c, d };
    });

    const rings = Utils.groupByArray(tiles, 'd');
    rings.forEach(r => {
      r.values.forEach(item => {
        const target = item.target;
        target.scale.set(0.5, 0.5, 1);
        TweenMax.to(target.scale, item.d * 0.22 + 0.8, {
          x: 0.96,
          y: 0.96,
          ease: Power3.easeOut,
          delay: item.d * 0.12
        });
      });
    });

    TweenMax.from(this.groupObject.position, 2, {
      z: 7,
      ease: Power3.easeOut
    });
  }
}
