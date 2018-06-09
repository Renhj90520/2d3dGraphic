import { Component, OnInit, ElementRef } from '@angular/core';
import * as THREE from 'three';
import Earth from './earth';
import CityPoint from './city-point';
import CityLine from './city-line';

@Component({
  selector: 'app-earth',
  templateUrl: './earth.component.html',
  styleUrls: ['./earth.component.css']
})
export class EarthComponent implements OnInit {
  scene;
  camera;
  renderer;

  citiesPoints = [
    [51.2838, 0],
    [39, -116],
    [34, 118],
    [-33, 151],
    [-23, -46],
    [1, 103],
    [90, 0],
    [-90, 0]
  ];
  earth;
  japan: CityPoint;
  cities: CityPoint[] = [];
  citiesLine: CityLine[] = [];

  satellite: CityPoint;
  constructor(private el: ElementRef) {}
  setUpThree() {
    const width = this.el.nativeElement.clientWidth;
    const height = this.el.nativeElement.clientHeight;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000);
    this.camera.position.set(-250, 0, -250);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0x000000, 1);
    this.renderer.shadowMap.enable = true;
    this.el.nativeElement.appendChild(this.renderer.domElement);
  }

  // 环境光
  addAmbientLight() {
    const light = new THREE.AmbientLight(0x111111);
    this.scene.add(light);
  }

  addSpotLight() {
    const light = new THREE.SpotLight(0xffffff);
    light.position.set(-10000, 0, 0);
    light.castShadow = true;
    this.scene.add(light);
  }

  addBackground() {
    const sphere = new THREE.SphereGeometry(1000, 60, 40);
    sphere.scale(-1, 1, 1);

    const material = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load('assets/images/star.jpg')
    });

    const background = new THREE.Mesh(sphere, material);
    this.scene.add(background);
  }

  addJapan() {
    this.japan = new CityPoint(0xffff00);
    this.japan.latitude = 35.658651;
    this.japan.longitude = 139.742689;
    this.scene.add(this.japan);
  }

  addCities() {
    this.citiesPoints.forEach(c => {
      const place = new CityPoint(0xff00ff);
      place.latitude = c[0];
      place.longitude = c[1];
      this.cities.push(place);
      this.scene.add(place);

      const line = new CityLine(this.japan, place);
      this.citiesLine.push(line);
      this.scene.add(line);
    });
  }
  ngOnInit() {
    this.setUpThree();
    this.addAmbientLight();
    this.addSpotLight();
    this.earth = new Earth();
    this.scene.add(this.earth);
    this.addBackground();
    this.addJapan();
    this.addCities();

    this.satellite = new CityPoint(0xff0000);
    this.scene.add(this.satellite);
    this.update();
  }

  update() {
    this.renderer.render(this.scene, this.camera);
    this.satellite.longitude = this.satellite.longitude + 1;

    this.earth.update();
    this.japan.update();
    this.cities.map((city, index) => {
      city.update();
      this.citiesLine[index].update();
    });
    this.citiesLine.map((cityline, index) => {
      cityline.update();
    });
    this.satellite.update();
    requestAnimationFrame(() => {
      this.update();
    });
  }
}
