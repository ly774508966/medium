import { mat4 } from 'gl-matrix';
import { Renderer, GL, UniformBuffers } from '../../../../src/index.ts';

let gl;

export default class StereoRender extends Renderer {
  drawObjects = (scene, camera) => {
    if (gl instanceof window.WebGL2RenderingContext) {
      // Update global uniform buffers
      UniformBuffers.updateProjectionView(
        gl,
        camera.projectionMatrix,
        scene.modelViewMatrix,
      );
    }

    // Render the scene objects
    scene.objects.forEach(child => {
      if (child.isInstanced) {
        child.drawInstance(
          scene.modelViewMatrix,
          camera.projectionMatrix,
          camera,
        );
      } else {
        child.draw(scene.modelViewMatrix, camera.projectionMatrix, camera);
      }
    });
  };

  render(
    scene,
    leftProjectionMatrix,
    leftViewMatrix,
    rightProjectionMatrix,
    rightViewMatrix,
    cameraL,
    cameraR,
  ) {
    gl = GL.get();

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Draw both eyes
    mat4.identity(scene.modelViewMatrix);

    // Update the scene
    scene.update();

    // Left
    gl.viewport(0.0, 0.0, gl.drawingBufferWidth * 0.5, gl.drawingBufferHeight);

    mat4.lookAt(
      leftViewMatrix,
      cameraL.position.v,
      cameraL.target.v,
      cameraL.up.v,
    );

    this.drawObjects(scene, cameraL, leftViewMatrix);

    // Right
    gl.viewport(
      gl.drawingBufferWidth * 0.5,
      0,
      gl.drawingBufferWidth * 0.5,
      gl.drawingBufferHeight,
    );

    mat4.lookAt(
      rightViewMatrix,
      cameraR.position.v,
      cameraR.target.v,
      cameraR.up.v,
    );

    this.drawObjects(scene, cameraR, rightViewMatrix);
  }
}
