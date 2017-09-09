import { mat4 } from 'gl-matrix';
import Camera from '../cameras/Camera';
import OrthographicCamera from '../cameras/OrthographicCamera';
import PerspectiveCamera from '../cameras/PerspectiveCamera';
import Geometry from '../geometry/Geometry';
import { extensions } from './Capabilities';
import * as GL from './GL';
import Object3D from './Object3D';
import Shader from './Shader';
import Vao from './Vao';

let gl: WebGL2RenderingContext | WebGLRenderingContext;

export default class Mesh extends Object3D {
  public geometry: Geometry;
  public shader: Shader;
  public vao: Vao;
  public visible: boolean;
  public instanceCount: number;
  public isInstanced: boolean;

  constructor(geometry: Geometry, shader: Shader) {
    super();
    this.geometry = geometry;
    this.shader = shader;
    this.vao = new Vao();
    this.visible = true;
    this.instanceCount = 0;
    // Allow meshes to share shaders and programs
    if (!this.shader.program.created) {
      this.shader.create(this.geometry);
    }
    this.isInstanced = false;

    gl = GL.get();

    // Setup vao
    this.vao.bind();
    this.bindAttributes();
    this.bindAttributesInstanced();
    this.bindIndexBuffer();
    this.vao.unbind();
  }

  public setInstanceCount(value: number) {
    gl = GL.get();
    this.instanceCount = value;
    this.isInstanced = true;
  }

  public bindAttributes() {
    // Attributes
    Object.keys(this.geometry.attributes).forEach(attributeName => {
      if (attributeName !== 'aIndex') {
        // enableVertexAttribArray
        this.shader.program.setAttributeLocation(attributeName);
        // Bind buffer
        this.geometry.attributes[attributeName].bind();
        // vertexAttribPointer
        this.shader.program.setAttributePointer(
          attributeName,
          this.geometry.attributes[attributeName].itemSize
        );
      }
    });
  }

  public bindAttributesInstanced() {
    // Instanced Attributes
    Object.keys(this.geometry.attributesInstanced).forEach(attributeName => {
      if (attributeName !== 'aIndex') {
        // enableVertexAttribArray
        this.shader.program.setAttributeLocation(attributeName);
        // Bind buffer
        this.geometry.attributesInstanced[attributeName].bind();
        // vertexAttribPointer
        this.shader.program.setAttributeInstancedPointer(
          attributeName,
          this.geometry.attributesInstanced[attributeName].itemSize
        );
        if (gl instanceof WebGL2RenderingContext) {
          gl.vertexAttribDivisor(
            this.shader.program.attributeLocations[attributeName],
            1
          );
        } else {
          extensions.angleInstancedArrays.vertexAttribDivisorANGLE(
            this.shader.program.attributeLocations[attributeName],
            1
          );
        }
      }
    });
  }

  public bindIndexBuffer() {
    // Bind index buffer
    if (this.geometry.bufferIndices) {
      this.geometry.attributes.aIndex.bind();
    }
  }

  public draw(camera: Camera | PerspectiveCamera | OrthographicCamera) {
    if (!this.visible) return;

    gl = GL.get();

    // Update modelMatrix
    this.updateMatrix(camera);

    this.shader.program.bind();

    // Culling enable
    if (this.shader.culling !== -1) {
      gl.enable(gl.CULL_FACE);
      gl.cullFace(this.shader.culling);
    }

    this.shader.setUniforms(
      camera.projectionMatrix,
      this.modelViewMatrix,
      this.modelMatrix,
      camera
    );

    if (extensions.vertexArrayObject) {
      this.vao.bind();
    } else {
      this.bindAttributes();
      this.bindAttributesInstanced();
      this.bindIndexBuffer();
    }

    if (this.geometry.attributes.aIndex) {
      gl.drawElements(
        this.shader.drawType,
        this.geometry.attributes.aIndex.numItems,
        gl.UNSIGNED_SHORT,
        0
      );
    } else {
      gl.drawArrays(
        this.shader.drawType,
        0,
        this.geometry.attributes.aVertexPosition.numItems
      );
    }

    if (extensions.vertexArrayObject) {
      this.vao.unbind();
    }

    // Culling disable
    if (this.shader.culling !== -1) {
      gl.disable(gl.CULL_FACE);
    }
  }

  public drawInstance(camera: Camera | PerspectiveCamera | OrthographicCamera) {
    if (!this.visible) return;

    gl = GL.get();

    // Update modelMatrix
    this.updateMatrix(camera);

    this.shader.program.bind();
    this.shader.setUniforms(
      camera.projectionMatrix,
      this.modelViewMatrix,
      this.modelMatrix,
      camera
    );

    // Culling enable
    if (this.shader.culling !== -1) {
      gl.enable(gl.CULL_FACE);
      gl.cullFace(this.shader.culling);
    }

    if (extensions.vertexArrayObject) {
      this.vao.bind();
    } else {
      this.bindAttributes();
      this.bindAttributesInstanced();
      this.bindIndexBuffer();
    }

    if (gl instanceof WebGL2RenderingContext) {
      gl.drawElementsInstanced(
        this.shader.drawType,
        this.geometry.attributes.aIndex.numItems,
        gl.UNSIGNED_SHORT,
        0,
        this.instanceCount
      );
    } else {
      extensions.angleInstancedArrays.drawElementsInstancedANGLE(
        this.shader.drawType,
        this.geometry.attributes.aIndex.numItems,
        gl.UNSIGNED_SHORT,
        0,
        this.instanceCount
      );
    }

    if (extensions.vertexArrayObject) {
      this.vao.unbind();
    }

    // Culling disable
    if (this.shader.culling !== -1) {
      gl.disable(gl.CULL_FACE);
    }
  }

  public dispose() {
    this.shader.dispose();
    this.geometry.dispose();
    this.vao.dispose();
    this.geometry = null;
    this.shader = null;
    super.dispose();
  }
}
