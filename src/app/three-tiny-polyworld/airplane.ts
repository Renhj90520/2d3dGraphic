import * as THREE from "three";
export default class Airplane extends THREE.Group {
  propeller;
  constructor() {
    super();
    const geoCockpit = new THREE.BoxGeometry(80, 50, 50, 1, 1, 1);
    const matCockpit = new THREE.MeshPhongMaterial({
      color: 0xf25346,
      flatShading: true
    });

    geoCockpit.vertices[4].y -= 10;
    geoCockpit.vertices[4].z += 10;
    geoCockpit.vertices[5].y -= 10;
    geoCockpit.vertices[5].z -= 20;
    geoCockpit.vertices[6].y += 30;
    geoCockpit.vertices[6].z += 20;
    geoCockpit.vertices[7].y += 30;
    geoCockpit.vertices[7].y -= 20;

    const cockpit = new THREE.Mesh(geoCockpit, matCockpit);
    cockpit.castShadow = true;
    cockpit.receiveShadow = true;
    this.add(cockpit);

    const geoEngine = new THREE.BoxGeometry(20, 50, 50, 1, 1, 1);
    const matEngine = new THREE.MeshPhongMaterial({
      color: 0xd8d0d1,
      flatShading: true
    });

    const engine = new THREE.Mesh(geoEngine, matEngine);
    engine.position.x = 40;
    engine.castShadow = true;
    engine.receiveShadow = true;
    this.add(engine);

    const geoTailPlane = new THREE.BoxGeometry(15, 20, 5, 1, 1, 1);
    const matTailPlane = new THREE.MeshPhongMaterial({
      color: 0xf25346,
      flatShading: true
    });
    const tailPlane = new THREE.Mesh(geoTailPlane, matTailPlane);
    tailPlane.position.set(-35, 25, 0);
    tailPlane.castShadow = true;
    tailPlane.receiveShadow = true;
    this.add(tailPlane);

    const geoSideWing = new THREE.BoxGeometry(40, 4, 150, 1, 1, 1);
    const matSideWing = new THREE.MeshPhongMaterial({
      color: 0xf25346,
      flatShading: true
    });

    const sideWingTop = new THREE.Mesh(geoSideWing, matSideWing);
    const sideWingBottom = new THREE.Mesh(geoSideWing, matSideWing);
    sideWingTop.castShadow = true;
    sideWingTop.receiveShadow = true;
    sideWingBottom.castShadow = true;
    sideWingBottom.receiveShadow = true;

    sideWingTop.position.set(20, 12, 0);
    sideWingBottom.position.set(20, -3, 0);
    this.add(sideWingTop);
    this.add(sideWingBottom);

    const geoWindshield = new THREE.BoxGeometry(3, 15, 20, 1, 1, 1);
    const matWindshield = new THREE.MeshPhongMaterial({
      color: 0xd8d0d1,
      transparent: true,
      opacity: 0.3,
      flatShading: true
    });

    const windshield = new THREE.Mesh(geoWindshield, matWindshield);
    windshield.position.set(5, 27, 0);
    windshield.castShadow = true;
    windshield.receiveShadow = true;
    this.add(windshield);

    const geoPropeller = new THREE.BoxGeometry(20, 10, 10, 1, 1, 1);
    geoPropeller.vertices[4].y -= 5;
    geoPropeller.vertices[4].z += 5;
    geoPropeller.vertices[5].y -= 5;
    geoPropeller.vertices[5].z -= 5;
    geoPropeller.vertices[6].y += 5;
    geoPropeller.vertices[6].z += 5;
    geoPropeller.vertices[7].y += 5;
    geoPropeller.vertices[7].z -= 5;
    const matPropeller = new THREE.MeshPhongMaterial({
      color: 0x59332e,
      flatShading: true
    });

    this.propeller = new THREE.Mesh(geoPropeller, matPropeller);
    this.propeller.castShadow = true;
    this.propeller.receiveShadow = true;

    const geoBlade1 = new THREE.BoxGeometry(1, 100, 10, 1, 1, 1);
    const geoBlade2 = new THREE.BoxGeometry(1, 10, 100, 1, 1, 1);

    const matBlade = new THREE.MeshPhongMaterial({
      color: 0x23190f,
      flatShading: true
    });
    const blade1 = new THREE.Mesh(geoBlade1, matBlade);
    blade1.position.set(8, 0, 0);
    blade1.castShadow = true;
    blade1.receiveShadow = true;

    const blade2 = new THREE.Mesh(geoBlade2, matBlade);
    blade2.position.set(8, 0, 0);
    blade2.castShadow = true;
    blade2.receiveShadow = true;

    this.propeller.add(blade1, blade2);

    this.propeller.position.set(50, 0, 0);
    this.add(this.propeller);

    const wheelProtecGeo = new THREE.BoxGeometry(30, 15, 10, 1, 1, 1);
    const wheelProtecMat = new THREE.MeshPhongMaterial({
      color: 0xd8d0d1,
      flatShading: true
    });
    const wheelProtecR = new THREE.Mesh(wheelProtecGeo, wheelProtecMat);
    wheelProtecR.position.set(25, -20, 25);
    this.add(wheelProtecR);

    const wheelTireGeom = new THREE.BoxGeometry(24, 24, 4);
    const wheelTireMat = new THREE.MeshPhongMaterial({
      color: 0x23190f,
      flatShading: true
    });
    const wheelTireR = new THREE.Mesh(wheelTireGeom, wheelTireMat);
    wheelTireR.position.set(25, -28, 25);

    const wheelAxisGeom = new THREE.BoxGeometry(10, 10, 6);
    const wheelAxisMat = new THREE.MeshPhongMaterial({
      color: 0x59332e,
      flatShading: true
    });
    const wheelAxis = new THREE.Mesh(wheelAxisGeom, wheelAxisMat);
    wheelTireR.add(wheelAxis);

    this.add(wheelTireR);

    const wheelProtecL = wheelProtecR.clone();
    wheelProtecL.position.z = -wheelProtecR.position.z;
    this.add(wheelProtecL);

    const wheelTireL = wheelTireR.clone();
    wheelTireL.position.z = -wheelTireR.position.z;
    this.add(wheelTireL);

    const wheelTireB = wheelTireR.clone();
    wheelTireB.scale.set(0.5, 0.5, 0.5);
    wheelTireB.position.set(-35, -5, 0);
    this.add(wheelTireB);

    const suspensionGeom = new THREE.BoxGeometry(4, 20, 4);
    suspensionGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 10, 0));
    const suspensionMat = new THREE.MeshPhongMaterial({
      color: 0xf25346,
      flatShading: true
    });
    const suspension = new THREE.Mesh(suspensionGeom, suspensionMat);
    suspension.position.set(-35, -5, 0);
    suspension.rotation.z = -0.3;
    this.add(suspension);
  }

  update() {
    this.propeller.rotation.x += 0.3;
  }
}
