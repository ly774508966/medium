import { mat4, vec3 } from 'gl-matrix';

import { Vector2, Vector3, Object3D } from '../../../../src/index.ts';

/**
 * Based on the original script by Jaume Sanchez Elias, @thespite
 * https://github.com/spite/THREE.DecalGeometry/blob/master/src/THREE.DecalGeometry.js
 */

class DecalVertex {
  constructor(v, n) {
    this.vertex = v;
    this.normal = n;
  }

  clone() {
    return new DecalVertex(this.vertex.clone(), this.normal.clone());
  }
}

export default class Decal {
  constructor(
    mesh,
    position,
    rotation,
    dimensions,
    check = new Vector3(1, 1, 1)
  ) {
    this.mesh = mesh;
    this.dimensions = dimensions;
    this.check = check;

    this.cube = new Object3D();
    this.cube.rotation.copy(rotation);
    this.cube.position.copy(position);
    this.cube.updateMatrix();

    this.inverseCubeMatrix = mat4.invert(mat4.create(), this.cube.modelMatrix);

    this.indices = [];
    this.vertices = [];
    this.normals = [];
    this.uvs = [];
  }

  clip = (v0, v1, p, size) => {
    const d0 = v0.vertex.dot(p) - size;
    const d1 = v1.vertex.dot(p) - size;

    const s = d0 / (d0 - d1);
    const v = new DecalVertex(
      new Vector3(
        v0.vertex.x + s * (v1.vertex.x - v0.vertex.x),
        v0.vertex.y + s * (v1.vertex.y - v0.vertex.y),
        v0.vertex.z + s * (v1.vertex.z - v0.vertex.z)
      ),
      new Vector3(
        v0.normal.x + s * (v1.normal.x - v0.normal.x),
        v0.normal.y + s * (v1.normal.y - v0.normal.y),
        v0.normal.z + s * (v1.normal.z - v0.normal.z)
      )
    );

    return v;
  };

  clipFace = (inVertices, plane) => {
    const size = 0.5 * Math.abs(this.dimensions.clone().dot(plane));

    if (inVertices.length === 0) return [];
    const outVertices = [];

    for (let j = 0; j < inVertices.length; j += 3) {
      let total = 0;

      const d1 = inVertices[j + 0].vertex.dot(plane) - size;
      const d2 = inVertices[j + 1].vertex.dot(plane) - size;
      const d3 = inVertices[j + 2].vertex.dot(plane) - size;

      const v1Out = d1 > 0;
      const v2Out = d2 > 0;
      const v3Out = d3 > 0;

      total = (v1Out ? 1 : 0) + (v2Out ? 1 : 0) + (v3Out ? 1 : 0);

      switch (total) {
        case 0: {
          outVertices.push(inVertices[j]);
          outVertices.push(inVertices[j + 1]);
          outVertices.push(inVertices[j + 2]);
          break;
        }
        case 1: {
          let nV1;
          let nV2;
          let nV3;
          let nV4;
          if (v1Out) {
            nV1 = inVertices[j + 1];
            nV2 = inVertices[j + 2];
            nV3 = this.clip(inVertices[j], nV1, plane, size);
            nV4 = this.clip(inVertices[j], nV2, plane, size);
          }
          if (v2Out) {
            nV1 = inVertices[j];
            nV2 = inVertices[j + 2];
            nV3 = this.clip(inVertices[j + 1], nV1, plane, size);
            nV4 = this.clip(inVertices[j + 1], nV2, plane, size);

            outVertices.push(nV3);
            outVertices.push(nV2.clone());
            outVertices.push(nV1.clone());

            outVertices.push(nV2.clone());
            outVertices.push(nV3.clone());
            outVertices.push(nV4);
            break;
          }
          if (v3Out) {
            nV1 = inVertices[j];
            nV2 = inVertices[j + 1];
            nV3 = this.clip(inVertices[j + 2], nV1, plane, size);
            nV4 = this.clip(inVertices[j + 2], nV2, plane, size);
          }

          outVertices.push(nV1.clone());
          outVertices.push(nV2.clone());
          outVertices.push(nV3);

          outVertices.push(nV4);
          outVertices.push(nV3.clone());
          outVertices.push(nV2.clone());

          break;
        }
        case 2: {
          let nV1;
          let nV2;
          let nV3;
          if (!v1Out) {
            nV1 = inVertices[j].clone();
            nV2 = this.clip(nV1, inVertices[j + 1], plane, size);
            nV3 = this.clip(nV1, inVertices[j + 2], plane, size);
            outVertices.push(nV1);
            outVertices.push(nV2);
            outVertices.push(nV3);
          }
          if (!v2Out) {
            nV1 = inVertices[j + 1].clone();
            nV2 = this.clip(nV1, inVertices[j + 2], plane, size);
            nV3 = this.clip(nV1, inVertices[j], plane, size);
            outVertices.push(nV1);
            outVertices.push(nV2);
            outVertices.push(nV3);
          }
          if (!v3Out) {
            nV1 = inVertices[j + 2].clone();
            nV2 = this.clip(nV1, inVertices[j], plane, size);
            nV3 = this.clip(nV1, inVertices[j + 1], plane, size);
            outVertices.push(nV1);
            outVertices.push(nV2);
            outVertices.push(nV3);
          }

          break;
        }
        default:
      }
    }

    return outVertices;
  };

  pushVertex(vertices, index, n) {
    const vertex = this.mesh.geometry.vertices[index].clone();
    vec3.transformMat4(vertex.v, vertex.v, this.mesh.modelMatrix);
    vec3.transformMat4(vertex.v, vertex.v, this.inverseCubeMatrix);
    vertices.push(new DecalVertex(vertex, n.clone()));
  }

  compute() {
    let finalVertices = [];

    const plane0 = new Vector3(1, 0, 0);
    const plane1 = new Vector3(-1, 0, 0);
    const plane2 = new Vector3(0, 1, 0);
    const plane3 = new Vector3(0, -1, 0);
    const plane4 = new Vector3(0, 0, 1);
    const plane5 = new Vector3(0, 0, -1);

    for (let i = 0; i < this.mesh.geometry.faces.length; i += 1) {
      const f = this.mesh.geometry.faces[i];
      const n = 3;
      let vertices = [];

      if (n === 3) {
        this.pushVertex(vertices, f.indices[0], f.normal);
        this.pushVertex(vertices, f.indices[1], f.normal);
        this.pushVertex(vertices, f.indices[2], f.normal);
      } else {
        this.pushVertex(vertices, f.indices[0], f.normal);
        this.pushVertex(vertices, f.indices[1], f.normal);
        this.pushVertex(vertices, f.indices[2], f.normal);

        this.pushVertex(vertices, f.indices[3], f.normal);
        this.pushVertex(vertices, f.indices[0], f.normal);
        this.pushVertex(vertices, f.indices[2], f.normal);
      }

      if (this.check.x) {
        vertices = this.clipFace(vertices, plane0);
        vertices = this.clipFace(vertices, plane1);
      }
      if (this.check.y) {
        vertices = this.clipFace(vertices, plane2);
        vertices = this.clipFace(vertices, plane3);
      }
      if (this.check.z) {
        vertices = this.clipFace(vertices, plane4);
        vertices = this.clipFace(vertices, plane5);
      }

      for (let j = 0; j < vertices.length; j += 1) {
        const v = vertices[j];

        this.uvs.push(
          new Vector2(
            0.5 + v.vertex.x / this.dimensions.x,
            0.5 + v.vertex.y / this.dimensions.y
          )
        );

        vec3.transformMat4(
          vertices[j].vertex.v,
          vertices[j].vertex.v,
          this.cube.modelMatrix
        );
      }

      if (vertices.length !== 0) {
        finalVertices = finalVertices.concat(vertices);
      }
    }

    for (let k = 0; k < finalVertices.length; k += 3) {
      this.vertices.push(
        finalVertices[k].vertex,
        finalVertices[k + 1].vertex,
        finalVertices[k + 2].vertex
      );

      this.indices.push(k, k + 1, k + 2);

      this.normals.push(
        finalVertices[k + 0].normal,
        finalVertices[k + 1].normal,
        finalVertices[k + 2].normal
      );
    }

    return {
      vertices: this.vertices,
      normals: this.normals,
      indices: this.indices,
      uvs: this.uvs
    };
  }

  dispose() {
    this.mesh = undefined;
    this.dimensions = undefined;
    this.check = undefined;
    this.cube = undefined;
    this.inverseCubeMatrix = undefined;
    this.indices = undefined;
    this.vertices = undefined;
    this.normals = undefined;
    this.uvs = undefined;
  }
}
