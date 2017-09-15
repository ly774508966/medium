/* eslint-disable */

// Copyright 2016 The Draco Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

// If |dracoDecoderType|.type is set to "js", then DRACOLoader will load the
// Draco JavaScript decoder.

import { FileLoader, Geometry } from '../../../../src/index.ts';

// TODO These needs to be defined by medium constants
const TrianglesDrawMode = 1;
const TriangleStripDrawMode = 2;

const DRACOLoader = function(dracoDecoderType, scriptPath) {
  this.timeLoaded = 0;
  this.materials = null;
  this.verbosity = 0;
  this.attributeOptions = {};
  this.dracoDecoderType =
    dracoDecoderType !== undefined ? dracoDecoderType : {};
  this.drawMode = TrianglesDrawMode;
  DRACOLoader.scriptPath = scriptPath;
  DRACOLoader.loadDracoDecoder(this);
};

DRACOLoader.prototype = {
  constructor: DRACOLoader,

  load(url, onLoad, onProgress, onError) {
    // const scope = this;
    // // const loader = new FileLoader(scope.manager);
    // loader.setPath(this.path);
    // loader.setResponseType('arraybuffer');
    // if (this.crossOrigin !== undefined) {
    //   loader.crossOrigin = this.crossOrigin;
    // }
    // loader.load(
    //   url,
    //   blob => {
    //     scope.decodeDracoFile(blob, onLoad);
    //   },
    //   onProgress,
    //   onError
    // );
    FileLoader(url, 'arraybuffer')
      .then(blob => {
        this.decodeDracoFile(blob, onLoad);
      })
      .catch(onError);
  },

  setPath(value) {
    this.path = value;
  },

  setCrossOrigin(value) {
    this.crossOrigin = value;
  },

  setVerbosity(level) {
    this.verbosity = level;
  },

  /**
     *  Sets desired mode for generated geometry indices.
     *  Can be either:
     *      TrianglesDrawMode
     *      TriangleStripDrawMode
     */
  setDrawMode(drawMode) {
    this.drawMode = drawMode;
  },

  /**
     * Skips dequantization for a specific attribute.
     * |attributeName| is the js name of the given attribute type.
     * The only currently supported |attributeName| is 'position', more may be
     * added in future.
     */
  setSkipDequantization(attributeName, skip) {
    let skipDequantization = true;
    if (typeof skip !== 'undefined') skipDequantization = skip;
    this.getAttributeOptions(
      attributeName,
    ).skipDequantization = skipDequantization;
  },

  decodeDracoFile(rawBuffer, callback) {
    const scope = this;
    DRACOLoader.getDecoder(this, dracoDecoder => {
      scope.decodeDracoFileInternal(rawBuffer, dracoDecoder, callback);
    });
  },

  decodeDracoFileInternal(rawBuffer, dracoDecoder, callback) {
    /*
       * Here is how to use Draco Javascript decoder and get the geometry.
       */
    const buffer = new dracoDecoder.DecoderBuffer();
    buffer.Init(new Int8Array(rawBuffer), rawBuffer.byteLength);
    const decoder = new dracoDecoder.Decoder();

    /*
       * Determine what type is this file: mesh or point cloud.
       */
    const geometryType = decoder.GetEncodedGeometryType(buffer);
    if (geometryType == dracoDecoder.TRIANGULAR_MESH) {
      if (this.verbosity > 0) {
        console.log('Loaded a mesh.');
      }
    } else if (geometryType == dracoDecoder.POINT_CLOUD) {
      if (this.verbosity > 0) {
        console.log('Loaded a point cloud.');
      }
    } else {
      const errorMsg = 'DRACOLoader: Unknown geometry type.';
      console.error(errorMsg);
      throw new Error(errorMsg);
    }
    callback(
      this.convertDracoGeometry(dracoDecoder, decoder, geometryType, buffer),
    );
  },

  convertDracoGeometry(dracoDecoder, decoder, geometryType, buffer) {
    if (this.getAttributeOptions('position').skipDequantization === true) {
      decoder.SkipAttributeTransform(dracoDecoder.POSITION);
    }
    let dracoGeometry;
    let decodingStatus;
    const start_time = performance.now();

    if (geometryType === dracoDecoder.TRIANGULAR_MESH) {
      dracoGeometry = new dracoDecoder.Mesh();
      decodingStatus = decoder.DecodeBufferToMesh(buffer, dracoGeometry);
    } else {
      dracoGeometry = new dracoDecoder.PointCloud();
      decodingStatus = decoder.DecodeBufferToPointCloud(buffer, dracoGeometry);
    }
    if (!decodingStatus.ok() || dracoGeometry.ptr == 0) {
      var errorMsg = 'DRACOLoader: Decoding failed: ';
      errorMsg += decodingStatus.error_msg();
      console.error(errorMsg);
      dracoDecoder.destroy(decoder);
      dracoDecoder.destroy(dracoGeometry);
      throw new Error(errorMsg);
    }

    const decode_end = performance.now();
    dracoDecoder.destroy(buffer);
    /*
         * Example on how to retrieve mesh and attributes.
         */
    let numFaces, numPoints;
    let numVertexCoordinates, numTextureCoordinates, numColorCoordinates;
    let numAttributes;
    let numColorCoordinateComponents = 3;
    // For output basic geometry information.
    let geometryInfoStr;
    if (geometryType == dracoDecoder.TRIANGULAR_MESH) {
      numFaces = dracoGeometry.num_faces();
      if (this.verbosity > 0) {
        console.log(`Number of faces loaded: ${numFaces.toString()}`);
      }
    } else {
      numFaces = 0;
    }
    numPoints = dracoGeometry.num_points();
    numVertexCoordinates = numPoints * 3;
    numTextureCoordinates = numPoints * 2;
    numColorCoordinates = numPoints * 3;
    numAttributes = dracoGeometry.num_attributes();
    if (this.verbosity > 0) {
      console.log(`Number of points loaded: ${numPoints.toString()}`);
      console.log(`Number of attributes loaded: ${numAttributes.toString()}`);
    }

    // Get position attribute. Must exists.
    const posAttId = decoder.GetAttributeId(
      dracoGeometry,
      dracoDecoder.POSITION,
    );
    if (posAttId == -1) {
      var errorMsg = 'DRACOLoader: No position attribute found.';
      console.error(errorMsg);
      dracoDecoder.destroy(decoder);
      dracoDecoder.destroy(dracoGeometry);
      throw new Error(errorMsg);
    }
    const posAttribute = decoder.GetAttribute(dracoGeometry, posAttId);
    const posAttributeData = new dracoDecoder.DracoFloat32Array();
    decoder.GetAttributeFloatForAllPoints(
      dracoGeometry,
      posAttribute,
      posAttributeData,
    );
    // Get color attributes if exists.
    const colorAttId = decoder.GetAttributeId(
      dracoGeometry,
      dracoDecoder.COLOR,
    );
    let colAttributeData;
    if (colorAttId != -1) {
      if (this.verbosity > 0) {
        console.log('Loaded color attribute.');
      }
      const colAttribute = decoder.GetAttribute(dracoGeometry, colorAttId);
      if (colAttribute.num_components() === 4) {
        numColorCoordinates = numPoints * 4;
        numColorCoordinateComponents = 4;
      }
      colAttributeData = new dracoDecoder.DracoFloat32Array();
      decoder.GetAttributeFloatForAllPoints(
        dracoGeometry,
        colAttribute,
        colAttributeData,
      );
    }

    // Get normal attributes if exists.
    const normalAttId = decoder.GetAttributeId(
      dracoGeometry,
      dracoDecoder.NORMAL,
    );
    let norAttributeData;
    if (normalAttId != -1) {
      if (this.verbosity > 0) {
        console.log('Loaded normal attribute.');
      }
      const norAttribute = decoder.GetAttribute(dracoGeometry, normalAttId);
      norAttributeData = new dracoDecoder.DracoFloat32Array();
      decoder.GetAttributeFloatForAllPoints(
        dracoGeometry,
        norAttribute,
        norAttributeData,
      );
    }

    // Get texture coord attributes if exists.
    const texCoordAttId = decoder.GetAttributeId(
      dracoGeometry,
      dracoDecoder.TEX_COORD,
    );
    let textCoordAttributeData;
    if (texCoordAttId != -1) {
      if (this.verbosity > 0) {
        console.log('Loaded texture coordinate attribute.');
      }
      const texCoordAttribute = decoder.GetAttribute(
        dracoGeometry,
        texCoordAttId,
      );
      textCoordAttributeData = new dracoDecoder.DracoFloat32Array();
      decoder.GetAttributeFloatForAllPoints(
        dracoGeometry,
        texCoordAttribute,
        textCoordAttributeData,
      );
    }

    // Structure for converting to THREEJS geometry later.
    const geometryBuffer = {
      vertices: new Float32Array(numVertexCoordinates),
      normals: new Float32Array(numVertexCoordinates),
      uvs: new Float32Array(numTextureCoordinates),
      colors: new Float32Array(numColorCoordinates),
    };

    for (var i = 0; i < numVertexCoordinates; i += 3) {
      geometryBuffer.vertices[i] = posAttributeData.GetValue(i);
      geometryBuffer.vertices[i + 1] = posAttributeData.GetValue(i + 1);
      geometryBuffer.vertices[i + 2] = posAttributeData.GetValue(i + 2);
      // Add normal.
      if (normalAttId != -1) {
        geometryBuffer.normals[i] = norAttributeData.GetValue(i);
        geometryBuffer.normals[i + 1] = norAttributeData.GetValue(i + 1);
        geometryBuffer.normals[i + 2] = norAttributeData.GetValue(i + 2);
      }
    }

    // Add color.
    for (var i = 0; i < numColorCoordinates; i += 1) {
      if (colorAttId != -1) {
        // Draco colors are already normalized.
        geometryBuffer.colors[i] = colAttributeData.GetValue(i);
      } else {
        // Default is white. This is faster than TypedArray.fill().
        geometryBuffer.colors[i] = 1.0;
      }
    }

    // Add texture coordinates.
    if (texCoordAttId != -1) {
      for (var i = 0; i < numTextureCoordinates; i += 2) {
        geometryBuffer.uvs[i] = textCoordAttributeData.GetValue(i);
        geometryBuffer.uvs[i + 1] = textCoordAttributeData.GetValue(i + 1);
      }
    }

    dracoDecoder.destroy(posAttributeData);
    if (colorAttId != -1) dracoDecoder.destroy(colAttributeData);
    if (normalAttId != -1) dracoDecoder.destroy(norAttributeData);
    if (texCoordAttId != -1) dracoDecoder.destroy(textCoordAttributeData);

    // For mesh, we need to generate the faces.
    if (geometryType == dracoDecoder.TRIANGULAR_MESH) {
      if (this.drawMode === TriangleStripDrawMode) {
        const stripsArray = new dracoDecoder.DracoInt32Array();
        const numStrips = decoder.GetTriangleStripsFromMesh(
          dracoGeometry,
          stripsArray,
        );
        geometryBuffer.indices = new Uint32Array(stripsArray.size());
        for (var i = 0; i < stripsArray.size(); ++i) {
          geometryBuffer.indices[i] = stripsArray.GetValue(i);
        }
        dracoDecoder.destroy(stripsArray);
      } else {
        const numIndices = numFaces * 3;
        geometryBuffer.indices = new Uint32Array(numIndices);
        const ia = new dracoDecoder.DracoInt32Array();
        for (var i = 0; i < numFaces; ++i) {
          decoder.GetFaceFromMesh(dracoGeometry, i, ia);
          const index = i * 3;
          geometryBuffer.indices[index] = ia.GetValue(0);
          geometryBuffer.indices[index + 1] = ia.GetValue(1);
          geometryBuffer.indices[index + 2] = ia.GetValue(2);
        }
        dracoDecoder.destroy(ia);
      }
    }

    // Import data to Three JS geometry.
    // const geometry = new Geometry();
    // geometry.drawMode = this.drawMode;
    const vertices = new Float32Array(geometryBuffer.vertices);
    let indices =
      geometryBuffer.indices.length > 65535
        ? new Uint32Array(indices)
        : new Uint16Array(indices);
    const normals = new Float32Array(
      normalAttId != -1
        ? geometryBuffer.normals
        : geometryBuffer.vertices.length,
    );
    let uvs;

    if (geometryType == dracoDecoder.TRIANGULAR_MESH) {
      indices = geometryBuffer.indices;
    }
    // const posTransform = new dracoDecoder.AttributeQuantizationTransform();
    // if (posTransform.InitFromAttribute(posAttribute)) {
    //   // Quantized attribute. Store the quantization parameters into the
    //   // js attribute.
    //   geometry.attributes.position.isQuantized = true;
    //   geometry.attributes.position.maxRange = posTransform.range();
    //   geometry.attributes.position.numQuantizationBits = posTransform.quantization_bits();
    //   geometry.attributes.position.minValues = new Float32Array(3);
    //   for (var i = 0; i < 3; ++i) {
    //     geometry.attributes.position.minValues[i] = posTransform.min_value(i);
    //   }
    // }
    // dracoDecoder.destroy(posTransform);
    // geometry.addAttribute(
    //   'color',
    //   new Float32BufferAttribute(
    //     geometryBuffer.colors,
    //     numColorCoordinateComponents
    //   )
    // );
    if (texCoordAttId != -1) {
      uvs = new Float32Array(geometryBuffer.uvs);
    }

    const geometry = new Geometry(
      vertices,
      indices,
      normals,
      uvs,
      // colors
    );

    // This can be slow if the model is large
    // Let the developer decide if they want to calculate normals after..

    // if (normalAttId === -1) {
    //   geometry.updateNormals();
    // }

    dracoDecoder.destroy(decoder);
    dracoDecoder.destroy(dracoGeometry);

    this.decode_time = decode_end - start_time;
    this.import_time = performance.now() - decode_end;

    if (this.verbosity > 0) {
      console.log(`Decode time: ${this.decode_time}`);
      console.log(`Import time: ${this.import_time}`);
    }
    return geometry;
  },

  isVersionSupported(version, callback) {
    DRACOLoader.getDecoder(this, decoder => {
      callback(decoder.isVersionSupported(version));
    });
  },

  getAttributeOptions(attributeName) {
    if (typeof this.attributeOptions[attributeName] === 'undefined')
      this.attributeOptions[attributeName] = {};
    return this.attributeOptions[attributeName];
  },
};

// This function loads a JavaScript file and adds it to the page. "path"
// is the path to the JavaScript file. "onLoadFunc" is the function to be
// called when the JavaScript file has been loaded.
DRACOLoader.loadJavaScriptFile = function(path, onLoadFunc, dracoDecoder) {
  const head = document.getElementsByTagName('head')[0];
  const element = document.createElement('script');
  element.id = 'decoder_script';
  element.type = 'text/javascript';
  element.src = path;
  if (onLoadFunc !== null) {
    element.onload = onLoadFunc(dracoDecoder);
  } else {
    element.onload = function(dracoDecoder) {
      dracoDecoder.timeLoaded = performance.now();
    };
  }

  const previous_decoder_script = document.getElementById('decoder_script');
  if (previous_decoder_script !== null) {
    previous_decoder_script.parentNode.removeChild(previous_decoder_script);
  }
  head.appendChild(element);
};

DRACOLoader.loadWebAssemblyDecoder = function(dracoDecoder) {
  dracoDecoder.dracoDecoderType.wasmBinaryFile = `${DRACOLoader.scriptPath}/draco_decoder.wasm`;
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `${DRACOLoader.scriptPath}/draco_decoder.wasm`, true);
  xhr.responseType = 'arraybuffer';
  xhr.onload = function() {
    // draco_wasm_wrapper.js must be loaded before DracoDecoderModule is
    // created. The object passed into DracoDecoderModule() must contain a
    // property with the name of wasmBinary and the value must be an
    // ArrayBuffer containing the contents of the .wasm file.
    dracoDecoder.dracoDecoderType.wasmBinary = xhr.response;
    dracoDecoder.timeLoaded = performance.now();
  };
  xhr.send(null);
};

// This function will test if the browser has support for WebAssembly. If
// it does it will download the WebAssembly Draco decoder, if not it will
// download the asmjs Draco decoder.
DRACOLoader.loadDracoDecoder = function(dracoDecoder) {
  if (
    typeof WebAssembly !== 'object' ||
    dracoDecoder.dracoDecoderType.type === 'js'
  ) {
    // No WebAssembly support
    DRACOLoader.loadJavaScriptFile(
      `${this.scriptPath}/draco_decoder.js`,
      null,
      dracoDecoder,
    );
  } else {
    DRACOLoader.loadJavaScriptFile(
      `${this.scriptPath}/draco_wasm_wrapper.js`,
      dracoDecoder => {
        DRACOLoader.loadWebAssemblyDecoder(dracoDecoder);
      },
      dracoDecoder,
    );
  }
};

/**
 * Creates and returns a singleton instance of the DracoDecoderModule.
 * The module loading is done asynchronously for WebAssembly. Initialized module
 * can be accessed through the callback function
 * |onDracoDecoderModuleLoadedCallback|.
 */
DRACOLoader.getDecoder = (function() {
  let decoder;
  let decoderCreationCalled = false;

  return function(dracoDecoder, onDracoDecoderModuleLoadedCallback) {
    if (typeof decoder !== 'undefined') {
      // Module already initialized.
      if (typeof onDracoDecoderModuleLoadedCallback !== 'undefined') {
        onDracoDecoderModuleLoadedCallback(decoder);
      }
    } else {
      if (typeof DracoDecoderModule === 'undefined') {
        // Wait until the Draco decoder is loaded before starting the error
        // timer.
        if (dracoDecoder.timeLoaded > 0) {
          const waitMs = performance.now() - dracoDecoder.timeLoaded;

          // After loading the Draco JavaScript decoder file, there is still
          // some time before the DracoDecoderModule is defined. So start a
          // loop to check when the DracoDecoderModule gets defined. If the
          // time is hit throw an error.
          if (waitMs > 5000) {
            throw new Error('DRACOLoader: DracoDecoderModule not found.');
          }
        }
      } else if (!decoderCreationCalled) {
        decoderCreationCalled = true;
        dracoDecoder.dracoDecoderType.onModuleLoaded = function(module) {
          if (typeof onDracoDecoderModuleLoadedCallback === 'function') {
            decoder = module;
          }
        };
        DracoDecoderModule(dracoDecoder.dracoDecoderType);
      }

      // Either the DracoDecoderModule has not been defined or the decoder
      // has not been created yet. Call getDecoder() again.
      setTimeout(() => {
        DRACOLoader.getDecoder(
          dracoDecoder,
          onDracoDecoderModuleLoadedCallback,
        );
      }, 10);
    }
  };
})();

export default DRACOLoader;

/* eslint-enable */
