import * as THREE from "three";
import SimplexNoise from "./simplexNoise";

export default class Terrain {
  constructor() {}

  initPlaneGeometry(width, height, widthSegments, heightSegments) {
    const width_half = width / 2;
    const height_half = height / 2;
    const gridX = widthSegments;
    const gridZ = heightSegments;
    const gridX1 = gridX + 1;
    const gridZ1 = gridZ + 1;

    const segment_width = width / gridX;
    const segment_height = height / gridZ;
    const geometry = new THREE.PlaneGeometry(
      width,
      height,
      widthSegments,
      heightSegments
    );
    const normal = new THREE.Vector3(0, 0, 1);
    for (let iz = 0; iz < gridZ1; iz++) {
      for (let ix = 0; ix < gridX1; ix++) {
        const x = ix * segment_width - width_half;
        const y = ix * segment_height - height_half;

        geometry.vertices.push(new THREE.Vector3(x, -y, 0));
      }
    }

    for (let iz = 0; iz < gridZ; iz++) {
      for (let ix = 0; ix < gridX; ix++) {
        const a = ix + gridX1 * iz;
        const b = ix + gridX1 * (iz + 1);
        const c = ix + 1 + gridX1 * (iz + 1);
        const d = ix + 1 + gridX1 * iz;

        const uva = new THREE.Vector2(ix / gridX, 1 - iz / gridZ);
        const uvb = new THREE.Vector2(ix / gridX, 1 - (iz + 1) / gridZ);
        const uvc = new THREE.Vector2((ix + 1) / gridX, 1 - (iz + 1) / gridZ);
        const uvd = new THREE.Vector2((ix + 1) / gridX, 1 - iz / gridZ);

        const face = new THREE.Face3(a, b, c);
        face.normal.copy(normal);
        face.vertexNormals.push(normal.clone(), normal.clone(), normal.clone());

        geometry.faces.push(face);
        geometry.faceVertexUvs[0].push([uva, uvb, uvc]);

        const face1 = new THREE.Face3(b, c, d);
        face1.normal.copy(normal);
        face1.vertexNormals.push(
          normal.clone(),
          normal.clone(),
          normal.clone()
        );

        geometry.faces.push(face1);
        geometry.faceVertexUvs[0].push([uvb.clone(), uvc, uvd.clone()]);
      }
    }
    return geometry;
  }

  allocateHeightMap(width, depth) {
    const heightMap = new Array(width);
    for (let x = 0; x < width; x++) {
      heightMap[x] = new Float64Array(depth);
    }

    return heightMap;
  }

  simplexHeightMap(heightMap) {
    const width = heightMap.length;
    const depth = heightMap[0].length;

    const simplex = new SimplexNoise();

    for (let x = 0; x < width; x++) {
      for (let z = 0; z < depth; z++) {
        let height = 0;
        let level = 8;
        height += (simplex.noise(x / level, z / level) / 2 + 0.5) * 0.125;
        level *= 3;
        height += (simplex.noise(x / level, z / level) / 2 + 0.5) * 0.25;
        level *= 2;
        height += (simplex.noise(x / level, z / level) + 0.5) * 0.5;
        level *= 2;
        height += simplex.noise(x / level, z / level) / 2 + 0.5;
        height /= 1 + 0.5 + 0.25 + 0.125;
        heightMap[x][z] = height;
      }
    }
  }

  heightMapToPlaneGeometry(heightMap) {
    const width = heightMap.length;
    const depth = heightMap[0].length;
    const geometry = this.initPlaneGeometry(1, 1, width - 1, depth - 1);
    for (let x = 0; x < width; x++) {
      for (let z = 0; z < depth; z++) {
        const height = heightMap[x][z];
        const vertex = geometry.vertices[x + z * width];
        vertex.z = (height - 0.5) * 2;
      }
    }

    geometry.verticesNeedUpdate = true;
    geometry.computeFaceNormals();
    geometry.computeVertexNormals();
    geometry.normalsNeedUpdate = true;

    return geometry;
  }

  heightMapToVertexColor(heightMap, geometry) {
    const width = heightMap.length;

    for (let i = 0; i < geometry.faces.length; i++) {
      const face = geometry.faces[i];
      face.vertexColors.push(
        this.vertexIdxToColor(face.a, width, heightMap).clone()
      );
      face.vertexColors.push(
        this.vertexIdxToColor(face.b, width, heightMap).clone()
      );
      face.vertexColors.push(
        this.vertexIdxToColor(face.c, width, heightMap).clone()
      );
    }
    geometry.colorsNeedUpdate = true;
  }

  vertexIdxToColor(vertexIdx, width, heightMap) {
    const x = Math.floor(vertexIdx % width);
    const z = Math.floor(vertexIdx / width);
    const height = heightMap[x][z];
    return this.heightToColor(height);
  }

  heightMapToCanvas(heightMap, canvas?) {
    const width = heightMap.length;
    const depth = heightMap[0].length;

    canvas = canvas || document.createElement("canvas");
    canvas.width = width;
    canvas.height = depth;

    const ctx = canvas.getContext("2d");

    for (let x = 0; x < canvas.width; x++) {
      for (let y = 0; y < canvas.height; y++) {
        const height = heightMap[x][y];
        const color = this.heightToColor(height);

        ctx.fillStyle = color.getStyle();
        ctx.fillRect(x, y, 1, 1);
      }
    }

    return canvas;
  }

  heightToColor(height) {
    const color = new THREE.Color();
    if (height < 0.5) {
      height = height * 2 * 0.5 + 0.2;
      color.setRGB(0, 0, height);
    } else if (height < 0.7) {
      height = (height - 0.5) / 0.2;
      height = height * 0.5 + 0.2;
      color.setRGB(0, height, 0);
    } else {
      height = (height - 0.7) / 0.3;
      height = height * 0.5 + 0.5;
      color.setRGB(height, height, height);
    }

    return color;
  }
}
