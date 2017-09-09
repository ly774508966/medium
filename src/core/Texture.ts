import EventDispatcher from '../core/EventDispatcher';
import HdrLoader from '../loaders/HdrLoader';
import ImageLoader from '../loaders/ImageLoader';
import { warn } from '../utils/Console';
import * as GL from './GL';
import ImageData from './ImageData';

let gl: WebGL2RenderingContext | WebGLRenderingContext;

interface Options {
  src?: number;
  magFilter?: number;
  minFilter?: number;
  wrapS?: number;
  wrapT?: number;
  resizeToPow2?: number;
}

export default class Texture extends EventDispatcher {
  public src: string;
  public magFilter: number;
  public minFilter: number;
  public wrapS: number;
  public wrapT: number;
  public resizeToPow2: boolean;
  public texture: WebGLTexture;
  public _isHdr: boolean;
  public image: HTMLImageElement;

  constructor(options: Options) {
    super();
    gl = GL.get();

    this.src = '';
    this.magFilter = gl.NEAREST;
    this.minFilter = gl.NEAREST;
    this.wrapS = gl.CLAMP_TO_EDGE;
    this.wrapT = gl.CLAMP_TO_EDGE;
    this.resizeToPow2 = false;

    Object.assign(this, options);

    this.texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      this.placeholder()
    );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.magFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.minFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this.wrapS);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this.wrapT);
    gl.bindTexture(gl.TEXTURE_2D, null);

    this._isHdr = this.src.split('.').pop() === 'hdr';
    this.load(this.src);
  }

  public load(src: string) {
    if (this._isHdr) {
      HdrLoader(src)
        .then(this.onTextureLoaded)
        .catch(this.onTextureError);
    } else {
      ImageLoader(src)
        .then(this.onTextureLoaded)
        .catch(this.onTextureError);
    }
  }

  public onTextureLoaded = response => {
    this.image = response;
    this.update(this.image);
    this.emit('loaded');
  };

  public onTextureError = (error: string) => {
    warn(error);
    this.emit('error', error);
  };

  public updateImage(src: string) {
    this.src = src || this.src;
    this.load(this.src);
  }

  public update(image: HTMLCanvasElement | HTMLImageElement | ImageData) {
    gl = GL.get();

    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    if (image instanceof ImageData && gl instanceof WebGL2RenderingContext) {
      // This is only for hdr data texture atm
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA16F,
        image.width,
        image.height,
        0,
        gl.RGBA,
        gl.FLOAT,
        image.data
      );
    } else {
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        this._resizeImage()
      );
    }
    gl.bindTexture(gl.TEXTURE_2D, null);
  }

  public placeholder() {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas;
  }

  public _resizeImage() {
    if (!this.resizeToPow2 || this.image instanceof ImageData)
      return this.image;

    // 2, 4, 8, 16... 4096
    const sizes = Array(12)
      .fill(0)
      .map((i, j) => {
        return Math.pow(2, j + 1);
      });

    // Return if the image size is already a power of 2
    sizes.forEach(powSize => {
      if (this.image.width === powSize && this.image.height === powSize) {
        return this.image;
      }
      return false;
    });

    const imageSize = Math.max(this.image.width, this.image.height);

    const size = sizes.reduce((prev, curr) => {
      return Math.abs(curr - imageSize) < Math.abs(prev - imageSize)
        ? curr
        : prev;
    });

    // Draw canvas with texture cropped inside
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = size;
    canvas.height = size;
    ctx.drawImage(this.image, 0, 0, size, size);

    return canvas;
  }

  public dispose() {
    gl = GL.get();
    gl.deleteTexture(this.texture);
    this.texture = null;
  }
}
