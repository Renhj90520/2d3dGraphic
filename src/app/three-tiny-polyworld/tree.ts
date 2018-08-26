import * as THREE from "three";
export default class Tree extends THREE.Group {
  constructor() {
    super();

    const materialLeaves = new THREE.MeshPhongMaterial({
      color: 0x458248,
      flatShading: true
    });

    const geoTreeBase = new THREE.BoxGeometry(10, 20, 10);
    const matTreeBase = new THREE.MeshBasicMaterial({ color: 0x59332e });
    const treeBase = new THREE.Mesh(geoTreeBase, matTreeBase);
    treeBase.castShadow = true;
    treeBase.receiveShadow = true;
    this.add(treeBase);

    const geoTreeLeaves1 = new THREE.CylinderGeometry(1, 12 * 3, 12 * 3, 4);
    const treeLeaves1 = new THREE.Mesh(geoTreeLeaves1, materialLeaves);
    treeLeaves1.castShadow = true;
    treeLeaves1.receiveShadow = true;
    treeLeaves1.position.y = 20;
    this.add(treeLeaves1);

    const geoTreeLeaves2 = new THREE.CylinderGeometry(1, 9 * 3, 9 * 3, 4);
    const treeLeaves2 = new THREE.Mesh(geoTreeLeaves2, materialLeaves);
    treeLeaves1.castShadow = true;
    treeLeaves1.receiveShadow = true;
    treeLeaves1.position.y = 40;
    this.add(treeLeaves2);

    const geoTreeLeaves3 = new THREE.CylinderGeometry(1, 6 * 3, 6 * 3, 4);
    const treeLeaves3 = new THREE.Mesh(geoTreeLeaves3, materialLeaves);
    treeLeaves1.castShadow = true;
    treeLeaves1.receiveShadow = true;
    treeLeaves1.position.y = 55;
    this.add(treeLeaves3);
  }
}
