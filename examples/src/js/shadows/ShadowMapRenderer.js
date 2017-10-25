import { mat4, vec3 } from 'gl-matrix';
import { PerspectiveCamera, RenderTarget } from '../../../../src/index.ts';

const UP = vec3.fromValues(0, 1, 0);

export default class ShadowMapRenderer {
  constructor(light) {
    this.light = light;
    this.camera = new PerspectiveCamera({
      near: 0.01,
      far: 50,
      fov: 70
    });
    this.lightViewMatrix = mat4.create();
    this.center = vec3.fromValues(0, 0, 0);
    mat4.translate(
      this.lightViewMatrix,
      this.lightViewMatrix,
      this.light.position.v
    );
    mat4.lookAt(this.lightViewMatrix, this.light.position.v, this.center, UP);

    // Render target
    this.renderTarget = new RenderTarget({
      width: 1024,
      height: 1024
    });
  }

  resize(width, height) {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  render(scene) {
    mat4.identity(this.lightViewMatrix);
    mat4.translate(
      this.lightViewMatrix,
      this.lightViewMatrix,
      this.light.position.v
    );
    mat4.lookAt(this.lightViewMatrix, this.light.position.v, this.center, UP);
    this.renderTarget.render(scene, this.camera);
  }
}
