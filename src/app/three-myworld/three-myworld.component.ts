import { Component, OnInit, ElementRef } from "@angular/core";
import * as THREE from "three";
import {
  TimelineMax,
  SteppedEase,
  Power0,
  TweenMax,
  Elastic,
  Power2
} from "gsap";
@Component({
  selector: "app-three-myworld",
  templateUrl: "./three-myworld.component.html",
  styleUrls: ["./three-myworld.component.css"]
})
export class ThreeMyworldComponent implements OnInit {
  camera;
  scene;
  renderer;
  cubePositions = [];
  rotationMatrix;
  clock;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.clock = new THREE.Clock();
    this.rotationMatrix = new THREE.Matrix4();
    this.initThree();

    this.initLandscape();
    this.addLights();
    this.initGomez();
    this.initMill();
    this.animateIntro(7);
    this.update();
  }

  initThree() {
    this.scene = new THREE.Scene();
    const width = this.el.nativeElement.clientWidth;
    const height = this.el.nativeElement.clientHeight;
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setSize(width, height);
    this.el.nativeElement.appendChild(this.renderer.domElement);
    this.camera = new THREE.PerspectiveCamera(30, width / height, 1, 1000);
    this.camera.position.set(0, 0, 30);
  }

  addLights() {
    const spotlightFront = new THREE.SpotLight(0xffffff);
    spotlightFront.position.set(50, 50, 1000);
    const spotlightBack = new THREE.SpotLight(0xffffff);
    spotlightBack.position.set(50, 50, -1000);
    const spotlightLeft = new THREE.SpotLight(0xffffff, 0.4);
    spotlightLeft.position.set(50, 50, 0);
    const spotlightRight = new THREE.SpotLight(0xffffff, 0.4);
    spotlightRight.position.set(-50, 50, 0);

    this.scene.add(spotlightFront);
    this.scene.add(spotlightBack);
    this.scene.add(spotlightLeft);
    this.scene.add(spotlightRight);
  }

  createCube(texture, position) {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);
    texture.needUpdate = true;
    const material = new THREE.MeshLambertMaterial({
      map: texture,
      transparent: true
    });

    const geometry = new THREE.BoxGeometry(1, 1, 1);

    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(position[0], position[1], position[2]);
    this.scene.add(cube);
    this.cubePositions.push(cube.position);
  }

  initLandscape() {
    let i;

    const loader = new THREE.TextureLoader();
    const blueBrick = loader.load("assets/images/blue-brick.png");
    const dirt = loader.load("assets/images/ground1.png");
    const grassDirt = loader.load("assets/images/ground-grass.png");
    const openLeaves = loader.load("assets/images/open-leafs.png");
    const stone = loader.load("assets/images/stone.png");
    const log = loader.load("assets/images/log.png");
    for (let i = 2; i < 5; i++) {
      this.createCube(stone, [i, 3, -1]);
      this.createCube(stone, [i, 3, -2]);
      this.createCube(stone, [i, 3, -3]);
    }

    for (let i = 2; i < 5; i++) {
      this.createCube(stone, [i, 4, -1]);
      this.createCube(stone, [i, 4, -2]);
      this.createCube(stone, [i, 4, -3]);
    }

    for (let i = -1; i > -3; i--) {
      this.createCube(stone, [3, 5, i]);
    }

    for (let i = -6; i < 6; i++) {
      this.createCube(grassDirt, [i, 2, -4]);
      this.createCube(grassDirt, [i, 2, -3]);
      this.createCube(grassDirt, [i, 2, -2]);
      this.createCube(grassDirt, [i, 2, -1]);
      this.createCube(grassDirt, [i, 2, 0]);
    }

    for (let i = -6; i < 6; i++) {
      this.createCube(dirt, [i, 1, -4]);
      this.createCube(dirt, [i, 1, -3]);
      this.createCube(dirt, [i, 1, -2]);
    }
    this.createCube(dirt, [-5, 1, 0]);
    this.createCube(dirt, [-4, 1, -1]);
    this.createCube(dirt, [-3, 1, 0]);
    this.createCube(dirt, [-2, 1, 0]);
    this.createCube(dirt, [-1, 1, -1]);
    this.createCube(dirt, [0, 1, -1]);
    this.createCube(dirt, [1, 1, 0]);
    this.createCube(dirt, [2, 1, 0]);
    this.createCube(dirt, [3, 1, 0]);

    for (i = -5; i < 3; i += 1) {
      this.createCube(dirt, [i, 0, -1]);
      this.createCube(dirt, [i, 0, -2]);
      this.createCube(dirt, [i, 0, -3]);
    }
    for (i = -4; i < 2; i += 1) {
      this.createCube(stone, [i, -1, Math.floor(-2 * Math.random())]);
      this.createCube(stone, [i, -1, -3]);
      this.createCube(stone, [i, -1, -4]);
    }

    for (i = -4; i < 2; i += 1) {
      this.createCube(stone, [i, -2, Math.floor(-2 * Math.random())]);
      this.createCube(stone, [i, -2, -3]);
      this.createCube(stone, [i, -2, -4]);
    }

    for (i = -3; i < 2; i += 1) {
      this.createCube(blueBrick, [i, -3, Math.floor(-2 * Math.random())]);
      this.createCube(blueBrick, [i, -3, -3]);
      this.createCube(blueBrick, [i, -3, Math.floor(-4 * Math.random())]);
    }

    for (i = -3; i < 1; i += 1) {
      this.createCube(blueBrick, [i, -4, Math.floor(-2 * Math.random())]);
      this.createCube(blueBrick, [i, -4, -3]);
      this.createCube(blueBrick, [i, -4, Math.floor(-4 * Math.random())]);
    }

    // Add tree
    this.createCube(openLeaves, [0, 0, -1]);
    this.createCube(openLeaves, [0, -1, -1]);
    this.createCube(openLeaves, [-1, -1, -1]);

    for (i = 3; i < 6; i += 1) {
      this.createCube(log, [-3, i, 0]);
    }

    for (i = -5; i < 0; i += 1) {
      this.createCube(openLeaves, [i, 5, -1]);
      this.createCube(openLeaves, [i, 5, 0]);
      this.createCube(openLeaves, [i, 5, 1]);
      this.createCube(openLeaves, [i, 5, Math.floor(3 * Math.random())]);
    }

    for (i = -4; i < -1; i += 1) {
      this.createCube(openLeaves, [i, 6, -1]);
      this.createCube(openLeaves, [i, 6, 0]);
      this.createCube(openLeaves, [i, 6, 1]);
      this.createCube(openLeaves, [i, 6, 0]);
    }
  }

  initGomez() {
    const loader = new THREE.TextureLoader();
    const gomez = loader.load("assets/images/gomez.png");
    //keep pixely look by setting scaling options
    gomez.minFilter = THREE.NearestFilter;
    gomez.magFilter = THREE.NearestFilter;

    // double width of texture to fit the spritesheet width
    gomez.repeat.set(0.5, 1);
    gomez.needsUpdate = true;
    const material = new THREE.SpriteMaterial({ map: gomez });
    const spriteSheet = new THREE.Sprite(material);
    spriteSheet.position.y = 3;
    const tl = new TimelineMax({
      repeat: -1,
      repeatDelay: 8 * 60,
      useFrame: true
    });
    const ease = new SteppedEase(1);
    tl.to(gomez.offset, 17, { x: 0.5, ease });
    tl.to(gomez.offset, 0, { x: 0, ease });
    this.scene.add(spriteSheet);
  }

  initMill() {
    const loader = new THREE.TextureLoader();
    const mill = loader.load("assets/images/mill.png");

    mill.minFilter = THREE.NearestFilter;
    mill.magFilter = THREE.NearestFilter;
    mill.needsUpdate = true;
    const material = new THREE.MeshBasicMaterial({
      map: mill,
      transparent: true,
      side: THREE.DoubleSide
    });
    const geometry = new THREE.PlaneGeometry(4, 4);
    const plane = new THREE.Mesh(geometry, material);
    plane.position.set(3, 5, -0.4);
    const tl = new TimelineMax({ repeat: -1 });

    tl.to(plane.rotation, 2, {
      z: -Math.PI,
      ease: Power0.easeNone
    });

    this.scene.add(plane);
  }

  animateIntro(duration) {
    TweenMax.staggerFrom(
      this.cubePositions,
      duration,
      {
        z: 30,
        ease: Elastic.easeOut
      },
      0.03
    );

    TweenMax.from(this.camera.position, duration, {
      z: 100,
      x: 500,
      ease: Power2.easeOut,
      onUpdate: () => {
        this.camera.lookAt(this.scene.position);
      }
    });
  }

  rotateScene(period) {
    this.rotationMatrix.makeRotationY(
      (this.clock.getDelta() * 2 * Math.PI) / period
    );
    this.camera.position.applyMatrix4(this.rotationMatrix);
    this.camera.lookAt(this.scene.position);
  }

  update() {
    this.renderer.render(this.scene, this.camera);
    this.rotateScene(10);
    requestAnimationFrame(this.update.bind(this));
  }
}
