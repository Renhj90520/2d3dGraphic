const MAIN_IMAGE_URL =
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/204379/mosaic_main_d.jpg";
const MOSAIC_IMAGE_URL =
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/204379/mosaic_sheet_a.jpg";

const Utils = {
  groupByArray(xs, key) {
    return xs.reduce(function(rv, x) {
      let v = key instanceof Function ? key(x) : x[key];
      let el = rv.find(r => r && r.key === v);
      if (el) {
        el.values.push(x);
      } else {
        rv.push({ key: v, values: [x] });
      }
      return rv;
    }, []);
  },
  getSizeToCover(width, height, maxWidth, maxHeight) {
    var ratio = Math.max(maxWidth / width, maxHeight / height);
    return [width * ratio, height * ratio];
  },
  visibleHeightAtZDepth(camera, depth = 0) {
    // compensate for cameras not positioned at z=0
    const cameraOffset = camera.position.z;
    if (depth < cameraOffset) depth -= cameraOffset;
    else depth += cameraOffset;

    // vertical fov in radians
    const vFOV = (camera.fov * Math.PI) / 180;

    // Math.abs to ensure the result is always positive
    return 2 * Math.tan(vFOV / 2) * Math.abs(depth);
  },
  visibleWidthAtZDepth(camera, depth = 0) {
    const height = this.visibleHeightAtZDepth(camera, depth);
    return height * camera.aspect;
  }
};

class SpriteTexture {
  constructor(texture, tilesHorizontal, tilesVertical, frameCount, frameNum) {
    this.texture = texture;
    this.tiles = { x: tilesHorizontal, y: tilesVertical };
    this.frameCount = frameCount;
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1 / this.tiles.x, 1 / this.tiles.y);
    this.setFrame(frameNum);
  }

  setFrame(frameIndex) {
    const xIndex = frameIndex % this.tiles.x;
    const yIndex = Math.floor(frameIndex / this.tiles.x);
    const halfX = 1 / this.tiles.x / 2;
    const halfY = 1 / this.tiles.y / 2;
    this.texture.offset.x = xIndex / this.tiles.x + halfX;
    this.texture.offset.y = -(yIndex / this.tiles.y) - halfY;
  }
}

class Object3DResizer {
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
    const { obj, camera, scale } = this;
    const w = Utils.visibleWidthAtZDepth(camera);
    const h = Utils.visibleHeightAtZDepth(camera);
    obj.scale.x = w * scale.x;
    obj.scale.y = h * scale.y;
  }
}

class TextureResizer {
  constructor(texture, obj) {
    this.obj = obj;
    this.texture = texture;
    this.texture.center.set(0.5, 0.5);
    this.texture.wrapS = this.texture.wrapT = THREE.ClampToEdgeWrapping;
    this.scale = new THREE.Vector2(1, 1);
    this.originalSize = new THREE.Vector2(1, 1);
  }

  updateTextureSize() {
    const { originalSize, texture } = this;
    const { naturalWidth: nW, naturalHeight: nH } = texture.image;
    if (nW > nH) {
      originalSize.x = 1;
      originalSize.y = nH / nW;
    } else {
      originalSize.x = nW / nH;
      originalSize.y = 1;
    }
  }

  update() {
    const { scale, texture, obj, originalSize } = this;
    let formFactorX = 1;
    let formFactorY = 1;

    /* 
      get formFactor to cover the obj with texture while
      keeping the original image ratio
    */
    if (texture.image) {
      this.updateTextureSize();
      const [widthCover, heightCover] = Utils.getSizeToCover(
        originalSize.x,
        originalSize.y,
        obj.scale.x,
        obj.scale.y
      );
      formFactorX = widthCover / obj.scale.x;
      formFactorY = heightCover / obj.scale.y;
    }
    const scaleX = 1 / (this.scale.x * formFactorX);
    const scaleY = 1 / (this.scale.y * formFactorY);
    texture.repeat.set(scaleX, scaleY);
  }
}

class ImagePlane {
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
    this.objectResizer = new Object3DResizer(camera, this.mesh);
    this.textureResizer = new TextureResizer(this.texture, this.mesh);
  }

  updateSize() {
    this.objectResizer.scale.copy(this.scale);
    this.objectResizer.update();
    this.textureResizer.update();
  }
}

class HexGrid {
  constructor(camera) {
    this.lastActiveCell = undefined;
    this.activeCells = [];
    this.groupObject = new THREE.Object3D();
    this.texture = new THREE.Texture();
    this.camera = camera;
    this.initLayout();
    this.initGrid();
  }

  getTileMaterial(overlay, frameIndex) {
    const framesCount = 64;
    const tilesX = 8;
    const tilesY = 8;
    const halfX = 1 / tilesX / 2;
    const halfY = 1 / tilesY / 2;
    frameIndex = frameIndex % framesCount;
    const xIndex = frameIndex % tilesX;
    const yIndex = Math.floor(frameIndex / tilesX);
    const x = 1 - xIndex / tilesX - halfX;
    const y = 1 - yIndex / tilesY - halfY;

    const uniforms = {
      texture: { type: "t", value: this.texture },
      offset: { type: "v2", value: new THREE.Vector2(x, y) },
      repeat: { type: "v2", value: new THREE.Vector2(1 / tilesX, 1 / tilesY) },
      opacity: { type: "f", value: 1 },
      color: { type: "c", value: new THREE.Color(0xffffff) }
    };

    const fragSelector = overlay
      ? "#shader-texture-overlay-fragment"
      : "#shader-texture-normal-fragment";
    const fragShaderContent = document.querySelector(fragSelector).textContent;
    const vertexShaderContent = document.querySelector("#shader-texture-vertex")
      .textContent;

    const mat = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: vertexShaderContent,
      fragmentShader: fragShaderContent,
      transparent: true
      //wireframe: true
    });

    if (overlay) {
      mat.blending = THREE.CustomBlending;
      mat.blendSrc = THREE.SrcColorFactor;
      mat.blendDst = THREE.DstColorFactor;
      mat.blendEquation = THREE.AddEquation;
    }

    mat.offset = mat.uniforms.offset.value;
    mat.repeat = mat.uniforms.repeat.value;
    mat.color = mat.uniforms.color.value;

    return mat;
  }

  getMeshFromCell(cell, overlayMaterial, frameIndex) {
    const { gridLayout } = this;
    const mat = this.getTileMaterial(overlayMaterial, frameIndex);
    const mesh = new THREE.Mesh(gridLayout.cellShapeGeo, mat);
    mesh.position.copy(gridLayout.cellToPixel(cell));
    mesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
    mesh.scale.set(0.96, 0.96, 1);
    mesh.userData.cell = cell;
    mesh.userData.frameIndex = frameIndex;
    return mesh;
  }

  initGrid() {
    const { texture, groupObject, gridLayout } = this;
    const cellKeys = Object.keys(gridLayout.cells);
    cellKeys.forEach((k, frameIndex) => {
      const cell = gridLayout.cells[k];
      const mesh = this.getMeshFromCell(cell, true, frameIndex);
      mesh.userData.isOver = false;
      groupObject.add(mesh);
    });

    groupObject.rotation.x = -Math.PI / 2;
    groupObject.position.z = 2.5;
  }

  setTexture(textureUrl) {
    this.texture = new THREE.TextureLoader().load(
      textureUrl,
      this.updateSize.bind(this)
    );
    this.groupObject.children.forEach(
      c => (c.material.uniforms.texture.value = this.texture)
    );
  }

  initLayout() {
    this.gridLayout = new vg.HexGrid({ cellSize: 0.45 });
    this.gridLayout.generate({ size: 8 });
  }

  updateSize() {
    const h = Utils.visibleHeightAtZDepth(this.camera, 1.5);
    const w = Utils.visibleWidthAtZDepth(this.camera, 1.5);
    const aspect = w / h;
    const gridSize = 16 * 0.55;
    this.groupObject.scale.set(w / gridSize, 1, (h / gridSize) * aspect);
  }

  animateHoverTileIn(mesh) {
    const tl = new TimelineMax();
    mesh.material.uniforms.opacity.value = 0;
    tl.to(mesh.material.uniforms.opacity, 0.5, { value: 0.8 });
    tl.to(mesh.scale, 0.35, { x: 1, y: 1 }, -0.5);
  }

  animateHoverTileOut(mesh) {
    const tl = new TimelineMax({
      onComplete: () => {
        this.groupObject.remove(mesh);
        mesh.geometry.dispose();
        mesh.material.dispose();
        mesh = undefined;
      }
    });

    tl.to(mesh.material.uniforms.opacity, 0.95, {
      value: 0
    });
  }

  animateGridTilesIn() {
    const tiles = this.groupObject.children.map(c => {
      const cell = c.userData.cell;
      const d = Math.max(Math.abs(cell.q), Math.abs(cell.r), Math.abs(cell.s));
      return { target: c, d };
    });

    const rings = Utils.groupByArray(tiles, "d");
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

  deactivateAll() {
    while (this.activeCells.length > 0) {
      const c = this.activeCells.pop();
      this.animateHoverTileOut(c);
    }
  }

  setActiveCell(object3d) {
    if (object3d && object3d.userData.isOver === false) {
      if (this.lastActiveCell != object3d) {
        this.deactivateAll();
        this.lastActiveCell = object3d;
        const mat = this.getTileMaterial(false, 1);
        const mesh = this.getMeshFromCell(
          object3d.userData.cell,
          false,
          object3d.userData.frameIndex
        );
        mesh.userData.isOver = true;
        mesh.position.y = 0.99;
        this.animateHoverTileIn(mesh);
        this.activeCells.push(mesh);
        this.groupObject.add(mesh);
      }
    }
  }
}

class App {
  constructor() {
    this.width = 0;
    this.height = 0;
    this.mouse = new THREE.Vector2(0, 0);
    this.raycaster = new THREE.Raycaster();
    this.init();
    //this.initOrbitControls();
    this.setupScene();
    this.setupLights();
    this.attachEvents();
    this.setupMosaic();
    this.onResize();
    this.onFrame(0);
    this.loader = THREE.DefaultLoadingManager;
    this.loader.onProgress = (url, itemsLoaded, itemsTotal) => {
      if (itemsLoaded === itemsTotal) {
        this.mosaicAnimationIn();
      }
    };
  }

  init() {
    const { innerWidth: w, innerHeight: h } = window;
    this.renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, 0, 0.1, 1000);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.clock = new THREE.Clock();
    document.body.appendChild(this.renderer.domElement);
  }

  initOrbitControls() {
    const c = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    c.enableDamping = true;
    c.dampingFactor = 0.25;
    c.minDistance = 1;
    c.maxDistance = 100;
    this.orbitControls = c;
  }

  attachEvents() {
    window.addEventListener("resize", this.onResize.bind(this));
    window.addEventListener("mousemove", this.onMouseMove.bind(this));
  }

  onMouseMove(event) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  onResize() {
    this.resize();
    this.background.updateSize();
    this.grid.updateSize();
  }

  resize() {
    const { renderer, camera } = this;
    const { innerWidth: w, innerHeight: h } = window;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    this.width = w;
    this.height = h;
  }

  setupScene() {
    const { scene } = this;
    scene.background = new THREE.Color(0xffffff);
    this.camera.position.z = 10;
  }

  setupLights() {
    const { scene } = this;
    const light = new THREE.AmbientLight(0xffffff);
    this.pLight = new THREE.PointLight(0xffffff, 1, 20);
    this.pLight.position.set(0, 0, 9);
    scene.add(this.pLight);
    scene.add(light);
  }

  setupMosaic() {
    const { scene, camera } = this;
    this.background = new ImagePlane(MAIN_IMAGE_URL, camera);
    this.background.scale.set(1.1, 1.1, 1);
    this.grid = new HexGrid(camera);
    this.grid.setTexture(MOSAIC_IMAGE_URL);
  }

  updateGridOver() {
    const { camera, raycaster, mouse, grid } = this;
    if (mouse.x !== 0 && mouse.y !== 0) {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(
        this.grid.groupObject.children
      );
      if (intersects.length) {
        grid.setActiveCell(intersects[0].object);
      }
    }
  }

  mosaicAnimationIn() {
    const { scene } = this;
    scene.add(this.background.mesh);
    scene.add(this.grid.groupObject);
    this.grid.animateGridTilesIn();

    TweenMax.to(this.pLight, 1.5, {
      intensity: 0
    });

    TweenMax.from(this.background.scale, 1.8, {
      x: 1.4,
      y: 1.4,
      onUpdate: () => {
        this.background.updateSize();
      },
      ease: Power4.easeOut
    });
  }

  updateMosaicTilt() {
    const { camera, mouse } = this;
    TweenMax.to(this.camera.position, 1.5, {
      x: mouse.x * 0.5,
      y: mouse.y * 0.5
    });
  }

  onFrame(time) {
    const { renderer, scene, camera, clock } = this;
    requestAnimationFrame(this.onFrame.bind(this));
    //this.orbitControls.update();
    this.updateGridOver();
    this.updateMosaicTilt();
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
  }
}

window.app = new App();
