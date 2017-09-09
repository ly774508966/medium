(function(e){function t(a){if(r[a])return r[a].exports;var i=r[a]={i:a,l:!1,exports:{}};return e[a].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var r={};return t.m=e,t.c=r,t.d=function(e,r,a){t.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:a})},t.n=function(e){var r=e&&e.__esModule?function(){return e['default']}:function(){return e};return t.d(r,'a',r),r},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p='',t(t.s=114)})([function(e,t,r){'use strict';function a(e,t,r=!1){const a=n.createBuffer(),i=r?n.DYNAMIC_DRAW:n.STATIC_DRAW,o=e===n.ARRAY_BUFFER?Float32Array:Uint16Array;return n.bindBuffer(e,a),n instanceof WebGL2RenderingContext?n.bufferData(e,new o(t),i,0):n.bufferData(e,new o(t),i),n.bindBuffer(e,null),a}function i(e){const t=n.createBuffer();return!!(n instanceof WebGL2RenderingContext)&&(n.bindBuffer(n.UNIFORM_BUFFER,t),n.bufferData(n.UNIFORM_BUFFER,new Float32Array(e),n.DYNAMIC_DRAW),n.bindBuffer(n.UNIFORM_BUFFER,null),t)}Object.defineProperty(t,'__esModule',{value:!0}),t.set=function(e,t){n=e,s=t,d=s===o.WEBGL2_CONTEXT},t.get=function(){return n},r.d(t,'webgl2',function(){return d}),r.d(t,'createBuffer',function(){return a}),r.d(t,'createUniformBuffer',function(){return i});var o=r(2);let n,s,d},function(e,t,r){'use strict';Object.defineProperty(t,'__esModule',{value:!0});var a=r(7),i=r(43),o=r(44),n=r(28),s=r(45),d=r(46),l=r(47),c=r(29),u=r(30);r.d(t,'glMatrix',function(){return a}),r.d(t,'mat2',function(){return i}),r.d(t,'mat2d',function(){return o}),r.d(t,'mat3',function(){return n}),r.d(t,'mat4',function(){return s}),r.d(t,'quat',function(){return d}),r.d(t,'vec2',function(){return l}),r.d(t,'vec3',function(){return c}),r.d(t,'vec4',function(){return u})},function(e,t){'use strict';Object.defineProperty(t,'__esModule',{value:!0});t.WEBGL_CONTEXT='webgl';const r='webgl2';t.WEBGL2_CONTEXT=r;t.RENDERER_DEFAULT_CONTEXT=r;const a=1280;t.RENDERER_DEFAULT_WIDTH=a;const i=720;t.RENDERER_DEFAULT_HEIGHT=i;t.RENDERER_DEFAULT_RATIO=a/i;t.PRECISION='highp';t.CULL_NONE=-1;t.CULL_BACK=1029;t.CULL_FRONT=1028;t.CULL_FRONT_AND_BACK=1032;t.DRAW_POINTS=0;t.DRAW_LINES=1;t.DRAW_LINE_LOOP=2;t.DRAW_LINE_STRIP=3;t.DRAW_TRIANGLES=4;t.UNIFORM_PROJECTION_VIEW_LOCATION=0;t.UNIFORM_AMBIENT_LIGHT_LOCATION=1;t.UNIFORM_DIRECTIONAL_LIGHTS_LOCATION=2;t.UNIFORM_POINT_LIGHTS_LOCATION=3;t.SHADER_BASIC='basic';t.SHADER_LAMBERT='lambert';t.SHADER_PHONG='phong';t.LIGHT_AMBIENT='ambient';t.LIGHT_DIRECTIONAL='directional';t.LIGHT_POINT='point'},function(e,t,r){'use strict';var a=r(1);class i{constructor(e=0,t=0,r=0){return this.v=a.vec3.create(),this.set(e,t,r),this}set x(e){this.v[0]=e}get x(){return this.v[0]}set y(e){this.v[1]=e}get y(){return this.v[1]}set z(e){this.v[2]=e}get z(){return this.v[2]}set(e,t,r){return a.vec3.set(this.v,e,t,r),this}clone(){return new i(this.v[0],this.v[1],this.v[2])}copy(e){return a.vec3.copy(this.v,e.v),this}add(e){return a.vec3.add(this.v,this.v,e.v),this}subtract(e){return a.vec3.subtract(this.v,this.v,e.v),this}subtractVectors(e,t){const r=a.vec3.create();return a.vec3.subtract(r,e.v,t.v),r}scale(e){return a.vec3.scale(this.v,this.v,e),this}distance(e){return a.vec3.distance(this.v,e.v)}length(){return a.vec3.length(this.v)}negate(){return a.vec3.negate(this.v,this.v),this}normalize(){return a.vec3.normalize(this.v,this.v),this}dot(e){return a.vec3.dot(this.v,e.v)}cross(e){return a.vec3.cross(this.v,this.v,e.v),this}crossVectors(e,t){const r=a.vec3.create();return a.vec3.cross(r,e.v,t.v),r}lerp(e,t){return a.vec3.lerp(this.v,this.v,e.v,t),this}equals(e){return a.vec3.equals(this.v,e.v)}fromArray(e){return a.vec3.copy(this.v,e)}}t.a=i},function(e,t){'use strict';t.a='#version 300 es'},function(e,t,r){'use strict';function a(e,t){if('highp'===t){if(0<e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision&&0<e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision)return'highp';t='mediump'}return'mediump'===t&&0<e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision&&0<e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision?'mediump':'lowp'}function i(e){let t=s.PRECISION;const r=a(e,t);r!==t&&(Object(n.b)('Capabilities:',t,'not supported, using',r,'instead.'),t=r);const i=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),o=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),d=e.getParameter(e.MAX_TEXTURE_SIZE),l=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),c=e.getParameter(e.MAX_VERTEX_ATTRIBS),u=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),p=e.getParameter(e.MAX_VARYING_VECTORS),m=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS);return{maxAttributes:c,maxCubemapSize:l,maxFragmentUniforms:m,maxPrecision:r,maxTextures:i,maxTextureSize:d,maxVertexTextures:o,maxVertexUniforms:u,maxVaryings:p,precision:t}}function o(e){const t=d.webgl2||e.getExtension('OES_vertex_array_object')||!1,r=e.getExtension('ANGLE_instanced_arrays')||!1,a=e.getExtension('OES_texture_float')||!1;return{angleInstancedArrays:r,textureFloat:a,vertexArrayObject:t}}Object.defineProperty(t,'__esModule',{value:!0}),t.set=function(e){l=i(e),c=o(e)},r.d(t,'capabilities',function(){return l}),r.d(t,'extensions',function(){return c});var n=r(13),s=r(2),d=r(0);let l={},c={}},function(e,t,r){'use strict';var a=r(0),o=r(15),n=r(3),i=r(36),s=r(68);let d=[],l;t.a=class{constructor(e,t,r,i,o){l=a.get(),this.bufferVertices=e,this.bufferIndices=t,this.bufferNormals=r,this.bufferUvs=i,this.bufferColors=o,this.attributes={},this.attributesInstanced={},this.bufferVertices&&(this.addAttribute('aVertexPosition',l.ARRAY_BUFFER,this.bufferVertices,3),this.generateVertices()),this.bufferIndices&&(this.addAttribute('aIndex',l.ELEMENT_ARRAY_BUFFER,this.bufferIndices,1,!1),this.generateFaces()),this.bufferNormals&&this.addAttribute('aVertexNormal',l.ARRAY_BUFFER,this.bufferNormals,3),this.bufferUvs&&(this.addAttribute('aUv',l.ARRAY_BUFFER,this.bufferUvs,2),this.generateUvs()),this.bufferColors&&this.addAttribute('aVertexColor',l.ARRAY_BUFFER,this.bufferColors,3)}addAttribute(e,t,r,a,o){this.attributes[e]=new i.a(t,r,a,o)}addInstancedBufferAttribute(e,t,r){this.attributesInstanced[e]=new i.a(l.ARRAY_BUFFER,t,r)}generateVertices(){this.vertices=[];for(let e=0;e<this.bufferVertices.length;e+=3){const t=this.bufferVertices[e],r=this.bufferVertices[e+1],a=this.bufferVertices[e+2],i=new n.a(t,r,a);this.vertices.push(i)}}generateFaces(){this.faces=[];for(let e=0;e<this.bufferIndices.length;e+=3){const t=this.bufferIndices[e],r=this.bufferIndices[e+1],i=this.bufferIndices[e+2],o=this.vertices[t],a=this.vertices[r],n=this.vertices[i],d=new s.a(t,r,i,o,a,n);this.faces.push(d)}}generateUvs(){this.uvs=[];for(let e=0;e<this.bufferUvs.length;e+=2){const t=this.bufferUvs[e],r=this.bufferUvs[e+1],a=new o.a(t,r);this.uvs.push(a)}}updateVertices(){l=a.get(),this.vertices.forEach((e,t)=>{this.bufferVertices.set(e.v,t*e.v.length)}),this.attributes.aVertexPosition.update(this.bufferVertices)}updateNormals(){const e=[];this.faces.forEach((t)=>{t.updateFaceNormal(),e[t.indices[0]]=t.normal.v,e[t.indices[1]]=t.normal.v,e[t.indices[2]]=t.normal.v}),d=[],e.forEach((e)=>{d=d.concat(...e)}),this.bufferNormals.set(d),this.attributes.aVertexNormal.update(this.bufferNormals)}dispose(){l=a.get(),Object.keys(this.attributes).forEach((e)=>{this.attributes[e].dispose(l),delete this.attributes[e]}),Object.keys(this.attributesInstanced).forEach((e)=>{this.attributesInstanced[e].dispose(l),delete this.attributesInstanced[e]}),delete this.attributes,delete this.attributesInstanced,this.bufferVertices=null,this.bufferIndices=null,this.bufferNormals=null,this.bufferUvs=null,this.bufferColors=null}}},function(e,t,r){'use strict';var i=Math.abs;Object.defineProperty(t,'__esModule',{value:!0}),r.d(t,'ARRAY_TYPE',function(){return a}),t.setMatrixArrayType=function(e){a=e},t.toRadian=function(e){return e*s},t.equals=function(e,t){return i(e-t)<=o*Math.max(1,i(e),i(t))};const o=1e-6;t.EPSILON=o;let a='undefined'==typeof Float32Array?Array:Float32Array;const n=Math.random;t.RANDOM=n;const s=Math.PI/180},function(e,t,r){'use strict';var a=r(5),i=r(0),o=r(27),n=r(31);let s;class d extends o.a{constructor(e,t){super(),this.geometry=e,this.shader=t,this.vao=new n.a,this.visible=!0,this.instanceCount=0,this.shader.program.created||this.shader.create(this.geometry),this.isInstanced=!1,s=i.get(),this.vao.bind(),this.bindAttributes(),this.bindAttributesInstanced(),this.bindIndexBuffer(),this.vao.unbind()}setInstanceCount(e){s=i.get(),this.instanceCount=e,this.isInstanced=!0}bindAttributes(){Object.keys(this.geometry.attributes).forEach((e)=>{'aIndex'!==e&&(this.shader.program.setAttributeLocation(e),this.geometry.attributes[e].bind(),this.shader.program.setAttributePointer(e,this.geometry.attributes[e].itemSize))})}bindAttributesInstanced(){Object.keys(this.geometry.attributesInstanced).forEach((e)=>{'aIndex'!==e&&(this.shader.program.setAttributeLocation(e),this.geometry.attributesInstanced[e].bind(),this.shader.program.setAttributeInstancedPointer(e,this.geometry.attributesInstanced[e].itemSize),s instanceof WebGL2RenderingContext?s.vertexAttribDivisor(this.shader.program.attributeLocations[e],1):a.extensions.angleInstancedArrays.vertexAttribDivisorANGLE(this.shader.program.attributeLocations[e],1))})}bindIndexBuffer(){this.geometry.bufferIndices&&this.geometry.attributes.aIndex.bind()}draw(e){this.visible&&(s=i.get(),this.updateMatrix(e),this.shader.program.bind(),-1!==this.shader.culling&&(s.enable(s.CULL_FACE),s.cullFace(this.shader.culling)),this.shader.setUniforms(e.projectionMatrix,this.modelViewMatrix,this.modelMatrix,e),a.extensions.vertexArrayObject?this.vao.bind():(this.bindAttributes(),this.bindAttributesInstanced(),this.bindIndexBuffer()),this.geometry.attributes.aIndex?s.drawElements(this.shader.drawType,this.geometry.attributes.aIndex.numItems,s.UNSIGNED_SHORT,0):s.drawArrays(this.shader.drawType,0,this.geometry.attributes.aVertexPosition.numItems),a.extensions.vertexArrayObject&&this.vao.unbind(),-1!==this.shader.culling&&s.disable(s.CULL_FACE))}drawInstance(e){this.visible&&(s=i.get(),this.updateMatrix(e),this.shader.program.bind(),this.shader.setUniforms(e.projectionMatrix,this.modelViewMatrix,this.modelMatrix,e),-1!==this.shader.culling&&(s.enable(s.CULL_FACE),s.cullFace(this.shader.culling)),a.extensions.vertexArrayObject?this.vao.bind():(this.bindAttributes(),this.bindAttributesInstanced(),this.bindIndexBuffer()),s instanceof WebGL2RenderingContext?s.drawElementsInstanced(this.shader.drawType,this.geometry.attributes.aIndex.numItems,s.UNSIGNED_SHORT,0,this.instanceCount):a.extensions.angleInstancedArrays.drawElementsInstancedANGLE(this.shader.drawType,this.geometry.attributes.aIndex.numItems,s.UNSIGNED_SHORT,0,this.instanceCount),a.extensions.vertexArrayObject&&this.vao.unbind(),-1!==this.shader.culling&&s.disable(s.CULL_FACE))}dispose(){this.shader.dispose(),this.geometry.dispose(),this.vao.dispose(),this.geometry=null,this.shader=null,super.dispose()}}t.a=d},function(e,t,r){'use strict';var a=r(1),i=r(12),o=r(55),n=r(56),s=r(57),d=r(59),l=r(60),c=r(5),u=r(2),p=r(0),m=r(61),_=r(16);let f;const g=a.mat3.create(),h=a.mat4.create();t.a=class{constructor(e){const t=p.webgl2?d.b:d.a;let r;switch(e.type){case u.SHADER_LAMBERT:{r=p.webgl2?n.b:n.a;break}case u.SHADER_PHONG:{r=p.webgl2?s.b:s.a;break}default:r=p.webgl2?o.b:o.a;}this.name='',this.type=u.SHADER_BASIC,this.uniforms={},this.hookVertexPre='',this.hookVertexMain='',this.hookVertexEnd='',this.hookFragmentPre='',this.hookFragmentMain='',this.hookFragmentEnd='',this.vertexShader=t,this.fragmentShader=r,this.drawType=u.DRAW_TRIANGLES,this.directionalLights=void 0,this.pointLights=void 0,this.culling=u.CULL_NONE,Object.assign(this,e),this.program=new m.a}create(e,t){f=p.get(),this.vertexShader=this._processShader(this.vertexShader,'vertex',e),this.fragmentShader=this._processShader(this.fragmentShader,'fragment',e),this.program.link(this.vertexShader,this.fragmentShader,t),this.customUniforms=this.uniforms||{},p.webgl2&&this.program.setUniformBlockLocation('ProjectionView',_['default'].projectionView.buffer,u.UNIFORM_PROJECTION_VIEW_LOCATION),this.ambientLight&&(p.webgl2?this.program.setUniformBlockLocation('AmbientLight',this.ambientLight.uniformBuffer.buffer,u.UNIFORM_AMBIENT_LIGHT_LOCATION):this.ambientLight.get().forEach((e)=>{Object.keys(e.uniforms).forEach((t)=>{const r=e.uniforms[t];this.customUniforms[`uAmbientLight.${t}`]=r})})),this.directionalLights&&(p.webgl2?this.program.setUniformBlockLocation('DirectionalLights',this.directionalLights.uniformBuffer.buffer,u.UNIFORM_DIRECTIONAL_LIGHTS_LOCATION):this.directionalLights.get().forEach((e,t)=>{Object.keys(e.uniforms).forEach((r)=>{const a=e.uniforms[r];this.customUniforms[`uDirectionalLights[${t}].${r}`]=a})})),this.pointLights&&(p.webgl2?this.program.setUniformBlockLocation('PointLights',this.pointLights.uniformBuffer.buffer,u.UNIFORM_POINT_LIGHTS_LOCATION):this.pointLights.get().forEach((e,t)=>{Object.keys(e.uniforms).forEach((r)=>{const a=e.uniforms[r];this.customUniforms[`uPointLights[${t}].${r}`]=a})}));const r=[f.TEXTURE0,f.TEXTURE1,f.TEXTURE2,f.TEXTURE3,f.TEXTURE4,f.TEXTURE5];Object.keys(this.uniforms).forEach((e,t)=>{switch(this.uniforms[e].type){case't':case'tc':case't3d':{this.uniforms[e].textureIndex=t,this.uniforms[e].activeTexture=r[t];break}default:}}),this.uniforms.uCameraPosition===void 0&&this.pointLights&&(this.uniforms.uCameraPosition={type:'3f',value:[0,0,0]});const o=p.webgl2?{}:{uProjectionMatrix:{location:null,type:'4fv',value:a.mat4.create()}};this.uniforms=Object.assign({uDiffuse:{location:null,type:'3f',value:new i.a().v},uModelMatrix:{location:null,type:'4fv',value:a.mat4.create()},uModelViewMatrix:{location:null,type:'4fv',value:a.mat4.create()},uNormalMatrix:{location:null,type:'4fv',value:a.mat4.create()}},this.customUniforms,o),Object.keys(this.uniforms).forEach((e)=>{this.program.setUniformLocation(this.uniforms,e)})}_processShader(e,t,r){function a(e){i+=`#define ${e} \n`}f=p.get();let i='';const o=`precision ${c.capabilities.precision} float;`;return r.bufferUvs&&a('uv'),r.bufferColors&&a('vertexColors'),r.bufferNormals&&a('normals'),this.ambientLight&&a('ambientLight'),this.directionalLights&&a('directionalLights'),this.pointLights&&a('pointLights'),e=e.replace(/#HOOK_PRECISION/g,o),e=e.replace(/#HOOK_DEFINES/g,i),e=e.replace(/#HOOK_VERTEX_PRE/g,this.hookVertexPre),e=e.replace(/#HOOK_VERTEX_MAIN/g,this.hookVertexMain),e=e.replace(/#HOOK_VERTEX_END/g,this.hookVertexEnd),e=e.replace(/#HOOK_FRAGMENT_PRE/g,this.hookFragmentPre),e=e.replace(/#HOOK_FRAGMENT_MAIN/g,this.hookFragmentMain),e=e.replace(/#HOOK_FRAGMENT_END/g,this.hookFragmentEnd),this.pointLights&&(e=e.replace(/#HOOK_POINT_LIGHTS/g,this.pointLights.length+'')),this.directionalLights&&(e=e.replace(/#HOOK_DIRECTIONAL_LIGHTS/g,this.directionalLights.length+'')),Object(l.a)(e,t)}setUniforms(e,t,r,i){f=p.get(),Object.keys(this.customUniforms).forEach((e)=>{const t=this.uniforms[e];switch(t.type){case't':{f.uniform1i(t.location,t.textureIndex),f.activeTexture(t.activeTexture),f.bindTexture(f.TEXTURE_2D,t.value);break}case'tc':{f.uniform1i(t.location,t.textureIndex),f.activeTexture(t.activeTexture),f.bindTexture(f.TEXTURE_CUBE_MAP,t.value);break}case't3d':{f instanceof WebGL2RenderingContext&&(f.uniform1i(t.location,t.textureIndex),f.activeTexture(t.activeTexture),f.bindTexture(f.TEXTURE_3D,t.value));break}case'i':{f.uniform1i(t.location,t.value);break}case'f':{f.uniform1f(t.location,t.value);break}case'2f':{f.uniform2f(t.location,t.value[0],t.value[1]);break}case'3f':{f.uniform3f(t.location,t.value[0],t.value[1],t.value[2]);break}case'4f':{f.uniform4f(t.location,t.value[0],t.value[1],t.value[2],t.value[3]);break}case'1iv':{f.uniform1iv(t.location,t.value);break}case'2iv':{f.uniform2iv(t.location,t.value);break}case'1fv':{f.uniform1fv(t.location,t.value);break}case'2fv':{f.uniform2fv(t.location,t.value);break}case'3fv':{f.uniform3fv(t.location,t.value);break}case'4fv':{f.uniform4fv(t.location,t.value);break}case'Matrix3fv':{f.uniformMatrix3fv(t.location,!1,t.value);break}case'Matrix4fv':{f.uniformMatrix4fv(t.location,!1,t.value);break}default:}}),p.webgl2||f.uniformMatrix4fv(this.uniforms.uProjectionMatrix.location,!1,e),f.uniformMatrix4fv(this.uniforms.uModelViewMatrix.location,!1,t),f.uniformMatrix4fv(this.uniforms.uModelMatrix.location,!1,r),a.mat4.identity(h),a.mat4.invert(h,r),a.mat3.identity(g),a.mat3.fromMat4(g,h),a.mat3.transpose(g,g),f.uniformMatrix3fv(this.uniforms.uNormalMatrix.location,!1,g),f.uniform3f(this.uniforms.uDiffuse.location,this.uniforms.uDiffuse.value[0],this.uniforms.uDiffuse.value[1],this.uniforms.uDiffuse.value[2]),i&&this.uniforms.uCameraPosition&&f.uniform3f(this.uniforms.uCameraPosition.location,i.position.v[0],i.position.v[1],i.position.v[2])}dispose(){Object.keys(this.customUniforms).forEach((e)=>{const t=this.uniforms[e];switch(t.type){case't':case'tc':{f.deleteTexture(t.value);break}default:}}),this.program.dispose()}}},function(e,t){'use strict';t.a=`
	uniform ProjectionView {
		mat4 projectionMatrix;
	} uProjectionView;
`},function(e,t,r){'use strict';var a=Math.cos,i=Math.sin,o=Math.PI;Object.defineProperty(t,'__esModule',{value:!0}),t.degToRad=function(e){return e*(o/180)},t.radToDeg=function(e){return e*(180/o)},t.clamp=function(e,t,r){return Math.max(Math.min(e,r),t)},t.lerp=function(e,t,r){return e+(t-e)*r},t.barycoordFromPoint=function(e,t,r,a){const i=n.vec3.create(),o=n.vec3.create(),s=n.vec3.create();n.vec3.sub(i,a,t),n.vec3.sub(o,r,t),n.vec3.sub(s,e,t);const l=n.vec3.dot(i,i),c=n.vec3.dot(i,o),p=n.vec3.dot(i,s),m=n.vec3.dot(o,o),_=n.vec3.dot(o,s),f=l*m-c*c,g=new d.a;if(0==f)return g.set(-2,-1,-1);const h=1/f,b=(m*p-c*_)*h,u=(l*_-c*p)*h;return g.set(1-b-u,u,b)},t.randomSpherePoint=function(e,t,r,n){const s=Math.random(),d=Math.random(),l=2*o*s,c=Math.acos(2*d-1),u=e+n*i(c)*a(l),p=t+n*i(c)*i(l),m=r+n*a(c);return[u,p,m]},t.from3DTo2D=function(e,t){const r=e.x,a=e.y,i=e.z,o=t[0]*r+t[4]*a+t[8]*i+t[12],n=t[1]*r+t[5]*a+t[9]*i+t[13],d=t[3]*r+t[7]*a+t[11]*i+t[15],l=new s.a;return l.x=(o/d+1)/2,l.y=1-(n/d+1)/2,l},t.lookAt=function(e,t,r){const a=n.quat.create(),i=n.vec3.create(),o=n.vec3.create(),s=n.vec3.create();return n.vec3.sub(s,e,t),0===n.vec3.squaredLength(s)&&(s[2]=1),n.vec3.normalize(s,s),n.vec3.cross(i,r,s),0===n.vec3.squaredLength(i)&&(s[2]+=1e-4,n.vec3.cross(i,r,s)),n.vec3.normalize(i,i),n.vec3.cross(o,s,i),n.quat.setAxes(a,s,i,o),n.quat.invert(a,a),a};var n=r(1),s=r(15),d=r(3)},function(e,t,r){'use strict';var a=r(1);class i{constructor(e=16777215){return this.v=a.vec3.create(),this.convert(e),this}set r(e){this.v[0]=e}get r(){return this.v[0]}set g(e){this.v[1]=e}get g(){return this.v[1]}set b(e){this.v[2]=e}get b(){return this.v[2]}set(e,t,r){return a.vec3.set(this.v,e,t,r),this}copy(e){return a.vec3.copy(this.v,a.vec3.fromValues(e[0],e[1],e[2])),this}convert(e){let t;return'number'==typeof e&&(t=this.hexIntToRgb(e)),'string'==typeof e&&(t=this.hexStringToRgb(e)),a.vec3.copy(this.v,this.normalize(t)),this}normalize(e){return a.vec3.fromValues(e[0]/255,e[1]/255,e[2]/255)}fromArray(e){this.set(e[0],e[1],e[2])}componentToHex(e){const t=e.toString(16);return 1===t.length?`0${t}`:t}rgbToHex(e,t,r){const a=this.componentToHex(e),i=this.componentToHex(t),o=this.componentToHex(r);return`#${a}${i}${o}`}hexIntToRgb(e){return a.vec3.fromValues(e>>16,255&e>>8,255&e)}hexStringToRgb(e){const t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?a.vec3.fromValues(parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16)):null}}t.a=i},function(e,t){'use strict';const r=(()=>{return window.console&&console.log?Function.prototype.bind.call(console.log,console):()=>{}})();t.a=r;const a=(()=>{return window.console&&console.clear?Function.prototype.bind.call(console.clear,console):()=>{}})(),i=(()=>{return window.console&&console.debug?Function.prototype.bind.call(console.debug,console):()=>{}})(),o=(()=>{return window.console&&console.info?Function.prototype.bind.call(console.info,console):()=>{}})(),n=(()=>{return window.console&&console.warn?Function.prototype.bind.call(console.warn,console):()=>{}})();t.b=n;(()=>{return window.console&&console.error?Function.prototype.bind.call(console.error,console):()=>{}})()},function(e,t){'use strict';t.a=class{on(e,t){this.validate(t),this.init(e).push(t)}off(e,t){const r=this.init(e);r.splice(r.indexOf(t),1)}once(e,t){this.validate(t);const r=()=>{this.off(e,r),t.apply(this,arguments)};this.on(e,r)}emit(e,...t){const r=this.init(e).slice(0);for(const a in r)r[a].apply(this,[].slice.call(arguments,1))}validate(e){if(!(e&&e instanceof Function))throw new Error(e+' is not a Function')}init(e){const t=this.listeners||(this.listeners=[]);return t[e]||(t[e]=[])}}},function(e,t,r){'use strict';var a=r(1);class i{constructor(e=0,t=0){return this.v=a.vec2.create(),this.set(e,t),this}set x(e){this.v[0]=e}get x(){return this.v[0]}set y(e){this.v[1]=e}get y(){return this.v[1]}set(e,t){return a.vec2.set(this.v,e,t),this}clone(){return new i(this.v[0],this.v[1])}copy(e){return a.vec2.copy(this.v,e.v),this}add(e){return a.vec2.add(this.v,this.v,e.v),this}subtract(e){return a.vec2.subtract(this.v,this.v,e.v),this}subtractVectors(e,t){const r=a.vec2.create();return a.vec2.subtract(r,e.v,t.v),r}scale(e){return a.vec2.scale(this.v,this.v,e),this}distance(e){return a.vec2.distance(this.v,e.v)}length(){return a.vec2.length(this.v)}negate(){return a.vec2.negate(this.v,this.v),this}normalize(){return a.vec2.normalize(this.v,this.v),this}lerp(e,t){return a.vec2.lerp(this.v,this.v,e.v,t),this}equals(e){return a.vec2.equals(this.v,e.v)}fromArray(e){return a.vec2.copy(this.v,e)}}t.a=i},function(e,t,r){'use strict';Object.defineProperty(t,'__esModule',{value:!0}),t.setup=function(){const e=new Float32Array([...a.mat4.create()]);o.projectionView=new i.a(e)},t.updateProjectionView=function(e,t){e.bindBufferBase(e.UNIFORM_BUFFER,0,o.projectionView.buffer),e.bindBuffer(e.UNIFORM_BUFFER,o.projectionView.buffer);const r=[...t];o.projectionView.data.set(r,0),e.bufferSubData(e.UNIFORM_BUFFER,0,o.projectionView.data),e.bindBuffer(e.UNIFORM_BUFFER,null)};var a=r(1),i=r(18);const o={};t['default']=o},function(e,t,r){'use strict';var a=r(1),i=r(2),o=r(3);t.a=class{constructor(e){this.projectionMatrix=a.mat4.create(),this.worldInverseMatrix=a.mat4.create(),this.isCamera=!0,this.isPespectiveCamera=!1,this.isOrthographicCamera=!1,this.near=0.1,this.far=100,this.fov=70,this.ratio=i.RENDERER_DEFAULT_RATIO,this.position=new o.a,this.target=new o.a,this.up=new o.a(0,1,0),Object.assign(this,e)}lookAt(e=0,t=0,r=0){this.target.set(e,t,r)}updateMatrixWorld(){a.mat4.identity(this.worldInverseMatrix),a.mat4.lookAt(this.worldInverseMatrix,this.position.v,this.target.v,this.up.v)}updateProjectionMatrix(){}}},function(e,t,r){'use strict';var a=r(0);t.a=class{constructor(e){this.data=e,this.buffer=Object(a.createUniformBuffer)(e)}setValues(e,t=0){this.data.set(e,t)}}},function(e,t,r){'use strict';Object.defineProperty(t,'__esModule',{value:!0}),r.d(t,'ambientLightEs300',function(){return a}),r.d(t,'ambientLightEs100',function(){return i});const a=`
	uniform AmbientLight {
		vec4 color;
		vec4 intensity;
	} uAmbientLight;
`,i=`
	struct AmbientLight {
		vec3 color;
		float intensity;
	};
	uniform AmbientLight uAmbientLight;
`},function(e,t,r){'use strict';Object.defineProperty(t,'__esModule',{value:!0}),r.d(t,'directionalLightsEs300',function(){return a}),r.d(t,'directionalLightsEs100',function(){return i});const a=`
	struct DirectionalLight {
		vec4 position;
		vec4 color;
		vec4 intensity;
	};
	uniform DirectionalLights {
		DirectionalLight uDirectionalLights[#HOOK_DIRECTIONAL_LIGHTS];
	};
`,i=`
	struct DirectionalLight {
		vec3 position;
		vec3 color;
		float intensity;
	};
	uniform DirectionalLight uDirectionalLights[#HOOK_DIRECTIONAL_LIGHTS];
`},function(e,t,r){'use strict';Object.defineProperty(t,'__esModule',{value:!0}),r.d(t,'lambertEs300',function(){return a}),r.d(t,'lambertEs100',function(){return i});const a=`
	vec3 CalculateDirectionalLight(DirectionalLight light, vec3 normal) {
		vec3 lightDirection = normalize(light.position.xyz);
		// diffuse shading
		float diff = max(dot(lightDirection, normal), 0.0);

		vec3 ambientColor = vec3(0.5);
		float ambientIntensity = 0.5;

		#ifdef ambientLight
		ambientColor = uAmbientLight.color.rgb;
		ambientIntensity = uAmbientLight.intensity.x;
		#endif

		// combine results
		vec3 ambient = (ambientColor * ambientIntensity) * vDiffuse;
		vec3 diffuse = light.color.rgb * diff * vDiffuse;
		return (ambient + diffuse * light.intensity.x);
	}
`,i=`
	vec3 CalculateDirectionalLight(DirectionalLight light, vec3 normal) {
		vec3 lightDirection = normalize(light.position);
		// diffuse shading
		float diff = max(dot(lightDirection, normal), 0.0);

			vec3 ambientColor = vec3(0.5);
			float ambientIntensity = 0.5;

			#ifdef ambientLight
			ambientColor = uAmbientLight.color;
			ambientIntensity = uAmbientLight.intensity;
			#endif

			// combine results
		vec3 ambient = (ambientColor * ambientIntensity) * vDiffuse;
			vec3 diffuse = light.color * diff * vDiffuse;
		return (ambient + diffuse * light.intensity);
	}
`},function(e,t,r){'use strict';t.a=function(e){return new Promise((t,r)=>{const a=new XMLHttpRequest;a.responseType='arraybuffer',a.onreadystatechange=()=>{if(4===a.readyState)if(4===a.readyState&&200===a.status){const e=i()(a.response),r=new o.a(e.shape[0],e.shape[1],e.data);t(r)}else r(a.status)},a.open('GET',e,!0),a.send()})};var a=r(63),i=r.n(a),o=r(23)},function(e,t){'use strict';t.a=class{constructor(e,t,r){this.width=e,this.height=t,this.data=r}}},function(e,t){'use strict';t.a=function(e){return new Promise((t,r)=>{const a=new Image;a.onload=()=>{t(a)},a.onerror=()=>{r(`Failed to load ${e}`)},a.src=e})}},function(e,t){'use strict';t.a=class{update(){}setValues(e,t=0){this.data.set(e,t)}}},function(e,t){'use strict';t.a=function(e){return new Promise((t,r)=>{const a=new XMLHttpRequest;a.onreadystatechange=()=>{4!==a.readyState||(4===a.readyState&&200===a.status?t(a.responseText,a.status):r(a.status))},a.open('GET',e,!0),a.send()})}},function(e,t,r){'use strict';var a=r(1),i=r(11),o=r(3);let n=0;const s=a.vec3.create();t.a=class{constructor(){this.children=[],this.localMatrix=a.mat4.create(),this.modelMatrix=a.mat4.create(),this.modelViewMatrix=a.mat4.create(),this.matrixAutoUpdate=!0,this.position=new o.a,this.rotation=new o.a,this.scale=new o.a(1,1,1),this.isObject3D=!0,this._quaternion=a.quat.create(),this._quaternionLookAt=a.quat.create(),this._lookAtUp=a.vec3.create()}updateMatrix(e){a.mat4.identity(this.modelViewMatrix),this.matrixAutoUpdate&&(a.mat4.identity(this.localMatrix),a.mat4.identity(this.modelMatrix),a.quat.identity(this._quaternion),this.parent&&(a.mat4.copy(this.localMatrix,this.parent.modelMatrix),a.mat4.multiply(this.modelMatrix,this.modelMatrix,this.localMatrix)),a.quat.copy(this._quaternion,this._quaternionLookAt),a.mat4.translate(this.modelMatrix,this.modelMatrix,this.position.v),a.quat.rotateX(this._quaternion,this._quaternion,this.rotation.x),a.quat.rotateY(this._quaternion,this._quaternion,this.rotation.y),a.quat.rotateZ(this._quaternion,this._quaternion,this.rotation.z),n=a.quat.getAxisAngle(s,this._quaternion),a.mat4.rotate(this.modelMatrix,this.modelMatrix,n,s),a.mat4.scale(this.modelMatrix,this.modelMatrix,this.scale.v)),a.mat4.multiply(this.modelViewMatrix,e.worldInverseMatrix,this.modelMatrix)}lookAt(e){a.quat.identity(this._quaternionLookAt),this._quaternionLookAt=Object(i.lookAt)(this.position.v,e.v,this._lookAtUp)}setParent(e){this.unParent(),e.isObject3D&&(e.children.push(this),this.parent=e)}unParent(){if(void 0!==this.parent){const e=this.parent.children.indexOf(this);-1!==e&&(this.parent.children.splice(e,1),this.parent=null)}}dispose(){this.unParent(),this.children=[],this.localMatrix=null,this.modelMatrix=null,this.position=null,this.rotation=null,this.scale=null,this._quaternion=null,this.isObject3D=null}}},function(e,t,r){'use strict';function a(e,t,r){let a=t[0],i=t[1],o=t[2],n=t[3],s=t[4],d=t[5],l=t[6],c=t[7],u=t[8],p=r[0],m=r[1],_=r[2],f=r[3],g=r[4],h=r[5],b=r[6],x=r[7],v=r[8];return e[0]=p*a+m*n+_*l,e[1]=p*i+m*s+_*c,e[2]=p*o+m*d+_*u,e[3]=f*a+g*n+h*l,e[4]=f*i+g*s+h*c,e[5]=f*o+g*d+h*u,e[6]=b*a+x*n+v*l,e[7]=b*i+x*s+v*c,e[8]=b*o+x*d+v*u,e}function i(e,t,r){return e[0]=t[0]-r[0],e[1]=t[1]-r[1],e[2]=t[2]-r[2],e[3]=t[3]-r[3],e[4]=t[4]-r[4],e[5]=t[5]-r[5],e[6]=t[6]-r[6],e[7]=t[7]-r[7],e[8]=t[8]-r[8],e}var o=Math.pow,n=Math.cos,d=Math.sin,s=Math.max,l=Math.abs;Object.defineProperty(t,'__esModule',{value:!0}),t.create=function(){let e=new c.ARRAY_TYPE(9);return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=1,e[5]=0,e[6]=0,e[7]=0,e[8]=1,e},t.fromMat4=function(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[4],e[4]=t[5],e[5]=t[6],e[6]=t[8],e[7]=t[9],e[8]=t[10],e},t.clone=function(e){let t=new c.ARRAY_TYPE(9);return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4],t[5]=e[5],t[6]=e[6],t[7]=e[7],t[8]=e[8],t},t.copy=function(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[4]=t[4],e[5]=t[5],e[6]=t[6],e[7]=t[7],e[8]=t[8],e},t.fromValues=function(e,t,r,a,i,o,n,s,d){let l=new c.ARRAY_TYPE(9);return l[0]=e,l[1]=t,l[2]=r,l[3]=a,l[4]=i,l[5]=o,l[6]=n,l[7]=s,l[8]=d,l},t.set=function(e,t,r,a,i,o,n,s,d,l){return e[0]=t,e[1]=r,e[2]=a,e[3]=i,e[4]=o,e[5]=n,e[6]=s,e[7]=d,e[8]=l,e},t.identity=function(e){return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=1,e[5]=0,e[6]=0,e[7]=0,e[8]=1,e},t.transpose=function(e,t){if(e===t){let r=t[1],a=t[2],i=t[5];e[1]=t[3],e[2]=t[6],e[3]=r,e[5]=t[7],e[6]=a,e[7]=i}else e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8];return e},t.invert=function(e,t){let r=t[0],a=t[1],i=t[2],o=t[3],n=t[4],s=t[5],d=t[6],l=t[7],c=t[8],u=c*n-s*l,p=-c*o+s*d,m=l*o-n*d,_=r*u+a*p+i*m;return _?(_=1/_,e[0]=u*_,e[1]=(-c*a+i*l)*_,e[2]=(s*a-i*n)*_,e[3]=p*_,e[4]=(c*r-i*d)*_,e[5]=(-s*r+i*o)*_,e[6]=m*_,e[7]=(-l*r+a*d)*_,e[8]=(n*r-a*o)*_,e):null},t.adjoint=function(e,t){let r=t[0],a=t[1],i=t[2],o=t[3],n=t[4],s=t[5],d=t[6],l=t[7],c=t[8];return e[0]=n*c-s*l,e[1]=i*l-a*c,e[2]=a*s-i*n,e[3]=s*d-o*c,e[4]=r*c-i*d,e[5]=i*o-r*s,e[6]=o*l-n*d,e[7]=a*d-r*l,e[8]=r*n-a*o,e},t.determinant=function(e){let t=e[0],r=e[1],a=e[2],i=e[3],o=e[4],n=e[5],s=e[6],d=e[7],l=e[8];return t*(l*o-n*d)+r*(-l*i+n*s)+a*(d*i-o*s)},t.multiply=a,t.translate=function(e,t,r){let a=t[0],i=t[1],o=t[2],n=t[3],s=t[4],d=t[5],l=t[6],c=t[7],u=t[8],p=r[0],m=r[1];return e[0]=a,e[1]=i,e[2]=o,e[3]=n,e[4]=s,e[5]=d,e[6]=p*a+m*n+l,e[7]=p*i+m*s+c,e[8]=p*o+m*d+u,e},t.rotate=function(e,t,r){let a=t[0],i=t[1],o=t[2],l=t[3],u=t[4],p=t[5],m=t[6],_=t[7],f=t[8],g=d(r),s=n(r);return e[0]=s*a+g*l,e[1]=s*i+g*u,e[2]=s*o+g*p,e[3]=s*l-g*a,e[4]=s*u-g*i,e[5]=s*p-g*o,e[6]=m,e[7]=_,e[8]=f,e},t.scale=function(e,t,r){let a=r[0],i=r[1];return e[0]=a*t[0],e[1]=a*t[1],e[2]=a*t[2],e[3]=i*t[3],e[4]=i*t[4],e[5]=i*t[5],e[6]=t[6],e[7]=t[7],e[8]=t[8],e},t.fromTranslation=function(e,t){return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=1,e[5]=0,e[6]=t[0],e[7]=t[1],e[8]=1,e},t.fromRotation=function(e,t){let r=d(t),a=n(t);return e[0]=a,e[1]=r,e[2]=0,e[3]=-r,e[4]=a,e[5]=0,e[6]=0,e[7]=0,e[8]=1,e},t.fromScaling=function(e,t){return e[0]=t[0],e[1]=0,e[2]=0,e[3]=0,e[4]=t[1],e[5]=0,e[6]=0,e[7]=0,e[8]=1,e},t.fromMat2d=function(e,t){return e[0]=t[0],e[1]=t[1],e[2]=0,e[3]=t[2],e[4]=t[3],e[5]=0,e[6]=t[4],e[7]=t[5],e[8]=1,e},t.fromQuat=function(e,t){let r=t[0],a=t[1],i=t[2],o=t[3],n=r+r,s=a+a,d=i+i,l=r*n,c=a*n,u=a*s,p=i*n,m=i*s,_=i*d,f=o*n,g=o*s,h=o*d;return e[0]=1-u-_,e[3]=c-h,e[6]=p+g,e[1]=c+h,e[4]=1-l-_,e[7]=m-f,e[2]=p-g,e[5]=m+f,e[8]=1-l-u,e},t.normalFromMat4=function(e,t){let r=t[0],a=t[1],i=t[2],o=t[3],n=t[4],s=t[5],d=t[6],l=t[7],c=t[8],u=t[9],p=t[10],m=t[11],_=t[12],f=t[13],g=t[14],h=t[15],b=r*s-a*n,x=r*d-i*n,v=r*l-o*n,E=a*d-i*s,y=a*l-o*s,T=i*l-o*d,A=c*f-u*_,R=c*g-p*_,S=c*h-m*_,w=u*g-p*f,C=u*h-m*f,L=p*h-m*g,N=b*L-x*C+v*w+E*S-y*R+T*A;return N?(N=1/N,e[0]=(s*L-d*C+l*w)*N,e[1]=(d*S-n*L-l*R)*N,e[2]=(n*C-s*S+l*A)*N,e[3]=(i*C-a*L-o*w)*N,e[4]=(r*L-i*S+o*R)*N,e[5]=(a*S-r*C-o*A)*N,e[6]=(f*T-g*y+h*E)*N,e[7]=(g*v-_*T-h*x)*N,e[8]=(_*y-f*v+h*b)*N,e):null},t.projection=function(e,t,r){return e[0]=2/t,e[1]=0,e[2]=0,e[3]=0,e[4]=-2/r,e[5]=0,e[6]=-1,e[7]=1,e[8]=1,e},t.str=function(e){return'mat3('+e[0]+', '+e[1]+', '+e[2]+', '+e[3]+', '+e[4]+', '+e[5]+', '+e[6]+', '+e[7]+', '+e[8]+')'},t.frob=function(e){return Math.sqrt(o(e[0],2)+o(e[1],2)+o(e[2],2)+o(e[3],2)+o(e[4],2)+o(e[5],2)+o(e[6],2)+o(e[7],2)+o(e[8],2))},t.add=function(e,t,r){return e[0]=t[0]+r[0],e[1]=t[1]+r[1],e[2]=t[2]+r[2],e[3]=t[3]+r[3],e[4]=t[4]+r[4],e[5]=t[5]+r[5],e[6]=t[6]+r[6],e[7]=t[7]+r[7],e[8]=t[8]+r[8],e},t.subtract=i,t.multiplyScalar=function(e,t,r){return e[0]=t[0]*r,e[1]=t[1]*r,e[2]=t[2]*r,e[3]=t[3]*r,e[4]=t[4]*r,e[5]=t[5]*r,e[6]=t[6]*r,e[7]=t[7]*r,e[8]=t[8]*r,e},t.multiplyScalarAndAdd=function(e,t,r,a){return e[0]=t[0]+r[0]*a,e[1]=t[1]+r[1]*a,e[2]=t[2]+r[2]*a,e[3]=t[3]+r[3]*a,e[4]=t[4]+r[4]*a,e[5]=t[5]+r[5]*a,e[6]=t[6]+r[6]*a,e[7]=t[7]+r[7]*a,e[8]=t[8]+r[8]*a,e},t.exactEquals=function(e,t){return e[0]===t[0]&&e[1]===t[1]&&e[2]===t[2]&&e[3]===t[3]&&e[4]===t[4]&&e[5]===t[5]&&e[6]===t[6]&&e[7]===t[7]&&e[8]===t[8]},t.equals=function(e,t){let r=e[0],a=e[1],i=e[2],o=e[3],n=e[4],d=e[5],u=e[6],p=e[7],m=e[8],_=t[0],f=t[1],g=t[2],h=t[3],b=t[4],x=t[5],v=t[6],E=t[7],y=t[8];return l(r-_)<=c.EPSILON*s(1,l(r),l(_))&&l(a-f)<=c.EPSILON*s(1,l(a),l(f))&&l(i-g)<=c.EPSILON*s(1,l(i),l(g))&&l(o-h)<=c.EPSILON*s(1,l(o),l(h))&&l(n-b)<=c.EPSILON*s(1,l(n),l(b))&&l(d-x)<=c.EPSILON*s(1,l(d),l(x))&&l(u-v)<=c.EPSILON*s(1,l(u),l(v))&&l(p-E)<=c.EPSILON*s(1,l(p),l(E))&&l(m-y)<=c.EPSILON*s(1,l(m),l(y))};var c=r(7);t.mul=a;t.sub=i},function(e,t,r){'use strict';function a(){let e=new R.ARRAY_TYPE(3);return e[0]=0,e[1]=0,e[2]=0,e}function i(e){let t=e[0],r=e[1],a=e[2];return h(t*t+r*r+a*a)}function o(e,t,r){let a=new R.ARRAY_TYPE(3);return a[0]=e,a[1]=t,a[2]=r,a}function n(e,t,r){return e[0]=t[0]-r[0],e[1]=t[1]-r[1],e[2]=t[2]-r[2],e}function s(e,t,r){return e[0]=t[0]*r[0],e[1]=t[1]*r[1],e[2]=t[2]*r[2],e}function d(e,t,r){return e[0]=t[0]/r[0],e[1]=t[1]/r[1],e[2]=t[2]/r[2],e}function l(e,t){let r=t[0]-e[0],a=t[1]-e[1],i=t[2]-e[2];return h(r*r+a*a+i*i)}function c(e,t){let r=t[0]-e[0],a=t[1]-e[1],i=t[2]-e[2];return r*r+a*a+i*i}function u(e){let t=e[0],r=e[1],a=e[2];return t*t+r*r+a*a}function p(e,t){let r=t[0],a=t[1],i=t[2],o=r*r+a*a+i*i;return 0<o&&(o=1/h(o),e[0]=t[0]*o,e[1]=t[1]*o,e[2]=t[2]*o),e}function m(e,t){return e[0]*t[0]+e[1]*t[1]+e[2]*t[2]}var _=Math.round,f=Math.floor,g=Math.ceil,h=Math.sqrt,x=Math.cos,v=Math.sin,E=Math.min,y=Math.max,T=Math.abs,A=Math.PI;Object.defineProperty(t,'__esModule',{value:!0}),t.create=a,t.clone=function(e){var t=new R.ARRAY_TYPE(3);return t[0]=e[0],t[1]=e[1],t[2]=e[2],t},t.length=i,t.fromValues=o,t.copy=function(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e},t.set=function(e,t,r,a){return e[0]=t,e[1]=r,e[2]=a,e},t.add=function(e,t,r){return e[0]=t[0]+r[0],e[1]=t[1]+r[1],e[2]=t[2]+r[2],e},t.subtract=n,t.multiply=s,t.divide=d,t.ceil=function(e,t){return e[0]=g(t[0]),e[1]=g(t[1]),e[2]=g(t[2]),e},t.floor=function(e,t){return e[0]=f(t[0]),e[1]=f(t[1]),e[2]=f(t[2]),e},t.min=function(e,t,r){return e[0]=E(t[0],r[0]),e[1]=E(t[1],r[1]),e[2]=E(t[2],r[2]),e},t.max=function(e,t,r){return e[0]=y(t[0],r[0]),e[1]=y(t[1],r[1]),e[2]=y(t[2],r[2]),e},t.round=function(e,t){return e[0]=_(t[0]),e[1]=_(t[1]),e[2]=_(t[2]),e},t.scale=function(e,t,r){return e[0]=t[0]*r,e[1]=t[1]*r,e[2]=t[2]*r,e},t.scaleAndAdd=function(e,t,r,a){return e[0]=t[0]+r[0]*a,e[1]=t[1]+r[1]*a,e[2]=t[2]+r[2]*a,e},t.distance=l,t.squaredDistance=c,t.squaredLength=u,t.negate=function(e,t){return e[0]=-t[0],e[1]=-t[1],e[2]=-t[2],e},t.inverse=function(e,t){return e[0]=1/t[0],e[1]=1/t[1],e[2]=1/t[2],e},t.normalize=p,t.dot=m,t.cross=function(e,t,r){let a=t[0],i=t[1],o=t[2],n=r[0],s=r[1],d=r[2];return e[0]=i*d-o*s,e[1]=o*n-a*d,e[2]=a*s-i*n,e},t.lerp=function(e,r,a,i){let t=r[0],o=r[1],n=r[2];return e[0]=t+i*(a[0]-t),e[1]=o+i*(a[1]-o),e[2]=n+i*(a[2]-n),e},t.hermite=function(e,r,a,i,o,n){let t=n*n,s=t*(2*n-3)+1,d=t*(n-2)+n,l=t*(n-1),c=t*(3-2*n);return e[0]=r[0]*s+a[0]*d+i[0]*l+o[0]*c,e[1]=r[1]*s+a[1]*d+i[1]*l+o[1]*c,e[2]=r[2]*s+a[2]*d+i[2]*l+o[2]*c,e},t.bezier=function(e,r,a,i,o,n){let t=1-n,s=t*t,d=n*n,l=s*t,c=3*n*s,u=3*d*t,p=d*n;return e[0]=r[0]*l+a[0]*c+i[0]*u+o[0]*p,e[1]=r[1]*l+a[1]*c+i[1]*u+o[1]*p,e[2]=r[2]*l+a[2]*c+i[2]*u+o[2]*p,e},t.random=function(e,t){t=t||1;let a=2*R.RANDOM()*A,r=2*R.RANDOM()-1,i=h(1-r*r)*t;return e[0]=x(a)*i,e[1]=v(a)*i,e[2]=r*t,e},t.transformMat4=function(e,t,r){let a=t[0],i=t[1],o=t[2],n=r[3]*a+r[7]*i+r[11]*o+r[15];return n=n||1,e[0]=(r[0]*a+r[4]*i+r[8]*o+r[12])/n,e[1]=(r[1]*a+r[5]*i+r[9]*o+r[13])/n,e[2]=(r[2]*a+r[6]*i+r[10]*o+r[14])/n,e},t.transformMat3=function(e,t,r){let a=t[0],i=t[1],o=t[2];return e[0]=a*r[0]+i*r[3]+o*r[6],e[1]=a*r[1]+i*r[4]+o*r[7],e[2]=a*r[2]+i*r[5]+o*r[8],e},t.transformQuat=function(e,t,r){let a=t[0],i=t[1],o=t[2],n=r[0],s=r[1],d=r[2],l=r[3],c=l*a+s*o-d*i,u=l*i+d*a-n*o,p=l*o+n*i-s*a,m=-n*a-s*i-d*o;return e[0]=c*l+m*-n+u*-d-p*-s,e[1]=u*l+m*-s+p*-n-c*-d,e[2]=p*l+m*-d+c*-s-u*-n,e},t.rotateX=function(e,t,a,i){let o=[],n=[];return o[0]=t[0]-a[0],o[1]=t[1]-a[1],o[2]=t[2]-a[2],n[0]=o[0],n[1]=o[1]*x(i)-o[2]*v(i),n[2]=o[1]*v(i)+o[2]*x(i),e[0]=n[0]+a[0],e[1]=n[1]+a[1],e[2]=n[2]+a[2],e},t.rotateY=function(e,t,a,i){let o=[],n=[];return o[0]=t[0]-a[0],o[1]=t[1]-a[1],o[2]=t[2]-a[2],n[0]=o[2]*v(i)+o[0]*x(i),n[1]=o[1],n[2]=o[2]*x(i)-o[0]*v(i),e[0]=n[0]+a[0],e[1]=n[1]+a[1],e[2]=n[2]+a[2],e},t.rotateZ=function(e,t,a,i){let o=[],n=[];return o[0]=t[0]-a[0],o[1]=t[1]-a[1],o[2]=t[2]-a[2],n[0]=o[0]*x(i)-o[1]*v(i),n[1]=o[0]*v(i)+o[1]*x(i),n[2]=o[2],e[0]=n[0]+a[0],e[1]=n[1]+a[1],e[2]=n[2]+a[2],e},t.angle=function(e,t){let r=o(e[0],e[1],e[2]),a=o(t[0],t[1],t[2]);p(r,r),p(a,a);let i=m(r,a);return 1<i?0:-1>i?A:Math.acos(i)},t.str=function(e){return'vec3('+e[0]+', '+e[1]+', '+e[2]+')'},t.exactEquals=function(e,t){return e[0]===t[0]&&e[1]===t[1]&&e[2]===t[2]},t.equals=function(e,t){let r=e[0],a=e[1],i=e[2],o=t[0],n=t[1],s=t[2];return T(r-o)<=R.EPSILON*y(1,T(r),T(o))&&T(a-n)<=R.EPSILON*y(1,T(a),T(n))&&T(i-s)<=R.EPSILON*y(1,T(i),T(s))};var R=r(7);t.sub=n;t.mul=s;t.div=d;t.dist=l;t.sqrDist=c;t.len=i;t.sqrLen=u;const b=function(){let e=a();return function(t,r,a,o,n,s){let d,i;for(r||(r=3),a||(a=0),i=o?E(o*r+a,t.length):t.length,d=a;d<i;d+=r)e[0]=t[d],e[1]=t[d+1],e[2]=t[d+2],n(e,e,s),t[d]=e[0],t[d+1]=e[1],t[d+2]=e[2];return t}}();t.forEach=b},function(e,t,r){'use strict';function a(){let e=new E.ARRAY_TYPE(4);return e[0]=0,e[1]=0,e[2]=0,e[3]=0,e}function i(e,t,r){return e[0]=t[0]-r[0],e[1]=t[1]-r[1],e[2]=t[2]-r[2],e[3]=t[3]-r[3],e}function o(e,t,r){return e[0]=t[0]*r[0],e[1]=t[1]*r[1],e[2]=t[2]*r[2],e[3]=t[3]*r[3],e}function n(e,t,r){return e[0]=t[0]/r[0],e[1]=t[1]/r[1],e[2]=t[2]/r[2],e[3]=t[3]/r[3],e}function s(e,t,r){return e[0]=t[0]*r,e[1]=t[1]*r,e[2]=t[2]*r,e[3]=t[3]*r,e}function d(e,t){let r=t[0]-e[0],a=t[1]-e[1],i=t[2]-e[2],o=t[3]-e[3];return g(r*r+a*a+i*i+o*o)}function l(e,t){let r=t[0]-e[0],a=t[1]-e[1],i=t[2]-e[2],o=t[3]-e[3];return r*r+a*a+i*i+o*o}function c(e){let t=e[0],r=e[1],a=e[2],i=e[3];return g(t*t+r*r+a*a+i*i)}function u(e){let t=e[0],r=e[1],a=e[2],i=e[3];return t*t+r*r+a*a+i*i}function p(e,t){let r=t[0],a=t[1],i=t[2],o=t[3],n=r*r+a*a+i*i+o*o;return 0<n&&(n=1/g(n),e[0]=r*n,e[1]=a*n,e[2]=i*n,e[3]=o*n),e}var m=Math.round,_=Math.floor,f=Math.ceil,g=Math.sqrt,h=Math.min,x=Math.max,v=Math.abs;Object.defineProperty(t,'__esModule',{value:!0}),t.create=a,t.clone=function(e){let t=new E.ARRAY_TYPE(4);return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t},t.fromValues=function(e,t,r,a){let i=new E.ARRAY_TYPE(4);return i[0]=e,i[1]=t,i[2]=r,i[3]=a,i},t.copy=function(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e},t.set=function(e,t,r,a,i){return e[0]=t,e[1]=r,e[2]=a,e[3]=i,e},t.add=function(e,t,r){return e[0]=t[0]+r[0],e[1]=t[1]+r[1],e[2]=t[2]+r[2],e[3]=t[3]+r[3],e},t.subtract=i,t.multiply=o,t.divide=n,t.ceil=function(e,t){return e[0]=f(t[0]),e[1]=f(t[1]),e[2]=f(t[2]),e[3]=f(t[3]),e},t.floor=function(e,t){return e[0]=_(t[0]),e[1]=_(t[1]),e[2]=_(t[2]),e[3]=_(t[3]),e},t.min=function(e,t,r){return e[0]=h(t[0],r[0]),e[1]=h(t[1],r[1]),e[2]=h(t[2],r[2]),e[3]=h(t[3],r[3]),e},t.max=function(e,t,r){return e[0]=x(t[0],r[0]),e[1]=x(t[1],r[1]),e[2]=x(t[2],r[2]),e[3]=x(t[3],r[3]),e},t.round=function(e,t){return e[0]=m(t[0]),e[1]=m(t[1]),e[2]=m(t[2]),e[3]=m(t[3]),e},t.scale=s,t.scaleAndAdd=function(e,t,r,a){return e[0]=t[0]+r[0]*a,e[1]=t[1]+r[1]*a,e[2]=t[2]+r[2]*a,e[3]=t[3]+r[3]*a,e},t.distance=d,t.squaredDistance=l,t.length=c,t.squaredLength=u,t.negate=function(e,t){return e[0]=-t[0],e[1]=-t[1],e[2]=-t[2],e[3]=-t[3],e},t.inverse=function(e,t){return e[0]=1/t[0],e[1]=1/t[1],e[2]=1/t[2],e[3]=1/t[3],e},t.normalize=p,t.dot=function(e,t){return e[0]*t[0]+e[1]*t[1]+e[2]*t[2]+e[3]*t[3]},t.lerp=function(e,r,a,i){let t=r[0],o=r[1],n=r[2],s=r[3];return e[0]=t+i*(a[0]-t),e[1]=o+i*(a[1]-o),e[2]=n+i*(a[2]-n),e[3]=s+i*(a[3]-s),e},t.random=function(e,t){return t=t||1,e[0]=E.RANDOM(),e[1]=E.RANDOM(),e[2]=E.RANDOM(),e[3]=E.RANDOM(),p(e,e),s(e,e,t),e},t.transformMat4=function(e,t,r){let a=t[0],i=t[1],o=t[2],n=t[3];return e[0]=r[0]*a+r[4]*i+r[8]*o+r[12]*n,e[1]=r[1]*a+r[5]*i+r[9]*o+r[13]*n,e[2]=r[2]*a+r[6]*i+r[10]*o+r[14]*n,e[3]=r[3]*a+r[7]*i+r[11]*o+r[15]*n,e},t.transformQuat=function(e,t,r){let a=t[0],i=t[1],o=t[2],n=r[0],s=r[1],d=r[2],l=r[3],c=l*a+s*o-d*i,u=l*i+d*a-n*o,p=l*o+n*i-s*a,m=-n*a-s*i-d*o;return e[0]=c*l+m*-n+u*-d-p*-s,e[1]=u*l+m*-s+p*-n-c*-d,e[2]=p*l+m*-d+c*-s-u*-n,e[3]=t[3],e},t.str=function(e){return'vec4('+e[0]+', '+e[1]+', '+e[2]+', '+e[3]+')'},t.exactEquals=function(e,t){return e[0]===t[0]&&e[1]===t[1]&&e[2]===t[2]&&e[3]===t[3]},t.equals=function(e,t){let r=e[0],a=e[1],i=e[2],o=e[3],n=t[0],s=t[1],d=t[2],l=t[3];return v(r-n)<=E.EPSILON*x(1,v(r),v(n))&&v(a-s)<=E.EPSILON*x(1,v(a),v(s))&&v(i-d)<=E.EPSILON*x(1,v(i),v(d))&&v(o-l)<=E.EPSILON*x(1,v(o),v(l))};var E=r(7);t.sub=i;t.mul=o;t.div=n;t.dist=d;t.sqrDist=l;t.len=c;t.sqrLen=u;const b=function(){let e=a();return function(t,r,a,o,n,s){let d,i;for(r||(r=4),a||(a=0),i=o?h(o*r+a,t.length):t.length,d=a;d<i;d+=r)e[0]=t[d],e[1]=t[d+1],e[2]=t[d+2],e[3]=t[d+3],n(e,e,s),t[d]=e[0],t[d+1]=e[1],t[d+2]=e[2],t[d+3]=e[3];return t}}();t.forEach=b},function(e,t,r){'use strict';var a=r(5),i=r(0);let o;t.a=class{constructor(){o=i.get(),o instanceof WebGL2RenderingContext?this.vao=o.createVertexArray():a.extensions.vertexArrayObject&&(this.vao=a.extensions.vertexArrayObject.createVertexArrayOES())}bind(){o instanceof WebGL2RenderingContext?o.bindVertexArray(this.vao):a.extensions.vertexArrayObject&&a.extensions.vertexArrayObject.bindVertexArrayOES(this.vao)}unbind(){o instanceof WebGL2RenderingContext?o.bindVertexArray(null):a.extensions.vertexArrayObject&&a.extensions.vertexArrayObject.bindVertexArrayOES(null)}dispose(){o instanceof WebGL2RenderingContext?o.deleteVertexArray(this.vao):a.extensions.vertexArrayObject&&a.extensions.vertexArrayObject.deleteVertexArrayOES(this.vao),this.vao=null}}},function(e,t,r){'use strict';var i=r(1),o=r(3);const n=i.vec3.create(),s=i.vec3.create(),d=i.vec3.create(),l=i.vec3.create();t.a=class{constructor(){this.origin=new o.a,this.direction=new o.a}set(e,t){this.origin.copy(e),this.direction.copy(t)}intersectTriangle(e,t,r,a=!0){i.vec3.sub(s,t.v,e.v),i.vec3.sub(d,r.v,e.v),i.vec3.cross(l,s,d);let c=i.vec3.dot(this.direction.v,l),u;if(0<c){if(a)return null;u=1}else if(0>c)u=-1,c=-c;else return null;i.vec3.sub(n,this.origin.v,e.v),i.vec3.cross(d,n,d);const p=u*i.vec3.dot(this.direction.v,d);if(0>p)return null;i.vec3.cross(s,s,n);const m=u*i.vec3.dot(this.direction.v,s);if(0>m)return null;if(p+m>c)return null;const _=-u*i.vec3.dot(n,l);if(0>_)return null;const f=new o.a;return f.copy(this.direction).scale(_/c).add(this.origin),f}}},function(e,t){'use strict';t.a=function(){try{const e=WebGLRenderingContext,t=document.createElement('canvas'),r=document.createElement('canvas'),a=r.getContext('webgl2'),i=t.getContext('webgl')||t.getContext('experimental-webgl');return void 0!==e&&{webgl:!!i,webgl2:!!a}}catch(e){return!1}}},function(e,t,r){'use strict';Object.defineProperty(t,'__esModule',{value:!0}),r.d(t,'pointLightsEs300',function(){return a}),r.d(t,'pointLightsEs100',function(){return i});const a=`
	struct PointLight {
		vec4 position;
		vec4 color;
		vec4 specularColor;
		vec4 shininess;
		vec4 intensity;
	};
	uniform PointLights {
		PointLight uPointLights[#HOOK_POINT_LIGHTS];
	};
`,i=`
	struct PointLight {
		vec3 position;
		vec3 color;
		vec3 specularColor;
		float shininess;
		float intensity;
	};
	uniform PointLight uPointLights[#HOOK_POINT_LIGHTS];
`},function(e,t){'use strict';const r=`
#define PI 3.141592653589793
`;t.b=r;const a=`
#define TWO_PI 6.283185307179586
`;t.c=a;const i=`
float mapLinear(float value, float in_min, float in_max, float out_min, float out_max) {
	return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
`;t.a={definePI:r,definePITwo:a,mapLinear:i}},function(e,t,r){'use strict';var a=r(0);let i;t.a=class{constructor(e,t,r,i=!0){this.type=e,this.itemSize=r,this.numItems=t.length/r,this.buffer=a.createBuffer(e,t),this.shaderAttribute=i}bind(){i=a.get(),i.bindBuffer(this.type,this.buffer)}unbind(){i=a.get(),i.bindBuffer(this.type,null)}update(e){this.bind(),i=a.get(),i.bufferSubData(this.type,0,e),this.unbind()}dispose(){i=a.get(),i.deleteBuffer(this.buffer),this.buffer=null}}},function(e,t,r){'use strict';var a=r(6);class i extends a.a{constructor(e){const t=[];let r=0,a=0;const o=e.length/3;for(let n=0;n<o;n+=1)r=3*n,a=6*n,n<o-1&&(t[a]=e[r],t[a+1]=e[r+1],t[a+2]=e[r+2],t[a+3]=e[r+3],t[a+4]=e[r+4],t[a+5]=e[r+5]);super(new Float32Array(t))}}t.a=i},function(e,t,r){'use strict';var a=Math.cos,i=Math.sin,o=Math.PI,n=r(6);class s extends n.a{constructor(e=1,t=8,r=8,n){const s=[],d=[],l=[];for(let c=0;c<=t;c+=1){const n=c*o/t,p=i(n),m=a(n);for(let n=0;n<=r;n+=1){const _=2*n*o/r,f=i(_),g=a(_),h=g*p,b=m,x=f*p,E=1-n/r,u=1-c/t;d.push(h),d.push(b),d.push(x),l.push(E),l.push(u),s.push(e*h),s.push(e*b),s.push(e*x)}}const c=[];for(let a=0;a<t;a+=1)for(let e=0;e<r;e+=1){const t=a*(r+1)+e,i=t+r+1;c.push(t),c.push(i),c.push(t+1),c.push(i),c.push(i+1),c.push(t+1)}super(new Float32Array(s),new Uint16Array(c),new Float32Array(d),new Float32Array(l),n)}}t.a=s},function(e,t,r){(function(){'use strict';function a(e,r,a,i,o){'undefined'==typeof o&&(o=0.5);var n=_.projectionratio(o,e),d=1-n,l={x:n*r.x+d*i.x,y:n*r.y+d*i.y},c=_.abcratio(o,e),s={x:a.x+(a.x-l.x)/c,y:a.y+(a.y-l.y)/c};return{A:s,B:a,C:l}}var t=Math.abs,i=Math.min,o=Math.max,n=Math.acos,s=Math.sqrt,d=Math.PI,l={x:0,y:0,z:0},_=r(40),c=r(91),u=function(e){var r=e&&e.forEach?e:[].slice.call(arguments),a=!1;if('object'==typeof r[0]){a=r.length;var i=[];r.forEach(function(e){['x','y','z'].forEach(function(t){'undefined'!=typeof e[t]&&i.push(e[t])})}),r=i}var o=!1,n=r.length;if(a){if(4<a){if(1!==arguments.length)throw new Error('Only new Bezier(point[]) is accepted for 4th and higher order curves');o=!0}}else if(6!==n&&8!==n&&9!==n&&12!==n&&1!==arguments.length)throw new Error('Only new Bezier(point[]) is accepted for 4th and higher order curves');var s=!o&&(9===n||12===n)||e&&e[0]&&'undefined'!=typeof e[0].z;this._3d=s;for(var d=[],l=0,c=s?3:2,u;l<n;l+=c)u={x:r[l],y:r[l+1]},s&&(u.z=r[l+2]),d.push(u);this.order=d.length-1,this.points=d;var p=['x','y'];s&&p.push('z'),this.dims=p,this.dimlen=p.length,function(e){for(var r=e.order,o=e.points,n=_.align(o,{p1:o[0],p2:o[r]}),a=0;a<n.length;a++)if(1e-4<t(n[a].y))return void(e._linear=!1);e._linear=!0}(this),this._t1=0,this._t2=1,this.update()};u.fromSVG=function(e){var t=e.match(/[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?/g).map(parseFloat),r=/[cq]/.test(e);return r?(t=t.map(function(e,r){return 2>r?e:e+t[r%2]}),new u(t)):new u(t)},u.quadraticFromPoints=function(e,r,i,o){if('undefined'==typeof o&&(o=0.5),0===o)return new u(r,r,i);if(1===o)return new u(e,r,r);var n=a(2,e,r,i,o);return new u(e,n.A,i)},u.cubicFromPoints=function(e,r,i,o,n){'undefined'==typeof o&&(o=0.5);var s=a(3,e,r,i,o);'undefined'==typeof n&&(n=_.dist(r,s.C));var d=n*(1-o)/o,l=_.dist(e,i),c=(i.x-e.x)/l,p=(i.y-e.y)/l,m=n*c,f=n*p,g={x:r.x-m,y:r.y-f},h={x:r.x+d*c,y:r.y+d*p},b=s.A,x={x:b.x+(g.x-b.x)/(1-o),y:b.y+(g.y-b.y)/(1-o)},v={x:b.x+(h.x-b.x)/o,y:b.y+(h.y-b.y)/o},E={x:e.x+(x.x-e.x)/o,y:e.y+(x.y-e.y)/o},y={x:i.x+(v.x-i.x)/(1-o),y:i.y+(v.y-i.y)/(1-o)};return new u(e,E,y,i)};var p=function(){return _};u.getUtils=p,u.prototype={getUtils:p,valueOf:function(){return this.toString()},toString:function(){return _.pointsToString(this.points)},toSVG:function(){if(this._3d)return!1;for(var e=this.points,t=e[0].x,r=e[0].y,a=['M',t,r,2===this.order?'Q':'C'],o=1,i=e.length;o<i;o++)a.push(e[o].x),a.push(e[o].y);return a.join(' ')},update:function(){this.dpoints=[];for(var e=this.points,t=e.length,r=t-1,a;1<t;t--,r--){a=[];for(var i=0,o;i<r;i++)o={x:r*(e[i+1].x-e[i].x),y:r*(e[i+1].y-e[i].y)},this._3d&&(o.z=r*(e[i+1].z-e[i].z)),a.push(o);this.dpoints.push(a),e=a}this.computedirection()},computedirection:function(){var e=this.points,t=_.angle(e[0],e[this.order],e[1]);this.clockwise=0<t},length:function(){return _.length(this.derivative.bind(this))},_lut:[],getLUT:function(e){if(e=e||100,this._lut.length===e)return this._lut;this._lut=[];for(var r=0;r<=e;r++)this._lut.push(this.compute(r/e));return this._lut},on:function(e,r){r=r||5;for(var a=this.getLUT(),o=[],n=0,t=0,i;t<a.length;t++)i=a[t],_.dist(i,e)<r&&(o.push(i),n+=t/a.length);return!!o.length&&(n/=o.length)},project:function(e){var r=this.getLUT(),a=r.length-1,i=_.closest(r,e),o=i.mdist,n=i.mpos;if(0===n||n===a){var s=n/a,t=this.compute(s);return t.t=s,t.d=o,t}var l=0.1/a,c,s,u,p;for(o+=1,s=(n-1)/a,c=s;s<(n+1)/a+l;s+=l)u=this.compute(s),p=_.dist(e,u),p<o&&(o=p,c=s);return u=this.compute(c),u.t=c,u.d=o,u},get:function(e){return this.compute(e)},point:function(e){return this.points[e]},compute:function(e){if(0===e)return this.points[0];if(1===e)return this.points[this.order];var t=this.points,r=1-e;if(1===this.order)return c={x:r*t[0].x+e*t[1].x,y:r*t[0].y+e*t[1].y},this._3d&&(c.z=r*t[0].z+e*t[1].z),c;if(4>this.order){var o=r*r,n=e*e,s=0,d,a,u;2===this.order?(t=[t[0],t[1],t[2],l],d=o,a=2*(r*e),u=n):3===this.order&&(d=o*r,a=3*(o*e),u=3*(r*n),s=e*n);var c={x:d*t[0].x+a*t[1].x+u*t[2].x+s*t[3].x,y:d*t[0].y+a*t[1].y+u*t[2].y+s*t[3].y};return this._3d&&(c.z=d*t[0].z+a*t[1].z+u*t[2].z+s*t[3].z),c}for(var p=JSON.parse(JSON.stringify(this.points));1<p.length;){for(var m=0;m<p.length-1;m++)p[m]={x:p[m].x+(p[m+1].x-p[m].x)*e,y:p[m].y+(p[m+1].y-p[m].y)*e},'undefined'!=typeof p[m].z&&(p[m]=p[m].z+(p[m+1].z-p[m].z)*e);p.splice(p.length-1,1)}return p[0]},raise:function(){for(var e=this.points,t=[e[0]],r=e.length,a=1,a,i,o;a<r;a++)i=e[a],o=e[a-1],t[a]={x:(r-a)/r*i.x+a/r*o.x,y:(r-a)/r*i.y+a/r*o.y};return t[r]=e[r-1],new u(t)},derivative:function(e){var t=1-e,r=0,i=this.dpoints[0],o,a;2===this.order&&(i=[i[0],i[1],l],o=t,a=e),3===this.order&&(o=t*t,a=2*(t*e),r=e*e);var n={x:o*i[0].x+a*i[1].x+r*i[2].x,y:o*i[0].y+a*i[1].y+r*i[2].y};return this._3d&&(n.z=o*i[0].z+a*i[1].z+r*i[2].z),n},inflections:function(){return _.inflections(this.points)},normal:function(e){return this._3d?this.__normal3(e):this.__normal2(e)},__normal2:function(e){var t=this.derivative(e),r=s(t.x*t.x+t.y*t.y);return{x:-t.y/r,y:t.x/r}},__normal3:function(e){var t=this.derivative(e),r=this.derivative(e+0.01),a=s(t.x*t.x+t.y*t.y+t.z*t.z),i=s(r.x*r.x+r.y*r.y+r.z*r.z);t.x/=a,t.y/=a,t.z/=a,r.x/=i,r.y/=i,r.z/=i;var o={x:r.y*t.z-r.z*t.y,y:r.z*t.x-r.x*t.z,z:r.x*t.y-r.y*t.x},d=s(o.x*o.x+o.y*o.y+o.z*o.z);o.x/=d,o.y/=d,o.z/=d;var l=[o.x*o.x,o.x*o.y-o.z,o.x*o.z+o.y,o.x*o.y+o.z,o.y*o.y,o.y*o.z-o.x,o.x*o.z-o.y,o.y*o.z+o.x,o.z*o.z],c={x:l[0]*t.x+l[1]*t.y+l[2]*t.z,y:l[3]*t.x+l[4]*t.y+l[5]*t.z,z:l[6]*t.x+l[7]*t.y+l[8]*t.z};return c},hull:function(e){var t=this.points,r=[],a=[],o=0,n=0,i=0,s;for(a[o++]=t[0],a[o++]=t[1],a[o++]=t[2],3===this.order&&(a[o++]=t[3]);1<t.length;){for(r=[],n=0,i=t.length-1;n<i;n++)s=_.lerp(e,t[n],t[n+1]),a[o++]=s,r.push(s);t=r}return a},split:function(e,t){if(0===e&&!!t)return this.split(t).left;if(1===t)return this.split(e).right;var r=this.hull(e),a={left:2===this.order?new u([r[0],r[3],r[5]]):new u([r[0],r[4],r[7],r[9]]),right:2===this.order?new u([r[5],r[4],r[2]]):new u([r[9],r[8],r[6],r[3]]),span:r};if(a.left._t1=_.map(0,0,1,this._t1,this._t2),a.left._t2=_.map(e,0,1,this._t1,this._t2),a.right._t1=_.map(e,0,1,this._t1,this._t2),a.right._t2=_.map(1,0,1,this._t1,this._t2),!t)return a;t=_.map(t,e,1,0,1);var i=a.right.split(t);return i.left},extrema:function(){var e=this.dims,t={},r=[],a,i;return e.forEach(function(e){i=function(t){return t[e]},a=this.dpoints[0].map(i),t[e]=_.droots(a),3===this.order&&(a=this.dpoints[1].map(i),t[e]=t[e].concat(_.droots(a))),t[e]=t[e].filter(function(e){return 0<=e&&1>=e}),r=r.concat(t[e].sort())}.bind(this)),r=r.sort().filter(function(e,t){return r.indexOf(e)===t}),t.values=r,t},bbox:function(){var e=this.extrema(),t={};return this.dims.forEach(function(r){t[r]=_.getminmax(this,r,e[r])}.bind(this)),t},overlaps:function(e){var t=this.bbox(),r=e.bbox();return _.bboxoverlap(t,r)},offset:function(e,t){if('undefined'!=typeof t){var r=this.get(e),a=this.normal(e),i={c:r,n:a,x:r.x+a.x*t,y:r.y+a.y*t};return this._3d&&(i.z=r.z+a.z*t),i}if(this._linear){var o=this.normal(0),s=this.points.map(function(t){var r={x:t.x+e*o.x,y:t.y+e*o.y};return t.z&&a.z&&(r.z=t.z+e*o.z),r});return[new u(s)]}var l=this.reduce();return l.map(function(t){return t.scale(e)})},simple:function(){if(3===this.order){var e=_.angle(this.points[0],this.points[3],this.points[1]),r=_.angle(this.points[0],this.points[3],this.points[2]);if(0<e&&0>r||0>e&&0<r)return!1}var a=this.normal(0),i=this.normal(1),o=a.x*i.x+a.y*i.y;this._3d&&(o+=a.z*i.z);var s=t(n(o));return s<d/3},reduce:function(){var e=0,r=0,a=0.01,o=[],n=[],s=this.extrema().values,d,i;for(-1===s.indexOf(0)&&(s=[0].concat(s)),-1===s.indexOf(1)&&s.push(1),(e=s[0],d=1);d<s.length;d++)r=s[d],i=this.split(e,r),i._t1=e,i._t2=r,o.push(i),e=r;return o.forEach(function(o){for(e=0,r=0;1>=r;)for(r=e+a;r<=1+a;r+=a)if(i=o.split(e,r),!i.simple()){if(r-=a,t(e-r)<a)return[];i=o.split(e,r),i._t1=_.map(e,0,1,o._t1,o._t2),i._t2=_.map(r,0,1,o._t1,o._t2),n.push(i),e=r;break}1>e&&(i=o.split(e,1),i._t1=_.map(e,0,1,o._t1,o._t2),i._t2=o._t2,n.push(i))}),n},scale:function(e){var r=this.order,a=!1;if('function'==typeof e&&(a=e),a&&2===r)return this.raise().scale(a);var i=this.clockwise,n=a?a(0):e,l=a?a(1):e,c=[this.offset(0,10),this.offset(1,10)],f=_.lli4(c[0],c[0].c,c[1],c[1].c);if(!f)throw new Error('cannot scale this curve. Try reducing it first.');var g=this.points,h=[];return([0,1].forEach(function(e){var t=h[e*r]=_.copy(g[e*r]);t.x+=(e?l:n)*c[e].n.x,t.y+=(e?l:n)*c[e].n.y}.bind(this)),!a)?([0,1].forEach(function(e){if(2!==this.order||!e){var a=h[e*r],i=this.derivative(e),o={x:a.x+i.x,y:a.y+i.y};h[e+1]=_.lli4(a,o,f,g[e+1])}}.bind(this)),new u(h)):([0,1].forEach(function(o){if(2!==this.order||!o){var n=g[o+1],d={x:n.x-f.x,y:n.y-f.y},l=a?a((o+1)/r):e;a&&!i&&(l=-l);var c=s(d.x*d.x+d.y*d.y);d.x/=c,d.y/=c,h[o+1]={x:n.x+l*d.x,y:n.y+l*d.y}}}.bind(this)),new u(h))},outline:function(e,t,r,a){function i(t,r,e,a,i){return function(o){var n=r-t;return _.map(o,0,1,t+a/e*n,t+(a+i)/e*n)}}t='undefined'==typeof t?e:t;var o=this.reduce(),n=o.length,s=[],d=[],l=0,u=this.length(),m;o.forEach(function(o){E=o.length(),'undefined'!=typeof r&&'undefined'!=typeof a?(s.push(o.scale(i(e,r,u,l,E))),d.push(o.scale(i(-t,-a,u,l,E)))):(s.push(o.scale(e)),d.push(o.scale(-t))),l+=E}),d=d.map(function(e){return m=e.points,e.points=m[3]?[m[3],m[2],m[1],m[0]]:[m[2],m[1],m[0]],e}).reverse();var p=s[0].points[0],f=s[n-1].points[s[n-1].points.length-1],g=d[n-1].points[d[n-1].points.length-1],h=d[0].points[0],b=_.makeline(g,p),x=_.makeline(f,h),v=[b].concat(s).concat([x]).concat(d),E=v.length;return new c(v)},outlineshapes:function(e,t,r){t=t||e;for(var a=this.outline(e,t).curves,o=[],n=1,i=a.length,s;n<i/2;n++)s=_.makeshape(a[n],a[i-n],r),s.startcap.virtual=1<n,s.endcap.virtual=n<i/2-1,o.push(s);return o},intersects:function(e,t){return e?e.p1&&e.p2?this.lineIntersects(e):(e instanceof u&&(e=e.reduce()),this.curveintersects(this.reduce(),e,t)):this.selfintersects(t)},lineIntersects:function(e){var r=i(e.p1.x,e.p2.x),a=i(e.p1.y,e.p2.y),n=o(e.p1.x,e.p2.x),s=o(e.p1.y,e.p2.y),d=this;return _.roots(this.points,e).filter(function(e){var t=d.get(e);return _.between(t.x,r,n)&&_.between(t.y,a,s)})},selfintersects:function(e){var t=this.reduce(),r=t.length-2,a=[],o,i,n,s;for(o=0;o<r;o++)n=t.slice(o,o+1),s=t.slice(o+2),i=this.curveintersects(n,s,e),a=a.concat(i);return a},curveintersects:function(e,t,r){var a=[];e.forEach(function(e){t.forEach(function(t){e.overlaps(t)&&a.push({left:e,right:t})})});var i=[];return a.forEach(function(e){var t=_.pairiteration(e.left,e.right,r);0<t.length&&(i=i.concat(t))}),i},arcs:function(e){e=e||0.5;return this._iterate(e,[])},_error:function(r,a,i,o){var e=(o-i)/4,n=this.get(i+e),s=this.get(o-e),d=_.dist(r,a),l=_.dist(r,n),c=_.dist(r,s);return t(l-d)+t(c-d)},_iterate:function(t,r){var a=0,i=1,o;do{o=0,i=1;var n=this.get(a),d=!1,l=!1,c=i,u=1,p=0,m,f,g,h,b;do{l=d,h=g,c=(a+i)/2,p++,m=this.get(c),f=this.get(i),g=_.getccenter(n,m,f),g.interval={start:a,end:i};var x=this._error(g,n,a,i);if(d=x<=t,b=l&&!d,b||(u=i),d){if(1<=i){g.interval.end=u=1,h=g;break}i+=(i-a)/2}else i=c}while(!b&&100>o++);if(100<=o)break;h=h?h:g,r.push(h),a=u}while(1>i);return r}},e.exports=u})()},function(e,t,r){var i=Math.sqrt;(function(){'use strict';var o=Math.abs,n=Math.cos,t=Math.sin,s=Math.acos,d=Math.atan2,u=i,a=Math.pow,l=function(e){return 0>e?-a(-e,1/3):a(e,1/3)},c=Math.PI,f=2*c,p=c/2,m=Number.MAX_SAFE_INTEGER,_=Number.MIN_SAFE_INTEGER,g={Tvalues:[-0.06405689286260563,0.06405689286260563,-0.1911188674736163,0.1911188674736163,-0.3150426796961634,0.3150426796961634,-0.4337935076260451,0.4337935076260451,-0.5454214713888396,0.5454214713888396,-0.6480936519369755,0.6480936519369755,-0.7401241915785544,0.7401241915785544,-0.820001985973903,0.820001985973903,-0.8864155270044011,0.8864155270044011,-0.9382745520027328,0.9382745520027328,-0.9747285559713095,0.9747285559713095,-0.9951872199970213,0.9951872199970213],Cvalues:[0.12793819534675216,0.12793819534675216,0.1258374563468283,0.1258374563468283,0.12167047292780339,0.12167047292780339,0.1155056680537256,0.1155056680537256,0.10744427011596563,0.10744427011596563,0.09761865210411388,0.09761865210411388,0.08619016153195327,0.08619016153195327,0.0733464814110803,0.0733464814110803,0.05929858491543678,0.05929858491543678,0.04427743881741981,0.04427743881741981,0.028531388628933663,0.028531388628933663,0.0123412297999872,0.0123412297999872],arcfn:function(e,t){var r=t(e),a=r.x*r.x+r.y*r.y;return'undefined'!=typeof r.z&&(a+=r.z*r.z),u(a)},between:function(e,t,r){return t<=e&&e<=r||g.approximately(e,t)||g.approximately(e,r)},approximately:function(e,t,r){return o(e-t)<=(r||1e-6)},length:function(e){var r=0.5,a=0,o=g.Tvalues.length,n,i;for(n=0;n<o;n++)i=r*g.Tvalues[n]+r,a+=g.Cvalues[n]*g.arcfn(i,e);return r*a},map:function(e,t,r,a,i){return a+(i-a)*((e-t)/(r-t))},lerp:function(e,t,r){var a={x:t.x+e*(r.x-t.x),y:t.y+e*(r.y-t.y)};return!t.z||!r.z||(a.z=t.z+e*(r.z-t.z)),a},pointToString:function(e){var t=e.x+'/'+e.y;return'undefined'!=typeof e.z&&(t+='/'+e.z),t},pointsToString:function(e){return'['+e.map(g.pointToString).join(', ')+']'},copy:function(e){return JSON.parse(JSON.stringify(e))},angle:function(e,t,r){var a=t.x-e.x,i=t.y-e.y,o=r.x-e.x,n=r.y-e.y;return d(a*n-i*o,a*o+i*n)},round:function(e,t){var r=''+e,a=r.indexOf('.');return parseFloat(r.substring(0,a+1+t))},dist:function(e,t){var r=e.x-t.x,a=e.y-t.y;return u(r*r+a*a)},closest:function(e,t){var r=a(2,63),i,o;return e.forEach(function(e,a){o=g.dist(t,e),o<r&&(r=o,i=a)}),{mdist:r,mpos:i}},abcratio:function(e,r){if(2!==r&&3!==r)return!1;if('undefined'==typeof e)e=0.5;else if(0===e||1===e)return e;var i=a(e,r)+a(1-e,r);return o((i-1)/i)},projectionratio:function(e,r){if(2!==r&&3!==r)return!1;if('undefined'==typeof e)e=0.5;else if(0===e||1===e)return e;var i=a(1-e,r),o=a(e,r)+i;return i/o},lli8:function(e,t,r,a,i,o,n,s){var l=(e-r)*(o-s)-(t-a)*(i-n);return 0!=l&&{x:((e*a-t*r)*(i-n)-(e-r)*(i*s-o*n))/l,y:((e*a-t*r)*(o-s)-(t-a)*(i*s-o*n))/l}},lli4:function(e,t,r,a){var i=e.x,o=e.y,n=t.x,s=t.y,d=r.x,l=r.y,c=a.x,u=a.y;return g.lli8(i,o,n,s,d,l,c,u)},lli:function(e,t){return g.lli4(e,e.c,t,t.c)},makeline:function(e,t){var a=r(39),i=e.x,o=e.y,n=t.x,s=t.y,d=(n-i)/3,l=(s-o)/3;return new a(i,o,i+d,o+l,i+2*d,o+2*l,n,s)},findbbox:function(e){var t=m,r=m,a=_,i=_;return e.forEach(function(e){var o=e.bbox();t>o.x.min&&(t=o.x.min),r>o.y.min&&(r=o.y.min),a<o.x.max&&(a=o.x.max),i<o.y.max&&(i=o.y.max)}),{x:{min:t,mid:(t+a)/2,max:a,size:a-t},y:{min:r,mid:(r+i)/2,max:i,size:i-r}}},shapeintersections:function(e,t,r,a,i){if(!g.bboxoverlap(t,a))return[];var o=[],n=[e.startcap,e.forward,e.back,e.endcap],s=[r.startcap,r.forward,r.back,r.endcap];return n.forEach(function(t){t.virtual||s.forEach(function(a){if(!a.virtual){var n=t.intersects(a,i);0<n.length&&(n.c1=t,n.c2=a,n.s1=e,n.s2=r,o.push(n))}})}),o},makeshape:function(e,t,r){var a=t.points.length,i=e.points.length,o=g.makeline(t.points[a-1],e.points[0]),n=g.makeline(e.points[i-1],t.points[0]),s={startcap:o,forward:e,back:t,endcap:n,bbox:g.findbbox([o,e,t,n])};return s.intersections=function(e){return g.shapeintersections(s,s.bbox,e,e.bbox,r)},s},getminmax:function(e,r,a){if(!a)return{min:0,max:0};var o=m,n=_,s,t;-1===a.indexOf(0)&&(a=[0].concat(a)),-1===a.indexOf(1)&&a.push(1);for(var d=0,i=a.length;d<i;d++)s=a[d],t=e.get(s),t[r]<o&&(o=t[r]),t[r]>n&&(n=t[r]);return{min:o,mid:(o+n)/2,max:n,size:n-o}},align:function(e,r){var i=r.p1.x,o=r.p1.y,s=-d(r.p2.y-o,r.p2.x-i);return e.map(function(e){return{x:(e.x-i)*n(s)-(e.y-o)*t(s),y:(e.x-i)*t(s)+(e.y-o)*n(s)}})},roots:function(e,i){i=i||{p1:{x:0,y:0},p2:{x:1,y:0}};var o=e.length-1,m=g.align(e,i),_=function(e){return 0<=e&&1>=e};if(2==o){var h=m[0].y,x=m[1].y,b=m[2].y,c=h-2*x+b;if(0!==c){var d=-u(x*x-h*b),v=-h+x,E=-(d+v)/c;return[E,-(-d+v)/c].filter(_)}return x!==b&&0===c?[(2*x-b)/2*(x-b)].filter(_):[]}var y=m[0].y,T=m[1].y,A=m[2].y,R=m[3].y,c=-y+3*T-3*A+R,h=(3*y-6*T+3*A)/c,x=(-3*y+3*T)/c,b=y/c,m=(3*x-h*h)/3,S=m/3,w=(2*h*h*h-9*h*x+27*b)/27,C=w/2,L=C*C+S*S*S,N,E,I,O,P;if(0>L){var k=-m/3,M=u(k*k*k),r=-w/(2*M),t=-1>r?-1:1<r?1:r,U=s(t),D=l(M),B=2*D;return I=B*n(U/3)-h/3,O=B*n((U+f)/3)-h/3,P=B*n((U+2*f)/3)-h/3,[I,O,P].filter(_)}if(0==L)return N=0>C?l(-C):-l(C),I=2*N-h/3,O=-N-h/3,[I,O].filter(_);var F=u(L);return N=l(-C+F),E=l(C+F),[N-E-h/3].filter(_)},droots:function(e){if(3===e.length){var t=e[0],r=e[1],i=e[2],o=t-2*r+i;if(0!==o){var n=-u(r*r-t*i),s=-t+r;return[-(n+s)/o,-(-n+s)/o]}return r!==i&&0===o?[(2*r-i)/(2*(r-i))]:[]}if(2===e.length){var t=e[0],r=e[1];return t===r?[]:[t/(t-r)]}},inflections:function(e){if(4>e.length)return[];var r=g.align(e,{p1:e[0],p2:e.slice(-1)[0]}),o=r[2].x*r[1].y,a=r[3].x*r[1].y,n=r[1].x*r[2].y,s=r[3].x*r[2].y,d=18*(-3*o+2*a+3*n-s),l=18*(3*o-a-3*n),c=18*(n-o);if(g.approximately(d,0)){if(!g.approximately(l,0)){var u=-c/l;if(0<=u&&1>=u)return[u]}return[]}var t=i(l*l-4*d*c),s=2*d;return g.approximately(s,0)?[]:[(t-l)/s,-(l+t)/s].filter(function(e){return 0<=e&&1>=e})},bboxoverlap:function(e,r){var a=['x','y'],n=a.length,s,i,c,l,t;for(s=0;s<n;s++)if(i=a[s],c=e[i].mid,l=r[i].mid,t=(e[i].size+r[i].size)/2,o(c-l)>=t)return!1;return!0},expandbox:function(e,t){t.x.min<e.x.min&&(e.x.min=t.x.min),t.y.min<e.y.min&&(e.y.min=t.y.min),t.z&&t.z.min<e.z.min&&(e.z.min=t.z.min),t.x.max>e.x.max&&(e.x.max=t.x.max),t.y.max>e.y.max&&(e.y.max=t.y.max),t.z&&t.z.max>e.z.max&&(e.z.max=t.z.max),e.x.mid=(e.x.min+e.x.max)/2,e.y.mid=(e.y.min+e.y.max)/2,e.z&&(e.z.mid=(e.z.min+e.z.max)/2),e.x.size=e.x.max-e.x.min,e.y.size=e.y.max-e.y.min,e.z&&(e.z.size=e.z.max-e.z.min)},pairiteration:function(e,t,a){var i=e.bbox(),o=t.bbox(),n=1e5,r=a||0.5;if(i.x.size+i.y.size<r&&o.x.size+o.y.size<r)return[(0|n*(e._t1+e._t2)/2)/n+'/'+(0|n*(t._t1+t._t2)/2)/n];var s=e.split(0.5),d=t.split(0.5),l=[{left:s.left,right:d.left},{left:s.left,right:d.right},{left:s.right,right:d.right},{left:s.right,right:d.left}];l=l.filter(function(e){return g.bboxoverlap(e.left.bbox(),e.right.bbox())});var c=[];return 0===l.length?c:(l.forEach(function(e){c=c.concat(g.pairiteration(e.left,e.right,r))}),c=c.filter(function(e,t){return c.indexOf(e)===t}),c)},getccenter:function(a,i,o){var l=i.x-a.x,c=i.y-a.y,u=o.x-i.x,h=o.y-i.y,b=l*n(p)-c*t(p),x=l*t(p)+c*n(p),v=u*n(p)-h*t(p),E=u*t(p)+h*n(p),y=(a.x+i.x)/2,T=(a.y+i.y)/2,A=(i.x+o.x)/2,R=(i.y+o.y)/2,S=g.lli8(y,T,y+b,T+x,A,R,A+v,R+E),w=g.dist(S,a),r=d(a.y-S.y,a.x-S.x),s=d(i.y-S.y,i.x-S.x),m=d(o.y-S.y,o.x-S.x),e;return r<m?((r>s||s>m)&&(r+=f),r>m&&(e=m,m=r,r=e)):m<s&&s<r?(e=m,m=r,r=e):m+=f,S.s=r,S.e=m,S.r=w,S}};e.exports=g})()},function(e,t,r){'use strict';var a=r(97),i=r.n(a);t.a=function(e){const t=new i.a.Mesh(e);return{vertices:new Float32Array(t.vertices),normals:new Float32Array(t.vertexNormals),indices:new Uint16Array(t.indices),uvs:new Float32Array(t.textures)}}},function(e,t,r){'use strict';Object.defineProperty(t,'__esModule',{value:!0});var a=r(5);r.d(t,'Capabilities',function(){return a});var i=r(2);r.d(t,'Constants',function(){return i});var o=r(0);r.d(t,'GL',function(){return o});var n=r(8);r.d(t,'Mesh',function(){return n.a});var s=r(27);r.d(t,'Object3D',function(){return s.a});var d=r(17);r.d(t,'Camera',function(){return d.a});var l=r(48);r.d(t,'OrthographicCamera',function(){return l.a});var c=r(49);r.d(t,'PerspectiveCamera',function(){return c.a});var u=r(50);r.d(t,'RayCaster',function(){return u.a});var p=r(51);r.d(t,'Renderer',function(){return p.a});var m=r(53);r.d(t,'RenderTarget',function(){return m.a});var _=r(54);r.d(t,'Scene',function(){return _.a});var f=r(9);r.d(t,'Shader',function(){return f.a});var g=r(62);r.d(t,'Texture',function(){return g.a});var h=r(64);r.d(t,'Texture3d',function(){return h.a});var b=r(65);r.d(t,'TextureCube',function(){return b.a});var x=r(66);r.d(t,'TextureVideo',function(){return x.a});var v=r(18);r.d(t,'UniformBuffer',function(){return v.a});var E=r(16);r.d(t,'UniformBuffers',function(){return E});var y=r(31);r.d(t,'Vao',function(){return y.a});var T=r(67);r.d(t,'BoxGeometry',function(){return T.a});var A=r(36);r.d(t,'BufferAttribute',function(){return A.a});var R=r(6);r.d(t,'Geometry',function(){return R.a});var S=r(37);r.d(t,'LineGeometry',function(){return S.a});var w=r(69);r.d(t,'PlaneGeometry',function(){return w.a});var C=r(38);r.d(t,'SphereGeometry',function(){return C.a});var L=r(70);r.d(t,'AxisHelper',function(){return L.a});var N=r(71);r.d(t,'CameraHelper',function(){return N.a});var I=r(72);r.d(t,'GridHelper',function(){return I.a});var O=r(73);r.d(t,'NormalsHelper',function(){return O.a});var P=r(74);r.d(t,'VerticesHelper',function(){return P.a});var k=r(75);r.d(t,'Lights',function(){return k.a});var M=r(76);r.d(t,'AmbientLight',function(){return M.a});var U=r(77);r.d(t,'DirectionalLight',function(){return U.a});var D=r(78);r.d(t,'PointLight',function(){return D.a});var B=r(12);r.d(t,'Color',function(){return B.a});var F=r(3);r.d(t,'Vector3',function(){return F.a});var z=r(15);r.d(t,'Vector2',function(){return z.a});var V=r(32);r.d(t,'Ray',function(){return V.a});var X=r(11);r.d(t,'MathUtils',function(){return X});var G=r(79);r.d(t,'ShaderChunks',function(){return G.a});var j=r(89);r.d(t,'CameraDolly',function(){return j.a});var H=r(96);r.d(t,'Clock',function(){return H.a});var Y=r(33);r.d(t,'Detect',function(){return Y.a});var q=r(41);r.d(t,'ObjParser',function(){return q.a});var W=r(98);r.d(t,'OrbitControls',function(){return W.a});var K=r(26);r.d(t,'FileLoader',function(){return K.a});var Q=r(22);r.d(t,'HdrLoader',function(){return Q.a});var Z=r(24);r.d(t,'ImageLoader',function(){return Z.a});var J=r(99);r.d(t,'JsonLoader',function(){return J.a});var $=r(100);r.d(t,'ObjLoader',function(){return $.a})},function(e,t,r){'use strict';function a(e,t,r){let a=t[0],i=t[1],o=t[2],n=t[3],s=r[0],d=r[1],l=r[2],c=r[3];return e[0]=a*s+o*d,e[1]=i*s+n*d,e[2]=a*l+o*c,e[3]=i*l+n*c,e}function i(e,t,r){return e[0]=t[0]-r[0],e[1]=t[1]-r[1],e[2]=t[2]-r[2],e[3]=t[3]-r[3],e}var o=Math.pow,n=Math.cos,d=Math.sin,s=Math.max,l=Math.abs;Object.defineProperty(t,'__esModule',{value:!0}),t.create=function(){let e=new c.ARRAY_TYPE(4);return e[0]=1,e[1]=0,e[2]=0,e[3]=1,e},t.clone=function(e){let t=new c.ARRAY_TYPE(4);return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t},t.copy=function(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e},t.identity=function(e){return e[0]=1,e[1]=0,e[2]=0,e[3]=1,e},t.fromValues=function(e,t,r,a){let i=new c.ARRAY_TYPE(4);return i[0]=e,i[1]=t,i[2]=r,i[3]=a,i},t.set=function(e,t,r,a,i){return e[0]=t,e[1]=r,e[2]=a,e[3]=i,e},t.transpose=function(e,t){if(e===t){let r=t[1];e[1]=t[2],e[2]=r}else e[0]=t[0],e[1]=t[2],e[2]=t[1],e[3]=t[3];return e},t.invert=function(e,t){let r=t[0],a=t[1],i=t[2],o=t[3],n=r*o-i*a;return n?(n=1/n,e[0]=o*n,e[1]=-a*n,e[2]=-i*n,e[3]=r*n,e):null},t.adjoint=function(e,t){let r=t[0];return e[0]=t[3],e[1]=-t[1],e[2]=-t[2],e[3]=r,e},t.determinant=function(e){return e[0]*e[3]-e[2]*e[1]},t.multiply=a,t.rotate=function(e,t,r){let a=t[0],i=t[1],o=t[2],l=t[3],u=d(r),p=n(r);return e[0]=a*p+o*u,e[1]=i*p+l*u,e[2]=a*-u+o*p,e[3]=i*-u+l*p,e},t.scale=function(e,t,r){let a=t[0],i=t[1],o=t[2],n=t[3],s=r[0],d=r[1];return e[0]=a*s,e[1]=i*s,e[2]=o*d,e[3]=n*d,e},t.fromRotation=function(e,t){let r=d(t),a=n(t);return e[0]=a,e[1]=r,e[2]=-r,e[3]=a,e},t.fromScaling=function(e,t){return e[0]=t[0],e[1]=0,e[2]=0,e[3]=t[1],e},t.str=function(e){return'mat2('+e[0]+', '+e[1]+', '+e[2]+', '+e[3]+')'},t.frob=function(e){return Math.sqrt(o(e[0],2)+o(e[1],2)+o(e[2],2)+o(e[3],2))},t.LDU=function(e,t,r,i){return e[2]=i[2]/i[0],r[0]=i[0],r[1]=i[1],r[3]=i[3]-e[2]*r[1],[e,t,r]},t.add=function(e,t,r){return e[0]=t[0]+r[0],e[1]=t[1]+r[1],e[2]=t[2]+r[2],e[3]=t[3]+r[3],e},t.subtract=i,t.exactEquals=function(e,t){return e[0]===t[0]&&e[1]===t[1]&&e[2]===t[2]&&e[3]===t[3]},t.equals=function(e,t){let r=e[0],a=e[1],i=e[2],o=e[3],n=t[0],d=t[1],u=t[2],p=t[3];return l(r-n)<=c.EPSILON*s(1,l(r),l(n))&&l(a-d)<=c.EPSILON*s(1,l(a),l(d))&&l(i-u)<=c.EPSILON*s(1,l(i),l(u))&&l(o-p)<=c.EPSILON*s(1,l(o),l(p))},t.multiplyScalar=function(e,t,r){return e[0]=t[0]*r,e[1]=t[1]*r,e[2]=t[2]*r,e[3]=t[3]*r,e},t.multiplyScalarAndAdd=function(e,t,r,a){return e[0]=t[0]+r[0]*a,e[1]=t[1]+r[1]*a,e[2]=t[2]+r[2]*a,e[3]=t[3]+r[3]*a,e};var c=r(7);t.mul=a;t.sub=i},function(e,t,r){'use strict';function a(e,t,r){let a=t[0],i=t[1],o=t[2],n=t[3],s=t[4],d=t[5],l=r[0],c=r[1],u=r[2],p=r[3],m=r[4],_=r[5];return e[0]=a*l+o*c,e[1]=i*l+n*c,e[2]=a*u+o*p,e[3]=i*u+n*p,e[4]=a*m+o*_+s,e[5]=i*m+n*_+d,e}function i(e,t,r){return e[0]=t[0]-r[0],e[1]=t[1]-r[1],e[2]=t[2]-r[2],e[3]=t[3]-r[3],e[4]=t[4]-r[4],e[5]=t[5]-r[5],e}var o=Math.pow,n=Math.cos,d=Math.sin,s=Math.max,l=Math.abs;Object.defineProperty(t,'__esModule',{value:!0}),t.create=function(){let e=new u.ARRAY_TYPE(6);return e[0]=1,e[1]=0,e[2]=0,e[3]=1,e[4]=0,e[5]=0,e},t.clone=function(e){let t=new u.ARRAY_TYPE(6);return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4],t[5]=e[5],t},t.copy=function(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[4]=t[4],e[5]=t[5],e},t.identity=function(e){return e[0]=1,e[1]=0,e[2]=0,e[3]=1,e[4]=0,e[5]=0,e},t.fromValues=function(e,t,r,a,i,o){let n=new u.ARRAY_TYPE(6);return n[0]=e,n[1]=t,n[2]=r,n[3]=a,n[4]=i,n[5]=o,n},t.set=function(e,t,r,a,i,o,n){return e[0]=t,e[1]=r,e[2]=a,e[3]=i,e[4]=o,e[5]=n,e},t.invert=function(e,t){let r=t[0],a=t[1],i=t[2],o=t[3],n=t[4],s=t[5],d=r*o-a*i;return d?(d=1/d,e[0]=o*d,e[1]=-a*d,e[2]=-i*d,e[3]=r*d,e[4]=(i*s-o*n)*d,e[5]=(a*n-r*s)*d,e):null},t.determinant=function(e){return e[0]*e[3]-e[1]*e[2]},t.multiply=a,t.rotate=function(e,t,r){let a=t[0],i=t[1],o=t[2],l=t[3],u=t[4],p=t[5],m=d(r),_=n(r);return e[0]=a*_+o*m,e[1]=i*_+l*m,e[2]=a*-m+o*_,e[3]=i*-m+l*_,e[4]=u,e[5]=p,e},t.scale=function(e,t,r){let a=t[0],i=t[1],o=t[2],n=t[3],s=t[4],d=t[5],l=r[0],c=r[1];return e[0]=a*l,e[1]=i*l,e[2]=o*c,e[3]=n*c,e[4]=s,e[5]=d,e},t.translate=function(e,t,r){let a=t[0],i=t[1],o=t[2],n=t[3],s=t[4],d=t[5],l=r[0],c=r[1];return e[0]=a,e[1]=i,e[2]=o,e[3]=n,e[4]=a*l+o*c+s,e[5]=i*l+n*c+d,e},t.fromRotation=function(e,t){let r=d(t),a=n(t);return e[0]=a,e[1]=r,e[2]=-r,e[3]=a,e[4]=0,e[5]=0,e},t.fromScaling=function(e,t){return e[0]=t[0],e[1]=0,e[2]=0,e[3]=t[1],e[4]=0,e[5]=0,e},t.fromTranslation=function(e,t){return e[0]=1,e[1]=0,e[2]=0,e[3]=1,e[4]=t[0],e[5]=t[1],e},t.str=function(e){return'mat2d('+e[0]+', '+e[1]+', '+e[2]+', '+e[3]+', '+e[4]+', '+e[5]+')'},t.frob=function(e){return Math.sqrt(o(e[0],2)+o(e[1],2)+o(e[2],2)+o(e[3],2)+o(e[4],2)+o(e[5],2)+1)},t.add=function(e,t,r){return e[0]=t[0]+r[0],e[1]=t[1]+r[1],e[2]=t[2]+r[2],e[3]=t[3]+r[3],e[4]=t[4]+r[4],e[5]=t[5]+r[5],e},t.subtract=i,t.multiplyScalar=function(e,t,r){return e[0]=t[0]*r,e[1]=t[1]*r,e[2]=t[2]*r,e[3]=t[3]*r,e[4]=t[4]*r,e[5]=t[5]*r,e},t.multiplyScalarAndAdd=function(e,t,r,a){return e[0]=t[0]+r[0]*a,e[1]=t[1]+r[1]*a,e[2]=t[2]+r[2]*a,e[3]=t[3]+r[3]*a,e[4]=t[4]+r[4]*a,e[5]=t[5]+r[5]*a,e},t.exactEquals=function(e,t){return e[0]===t[0]&&e[1]===t[1]&&e[2]===t[2]&&e[3]===t[3]&&e[4]===t[4]&&e[5]===t[5]},t.equals=function(e,t){let r=e[0],a=e[1],i=e[2],o=e[3],n=e[4],d=e[5],c=t[0],p=t[1],m=t[2],_=t[3],f=t[4],g=t[5];return l(r-c)<=u.EPSILON*s(1,l(r),l(c))&&l(a-p)<=u.EPSILON*s(1,l(a),l(p))&&l(i-m)<=u.EPSILON*s(1,l(i),l(m))&&l(o-_)<=u.EPSILON*s(1,l(o),l(_))&&l(n-f)<=u.EPSILON*s(1,l(n),l(f))&&l(d-g)<=u.EPSILON*s(1,l(d),l(g))};var u=r(7);t.mul=a;t.sub=i},function(e,t,r){'use strict';function a(e,t,r){let a=t[0],i=t[1],o=t[2],n=t[3],s=t[4],d=t[5],l=t[6],c=t[7],u=t[8],p=t[9],m=t[10],_=t[11],f=t[12],g=t[13],h=t[14],b=t[15],x=r[0],v=r[1],E=r[2],y=r[3];return e[0]=x*a+v*s+E*u+y*f,e[1]=x*i+v*d+E*p+y*g,e[2]=x*o+v*l+E*m+y*h,e[3]=x*n+v*c+E*_+y*b,x=r[4],v=r[5],E=r[6],y=r[7],e[4]=x*a+v*s+E*u+y*f,e[5]=x*i+v*d+E*p+y*g,e[6]=x*o+v*l+E*m+y*h,e[7]=x*n+v*c+E*_+y*b,x=r[8],v=r[9],E=r[10],y=r[11],e[8]=x*a+v*s+E*u+y*f,e[9]=x*i+v*d+E*p+y*g,e[10]=x*o+v*l+E*m+y*h,e[11]=x*n+v*c+E*_+y*b,x=r[12],v=r[13],E=r[14],y=r[15],e[12]=x*a+v*s+E*u+y*f,e[13]=x*i+v*d+E*p+y*g,e[14]=x*o+v*l+E*m+y*h,e[15]=x*n+v*c+E*_+y*b,e}function i(e,t,r){return e[0]=t[0]-r[0],e[1]=t[1]-r[1],e[2]=t[2]-r[2],e[3]=t[3]-r[3],e[4]=t[4]-r[4],e[5]=t[5]-r[5],e[6]=t[6]-r[6],e[7]=t[7]-r[7],e[8]=t[8]-r[8],e[9]=t[9]-r[9],e[10]=t[10]-r[10],e[11]=t[11]-r[11],e[12]=t[12]-r[12],e[13]=t[13]-r[13],e[14]=t[14]-r[14],e[15]=t[15]-r[15],e}var o=Math.tan,n=Math.sqrt,s=Math.pow,d=Math.cos,l=Math.sin,c=Math.max,u=Math.abs,p=Math.PI;Object.defineProperty(t,'__esModule',{value:!0}),t.create=function(){let e=new m.ARRAY_TYPE(16);return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e},t.clone=function(e){let t=new m.ARRAY_TYPE(16);return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4],t[5]=e[5],t[6]=e[6],t[7]=e[7],t[8]=e[8],t[9]=e[9],t[10]=e[10],t[11]=e[11],t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15],t},t.copy=function(e,t){return e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[4]=t[4],e[5]=t[5],e[6]=t[6],e[7]=t[7],e[8]=t[8],e[9]=t[9],e[10]=t[10],e[11]=t[11],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15],e},t.fromValues=function(e,t,r,a,i,o,n,s,d,l,c,u,p,_,f,g){let h=new m.ARRAY_TYPE(16);return h[0]=e,h[1]=t,h[2]=r,h[3]=a,h[4]=i,h[5]=o,h[6]=n,h[7]=s,h[8]=d,h[9]=l,h[10]=c,h[11]=u,h[12]=p,h[13]=_,h[14]=f,h[15]=g,h},t.set=function(e,t,r,a,i,o,n,s,d,l,c,u,p,m,_,f,g){return e[0]=t,e[1]=r,e[2]=a,e[3]=i,e[4]=o,e[5]=n,e[6]=s,e[7]=d,e[8]=l,e[9]=c,e[10]=u,e[11]=p,e[12]=m,e[13]=_,e[14]=f,e[15]=g,e},t.identity=function(e){return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e},t.transpose=function(e,t){if(e===t){let r=t[1],a=t[2],i=t[3],o=t[6],n=t[7],s=t[11];e[1]=t[4],e[2]=t[8],e[3]=t[12],e[4]=r,e[6]=t[9],e[7]=t[13],e[8]=a,e[9]=o,e[11]=t[14],e[12]=i,e[13]=n,e[14]=s}else e[0]=t[0],e[1]=t[4],e[2]=t[8],e[3]=t[12],e[4]=t[1],e[5]=t[5],e[6]=t[9],e[7]=t[13],e[8]=t[2],e[9]=t[6],e[10]=t[10],e[11]=t[14],e[12]=t[3],e[13]=t[7],e[14]=t[11],e[15]=t[15];return e},t.invert=function(e,t){let r=t[0],a=t[1],i=t[2],o=t[3],n=t[4],s=t[5],d=t[6],l=t[7],c=t[8],u=t[9],p=t[10],m=t[11],_=t[12],f=t[13],g=t[14],h=t[15],b=r*s-a*n,x=r*d-i*n,v=r*l-o*n,E=a*d-i*s,y=a*l-o*s,T=i*l-o*d,A=c*f-u*_,R=c*g-p*_,S=c*h-m*_,w=u*g-p*f,C=u*h-m*f,L=p*h-m*g,N=b*L-x*C+v*w+E*S-y*R+T*A;return N?(N=1/N,e[0]=(s*L-d*C+l*w)*N,e[1]=(i*C-a*L-o*w)*N,e[2]=(f*T-g*y+h*E)*N,e[3]=(p*y-u*T-m*E)*N,e[4]=(d*S-n*L-l*R)*N,e[5]=(r*L-i*S+o*R)*N,e[6]=(g*v-_*T-h*x)*N,e[7]=(c*T-p*v+m*x)*N,e[8]=(n*C-s*S+l*A)*N,e[9]=(a*S-r*C-o*A)*N,e[10]=(_*y-f*v+h*b)*N,e[11]=(u*v-c*y-m*b)*N,e[12]=(s*R-n*w-d*A)*N,e[13]=(r*w-a*R+i*A)*N,e[14]=(f*x-_*E-g*b)*N,e[15]=(c*E-u*x+p*b)*N,e):null},t.adjoint=function(e,t){let r=t[0],a=t[1],i=t[2],o=t[3],n=t[4],s=t[5],d=t[6],l=t[7],c=t[8],u=t[9],p=t[10],m=t[11],_=t[12],f=t[13],g=t[14],h=t[15];return e[0]=s*(p*h-m*g)-u*(d*h-l*g)+f*(d*m-l*p),e[1]=-(a*(p*h-m*g)-u*(i*h-o*g)+f*(i*m-o*p)),e[2]=a*(d*h-l*g)-s*(i*h-o*g)+f*(i*l-o*d),e[3]=-(a*(d*m-l*p)-s*(i*m-o*p)+u*(i*l-o*d)),e[4]=-(n*(p*h-m*g)-c*(d*h-l*g)+_*(d*m-l*p)),e[5]=r*(p*h-m*g)-c*(i*h-o*g)+_*(i*m-o*p),e[6]=-(r*(d*h-l*g)-n*(i*h-o*g)+_*(i*l-o*d)),e[7]=r*(d*m-l*p)-n*(i*m-o*p)+c*(i*l-o*d),e[8]=n*(u*h-m*f)-c*(s*h-l*f)+_*(s*m-l*u),e[9]=-(r*(u*h-m*f)-c*(a*h-o*f)+_*(a*m-o*u)),e[10]=r*(s*h-l*f)-n*(a*h-o*f)+_*(a*l-o*s),e[11]=-(r*(s*m-l*u)-n*(a*m-o*u)+c*(a*l-o*s)),e[12]=-(n*(u*g-p*f)-c*(s*g-d*f)+_*(s*p-d*u)),e[13]=r*(u*g-p*f)-c*(a*g-i*f)+_*(a*p-i*u),e[14]=-(r*(s*g-d*f)-n*(a*g-i*f)+_*(a*d-i*s)),e[15]=r*(s*p-d*u)-n*(a*p-i*u)+c*(a*d-i*s),e},t.determinant=function(e){let t=e[0],r=e[1],a=e[2],i=e[3],o=e[4],n=e[5],s=e[6],d=e[7],l=e[8],c=e[9],u=e[10],p=e[11],m=e[12],_=e[13],f=e[14],g=e[15];return(t*n-r*o)*(u*g-p*f)-(t*s-a*o)*(c*g-p*_)+(t*d-i*o)*(c*f-u*_)+(r*s-a*n)*(l*g-p*m)-(r*d-i*n)*(l*f-u*m)+(a*d-i*s)*(l*_-c*m)},t.multiply=a,t.translate=function(e,t,r){let a=r[0],i=r[1],o=r[2],n,s,d,l,c,u,p,m,_,f,g,h;return t===e?(e[12]=t[0]*a+t[4]*i+t[8]*o+t[12],e[13]=t[1]*a+t[5]*i+t[9]*o+t[13],e[14]=t[2]*a+t[6]*i+t[10]*o+t[14],e[15]=t[3]*a+t[7]*i+t[11]*o+t[15]):(n=t[0],s=t[1],d=t[2],l=t[3],c=t[4],u=t[5],p=t[6],m=t[7],_=t[8],f=t[9],g=t[10],h=t[11],e[0]=n,e[1]=s,e[2]=d,e[3]=l,e[4]=c,e[5]=u,e[6]=p,e[7]=m,e[8]=_,e[9]=f,e[10]=g,e[11]=h,e[12]=n*a+c*i+_*o+t[12],e[13]=s*a+u*i+f*o+t[13],e[14]=d*a+p*i+g*o+t[14],e[15]=l*a+m*i+h*o+t[15]),e},t.scale=function(e,t,r){let a=r[0],i=r[1],o=r[2];return e[0]=t[0]*a,e[1]=t[1]*a,e[2]=t[2]*a,e[3]=t[3]*a,e[4]=t[4]*i,e[5]=t[5]*i,e[6]=t[6]*i,e[7]=t[7]*i,e[8]=t[8]*o,e[9]=t[9]*o,e[10]=t[10]*o,e[11]=t[11]*o,e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15],e},t.rotate=function(e,r,a,i){let o=i[0],p=i[1],_=i[2],f=n(o*o+p*p+_*_),g,s,c,t,h,b,x,v,E,y,T,A,R,S,w,C,L,N,I,O,P,k,M,U;return u(f)<m.EPSILON?null:(f=1/f,o*=f,p*=f,_*=f,g=l(a),s=d(a),c=1-s,t=r[0],h=r[1],b=r[2],x=r[3],v=r[4],E=r[5],y=r[6],T=r[7],A=r[8],R=r[9],S=r[10],w=r[11],C=o*o*c+s,L=p*o*c+_*g,N=_*o*c-p*g,I=o*p*c-_*g,O=p*p*c+s,P=_*p*c+o*g,k=o*_*c+p*g,M=p*_*c-o*g,U=_*_*c+s,e[0]=t*C+v*L+A*N,e[1]=h*C+E*L+R*N,e[2]=b*C+y*L+S*N,e[3]=x*C+T*L+w*N,e[4]=t*I+v*O+A*P,e[5]=h*I+E*O+R*P,e[6]=b*I+y*O+S*P,e[7]=x*I+T*O+w*P,e[8]=t*k+v*M+A*U,e[9]=h*k+E*M+R*U,e[10]=b*k+y*M+S*U,e[11]=x*k+T*M+w*U,r!==e&&(e[12]=r[12],e[13]=r[13],e[14]=r[14],e[15]=r[15]),e)},t.rotateX=function(e,t,r){let a=l(r),i=d(r),o=t[4],n=t[5],s=t[6],c=t[7],u=t[8],p=t[9],m=t[10],_=t[11];return t!==e&&(e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e[4]=o*i+u*a,e[5]=n*i+p*a,e[6]=s*i+m*a,e[7]=c*i+_*a,e[8]=u*i-o*a,e[9]=p*i-n*a,e[10]=m*i-s*a,e[11]=_*i-c*a,e},t.rotateY=function(e,t,r){let a=l(r),i=d(r),o=t[0],n=t[1],s=t[2],c=t[3],u=t[8],p=t[9],m=t[10],_=t[11];return t!==e&&(e[4]=t[4],e[5]=t[5],e[6]=t[6],e[7]=t[7],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e[0]=o*i-u*a,e[1]=n*i-p*a,e[2]=s*i-m*a,e[3]=c*i-_*a,e[8]=o*a+u*i,e[9]=n*a+p*i,e[10]=s*a+m*i,e[11]=c*a+_*i,e},t.rotateZ=function(e,t,r){let a=l(r),i=d(r),o=t[0],n=t[1],s=t[2],c=t[3],u=t[4],p=t[5],m=t[6],_=t[7];return t!==e&&(e[8]=t[8],e[9]=t[9],e[10]=t[10],e[11]=t[11],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]),e[0]=o*i+u*a,e[1]=n*i+p*a,e[2]=s*i+m*a,e[3]=c*i+_*a,e[4]=u*i-o*a,e[5]=p*i-n*a,e[6]=m*i-s*a,e[7]=_*i-c*a,e},t.fromTranslation=function(e,t){return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=t[0],e[13]=t[1],e[14]=t[2],e[15]=1,e},t.fromScaling=function(e,t){return e[0]=t[0],e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=t[1],e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=t[2],e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e},t.fromRotation=function(e,r,a){let i=a[0],o=a[1],p=a[2],_=n(i*i+o*o+p*p),f,s,c;return u(_)<m.EPSILON?null:(_=1/_,i*=_,o*=_,p*=_,f=l(r),s=d(r),c=1-s,e[0]=i*i*c+s,e[1]=o*i*c+p*f,e[2]=p*i*c-o*f,e[3]=0,e[4]=i*o*c-p*f,e[5]=o*o*c+s,e[6]=p*o*c+i*f,e[7]=0,e[8]=i*p*c+o*f,e[9]=o*p*c-i*f,e[10]=p*p*c+s,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e)},t.fromXRotation=function(e,t){let r=l(t),a=d(t);return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=a,e[6]=r,e[7]=0,e[8]=0,e[9]=-r,e[10]=a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e},t.fromYRotation=function(e,t){let r=l(t),a=d(t);return e[0]=a,e[1]=0,e[2]=-r,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=r,e[9]=0,e[10]=a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e},t.fromZRotation=function(e,t){let r=l(t),a=d(t);return e[0]=a,e[1]=r,e[2]=0,e[3]=0,e[4]=-r,e[5]=a,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e},t.fromRotationTranslation=function(e,t,r){let a=t[0],i=t[1],o=t[2],n=t[3],s=a+a,d=i+i,l=o+o,c=a*s,u=a*d,p=a*l,m=i*d,_=i*l,f=o*l,g=n*s,h=n*d,b=n*l;return e[0]=1-(m+f),e[1]=u+b,e[2]=p-h,e[3]=0,e[4]=u-b,e[5]=1-(c+f),e[6]=_+g,e[7]=0,e[8]=p+h,e[9]=_-g,e[10]=1-(c+m),e[11]=0,e[12]=r[0],e[13]=r[1],e[14]=r[2],e[15]=1,e},t.getTranslation=function(e,t){return e[0]=t[12],e[1]=t[13],e[2]=t[14],e},t.getScaling=function(e,t){let r=t[0],a=t[1],i=t[2],o=t[4],s=t[5],d=t[6],l=t[8],c=t[9],u=t[10];return e[0]=n(r*r+a*a+i*i),e[1]=n(o*o+s*s+d*d),e[2]=n(l*l+c*c+u*u),e},t.getRotation=function(e,t){let r=t[0]+t[5]+t[10],a=0;return 0<r?(a=2*n(r+1),e[3]=0.25*a,e[0]=(t[6]-t[9])/a,e[1]=(t[8]-t[2])/a,e[2]=(t[1]-t[4])/a):t[0]>t[5]&t[0]>t[10]?(a=2*n(1+t[0]-t[5]-t[10]),e[3]=(t[6]-t[9])/a,e[0]=0.25*a,e[1]=(t[1]+t[4])/a,e[2]=(t[8]+t[2])/a):t[5]>t[10]?(a=2*n(1+t[5]-t[0]-t[10]),e[3]=(t[8]-t[2])/a,e[0]=(t[1]+t[4])/a,e[1]=0.25*a,e[2]=(t[6]+t[9])/a):(a=2*n(1+t[10]-t[0]-t[5]),e[3]=(t[1]-t[4])/a,e[0]=(t[8]+t[2])/a,e[1]=(t[6]+t[9])/a,e[2]=0.25*a),e},t.fromRotationTranslationScale=function(e,t,r,a){let i=t[0],o=t[1],n=t[2],s=t[3],d=i+i,l=o+o,c=n+n,u=i*d,p=i*l,m=i*c,_=o*l,f=o*c,g=n*c,h=s*d,b=s*l,x=s*c,v=a[0],E=a[1],y=a[2];return e[0]=(1-(_+g))*v,e[1]=(p+x)*v,e[2]=(m-b)*v,e[3]=0,e[4]=(p-x)*E,e[5]=(1-(u+g))*E,e[6]=(f+h)*E,e[7]=0,e[8]=(m+b)*y,e[9]=(f-h)*y,e[10]=(1-(u+_))*y,e[11]=0,e[12]=r[0],e[13]=r[1],e[14]=r[2],e[15]=1,e},t.fromRotationTranslationScaleOrigin=function(e,t,r,a,i){let o=t[0],n=t[1],s=t[2],d=t[3],l=o+o,c=n+n,u=s+s,p=o*l,m=o*c,_=o*u,f=n*c,g=n*u,h=s*u,b=d*l,x=d*c,v=d*u,E=a[0],y=a[1],T=a[2],A=i[0],R=i[1],S=i[2];return e[0]=(1-(f+h))*E,e[1]=(m+v)*E,e[2]=(_-x)*E,e[3]=0,e[4]=(m-v)*y,e[5]=(1-(p+h))*y,e[6]=(g+b)*y,e[7]=0,e[8]=(_+x)*T,e[9]=(g-b)*T,e[10]=(1-(p+f))*T,e[11]=0,e[12]=r[0]+A-(e[0]*A+e[4]*R+e[8]*S),e[13]=r[1]+R-(e[1]*A+e[5]*R+e[9]*S),e[14]=r[2]+S-(e[2]*A+e[6]*R+e[10]*S),e[15]=1,e},t.fromQuat=function(e,t){let r=t[0],a=t[1],i=t[2],o=t[3],n=r+r,s=a+a,d=i+i,l=r*n,c=a*n,u=a*s,p=i*n,m=i*s,_=i*d,f=o*n,g=o*s,h=o*d;return e[0]=1-u-_,e[1]=c+h,e[2]=p-g,e[3]=0,e[4]=c-h,e[5]=1-l-_,e[6]=m+f,e[7]=0,e[8]=p+g,e[9]=m-f,e[10]=1-l-u,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e},t.frustum=function(e,t,r,a,i,o,n){let s=1/(r-t),d=1/(i-a),l=1/(o-n);return e[0]=2*o*s,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=2*o*d,e[6]=0,e[7]=0,e[8]=(r+t)*s,e[9]=(i+a)*d,e[10]=(n+o)*l,e[11]=-1,e[12]=0,e[13]=0,e[14]=2*(n*o)*l,e[15]=0,e},t.perspective=function(e,t,r,a,i){let n=1/o(t/2),s=1/(a-i);return e[0]=n/r,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=n,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=(i+a)*s,e[11]=-1,e[12]=0,e[13]=0,e[14]=2*i*a*s,e[15]=0,e},t.perspectiveFromFieldOfView=function(e,t,r,a){let i=o(t.upDegrees*p/180),n=o(t.downDegrees*p/180),s=o(t.leftDegrees*p/180),d=o(t.rightDegrees*p/180),l=2/(s+d),c=2/(i+n);return e[0]=l,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=c,e[6]=0,e[7]=0,e[8]=-(0.5*((s-d)*l)),e[9]=0.5*((i-n)*c),e[10]=a/(r-a),e[11]=-1,e[12]=0,e[13]=0,e[14]=a*r/(r-a),e[15]=0,e},t.ortho=function(e,t,r,a,i,o,n){let s=1/(t-r),d=1/(a-i),l=1/(o-n);return e[0]=-2*s,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=-2*d,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=2*l,e[11]=0,e[12]=(t+r)*s,e[13]=(i+a)*d,e[14]=(n+o)*l,e[15]=1,e},t.lookAt=function(e,t,r,a){let i=t[0],o=t[1],s=t[2],d=a[0],l=a[1],c=a[2],p=r[0],_=r[1],f=r[2],g,h,b,x,v,E,y,T,A,R;return u(i-p)<m.EPSILON&&u(o-_)<m.EPSILON&&u(s-f)<m.EPSILON?mat4.identity(e):(y=i-p,T=o-_,A=s-f,R=1/n(y*y+T*T+A*A),y*=R,T*=R,A*=R,g=l*A-c*T,h=c*y-d*A,b=d*T-l*y,R=n(g*g+h*h+b*b),R?(R=1/R,g*=R,h*=R,b*=R):(g=0,h=0,b=0),x=T*b-A*h,v=A*g-y*b,E=y*h-T*g,R=n(x*x+v*v+E*E),R?(R=1/R,x*=R,v*=R,E*=R):(x=0,v=0,E=0),e[0]=g,e[1]=x,e[2]=y,e[3]=0,e[4]=h,e[5]=v,e[6]=T,e[7]=0,e[8]=b,e[9]=E,e[10]=A,e[11]=0,e[12]=-(g*i+h*o+b*s),e[13]=-(x*i+v*o+E*s),e[14]=-(y*i+T*o+A*s),e[15]=1,e)},t.targetTo=function(e,t,r,a){let i=t[0],o=t[1],s=t[2],d=a[0],l=a[1],c=a[2],u=i-r[0],p=o-r[1],m=s-r[2],_=u*u+p*p+m*m;0<_&&(_=1/n(_),u*=_,p*=_,m*=_);let f=l*m-c*p,g=c*u-d*m,h=d*p-l*u;return e[0]=f,e[1]=g,e[2]=h,e[3]=0,e[4]=p*h-m*g,e[5]=m*f-u*h,e[6]=u*g-p*f,e[7]=0,e[8]=u,e[9]=p,e[10]=m,e[11]=0,e[12]=i,e[13]=o,e[14]=s,e[15]=1,e},t.str=function(e){return'mat4('+e[0]+', '+e[1]+', '+e[2]+', '+e[3]+', '+e[4]+', '+e[5]+', '+e[6]+', '+e[7]+', '+e[8]+', '+e[9]+', '+e[10]+', '+e[11]+', '+e[12]+', '+e[13]+', '+e[14]+', '+e[15]+')'},t.frob=function(e){return n(s(e[0],2)+s(e[1],2)+s(e[2],2)+s(e[3],2)+s(e[4],2)+s(e[5],2)+s(e[6],2)+s(e[7],2)+s(e[8],2)+s(e[9],2)+s(e[10],2)+s(e[11],2)+s(e[12],2)+s(e[13],2)+s(e[14],2)+s(e[15],2))},t.add=function(e,t,r){return e[0]=t[0]+r[0],e[1]=t[1]+r[1],e[2]=t[2]+r[2],e[3]=t[3]+r[3],e[4]=t[4]+r[4],e[5]=t[5]+r[5],e[6]=t[6]+r[6],e[7]=t[7]+r[7],e[8]=t[8]+r[8],e[9]=t[9]+r[9],e[10]=t[10]+r[10],e[11]=t[11]+r[11],e[12]=t[12]+r[12],e[13]=t[13]+r[13],e[14]=t[14]+r[14],e[15]=t[15]+r[15],e},t.subtract=i,t.multiplyScalar=function(e,t,r){return e[0]=t[0]*r,e[1]=t[1]*r,e[2]=t[2]*r,e[3]=t[3]*r,e[4]=t[4]*r,e[5]=t[5]*r,e[6]=t[6]*r,e[7]=t[7]*r,e[8]=t[8]*r,e[9]=t[9]*r,e[10]=t[10]*r,e[11]=t[11]*r,e[12]=t[12]*r,e[13]=t[13]*r,e[14]=t[14]*r,e[15]=t[15]*r,e},t.multiplyScalarAndAdd=function(e,t,r,a){return e[0]=t[0]+r[0]*a,e[1]=t[1]+r[1]*a,e[2]=t[2]+r[2]*a,e[3]=t[3]+r[3]*a,e[4]=t[4]+r[4]*a,e[5]=t[5]+r[5]*a,e[6]=t[6]+r[6]*a,e[7]=t[7]+r[7]*a,e[8]=t[8]+r[8]*a,e[9]=t[9]+r[9]*a,e[10]=t[10]+r[10]*a,e[11]=t[11]+r[11]*a,e[12]=t[12]+r[12]*a,e[13]=t[13]+r[13]*a,e[14]=t[14]+r[14]*a,e[15]=t[15]+r[15]*a,e},t.exactEquals=function(e,t){return e[0]===t[0]&&e[1]===t[1]&&e[2]===t[2]&&e[3]===t[3]&&e[4]===t[4]&&e[5]===t[5]&&e[6]===t[6]&&e[7]===t[7]&&e[8]===t[8]&&e[9]===t[9]&&e[10]===t[10]&&e[11]===t[11]&&e[12]===t[12]&&e[13]===t[13]&&e[14]===t[14]&&e[15]===t[15]},t.equals=function(e,t){let r=e[0],a=e[1],i=e[2],o=e[3],n=e[4],s=e[5],d=e[6],l=e[7],p=e[8],_=e[9],f=e[10],g=e[11],h=e[12],b=e[13],x=e[14],v=e[15],E=t[0],y=t[1],T=t[2],A=t[3],R=t[4],S=t[5],w=t[6],C=t[7],L=t[8],N=t[9],I=t[10],O=t[11],P=t[12],k=t[13],M=t[14],U=t[15];return u(r-E)<=m.EPSILON*c(1,u(r),u(E))&&u(a-y)<=m.EPSILON*c(1,u(a),u(y))&&u(i-T)<=m.EPSILON*c(1,u(i),u(T))&&u(o-A)<=m.EPSILON*c(1,u(o),u(A))&&u(n-R)<=m.EPSILON*c(1,u(n),u(R))&&u(s-S)<=m.EPSILON*c(1,u(s),u(S))&&u(d-w)<=m.EPSILON*c(1,u(d),u(w))&&u(l-C)<=m.EPSILON*c(1,u(l),u(C))&&u(p-L)<=m.EPSILON*c(1,u(p),u(L))&&u(_-N)<=m.EPSILON*c(1,u(_),u(N))&&u(f-I)<=m.EPSILON*c(1,u(f),u(I))&&u(g-O)<=m.EPSILON*c(1,u(g),u(O))&&u(h-P)<=m.EPSILON*c(1,u(h),u(P))&&u(b-k)<=m.EPSILON*c(1,u(b),u(k))&&u(x-M)<=m.EPSILON*c(1,u(x),u(M))&&u(v-U)<=m.EPSILON*c(1,u(v),u(U))};var m=r(7);t.mul=a;t.sub=i},function(e,t,r){'use strict';function a(){let e=new p.ARRAY_TYPE(4);return e[0]=0,e[1]=0,e[2]=0,e[3]=1,e}function i(e,t,r){r*=0.5;let a=c(r);return e[0]=a*t[0],e[1]=a*t[1],e[2]=a*t[2],e[3]=l(r),e}function o(e,t,r){let a=t[0],i=t[1],o=t[2],n=t[3],s=r[0],d=r[1],l=r[2],c=r[3];return e[0]=a*c+n*s+i*l-o*d,e[1]=i*c+n*d+o*s-a*l,e[2]=o*c+n*l+a*d-i*s,e[3]=n*c-a*s-i*d-o*l,e}function n(e,r,a,i){let t=r[0],o=r[1],n=r[2],s=r[3],d=a[0],l=a[1],p=a[2],m=a[3],_,f,g,h,b;return f=t*d+o*l+n*p+s*m,0>f&&(f=-f,d=-d,l=-l,p=-p,m=-m),1e-6<1-f?(_=u(f),g=c(_),h=c((1-i)*_)/g,b=c(i*_)/g):(h=1-i,b=i),e[0]=h*t+b*d,e[1]=h*o+b*l,e[2]=h*n+b*p,e[3]=h*s+b*m,e}function s(e,t){let r=t[0]+t[4]+t[8],a;if(0<r)a=d(r+1),e[3]=0.5*a,a=0.5/a,e[0]=(t[5]-t[7])*a,e[1]=(t[6]-t[2])*a,e[2]=(t[1]-t[3])*a;else{let r=0;t[4]>t[0]&&(r=1),t[8]>t[3*r+r]&&(r=2);let i=(r+1)%3,o=(r+2)%3;a=d(t[3*r+r]-t[3*i+i]-t[3*o+o]+1),e[r]=0.5*a,a=0.5/a,e[3]=(t[3*i+o]-t[3*o+i])*a,e[i]=(t[3*i+r]+t[3*r+i])*a,e[o]=(t[3*o+r]+t[3*r+o])*a}return e}var d=Math.sqrt,l=Math.cos,c=Math.sin,u=Math.acos;Object.defineProperty(t,'__esModule',{value:!0}),t.create=a,t.identity=function(e){return e[0]=0,e[1]=0,e[2]=0,e[3]=1,e},t.setAxisAngle=i,t.getAxisAngle=function(e,t){let r=2*u(t[3]),a=c(r/2);return 0==a?(e[0]=1,e[1]=0,e[2]=0):(e[0]=t[0]/a,e[1]=t[1]/a,e[2]=t[2]/a),r},t.multiply=o,t.rotateX=function(e,t,r){r*=0.5;let a=t[0],i=t[1],o=t[2],n=t[3],s=c(r),d=l(r);return e[0]=a*d+n*s,e[1]=i*d+o*s,e[2]=o*d-i*s,e[3]=n*d-a*s,e},t.rotateY=function(e,t,r){r*=0.5;let a=t[0],i=t[1],o=t[2],n=t[3],s=c(r),d=l(r);return e[0]=a*d-o*s,e[1]=i*d+n*s,e[2]=o*d+a*s,e[3]=n*d-i*s,e},t.rotateZ=function(e,t,r){r*=0.5;let a=t[0],i=t[1],o=t[2],n=t[3],s=c(r),d=l(r);return e[0]=a*d+i*s,e[1]=i*d-a*s,e[2]=o*d+n*s,e[3]=n*d-o*s,e},t.calculateW=function(e,t){let r=t[0],a=t[1],i=t[2];return e[0]=r,e[1]=a,e[2]=i,e[3]=d(Math.abs(1-r*r-a*a-i*i)),e},t.slerp=n,t.invert=function(e,t){let r=t[0],a=t[1],i=t[2],o=t[3],n=r*r+a*a+i*i+o*o,s=n?1/n:0;return e[0]=-r*s,e[1]=-a*s,e[2]=-i*s,e[3]=o*s,e},t.conjugate=function(e,t){return e[0]=-t[0],e[1]=-t[1],e[2]=-t[2],e[3]=t[3],e},t.fromMat3=s,t.fromEuler=function(e,t,r,a){let i=0.5*Math.PI/180;t*=i,r*=i,a*=i;let o=c(t),n=l(t),s=c(r),d=l(r),u=c(a),p=l(a);return e[0]=o*d*p-n*s*u,e[1]=n*s*p+o*d*u,e[2]=n*d*u-o*s*p,e[3]=n*d*p+o*s*u,e},t.str=function(e){return'quat('+e[0]+', '+e[1]+', '+e[2]+', '+e[3]+')'};var p=r(7),m=r(28),_=r(29),f=r(30);const g=f.clone;t.clone=g;const h=f.fromValues;t.fromValues=h;const b=f.copy;t.copy=b;const x=f.set;t.set=x;const v=f.add;t.add=v;t.mul=o;const E=f.scale;t.scale=E;const y=f.dot;t.dot=y;const T=f.lerp;t.lerp=T;const A=f.length;t.length=A;t.len=A;const R=f.squaredLength;t.squaredLength=R;t.sqrLen=R;const S=f.normalize;t.normalize=S;const w=f.exactEquals;t.exactEquals=w;const C=f.equals;t.equals=C;const L=function(){let e=_.create(),t=_.fromValues(1,0,0),r=_.fromValues(0,1,0);return function(o,n,a){let s=_.dot(n,a);return-0.999999>s?(_.cross(e,t,n),1e-6>_.len(e)&&_.cross(e,r,n),_.normalize(e,e),i(o,e,Math.PI),o):0.999999<s?(o[0]=0,o[1]=0,o[2]=0,o[3]=1,o):(_.cross(e,n,a),o[0]=e[0],o[1]=e[1],o[2]=e[2],o[3]=1+s,S(o,o))}}();t.rotationTo=L;const N=function(){let e=a(),r=a();return function(i,o,a,s,l,d){return n(e,o,l,d),n(r,a,s,d),n(i,e,r,2*d*(1-d)),i}}();t.sqlerp=N;const I=function(){let e=m.create();return function(t,r,a,i){return e[0]=a[0],e[3]=a[1],e[6]=a[2],e[1]=i[0],e[4]=i[1],e[7]=i[2],e[2]=-r[0],e[5]=-r[1],e[8]=-r[2],S(t,s(t,e))}}();t.setAxes=I},function(e,t,r){'use strict';function a(){let e=new v.ARRAY_TYPE(2);return e[0]=0,e[1]=0,e}function i(e,t,r){return e[0]=t[0]-r[0],e[1]=t[1]-r[1],e}function o(e,t,r){return e[0]=t[0]*r[0],e[1]=t[1]*r[1],e}function n(e,t,r){return e[0]=t[0]/r[0],e[1]=t[1]/r[1],e}function s(e,t){var r=t[0]-e[0],a=t[1]-e[1];return _(r*r+a*a)}function d(e,t){var r=t[0]-e[0],a=t[1]-e[1];return r*r+a*a}function l(e){var t=e[0],r=e[1];return _(t*t+r*r)}function c(e){var t=e[0],r=e[1];return t*t+r*r}var u=Math.round,p=Math.floor,m=Math.ceil,_=Math.sqrt,f=Math.min,g=Math.max,h=Math.abs;Object.defineProperty(t,'__esModule',{value:!0}),t.create=a,t.clone=function(e){let t=new v.ARRAY_TYPE(2);return t[0]=e[0],t[1]=e[1],t},t.fromValues=function(e,t){let r=new v.ARRAY_TYPE(2);return r[0]=e,r[1]=t,r},t.copy=function(e,t){return e[0]=t[0],e[1]=t[1],e},t.set=function(e,t,r){return e[0]=t,e[1]=r,e},t.add=function(e,t,r){return e[0]=t[0]+r[0],e[1]=t[1]+r[1],e},t.subtract=i,t.multiply=o,t.divide=n,t.ceil=function(e,t){return e[0]=m(t[0]),e[1]=m(t[1]),e},t.floor=function(e,t){return e[0]=p(t[0]),e[1]=p(t[1]),e},t.min=function(e,t,r){return e[0]=f(t[0],r[0]),e[1]=f(t[1],r[1]),e},t.max=function(e,t,r){return e[0]=g(t[0],r[0]),e[1]=g(t[1],r[1]),e},t.round=function(e,t){return e[0]=u(t[0]),e[1]=u(t[1]),e},t.scale=function(e,t,r){return e[0]=t[0]*r,e[1]=t[1]*r,e},t.scaleAndAdd=function(e,t,r,a){return e[0]=t[0]+r[0]*a,e[1]=t[1]+r[1]*a,e},t.distance=s,t.squaredDistance=d,t.length=l,t.squaredLength=c,t.negate=function(e,t){return e[0]=-t[0],e[1]=-t[1],e},t.inverse=function(e,t){return e[0]=1/t[0],e[1]=1/t[1],e},t.normalize=function(e,t){var r=t[0],a=t[1],i=r*r+a*a;return 0<i&&(i=1/_(i),e[0]=t[0]*i,e[1]=t[1]*i),e},t.dot=function(e,t){return e[0]*t[0]+e[1]*t[1]},t.cross=function(e,t,r){var a=t[0]*r[1]-t[1]*r[0];return e[0]=e[1]=0,e[2]=a,e},t.lerp=function(e,r,a,i){var t=r[0],o=r[1];return e[0]=t+i*(a[0]-t),e[1]=o+i*(a[1]-o),e},t.random=function(e,t){t=t||1;var a=2*v.RANDOM()*Math.PI;return e[0]=Math.cos(a)*t,e[1]=Math.sin(a)*t,e},t.transformMat2=function(e,t,r){var a=t[0],i=t[1];return e[0]=r[0]*a+r[2]*i,e[1]=r[1]*a+r[3]*i,e},t.transformMat2d=function(e,t,r){var a=t[0],i=t[1];return e[0]=r[0]*a+r[2]*i+r[4],e[1]=r[1]*a+r[3]*i+r[5],e},t.transformMat3=function(e,t,r){var a=t[0],i=t[1];return e[0]=r[0]*a+r[3]*i+r[6],e[1]=r[1]*a+r[4]*i+r[7],e},t.transformMat4=function(e,t,r){let a=t[0],i=t[1];return e[0]=r[0]*a+r[4]*i+r[12],e[1]=r[1]*a+r[5]*i+r[13],e},t.str=function(e){return'vec2('+e[0]+', '+e[1]+')'},t.exactEquals=function(e,t){return e[0]===t[0]&&e[1]===t[1]},t.equals=function(e,t){let r=e[0],a=e[1],i=t[0],o=t[1];return h(r-i)<=v.EPSILON*g(1,h(r),h(i))&&h(a-o)<=v.EPSILON*g(1,h(a),h(o))};var v=r(7);t.len=l;t.sub=i;t.mul=o;t.div=n;t.dist=s;t.sqrDist=d;t.sqrLen=c;const b=function(){let e=a();return function(t,r,a,o,n,s){let d,i;for(r||(r=2),a||(a=0),i=o?f(o*r+a,t.length):t.length,d=a;d<i;d+=r)e[0]=t[d],e[1]=t[d+1],n(e,e,s),t[d]=e[0],t[d+1]=e[1];return t}}();t.forEach=b},function(e,t,r){'use strict';var a=r(1),i=r(17);class o extends i.a{constructor(e){super(e),this.isOrthographicCamera=!0}updateProjectionMatrix(){a.mat4.ortho(this.projectionMatrix,-1,1,-1,1,this.near,this.far)}}t.a=o},function(e,t,r){'use strict';var a=r(1),i=r(17);class o extends i.a{constructor(e){super(e),this.isPespectiveCamera=!0}updateProjectionMatrix(){a.mat4.perspective(this.projectionMatrix,this.fov,this.ratio,this.near,this.far)}}t.a=o},function(e,t,r){'use strict';var a=r(1),i=r(32),o=r(11),n=r(15),s=r(3);const d=a.mat4.create(),l=a.vec3.create(),c=new s.a;let u;const p=new s.a,m=new s.a,_=new s.a,f=new n.a,g=new n.a,h=new n.a;t.a=class{constructor(e,t,r,a){this.ray=new i.a,this.near=r||0,this.far=a||Infinity}setFromCamera(e,t,r){r&&r.isPespectiveCamera&&(this.ray.origin.copy(r.position),a.vec3.copy(l,[e.x,e.y,0.5]),a.mat4.multiply(d,r.projectionMatrix,r.worldInverseMatrix),a.mat4.invert(d,d),a.vec3.transformMat4(l,l,d),a.vec3.sub(l,l,r.position.v),a.vec3.normalize(l,l),c.set(l[0],l[1],l[2]),this.ray.direction.copy(c))}uvIntersection(e,t,r,a){return u=Object(o.barycoordFromPoint)(e.v,t.v,r.v,a.v),f.scale(u.x),g.scale(u.y),h.scale(u.z),f.add(g).add(h),f.clone()}intersectObject(e){let t,r;for(const i of e.geometry.faces)if(a.vec3.copy(p.v,i.vertices[0].v),a.vec3.copy(m.v,i.vertices[1].v),a.vec3.copy(_.v,i.vertices[2].v),a.vec3.transformMat4(p.v,p.v,e.modelMatrix),a.vec3.transformMat4(m.v,m.v,e.modelMatrix),a.vec3.transformMat4(_.v,_.v,e.modelMatrix),t=this.ray.intersectTriangle(p,m,_),t){a.vec2.copy(f.v,e.geometry.uvs[i.uvs[0]].v),a.vec2.copy(g.v,e.geometry.uvs[i.uvs[1]].v),a.vec2.copy(h.v,e.geometry.uvs[i.uvs[2]].v),r=this.uvIntersection(t,p,m,_);break}return t?{point:t,uv:r}:null}}},function(e,t,r){'use strict';var a=r(13),i=r(33),o=r(5),n=r(2),s=r(0),d=r(16);const l=r(52);let c;t.a=class{constructor(e){this.width=n.RENDERER_DEFAULT_WIDTH,this.height=n.RENDERER_DEFAULT_HEIGHT,this.ratio=n.RENDERER_DEFAULT_WIDTH/n.RENDERER_DEFAULT_HEIGHT,this.preserveDrawingBuffer=!1,this.pixelRatio=1,this.prefferedContext=n.RENDERER_DEFAULT_CONTEXT,this.autoClear=!0,this.clearColor={r:0,g:0,b:0,a:1},Object.assign(this,e),this.canvas=document.createElement('canvas'),this.canvas.width=this.width,this.canvas.height=this.height;const t={preserveDrawingBuffer:this.preserveDrawingBuffer},r=Object(i.a)();if(r){let e;if(r.webgl2&&this.prefferedContext===n.WEBGL2_CONTEXT){e=n.WEBGL2_CONTEXT;const r=this.canvas.getContext('webgl2',t);s.set(r,e)}else{e=n.WEBGL_CONTEXT;const r=this.canvas.getContext('webgl',t)||this.canvas.getContext('experimental-webgl',t);s.set(r,e)}}else return void Object(a.b)('Webgl not supported');Object(a.a)(`%c${l.name} ${l.version} webgl${s.webgl2?2:''}`,'padding: 1px; background: #222; color: #ff00ff'),c=s.get(),o.set(c),s.webgl2&&d.setup(),this.viewport={x:0,y:0,width:c.drawingBufferWidth,height:c.drawingBufferHeight},this.setClearColor(),c.enable(c.DEPTH_TEST)}setClearColor(e=0,t=0,r=0,i=1){this.clearColor.r=e,this.clearColor.g=t,this.clearColor.b=r,this.clearColor.a=i}setSize(e,t){const r=e*this.pixelRatio,a=t*this.pixelRatio;(r!==this.width||a!==this.height)&&(this.width=e*this.pixelRatio,this.height=t*this.pixelRatio,this.ratio=this.width/this.height,this.canvas.width=this.width,this.canvas.height=this.height,this.canvas.style.width=`${e}px`,this.canvas.style.height=`${t}px`,this.setViewport(0,0,e,t))}setDevicePixelRatio(e=1){this.pixelRatio=e||1,this.setSize(this.width,this.height)}setSissorTest(e=!1){c=s.get(),e?c.enable(c.SCISSOR_TEST):c.disable(c.SCISSOR_TEST)}setSissor(e,t,r,a){c=s.get(),c.scissor(e*this.pixelRatio,t*this.pixelRatio,r*this.pixelRatio,a*this.pixelRatio)}setViewport(e,t,r,a){this.viewport.x=e*this.pixelRatio,this.viewport.y=t*this.pixelRatio,this.viewport.width=r*this.pixelRatio,this.viewport.height=a*this.pixelRatio}render(e,t){c=s.get(),c.viewport(this.viewport.x,this.viewport.y,this.viewport.width,this.viewport.height),this.autoClear&&(c.clearColor(this.clearColor.r,this.clearColor.g,this.clearColor.b,this.clearColor.a),c.clear(c.COLOR_BUFFER_BIT|c.DEPTH_BUFFER_BIT)),e.update(),c instanceof WebGL2RenderingContext&&d.updateProjectionView(c,t.projectionMatrix),e.objects.forEach((e)=>{e.isInstanced?e.drawInstance(t):e.draw(t)})}}},function(e){e.exports={name:'ixviii.medium',version:'0.3.0',description:'Progressive WebGL toolkit for art.',main:'lib/ixviii.medium.js',scripts:{start:'concurrently \'npm run server\' \'npm run examples:js\' \'npm run examples:html\'',server:'live-server ./examples --port 3000 --quiet --watch ./examples --watch ./src --wait 0',"examples:js":'webpack --config webpack.config.examples.js --colors --watch',"examples:html":'node ./pug.config.js',"examples:build":'NODE_ENV=production webpack --config webpack.config.examples.js --colors; node ./pug.config.js',build:'NODE_ENV=production npm run lint; webpack --config webpack.config.build.js --colors; NODE_ENV=production webpack --config webpack.config.build.js --colors',prepublish:'npm run docs; npm run build',formatting:'prettier --write --single-quote --print-width 80 \'./src/**/*.ts\'',"formatting:examples":'prettier --write --single-quote --print-width 80 \'./examples/src/js/**/*.js\'',"lint:examples":'eslint --ext .js ./examples/src ./internals --cache',"lint:src":'tslint --fix ./src/**/*.ts',lint:'npm run lint:src; npm run lint:examples;',docs:'typedoc --target es6 --tsconfig ./tsconfig.json --ignoreCompilerErrors --theme default --name Medium --out ./docs ./src',precommit:'npm run lint'},repository:{type:'git',url:'https://github.com/amelierosser/medium.git'},author:'Amelie Rosser <amelierosser1986@gmail.com> (https://www.ixviii.io)',license:'MIT',bugs:{url:'https://github.com/amelierosser/medium/issues'},homepage:'https://github.com/amelierosser/medium',devDependencies:{"@types/gl-matrix":'^2.2.34',"@types/webgl2":'^0.0.2',"babel-cli":'^6.26.0',"babel-eslint":'^7.2.3',"babel-loader":'^7.1.2',"babel-plugin-module-resolver":'^2.7.1',"babel-plugin-transform-class-properties":'^6.24.1',"babel-preset-env":'^1.6.0',"babel-preset-minify":'^0.2.0',"babili-webpack-plugin":'^0.1.2',concurrently:'^3.5.0',eslint:'^4.6.1',"eslint-config-airbnb":'^15.1.0',"eslint-config-prettier":'^2.4.0',"eslint-plugin-compat":'^1.0.4',"eslint-plugin-import":'^2.7.0',"eslint-plugin-jsx-a11y":'^6.0.2',"eslint-plugin-prettier":'^2.2.0',"eslint-plugin-react":'^7.3.0',"eslint-plugin-redux-saga":'^0.4.0',husky:'^0.14.3',install:'^0.10.1',"json-loader":'^0.5.7',"live-server":'^1.2.0',prettier:'^1.6.1',"pug-cli":'^1.0.0-alpha6',"redux-saga":'^0.15.6',"ts-loader":'^2.3.4',tslint:'^5.7.0',"tslint-config-prettier":'^1.5.0',typedoc:'^0.8.0',typescript:'^2.5.2',webpack:'^3.5.6'},dependencies:{"@types/dat-gui":'^0.6.3',"bezier-js":'^2.2.3',"dat-gui":'^0.5.0',"file-name":'^0.1.0',"gl-matrix":'^2.4.0',"parse-hdr":'^1.0.0',"query-string":'^5.0.0',shelljs:'^0.7.8',"simplex-noise":'^2.3.0',uuid:'^3.1.0',"webgl-obj-loader":'^0.1.1'}}},function(e,t,r){'use strict';var i=r(0),a=r(16);let o;t.a=class{constructor(e){this.pixelRatio=e.pixelRatio||1,this.width=e.width*this.pixelRatio,this.height=e.height*this.pixelRatio,this.ratio=this.width/this.height,this.viewport={x:0,y:0,width:this.width,height:this.height},this.autoClear=!0,this.setClearColor(),o=i.get(),this._frameBuffer=o.createFramebuffer(),o.bindFramebuffer(o.FRAMEBUFFER,this._frameBuffer),this.texture=o.createTexture(),o.bindTexture(o.TEXTURE_2D,this.texture),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.LINEAR_MIPMAP_NEAREST),o.texImage2D(o.TEXTURE_2D,0,o.RGBA,this.width,this.height,0,o.RGBA,o.UNSIGNED_BYTE,null),this._renderBuffer=o.createRenderbuffer(),o.bindRenderbuffer(o.RENDERBUFFER,this._renderBuffer),o.renderbufferStorage(o.RENDERBUFFER,o.DEPTH_COMPONENT16,this.width,this.height),o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,this.texture,0),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.DEPTH_ATTACHMENT,o.RENDERBUFFER,this._renderBuffer),o.bindTexture(o.TEXTURE_2D,null),o.bindRenderbuffer(o.RENDERBUFFER,null),o.bindFramebuffer(o.FRAMEBUFFER,null)}setClearColor(e=0,t=0,r=0,n=1){o=i.get(),o.clearColor(e,t,r,n)}setSize(e,t){const r=e*this.pixelRatio,a=t*this.pixelRatio;(r!==this.width||a!==this.height)&&(this.width=e*this.pixelRatio,this.height=t*this.pixelRatio,this.ratio=this.width/this.height,o.bindTexture(o.TEXTURE_2D,this.texture),o.texImage2D(o.TEXTURE_2D,0,o.RGBA,this.width,this.height,0,o.RGBA,o.UNSIGNED_BYTE,null),o.bindTexture(o.TEXTURE_2D,null),o.bindRenderbuffer(o.RENDERBUFFER,this._renderBuffer),o.renderbufferStorage(o.RENDERBUFFER,o.DEPTH_COMPONENT16,this.width,this.height),o.bindRenderbuffer(o.RENDERBUFFER,null),this.setViewport(0,0,e,t))}setSissorTest(e=!1){o=i.get(),e?o.enable(o.SCISSOR_TEST):o.disable(o.SCISSOR_TEST)}setSissor(e,t,r,a){o=i.get(),o.scissor(e*this.pixelRatio,t*this.pixelRatio,r*this.pixelRatio,a*this.pixelRatio)}setViewport(e,t,r,a){this.viewport.x=e*this.pixelRatio,this.viewport.y=t*this.pixelRatio,this.viewport.width=r*this.pixelRatio,this.viewport.height=a*this.pixelRatio}render(e,t){o=i.get(),o.viewport(this.viewport.x,this.viewport.y,this.viewport.width,this.viewport.height),o.bindFramebuffer(o.FRAMEBUFFER,this._frameBuffer),this.autoClear&&o.clear(o.COLOR_BUFFER_BIT|o.DEPTH_BUFFER_BIT),e.update(),o instanceof WebGL2RenderingContext&&a.updateProjectionView(o,t.projectionMatrix),e.objects.forEach((e)=>{e.isInstanced?e.drawInstance(t):e.draw(t)}),o.bindTexture(o.TEXTURE_2D,this.texture),o.generateMipmap(o.TEXTURE_2D),o.bindTexture(o.TEXTURE_2D,null),o.bindFramebuffer(o.FRAMEBUFFER,null)}}},function(e,t){'use strict';t.a=class{constructor(){this.objects=[],this.pointLights=void 0,this.directionalLights=void 0}add(e){this.objects.push(e)}remove(e,t=!1){const r=this.objects.indexOf(e);-1!==r&&(this.objects.splice(r,1),t&&(e.dispose(),e=void 0))}update(){this.ambientLight&&(this.ambientLight.update(),this.ambientLight.bind()),this.directionalLights&&(this.directionalLights.update(),this.directionalLights.bind()),this.pointLights&&(this.pointLights.update(),this.pointLights.bind())}}},function(e,t,r){'use strict';r.d(t,'b',function(){return i}),r.d(t,'a',function(){return o});var a=r(4);const i=`${a.a}
	#HOOK_PRECISION
	#HOOK_DEFINES

	layout(std140) uniform;

	in vec3 vDiffuse;
	in vec3 vPosition;

	#ifdef normals
	in vec3 vNormal;
	#endif

	#ifdef uv
	in vec2 vUv;
	#endif

	out vec4 outgoingColor;

	#HOOK_FRAGMENT_PRE

	void main(void){

		vec3 color = vDiffuse;

		#ifdef normals
		vec3 normal = normalize(vNormal);
		#endif

		#HOOK_FRAGMENT_MAIN

		outgoingColor = vec4(color.rgb, 1.0);

		#HOOK_FRAGMENT_END
	}
`,o=`
	#HOOK_PRECISION
	#HOOK_DEFINES

	varying vec3 vDiffuse;
	varying vec3 vPosition;

	#ifdef normals
	varying vec3 vNormal;
	#endif

	#ifdef uv
	varying vec2 vUv;
	#endif

	#HOOK_FRAGMENT_PRE

	void main(void){

		vec3 color = vDiffuse;

		#ifdef normals
		vec3 normal = normalize(vNormal);
		#endif

		#HOOK_FRAGMENT_MAIN

		gl_FragColor = vec4(color.rgb, 1.0);

		#HOOK_FRAGMENT_END
	}
`},function(e,t,r){'use strict';r.d(t,'b',function(){return s}),r.d(t,'a',function(){return d});var a=r(19),i=r(20),o=r(4),n=r(21);const s=`${o.a}
	#HOOK_PRECISION
	#HOOK_DEFINES

	layout(std140) uniform;

	in vec3 vDiffuse;
	in vec3 vPosition;

	#ifdef normals
	in vec3 vNormal;
	#endif

	#ifdef uv
	in vec2 vUv;
	#endif

	#ifdef ambientLight
	${a.ambientLightEs300}
	#endif

	#ifdef directionalLights
	${i.directionalLightsEs300}
	${n.lambertEs300}
	#endif

	out vec4 outgoingColor;


	#HOOK_FRAGMENT_PRE

	void main(void){

		vec3 color = vec3(0.0);

		#ifdef normals
		vec3 normal = normalize(vNormal);
		#endif

		#HOOK_FRAGMENT_MAIN

		#ifdef directionalLights
		for (int i = 0; i < #HOOK_DIRECTIONAL_LIGHTS; i++) {
			color += CalculateDirectionalLight(uDirectionalLights[i], normal);
		}
		#endif

		outgoingColor = vec4(color.rgb, 1.0);

		#HOOK_FRAGMENT_END
	}
`,d=`
	#HOOK_PRECISION
	#HOOK_DEFINES

	varying vec3 vDiffuse;
	varying vec3 vPosition;

	#ifdef normals
	varying vec3 vNormal;
	#endif

	#ifdef uv
	varying vec2 vUv;
	#endif

	#ifdef ambientLight
	${a.ambientLightEs100}
	#endif

	#ifdef directionalLights
	${i.directionalLightsEs100}
	${n.lambertEs100}
	#endif

	#HOOK_FRAGMENT_PRE

	void main(void){

		vec3 color = vec3(0.0);

		#ifdef normals
		vec3 normal = normalize(vNormal);
		#endif

		#HOOK_FRAGMENT_MAIN

		#ifdef directionalLights
		for (int i = 0; i < #HOOK_DIRECTIONAL_LIGHTS; i++) {
			color += CalculateDirectionalLight(uDirectionalLights[i], normal);
		}
		#endif

		gl_FragColor = vec4(color.rgb, 1.0);

		#HOOK_FRAGMENT_END
	}
`},function(e,t,r){'use strict';r.d(t,'b',function(){return l}),r.d(t,'a',function(){return c});var a=r(19),i=r(20),o=r(4),n=r(21),s=r(58),d=r(34);const l=`${o.a}
	#HOOK_PRECISION
	#HOOK_DEFINES

	layout(std140) uniform;

	in vec3 vDiffuse;
	in vec3 vPosition;
	in vec4 vWorldPosition;

	uniform vec3 uCameraPosition;

	#ifdef normals
	in vec3 vNormal;
	#endif

	#ifdef uv
	in vec2 vUv;
	#endif

	#ifdef ambientLight
	${a.ambientLightEs300}
	#endif

	#ifdef directionalLights
	${i.directionalLightsEs300}
	${n.lambertEs300}
	#endif

	#ifdef pointLights
	${d.pointLightsEs300}
	${s.b}
	#endif

	out vec4 outgoingColor;

	#HOOK_FRAGMENT_PRE

	void main(void){

		vec3 color = vec3(0.0);

		#ifdef normals
		vec3 normal = normalize(vNormal);
		#endif

		#HOOK_FRAGMENT_MAIN

		#ifdef directionalLights
		for (int i = 0; i < #HOOK_DIRECTIONAL_LIGHTS; i++) {
			color += CalculateDirectionalLight(uDirectionalLights[i], normal);
		}
		#endif

		#ifdef pointLights
		for (int i = 0; i < #HOOK_POINT_LIGHTS; i++) {
			color += CalculatePointLight(uPointLights[i], normal);
		}
		#endif

		outgoingColor = vec4(color.rgb, 1.0);

		#HOOK_FRAGMENT_END
	}
`,c=`
	#HOOK_PRECISION
	#HOOK_DEFINES

	varying vec3 vDiffuse;
	varying vec3 vPosition;
	varying vec4 vWorldPosition;

	#ifdef normals
	varying vec3 vNormal;
	#endif

	#ifdef uv
	varying vec2 vUv;
	#endif

	#ifdef ambientLight
	${a.ambientLightEs100}
	#endif

	#ifdef directionalLights
	${i.directionalLightsEs100}
	${n.lambertEs100}
	#endif

	#ifdef pointLights
	${d.pointLightsEs100}
	${s.a}
	#endif

	#HOOK_FRAGMENT_PRE

	void main(void){

		vec3 color = vec3(0.0);

		#ifdef normals
		vec3 normal = normalize(vNormal);
		#endif

		#HOOK_FRAGMENT_MAIN

		#ifdef directionalLights
		for (int i = 0; i < #HOOK_DIRECTIONAL_LIGHTS; i++) {
			color += CalculateDirectionalLight(uDirectionalLights[i], normal);
		}
		#endif

		#ifdef pointLights
		for (int i = 0; i < #HOOK_POINT_LIGHTS; i++) {
			color += CalculatePointLight(uPointLights[i], normal);
		}
		#endif

		gl_FragColor = vec4(color.rgb, 1.0);

		#HOOK_FRAGMENT_END
	}
`},function(e,t,r){'use strict';r.d(t,'b',function(){return a}),r.d(t,'a',function(){return i});const a=`
	vec3 CalculatePointLight(PointLight light, vec3 normal) {
		vec3 lightDirection = normalize(light.position.xyz - vWorldPosition.xyz);

		// diffuse shading
		float diff = max(dot(normal, lightDirection), 0.0);
		// specular shading
		vec3 reflectDirection = reflect(-lightDirection, normal);

		// Fix the spec from showing on the backside by multiplying it by the lambert term
		float spec = diff * pow(max(dot(lightDirection, reflectDirection), 0.0), light.shininess.x);
		// attenuation
		float constant = 1.0;
		float linear = 0.09;
		float quadratic = 0.032;

		float dist = length(light.position.xyz);
		float attenuation = 1.0 / (constant + linear * dist + quadratic * (dist * dist));

		vec3 ambientColor = vec3(0.5);
		float ambientIntensity = 0.5;

		#ifdef ambientLight
		ambientColor = uAmbientLight.color.rgb;
		ambientIntensity = uAmbientLight.intensity.x;
		#endif

		// combine results
		vec3 ambient = (ambientColor * ambientIntensity) * vDiffuse;
		vec3 diffuse = diff * vDiffuse;
		vec3 specular = light.specularColor.rgb * spec * light.shininess.x;
		ambient  *= attenuation;
		diffuse  *= attenuation;
		specular *= attenuation;
		return (ambient + diffuse + specular);
	}
`,i=`
	vec3 CalculatePointLight(PointLight light, vec3 normal) {
		vec3 lightDirection = normalize(light.position - vWorldPosition.xyz);

		// diffuse shading
		float diff = max(dot(normal, lightDirection), 0.0);
		// specular shading
		vec3 reflectDirection = reflect(-lightDirection, normal);

		// Fix the spec from showing on the backside by multiplying it by the lambert term
		float spec = diff * pow(max(dot(lightDirection, reflectDirection), 0.0), light.shininess);
		// attenuation
		float constant = 1.0;
		float linear = 0.09;
		float quadratic = 0.032;

		float dist = length(light.position);
		float attenuation = 1.0 / (constant + linear * dist + quadratic * (dist * dist));

		vec3 ambientColor = vec3(0.5);
		float ambientIntensity = 0.5;

		#ifdef ambientLight
		ambientColor = uAmbientLight.color;
		ambientIntensity = uAmbientLight.intensity;
		#endif

		// combine results
		vec3 ambient = (ambientColor * ambientIntensity) * vDiffuse;
		vec3 diffuse = diff * vDiffuse;
		vec3 specular = light.specularColor * spec * light.shininess;
		ambient  *= attenuation;
		diffuse  *= attenuation;
		specular *= attenuation;
		return (ambient + diffuse + specular);
	}
`},function(e,t,r){'use strict';r.d(t,'b',function(){return n}),r.d(t,'a',function(){return s});var a=r(4),i=r(35),o=r(10);const n=`${a.a}
	${i.b}
	${i.c}
	#HOOK_DEFINES

	layout(std140) uniform;

	${o.a}

	uniform mat4 uProjectionMatrix;
	uniform mat4 uModelViewMatrix;
	uniform mat4 uModelMatrix;
	uniform mat3 uNormalMatrix;

	in vec3 aVertexPosition;
	out vec3 vPosition;
	out vec4 vWorldPosition;

	// Camera
	uniform vec3 uCameraPosition;

	#ifdef vertexColors
	in vec3 aVertexColor;
	#endif

	// Color
	uniform vec3 uDiffuse;
	out vec3 vDiffuse;

	// Normal
	#ifdef normals
	in vec3 aVertexNormal;
	out vec3 vNormal;
	#endif

	// Uv
	#ifdef uv
	in vec2 aUv;
	out vec2 vUv;
	#endif

	#HOOK_VERTEX_PRE

	void main(void){

		vDiffuse = uDiffuse;

		// Override for custom positioning
		vec3 transformed = vec3(0.0);

		#ifdef vertexColors
		vDiffuse = aVertexColor;
		#endif

		#ifdef uv
		vUv = aUv;
		#endif

		#HOOK_VERTEX_MAIN

		#ifdef normals
		vNormal = uNormalMatrix * aVertexNormal;
		#endif

		// Vertex position + offset
		vPosition = aVertexPosition + transformed;

		// Calculate world position of vertex with transformed
		vWorldPosition = uModelMatrix * vec4(aVertexPosition + transformed, 1.0);

		gl_Position = uProjectionView.projectionMatrix * uModelViewMatrix * vec4(vPosition, 1.0);

		#HOOK_VERTEX_END
	}
`,s=`

	${i.b}
	${i.c}
	#HOOK_DEFINES

	// Position
	uniform mat4 uProjectionMatrix;
	uniform mat4 uModelViewMatrix;
	uniform mat4 uModelMatrix;
	uniform mat3 uNormalMatrix;
	attribute vec3 aVertexPosition;
	varying vec3 vPosition;
	varying vec4 vWorldPosition;

	// Camera
	uniform vec3 uCameraPosition;

	#ifdef vertexColors
	attribute vec3 aVertexColor;
	#endif

	// Color
	uniform vec3 uDiffuse;
	varying vec3 vDiffuse;

	// Normal
	#ifdef normals
	attribute vec3 aVertexNormal;
	varying vec3 vNormal;
	#endif

	// Uv
	#ifdef uv
	attribute vec2 aUv;
	varying vec2 vUv;
	#endif

	#HOOK_VERTEX_PRE

	void main(void){

		vDiffuse = uDiffuse;

		// Override for custom positioning
		vec3 transformed = vec3(0.0);

		#ifdef vertexColors
		vDiffuse = aVertexColor;
		#endif

		#ifdef uv
		vUv = aUv;
		#endif

		#HOOK_VERTEX_MAIN

		#ifdef normals
		vNormal = uNormalMatrix * aVertexNormal;
		#endif

		// Vertex position + offset
		vPosition = aVertexPosition + transformed;

		// Calculate world position of vertex with transformed
		vWorldPosition = uModelMatrix * vec4(aVertexPosition + transformed, 1.0);

		gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(vPosition, 1.0);

		#HOOK_VERTEX_END
	}
`},function(e,t,r){'use strict';t.a=function(e,t){if(a.webgl2)return e;const r='vertex'===t?c:u;return r.forEach((t)=>{e='function'==typeof t.replace?t.replace(e):e.replace(t.match,t.replace)}),e};var a=r(0),i=r(4);const o=(e)=>{return new RegExp(`\\b${e}\\b`,'gi')},n=(e)=>{return new RegExp(`${e}`,'gi')},s=[{match:o('in'),replace:'attribute'},{match:o('out'),replace:'varying'}],d=[{match:o('in'),replace:'varying'},{match:n('out vec4 outgoingColor;'),replace:''},{match:o('outgoingColor'),replace:'gl_FragColor'},{match:o('texture'),replace(e){const t=/\btexture\b/gi,r=/\btexture\b/i,a=new RegExp(/texture\(([^)]+)\)/,'i'),o=e.match(t);let i='';if(null===o)return e;for(const t of o){const t=e.match(a)[0];if(t){const r=t.replace('texture(','').split(',')[0];let a=e.match(`(.*?) ${r}`,'i')[1];switch(a=a.split(' ')[1],a){case'sampler2D':{i='texture2D';break}case'samplerCube':{i='textureCube';break}default:}}e=e.replace(r,i)}return e}}],l=[{match:n(i.a),replace:''}],c=[...l,...s],u=[...l,...d]},function(e,t,r){'use strict';var a=r(13),i=r(0);let o;t.a=class{constructor(){o=i.get(),this.program=o.createProgram(),this.created=!1,this.uniformBlocks={},this.attributeLocations={}}link(e,t,r){if(this.compiledVertexShader=this.compile('vs',e),this.compiledFragmentShader=this.compile('fs',t),this.compiledVertexShader&&this.compiledFragmentShader){if(o.attachShader(this.program,this.compiledVertexShader),o.attachShader(this.program,this.compiledFragmentShader),r instanceof Array&&o instanceof WebGL2RenderingContext&&o.transformFeedbackVaryings(this.program,r,o.SEPARATE_ATTRIBS),o.linkProgram(this.program),o.validateProgram(this.program),!o.getProgramParameter(this.program,o.LINK_STATUS)){const e=o.getProgramInfoLog(this.program);Object(a.b)('Failed to initialise shaders',e)}this.created=!0}}compile(e,t){o=i.get();let r;return r='vs'===e?o.createShader(o.VERTEX_SHADER):o.createShader(o.FRAGMENT_SHADER),o.shaderSource(r,t),o.compileShader(r),o.getShaderParameter(r,o.COMPILE_STATUS)?r:(Object(a.b)('Failed to compile shader:',o.getShaderInfoLog(r)),!1)}setAttributeLocation(e){o=i.get(),this.attributeLocations[e]=o.getAttribLocation(this.program,e),o.enableVertexAttribArray(this.attributeLocations[e])}setAttributePointer(e,t){o=i.get(),o.vertexAttribPointer(this.attributeLocations[e],t,o.FLOAT,!1,0,0)}setAttributeInstancedPointer(e,t){o=i.get(),o.vertexAttribPointer(this.attributeLocations[e],t,o.FLOAT,!1,0,0)}setUniformLocation(e,t){o=i.get(),e[t].location=o.getUniformLocation(this.program,t)}setUniformBlockLocation(e,t){o=i.get(),o instanceof WebGL2RenderingContext&&(this.uniformBlocks[e]=o.getUniformBlockIndex(this.program,e),o.uniformBlockBinding(this.program,this.uniformBlocks[e],this.uniformBlocks[e]),o.bindBufferBase(o.UNIFORM_BUFFER,this.uniformBlocks[e],t))}bind(){o=i.get(),o.useProgram(this.program)}dispose(){o=i.get();let e;Object.keys(this.attributeLocations).forEach((t)=>{e=this.attributeLocations[t],o.disableVertexAttribArray(e)}),o.detachShader(this.program,this.compiledVertexShader),o.detachShader(this.program,this.compiledFragmentShader),o.deleteProgram(this.program)}}},function(e,t,r){'use strict';var a=Math.abs,i=r(14),o=r(22),n=r(24),s=r(13),d=r(0),l=r(23);let c;class u extends i.a{constructor(e){super(),this.onTextureLoaded=(e)=>{this.image=e,this.update(this.image),this.emit('loaded')},this.onTextureError=(e)=>{Object(s.b)(e),this.emit('error',e)},c=d.get(),this.src='',this.magFilter=c.NEAREST,this.minFilter=c.NEAREST,this.wrapS=c.CLAMP_TO_EDGE,this.wrapT=c.CLAMP_TO_EDGE,this.resizeToPow2=!1,Object.assign(this,e),this.texture=c.createTexture(),c.bindTexture(c.TEXTURE_2D,this.texture),c.texImage2D(c.TEXTURE_2D,0,c.RGBA,c.RGBA,c.UNSIGNED_BYTE,this.placeholder()),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MAG_FILTER,this.magFilter),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_MIN_FILTER,this.minFilter),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_WRAP_S,this.wrapS),c.texParameteri(c.TEXTURE_2D,c.TEXTURE_WRAP_T,this.wrapT),c.bindTexture(c.TEXTURE_2D,null),this._isHdr='hdr'===this.src.split('.').pop(),this.load(this.src)}load(e){this._isHdr?Object(o.a)(e).then(this.onTextureLoaded).catch(this.onTextureError):Object(n.a)(e).then(this.onTextureLoaded).catch(this.onTextureError)}updateImage(e){this.src=e||this.src,this.load(this.src)}update(e){c=d.get(),c.bindTexture(c.TEXTURE_2D,this.texture),c.pixelStorei(c.UNPACK_FLIP_Y_WEBGL,!0),e instanceof l.a&&c instanceof WebGL2RenderingContext?c.texImage2D(c.TEXTURE_2D,0,c.RGBA16F,e.width,e.height,0,c.RGBA,c.FLOAT,e.data):c.texImage2D(c.TEXTURE_2D,0,c.RGBA,c.RGBA,c.UNSIGNED_BYTE,this._resizeImage()),c.bindTexture(c.TEXTURE_2D,null)}placeholder(){const e=document.createElement('canvas');return e.width=1,e.height=1,e}_resizeImage(){if(!this.resizeToPow2||this.image instanceof l.a)return this.image;const e=Array(12).fill(0).map((e,t)=>{return Math.pow(2,t+1)});e.forEach((e)=>{return this.image.width===e&&this.image.height===e&&this.image});const t=Math.max(this.image.width,this.image.height),r=e.reduce((e,r)=>{return a(r-t)<a(e-t)?r:e}),i=document.createElement('canvas'),o=i.getContext('2d');return i.width=r,i.height=r,o.drawImage(this.image,0,0,r,r),i}dispose(){c=d.get(),c.deleteTexture(this.texture),this.texture=null}}t.a=u},function(e){function t(e,t,r,a,o,n){function s(t){var r=0;do t[r++]=e[a];while(++a<m&&r<t.length);return r}function d(t,r,i){var o=0;do t[r+o++]=e[a];while(++a<m&&o<i);return o}function l(e,t,r,a){var i=4*a,o=d(t,r,i);if(o<i)throw new Error('Error reading raw pixels: got '+o+' bytes, expected '+i)}for(var c=[,,,,],u=null,p=[,,],m=e.length,_,f,g;0<n;){if(s(c)<c.length)throw new Error('Error reading bytes: expected '+c.length);if(2!=c[0]||2!=c[1]||0!=(128&c[2]))return t[r++]=c[0],t[r++]=c[1],t[r++]=c[2],t[r++]=c[3],void l(e,t,r,o*n-1);if(((255&c[2])<<8|255&c[3])!=o)throw new Error('Wrong scanline width '+((255&c[2])<<8|255&c[3])+', expected '+o);null==u&&(u=Array(4*o)),_=0;for(var h=0;4>h;h++)for(f=(h+1)*o;_<f;){if(s(p)<p.length)throw new Error('Error reading 2-byte buffer');if(128<(255&p[0])){if(g=(255&p[0])-128,0==g||g>f-_)throw new Error('Bad scanline data');for(;0<g--;)u[_++]=p[1]}else{if(g=255&p[0],0==g||g>f-_)throw new Error('Bad scanline data');if(u[_++]=p[1],0<--g){if(d(u,_,g)<g)throw new Error('Error reading non-run data');_+=g}}}for(var h=0;h<o;h++)t[r+0]=u[h],t[r+1]=u[h+o],t[r+2]=u[h+2*o],t[r+3]=u[h+3*o],r+=4;n--}}var a=Math.pow;e.exports=function(o){function n(){var e='';do{var t=o[s];if(t==l){++s;break}e+=String.fromCharCode(t)}while(++s<d);return e}o instanceof ArrayBuffer&&(o=new Uint8Array(o));for(var s=0,d=o.length,l=10,c=0,u=0,p=1,m=1,_=!1,h=0;20>h;h++){var i=n(),x;if(x=i.match('#\\?RADIANCE'));else if(x=i.match('FORMAT=32-bit_rle_rgbe'))_=!0;else if(x=i.match('EXPOSURE=\\s*([0-9]*[.][0-9]*)'))p=+x[1];else if(x=i.match('#.*'));else if(x=i.match('-Y ([0-9]+) \\+X ([0-9]+)')){u=+x[1],c=+x[2];break}}if(!_)throw new Error('File is not run length encoded!');var v=new Uint8Array(4*(c*u)),E=c,y=u;t(o,v,0,s,E,y);for(var T=new Float32Array(4*(c*u)),A=0;A<v.length;A+=4){var R=v[A+0]/255,r=v[A+1]/255,g=v[A+2]/255,b=v[A+3],e=a(2,b-128);R*=e,r*=e,g*=e;var f=A;T[f+0]=R,T[f+1]=r,T[f+2]=g,T[f+3]=1}return{shape:[c,u],exposure:p,gamma:m,data:T}}},function(e,t,r){'use strict';var a=r(14),i=r(0);let o;class n extends a.a{constructor(e){super(),o=i.get();o instanceof WebGL2RenderingContext&&(this.src=null,this.size=null,Object.assign(this,e),this.texture=o.createTexture(),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_3D,this.texture),o.texParameteri(o.TEXTURE_3D,o.TEXTURE_BASE_LEVEL,0),o.texParameteri(o.TEXTURE_3D,o.TEXTURE_MAX_LEVEL,Math.log2(this.size)),o.texParameteri(o.TEXTURE_3D,o.TEXTURE_MIN_FILTER,o.LINEAR_MIPMAP_LINEAR),o.texParameteri(o.TEXTURE_3D,o.TEXTURE_MAG_FILTER,o.LINEAR),o.texImage3D(o.TEXTURE_3D,0,o.R8,this.size,this.size,this.size,0,o.RED,o.UNSIGNED_BYTE,this.src),o.generateMipmap(o.TEXTURE_3D))}dispose(){o=i.get();o instanceof WebGL2RenderingContext&&(o.deleteTexture(this.texture),this.texture=null)}}t.a=n},function(e,t,r){'use strict';var a=Math.abs,i=r(14),o=r(22),n=r(24),s=r(13),d=r(0),l=r(23);let c;class u extends i.a{constructor(e){super(),this.onTextureLoaded=(e)=>{this.images=e,this.update(this.images),this.emit('loaded')},this.onTextureError=(e)=>{Object(s.b)(e),this.emit('error',e)},c=d.get(),this.src=[,,,,,,].fill(''),this.magFilter=c.LINEAR,this.minFilter=c.LINEAR,this.wrapS=c.CLAMP_TO_EDGE,this.wrapT=c.CLAMP_TO_EDGE,this.resizeToPow2=!1,Object.assign(this,e),this.texture=c.createTexture(),this.images=[],this.loaders=[],this.update(this.placeholder()),this._isHdr='hdr'===this.src[0].split('.').pop(),this.src.forEach((e,t)=>{this.loaders[t]=this.load(this.src[t])}),Promise.all(this.loaders).then(this.onTextureLoaded).catch(this.onTextureError)}load(e){return this._isHdr?Object(o.a)(e):Object(n.a)(e)}update(e){c=d.get(),c.bindTexture(c.TEXTURE_CUBE_MAP,this.texture);const t=[c.TEXTURE_CUBE_MAP_POSITIVE_X,c.TEXTURE_CUBE_MAP_NEGATIVE_X,c.TEXTURE_CUBE_MAP_POSITIVE_Y,c.TEXTURE_CUBE_MAP_NEGATIVE_Y,c.TEXTURE_CUBE_MAP_POSITIVE_Z,c.TEXTURE_CUBE_MAP_NEGATIVE_Z];for(let r=0;6>r;r+=1){const a=this._isHdr?e[r]:this._resizeImage(e[r]);c.pixelStorei(c.UNPACK_FLIP_Y_WEBGL,!1),a instanceof l.a?c instanceof WebGL2RenderingContext&&c.texImage2D(t[r],0,c.RGBA16F,a.width,a.height,0,c.RGBA,c.FLOAT,a.data):c.texImage2D(t[r],0,c.RGBA,c.RGBA,c.UNSIGNED_BYTE,a),c.texParameteri(c.TEXTURE_CUBE_MAP,c.TEXTURE_MAG_FILTER,this.magFilter),c.texParameteri(c.TEXTURE_CUBE_MAP,c.TEXTURE_MIN_FILTER,this.minFilter),c.texParameteri(c.TEXTURE_CUBE_MAP,c.TEXTURE_WRAP_S,this.wrapS),c.texParameteri(c.TEXTURE_CUBE_MAP,c.TEXTURE_WRAP_T,this.wrapT)}c.bindTexture(c.TEXTURE_CUBE_MAP,null)}placeholder(){const e=[];for(let t=0;6>t;t+=1){const t=document.createElement('canvas');t.width=128,t.height=128,e.push(t)}return e}_resizeImage(e){if(!this.resizeToPow2||e instanceof l.a)return e;const t=Array(12).fill(0).map((e,t)=>{return Math.pow(2,t+1)});t.forEach((t)=>{return e.width===t&&e.height===t&&e});const r=Math.max(e.width,e.height),i=t.reduce((e,t)=>{return a(t-r)<a(e-r)?t:e}),o=document.createElement('canvas'),n=o.getContext('2d');return o.width=i,o.height=i,n.drawImage(e,0,0,i,i),o}}t.a=u},function(e,t,r){'use strict';var a=r(14),i=r(0);let o;class n extends a.a{constructor(e){super(),this._onCanPlayThrough=()=>{this.emit('canplaythrough')},this._onEnded=()=>{this.emit('ended')},o=i.get(),this.src='',this.magFilter=o.NEAREST,this.minFilter=o.NEAREST,this.wrapS=o.CLAMP_TO_EDGE,this.wrapT=o.CLAMP_TO_EDGE,this.loop=!1,this.autoplay=!0,Object.assign(this,e),this.video=document.createElement('video'),this.video.src=this.src,this.video.loop=this.loop,this.video.autoplay=this.autoplay,this.video.setAttribute('webkitplaysinline','webkitplaysinline'),this.video.setAttribute('playsinline','playsinline'),this.video.addEventListener('canplaythrough',this._onCanPlayThrough,!0),this.video.addEventListener('ended',this._onEnded,!0),this._currentTime=0,this.texture=o.createTexture(),o.bindTexture(o.TEXTURE_2D,this.texture),o.texImage2D(o.TEXTURE_2D,0,o.RGBA,o.RGBA,o.UNSIGNED_BYTE,this.placeholder()),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,this.magFilter),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,this.minFilter),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,this.wrapS),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,this.wrapT),o.bindTexture(o.TEXTURE_2D,null)}update(){o=i.get(),this.video.readyState>=this.video.HAVE_CURRENT_DATA&&(this.video.currentTime!==this._currentTime&&(o.bindTexture(o.TEXTURE_2D,this.texture),o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,!0),o.texImage2D(o.TEXTURE_2D,0,o.RGBA,o.RGBA,o.UNSIGNED_BYTE,this.video),o.bindTexture(o.TEXTURE_2D,null)),this._currentTime=this.video.currentTime)}placeholder(){const e=document.createElement('canvas');return e.width=1,e.height=1,e}}t.a=n},function(e,t,r){'use strict';var a=r(6);class i extends a.a{constructor(e=1,t=1,r=1,a){const o=[-1,-1,1,1,-1,1,1,1,1,-1,1,1,-1,-1,-1,-1,1,-1,1,1,-1,1,-1,-1,-1,1,-1,-1,1,1,1,1,1,1,1,-1,-1,-1,-1,1,-1,-1,1,-1,1,-1,-1,1,1,-1,-1,1,1,-1,1,1,1,1,-1,1,-1,-1,-1,-1,-1,1,-1,1,1,-1,1,-1];for(let n=0;n<o.length;n+=3)o[n]*=e,o[n+1]*=t,o[n+2]*=r;super(new Float32Array(o),new Uint16Array([0,1,2,0,2,3,4,5,6,4,6,7,8,9,10,8,10,11,12,13,14,12,14,15,16,17,18,16,18,19,20,21,22,20,22,23]),new Float32Array([0,0,1,0,0,1,0,0,1,0,0,1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,1,0,0,1,0,0,1,0,0,1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,1,0,0,1,0,0,1,0,0,1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0]),new Float32Array([0,0,1,0,1,1,0,1,1,0,1,1,0,1,0,0,0,1,0,0,1,0,1,1,1,1,0,1,0,0,1,0,1,0,1,1,0,1,0,0,0,0,1,0,1,1,0,1]),a)}}t.a=i},function(e,t,r){'use strict';var a=r(1),i=r(3);const o=a.vec3.create(),n=a.vec3.create();t.a=class{constructor(e,t,r,a,o,n){this.indices=[e,t,r],this.vertices=[a,o,n],this.uvs=[e,t,r],this.normal=new i.a,this.updateFaceNormal()}updateFaceNormal(){a.vec3.set(o,0,0,0),a.vec3.set(n,0,0,0),a.vec3.subtract(o,this.vertices[2].v,this.vertices[1].v),a.vec3.subtract(n,this.vertices[0].v,this.vertices[1].v),a.vec3.cross(o,o,n),a.vec3.normalize(o,o),this.normal.set(o[0],o[1],o[2])}}},function(e,t,r){'use strict';var a=r(6);class i extends a.a{constructor(e=1,t=1,r=1,a=1,i='XY',o){let n=[];const s=[];let d=[],l=[],c=0;const p=e/r,m=t/a,_=1/r,f=1/a;for(let g=0;g<a;g+=1)for(let o=0;o<r;o+=1){const h=p*o+0.5*-e,b=m*g+0.5*-t,x=o/r,u=g/a;switch(i){case'XZ':{n=n.concat([h,0,b]),n=n.concat([h+p,0,b]),n=n.concat([h+p,0,b+m]),n=n.concat([h,0,b+m]),d=d.concat([0,1,0]),d=d.concat([0,1,0]),d=d.concat([0,1,0]),d=d.concat([0,1,0]),l=l.concat([x,1-u]),l=l.concat([x+_,1-u]),l=l.concat([x+_,1-(u+f)]),l=l.concat([x,1-(u+f)]);break}case'YZ':{n=n.concat([0,b,h]),n=n.concat([0,b,h+p]),n=n.concat([0,b+m,h+p]),n=n.concat([0,b+m,h]),d=d.concat([1,0,0]),d=d.concat([1,0,0]),d=d.concat([1,0,0]),d=d.concat([1,0,0]),l=l.concat([1-x,u]),l=l.concat([1-(x+_),u]),l=l.concat([1-(x+_),u+f]),l=l.concat([1-x,u+f]);break}default:n=n.concat([h,b,0]),n=n.concat([h+p,b,0]),n=n.concat([h+p,b+m,0]),n=n.concat([h,b+m,0]),d=d.concat([0,0,1]),d=d.concat([0,0,1]),d=d.concat([0,0,1]),d=d.concat([0,0,1]),l=l.concat([x,u]),l=l.concat([x+_,u]),l=l.concat([x+_,u+f]),l=l.concat([x,u+f]);}s.push(4*c+0),s.push(4*c+1),s.push(4*c+2),s.push(4*c+0),s.push(4*c+2),s.push(4*c+3),c+=1}super(new Float32Array(n),new Uint16Array(s),new Float32Array(d),new Float32Array(l),o)}}t.a=i},function(e,t,r){'use strict';function a(){return`${c.a}
	precision ${o.capabilities.precision} float;
	in vec3 vColor;
	out vec4 outgoingColor;

	void main(void){
		outgoingColor = vec4(vColor, 1.0);
	}
	`}function i(){return`
	precision ${o.capabilities.precision} float;
	varying vec3 vColor;

	void main(void){
		gl_FragColor = vec4(vColor, 1.0);
	}
	`}var o=r(5),n=r(0),s=r(8),d=r(9),l=r(6),c=r(4),u=r(10);let p;const m=`${c.a}
	layout (location = 0) in vec3 aVertexPosition;
	layout (location = 1) in vec3 aVertexColor;

	${u.a}

	uniform mat4 uModelViewMatrix;

	out vec3 vColor;

	void main(void){
		vColor = aVertexColor;
		gl_Position = uProjectionView.projectionMatrix * uModelViewMatrix * vec4(aVertexPosition, 1.0);
	}
`,_=`
	attribute vec3 aVertexPosition;
	attribute vec3 aVertexColor;

	uniform mat4 uProjectionMatrix;
	uniform mat4 uModelViewMatrix;

	varying vec3 vColor;

	void main(void){
		vColor = aVertexColor;
		gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aVertexPosition, 1.0);
	}
`;class f extends l.a{constructor(e){let t=[];t=t.concat([0,0,0,e,0,0]),t=t.concat([0,0,0,0,e,0]),t=t.concat([0,0,0,0,0,e]);const r=new Float32Array([1,0,0,1,0,0,0,1,0,0,1,0,0,0,1,0,0,1]);super(new Float32Array(t),null,null,null,r)}}class g extends s.a{constructor(e=1){const t=n.webgl2?m:_,r=n.webgl2?a():i();super(new f(e),new d.a({name:'AxisHelper',vertexShader:t,fragmentShader:r}))}draw(e){this.visible&&(p=n.get(),this.updateMatrix(e),this.shader.program.bind(),this.shader.setUniforms(e.projectionMatrix,this.modelViewMatrix,this.modelMatrix,e),o.extensions.vertexArrayObject?this.vao.bind():(this.bindAttributes(),this.bindAttributesInstanced(),this.bindIndexBuffer()),p.drawArrays(p.LINES,0,this.geometry.attributes.aVertexPosition.numItems),o.extensions.vertexArrayObject&&this.vao.unbind())}}t.a=g},function(e,t,r){'use strict';function a(){return`${u.a}
	precision ${o.capabilities.precision} float;
	out vec4 outgoingColor;

	void main(void){
		outgoingColor = vec4(1.0, 1.0, 0.0, 1.0);
	}
	`}function i(){return`
	precision ${o.capabilities.precision} float;

	void main(void){
		gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
	}
	`}var o=r(5),n=r(2),s=r(0),d=r(8),l=r(9),c=r(6),u=r(4),p=r(10);let m;const _=`${u.a}
	${p.a}

	in vec3 aVertexPosition;

	uniform mat4 uModelViewMatrix;
	uniform mat3 uNormalMatrix;

	void main(void){
		gl_Position = uProjectionView.projectionMatrix * uModelViewMatrix * vec4(aVertexPosition, 1.0);
	}
`,f=`
	attribute vec3 aVertexPosition;

	uniform mat4 uProjectionMatrix;
	uniform mat4 uModelViewMatrix;
	uniform mat3 uNormalMatrix;

	void main(void){
		gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aVertexPosition, 1.0);
	}
`;class g extends c.a{constructor(e=0.5){function t(e,t=1){a(-1*t,-1*t,e),a(-1*t,1*t,e),a(-1*t,1*t,e),a(1*t,1*t,e),a(1*t,1*t,e),a(1*t,-1*t,e),a(1*t,-1*t,e),a(-1*t,-1*t,e)}let r=[];const a=(e,t,a)=>{r=r.concat([e,t,a])},i=3.5,o=0.5,n=3;t(0,o),t(i,n),a(-1*o,-1*o,0),a(-1*n,-1*n,i),a(-1*o,1*o,0),a(-1*n,1*n,i),a(1*o,1*o,0),a(1*n,1*n,i),a(1*o,-1*o,0),a(1*n,-1*n,i),super(new Float32Array(r))}}class h extends d.a{constructor(e){const t=s.webgl2?_:f,r=s.webgl2?a():i();super(new g(e),new l.a({name:'CameraHelper',vertexShader:t,fragmentShader:r,drawType:n.DRAW_LINE_STRIP})),this.camera=e}update(){this.position.copy(this.camera.position),this.lookAt(this.camera.target)}draw(e){this.visible&&(m=s.get(),this.updateMatrix(e),this.shader.program.bind(),this.shader.setUniforms(e.projectionMatrix,this.modelViewMatrix,this.modelMatrix,e),o.extensions.vertexArrayObject?this.vao.bind():(this.bindAttributes(),this.bindAttributesInstanced(),this.bindIndexBuffer()),m.drawArrays(m.LINES,0,this.geometry.attributes.aVertexPosition.numItems),o.extensions.vertexArrayObject&&this.vao.unbind())}}t.a=h},function(e,t,r){'use strict';function a(){return`${u.a}
	precision ${o.capabilities.precision} float;
	out vec4 outgoingColor;

	void main(void){
		outgoingColor = vec4(vec3(0.5), 1.0);
	}
	`}function i(){return`
	precision ${o.capabilities.precision} float;

	void main(void){
		gl_FragColor = vec4(vec3(0.5), 1.0);
	}
	`}var o=r(5),n=r(0),s=r(8),d=r(9),l=r(6),c=r(11),u=r(4),p=r(10);let m;const _=`${u.a}
	${p.a}

	in vec3 aVertexPosition;

	uniform mat4 uModelViewMatrix;

	void main(void){
		gl_Position = uProjectionView.projectionMatrix * uModelViewMatrix * vec4(aVertexPosition, 1.0);
	}
`,f=`
	attribute vec3 aVertexPosition;

	uniform mat4 uProjectionMatrix;
	uniform mat4 uModelViewMatrix;

	void main(void){
		gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aVertexPosition, 1.0);
	}
`;class g extends l.a{constructor(e,t){let r=[];const a=0.5*e;for(let o=0;o<t+1;o+=1){const e=Object(c.lerp)(-a,a,o/t),i=Object(c.lerp)(-a,a,o/t);r=r.concat([e,0,-a,i,0,a])}for(let o=0;o<t+1;o+=1){const e=Object(c.lerp)(-a,a,o/t),i=Object(c.lerp)(-a,a,o/t);r=r.concat([-a,0,e,a,0,i])}super(new Float32Array(r))}}class h extends s.a{constructor(e=1,t=10){const r=n.webgl2?_:f,o=n.webgl2?a():i();super(new g(e,t),new d.a({name:'GridHelper',vertexShader:r,fragmentShader:o}))}draw(e){this.visible&&(m=n.get(),this.updateMatrix(e),this.shader.program.bind(),this.shader.setUniforms(e.projectionMatrix,this.modelViewMatrix,this.modelMatrix,e),o.extensions.vertexArrayObject?this.vao.bind():(this.bindAttributes(),this.bindAttributesInstanced(),this.bindIndexBuffer()),m.drawArrays(m.LINES,0,this.geometry.attributes.aVertexPosition.numItems),o.extensions.vertexArrayObject&&this.vao.unbind())}}t.a=h},function(e,t,r){'use strict';function a(){return`${c.a}
	precision ${o.capabilities.precision} float;
	out vec4 outgoingColor;

	void main(void){
		outgoingColor = vec4(1.0);
	}
	`}function i(){return`
	precision ${o.capabilities.precision} float;

	void main(void){
		gl_FragColor = vec4(1.0);
	}
	`}var o=r(5),n=r(0),s=r(8),d=r(9),l=r(6),c=r(4),u=r(10);let p;const m=`${c.a}
	${u.a}

	in vec3 aVertexPosition;

	uniform mat4 uModelViewMatrix;
	uniform mat3 uNormalMatrix;

	void main(void){
		gl_Position = uProjectionView.projectionMatrix * uModelViewMatrix * vec4(aVertexPosition, 1.0);
	}
`,_=`
	attribute vec3 aVertexPosition;

	uniform mat4 uProjectionMatrix;
	uniform mat4 uModelViewMatrix;
	uniform mat3 uNormalMatrix;

	void main(void){
		gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aVertexPosition, 1.0);
	}
`;class f extends l.a{constructor(e,t=0.5){let r=[];const a=e.scale.x,o=e.scale.y,n=e.scale.z,s=e.geometry.bufferNormals.length/3;for(let d=0;d<s;d+=1){const i=3*d,s=a*e.geometry.bufferVertices[i],l=o*e.geometry.bufferVertices[i+1],c=n*e.geometry.bufferVertices[i+2],u=e.geometry.bufferNormals[i],p=e.geometry.bufferNormals[i+1],m=e.geometry.bufferNormals[i+2];r=r.concat([s,l,c,s+t*u,l+t*p,c+t*m])}super(new Float32Array(r))}}class g extends s.a{constructor(e,t=1){const r=n.webgl2?m:_,o=n.webgl2?a():i();super(new f(e,t),new d.a({name:'NormalsHelper',vertexShader:r,fragmentShader:o}))}draw(e){this.visible&&(p=n.get(),this.updateMatrix(e),this.shader.program.bind(),this.shader.setUniforms(e.projectionMatrix,this.modelViewMatrix,this.modelMatrix,e),o.extensions.vertexArrayObject?this.vao.bind():(this.bindAttributes(),this.bindAttributesInstanced(),this.bindIndexBuffer()),p.drawArrays(p.LINES,0,this.geometry.attributes.aVertexPosition.numItems),o.extensions.vertexArrayObject&&this.vao.unbind())}}t.a=g},function(e,t,r){'use strict';function a(){return`${m.a}
	precision ${n.capabilities.precision} float;
	uniform vec3 uColor;
	out vec4 outgoingColor;

	void main(void){
		if(length(gl_PointCoord - 0.5) > 0.5) {
			discard;
		}
		outgoingColor = vec4(uColor, 1.0);
	}
	`}function i(){return`
	precision ${n.capabilities.precision} float;
	uniform vec3 uColor;

	void main(void){
		if(length(gl_PointCoord - 0.5) > 0.5) {
			discard;
		}
		gl_FragColor = vec4(uColor, 1.0);
	}
	`}var o=r(1),n=r(5),s=r(0),d=r(8),l=r(9),c=r(6),u=r(12),p=r(11),m=r(4),_=r(10);let f;const g=`${m.a}
	${_.a}

	in vec3 aVertexPosition;

	uniform mat4 uModelViewMatrix;
	uniform float uSize;

	void main(void){
		vec4 mvPosition = uProjectionView.projectionMatrix * uModelViewMatrix * vec4(aVertexPosition, 1.0);
		gl_PointSize = uSize * (100.0 / length(mvPosition.xyz));
		gl_Position = mvPosition;
	}
`,h=`
	attribute vec3 aVertexPosition;

	uniform mat4 uProjectionMatrix;
	uniform mat4 uModelViewMatrix;
	uniform float uSize;

	void main(void){
		vec4 mvPosition = uProjectionMatrix * uModelViewMatrix * vec4(aVertexPosition, 1.0);
		gl_PointSize = uSize * (100.0 / length(mvPosition.xyz));
		gl_Position = mvPosition;
	}
`;class b extends c.a{constructor(e,t=0.5){const r=[],a=e.geometry.bufferVertices.length;for(let o=0;o<a;o+=1)r[o]=e.geometry.bufferVertices[o];super(new Float32Array(r))}}const x=o.mat4.create(),v=o.mat4.create();class E extends d.a{constructor(e,t=1,r=65280,o='#ffffff'){const n=s.webgl2?g:h,d=s.webgl2?a():i();super(new b(e,t),new l.a({name:'VerticesHelper',vertexShader:n,fragmentShader:d,uniforms:{uSize:{type:'f',value:t},uColor:{type:'3f',value:new u.a(r).v}}})),this._labels=[],this._parentMesh=e;let c;const p=(e)=>{c=document.createElement('div'),c.style.position='absolute',c.style.pointerEvents='none',c.style.color=o,c.style.fontSize='16px',this._labels.push({indice:e,element:c}),document.body.appendChild(c)};this._parentMesh.geometry.faces.forEach((e)=>{p(e.indices[0]),p(e.indices[1]),p(e.indices[2])})}draw(e){if(!this.visible)return;f=s.get(),this.updateMatrix(e),o.mat4.identity(x),o.mat4.identity(v),o.mat4.mul(x,e.projectionMatrix,this.modelViewMatrix);let t,r;this._labels.forEach((e)=>{r=this._parentMesh.geometry.vertices[e.indice],t=Object(p.from3DTo2D)(r,x),e.element.style.left=`${t.x*window.innerWidth}px`,e.element.style.top=`${t.y*window.innerHeight}px`,e.element.innerHTML=`${e.indice}`}),this.shader.program.bind(),this.shader.setUniforms(e.projectionMatrix,this.modelViewMatrix,this.modelMatrix,e),n.extensions.vertexArrayObject?this.vao.bind():(this.bindAttributes(),this.bindAttributesInstanced(),this.bindIndexBuffer()),f.drawArrays(f.POINTS,0,this.geometry.attributes.aVertexPosition.numItems),n.extensions.vertexArrayObject&&this.vao.unbind()}}t.a=E},function(e,t,r){'use strict';var a=r(0),i=r(18);let o;class n{constructor(e){if(this.lights=e,o=a.get(),a.webgl2){const t=this.lights[0].data.length,r=Array(e.length*t),a=new Float32Array(r);this.uniformBuffer=new i.a(a),this._lightsData=new Float32Array(e[0].data.length*e.length)}}get length(){return this.lights.length}get(){return this.lights}update(){a.webgl2?(this.lights.forEach((e,t)=>{e.update(),this._lightsData.set(e.data,t*e.data.length)}),this.uniformBuffer.setValues(this._lightsData,0)):this.lights.forEach((e)=>{e.update()})}bind(){a.webgl2&&(o=a.get(),o.bindBuffer(o.UNIFORM_BUFFER,this.uniformBuffer.buffer),o.bufferSubData(o.UNIFORM_BUFFER,0,this.uniformBuffer.data),o.bindBuffer(o.UNIFORM_BUFFER,null))}}t.a=n},function(e,t,r){'use strict';var a=r(2),i=r(0),o=r(12),n=r(25);class s extends n.a{constructor(e={}){super(),this.type=a.LIGHT_AMBIENT,this.uniforms={color:{type:'3f',value:new o.a(4210752).v},intensity:{type:'f',value:0.1}},Object.assign(this.uniforms,e),i.webgl2&&(this.data=new Float32Array([...this.uniforms.color.value,0,this.uniforms.intensity.value,0,0,0]))}update(){i.webgl2&&(this.setValues(this.uniforms.color.value,0),this.setValues([this.uniforms.intensity.value],4))}}t.a=s},function(e,t,r){'use strict';var a=r(2),i=r(0),o=r(12),n=r(3),s=r(25);class d extends s.a{constructor(e={}){super(),this.type=a.LIGHT_DIRECTIONAL,this.uniforms={position:{type:'3f',value:new n.a(0,0,0).v},color:{type:'3f',value:new o.a(16777215).v},intensity:{type:'f',value:1}},Object.assign(this.uniforms,e),this.position=new n.a,i.webgl2&&(this.data=new Float32Array([...this.uniforms.position.value,0,...this.uniforms.color.value,0,this.uniforms.intensity.value,0,0,0]))}update(){i.webgl2?(this.setValues(this.position.v),this.setValues(this.uniforms.color.value,4),this.setValues([this.uniforms.intensity.value],8)):this.uniforms.position.value.set(this.position.v)}}t.a=d},function(e,t,r){'use strict';var a=r(2),i=r(0),o=r(12),n=r(3),s=r(25);class d extends s.a{constructor(e={}){super(),this.type=a.LIGHT_POINT,this.uniforms={position:{type:'3f',value:new n.a(0,0,0).v},color:{type:'3f',value:new o.a(16777215).v},specularColor:{type:'3f',value:new o.a(16777215).v},shininess:{type:'f',value:100},intensity:{type:'f',value:1}},Object.assign(this.uniforms,e),this.position=new n.a,i.webgl2&&(this.data=new Float32Array([...this.uniforms.position.value,0,...this.uniforms.color.value,0,...this.uniforms.specularColor.value,0,this.uniforms.shininess.value,0,0,0,this.uniforms.intensity.value,0,0,0]))}update(){i.webgl2?(this.setValues(this.position.v),this.setValues(this.uniforms.color.value,4),this.setValues(this.uniforms.specularColor.value,8),this.setValues([this.uniforms.shininess.value],12),this.setValues([this.uniforms.intensity.value],16)):this.uniforms.position.value.set(this.position.v)}}t.a=d},function(e,t,r){'use strict';var a=r(19),i=r(80),o=r(20),n=r(81),s=r(4),d=r(82),l=r(83),c=r(21),u=r(84),p=r(35),m=r(85),_=r(86),f=r(34),g=r(10),h=r(87),b=r(88);t.a={AmbientLight:a,Conditionals:i.a,DirectionalLights:o,EnvMapCube:n.a,EsVersion:s.a,Fog:d.a,Gamma:l.a,Lambert:c,Matcap:u.a,Math:p.a,Noise:m,Packing:_.a,PointLights:f,ProjectionView:g.a,Tonemap:h,Transpose:b.a}},function(e,t){'use strict';const r=`
float whenEquals(float x, float y) {
  return 1.0 - abs(sign(x - y));
};
`,a=`
int whenEqualsInt(int x, int y) {
  return 1 - abs(sign(x - y));
}
`,i=`
float whenLessThan(float x, float y) {
  return max(sign(y - x), 0.0);
}
`,o=`
float whenGreaterThan(float x, float y) {
  return max(sign(x - y), 0.0);
}
`;t.a={whenEquals:r,whenEqualsInt:a,whenLessThan:i,whenGreaterThan:o}},function(e,t){'use strict';t.a=`
/**
 * Samples cubemap environment map
 * @param  {vec3} wcNormal - normal in the world coordinate space
 * @param  {float} - flipEnvMap    -1.0 for left handed coorinate system oriented texture (usual case)
 *                                  1.0 for right handed coorinate system oriented texture
 * @return {vec4} - cubemap texture coordinate
 */
vec3 envMapCube(vec3 wcNormal, float flipEnvMap) {
	return vec3(flipEnvMap * wcNormal.x, wcNormal.y, wcNormal.z);
}

vec3 envMapCube(vec3 wcNormal) {
 //-1.0 for left handed coorinate system oriented texture (usual case)
 return envMapCube(wcNormal, -1.0);
}
`},function(e,t){'use strict';const r=`
float fogLinear(const float dist, const float start, const float end) {
  return 1.0 - clamp((end - dist) / (end - start), 0.0, 1.0);
}
`,a=`
float fogExp(
  const float dist,
  const float density
) {
  return 1.0 - clamp(exp(-density * dist), 0.0, 1.0);
}
`,i=`
float fogExp2(
  const float dist,
  const float density
) {
  const float LOG2 = -1.442695;
  float d = density * dist;
  return 1.0 - clamp(exp2(d * d * LOG2), 0.0, 1.0);
}
`;t.a={linear:r,exp:a,exp2:i}},function(e,t){'use strict';t.a=`
	const float gamma = 2.2;

	float toGamma(float v) {
	  return pow(v, 1.0 / gamma);
	}

	vec2 toGamma(vec2 v) {
	  return pow(v, vec2(1.0 / gamma));
	}

	vec3 toGamma(vec3 v) {
	  return pow(v, vec3(1.0 / gamma));
	}

	vec4 toGamma(vec4 v) {
	  return vec4(toGamma(v.rgb), v.a);
	}
`},function(e,t){'use strict';t.a=`
vec2 matcap(vec3 eye, vec3 normal) {
  vec3 reflected = reflect(eye, normal);
  float m = 2.8284271247461903 * sqrt( reflected.z+1.0 );
  return reflected.xy / m + 0.5;
}
`},function(e,t){'use strict';Object.defineProperty(t,'__esModule',{value:!0});const r=`
//
// GLSL textureless classic 2D noise "cnoise",
// with an RSL-style periodic variant "pnoise".
// Author:  Stefan Gustavson (stefan.gustavson@liu.se)
// Version: 2011-08-22
//
// Many thanks to Ian McEwan of Ashima Arts for the
// ideas for permutation and gradient selection.
//
// Copyright (c) 2011 Stefan Gustavson. All rights reserved.
// Distributed under the MIT license. See LICENSE file.
// https://github.com/ashima/webgl-noise
//

vec4 mod289(vec4 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x)
{
  return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

vec2 fade(vec2 t) {
  return t*t*t*(t*(t*6.0-15.0)+10.0);
}

// Classic Perlin noise
float classicNoise2D(vec2 P)
{
  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
  Pi = mod289(Pi); // To avoid truncation effects in permutation
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;

  vec4 i = permute(permute(ix) + iy);

  vec4 gx = fract(i * (1.0 / 41.0)) * 2.0 - 1.0 ;
  vec4 gy = abs(gx) - 0.5 ;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;

  vec2 g00 = vec2(gx.x,gy.x);
  vec2 g10 = vec2(gx.y,gy.y);
  vec2 g01 = vec2(gx.z,gy.z);
  vec2 g11 = vec2(gx.w,gy.w);

  vec4 norm = taylorInvSqrt(vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11)));
  g00 *= norm.x;
  g01 *= norm.y;
  g10 *= norm.z;
  g11 *= norm.w;

  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));

  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
  return 2.3 * n_xy;
}
`;t.classicNoise2D=r;const a=`
//
// GLSL textureless classic 3D noise "cnoise",
// with an RSL-style periodic variant "pnoise".
// Author:  Stefan Gustavson (stefan.gustavson@liu.se)
// Version: 2011-10-11
//
// Many thanks to Ian McEwan of Ashima Arts for the
// ideas for permutation and gradient selection.
//
// Copyright (c) 2011 Stefan Gustavson. All rights reserved.
// Distributed under the MIT license. See LICENSE file.
// https://github.com/ashima/webgl-noise
//

vec3 mod289(vec3 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x)
{
  return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

vec3 fade(vec3 t) {
  return t*t*t*(t*(t*6.0-15.0)+10.0);
}

// Classic Perlin noise
float classicNoise3D(vec3 P)
{
  vec3 Pi0 = floor(P); // Integer part for indexing
  vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
  Pi0 = mod289(Pi0);
  Pi1 = mod289(Pi1);
  vec3 Pf0 = fract(P); // Fractional part for interpolation
  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = ixy0 * (1.0 / 7.0);
  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 * (1.0 / 7.0);
  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  g000 *= norm0.x;
  g010 *= norm0.y;
  g100 *= norm0.z;
  g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
  g001 *= norm1.x;
  g011 *= norm1.y;
  g101 *= norm1.z;
  g111 *= norm1.w;

  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
  float n111 = dot(g111, Pf1);

  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
  return 2.2 * n_xyz;
}
`;t.classicNoise3D=a;const i=`
//
// GLSL textureless classic 4D noise "cnoise",
// with an RSL-style periodic variant "pnoise".
// Author:  Stefan Gustavson (stefan.gustavson@liu.se)
// Version: 2011-08-22
//
// Many thanks to Ian McEwan of Ashima Arts for the
// ideas for permutation and gradient selection.
//
// Copyright (c) 2011 Stefan Gustavson. All rights reserved.
// Distributed under the MIT license. See LICENSE file.
// https://github.com/ashima/webgl-noise
//

vec4 mod289(vec4 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x)
{
  return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

vec4 fade(vec4 t) {
  return t*t*t*(t*(t*6.0-15.0)+10.0);
}

// Classic Perlin noise
float classicNoise4D(vec4 P)
{
  vec4 Pi0 = floor(P); // Integer part for indexing
  vec4 Pi1 = Pi0 + 1.0; // Integer part + 1
  Pi0 = mod289(Pi0);
  Pi1 = mod289(Pi1);
  vec4 Pf0 = fract(P); // Fractional part for interpolation
  vec4 Pf1 = Pf0 - 1.0; // Fractional part - 1.0
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = vec4(Pi0.zzzz);
  vec4 iz1 = vec4(Pi1.zzzz);
  vec4 iw0 = vec4(Pi0.wwww);
  vec4 iw1 = vec4(Pi1.wwww);

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);
  vec4 ixy00 = permute(ixy0 + iw0);
  vec4 ixy01 = permute(ixy0 + iw1);
  vec4 ixy10 = permute(ixy1 + iw0);
  vec4 ixy11 = permute(ixy1 + iw1);

  vec4 gx00 = ixy00 * (1.0 / 7.0);
  vec4 gy00 = floor(gx00) * (1.0 / 7.0);
  vec4 gz00 = floor(gy00) * (1.0 / 6.0);
  gx00 = fract(gx00) - 0.5;
  gy00 = fract(gy00) - 0.5;
  gz00 = fract(gz00) - 0.5;
  vec4 gw00 = vec4(0.75) - abs(gx00) - abs(gy00) - abs(gz00);
  vec4 sw00 = step(gw00, vec4(0.0));
  gx00 -= sw00 * (step(0.0, gx00) - 0.5);
  gy00 -= sw00 * (step(0.0, gy00) - 0.5);

  vec4 gx01 = ixy01 * (1.0 / 7.0);
  vec4 gy01 = floor(gx01) * (1.0 / 7.0);
  vec4 gz01 = floor(gy01) * (1.0 / 6.0);
  gx01 = fract(gx01) - 0.5;
  gy01 = fract(gy01) - 0.5;
  gz01 = fract(gz01) - 0.5;
  vec4 gw01 = vec4(0.75) - abs(gx01) - abs(gy01) - abs(gz01);
  vec4 sw01 = step(gw01, vec4(0.0));
  gx01 -= sw01 * (step(0.0, gx01) - 0.5);
  gy01 -= sw01 * (step(0.0, gy01) - 0.5);

  vec4 gx10 = ixy10 * (1.0 / 7.0);
  vec4 gy10 = floor(gx10) * (1.0 / 7.0);
  vec4 gz10 = floor(gy10) * (1.0 / 6.0);
  gx10 = fract(gx10) - 0.5;
  gy10 = fract(gy10) - 0.5;
  gz10 = fract(gz10) - 0.5;
  vec4 gw10 = vec4(0.75) - abs(gx10) - abs(gy10) - abs(gz10);
  vec4 sw10 = step(gw10, vec4(0.0));
  gx10 -= sw10 * (step(0.0, gx10) - 0.5);
  gy10 -= sw10 * (step(0.0, gy10) - 0.5);

  vec4 gx11 = ixy11 * (1.0 / 7.0);
  vec4 gy11 = floor(gx11) * (1.0 / 7.0);
  vec4 gz11 = floor(gy11) * (1.0 / 6.0);
  gx11 = fract(gx11) - 0.5;
  gy11 = fract(gy11) - 0.5;
  gz11 = fract(gz11) - 0.5;
  vec4 gw11 = vec4(0.75) - abs(gx11) - abs(gy11) - abs(gz11);
  vec4 sw11 = step(gw11, vec4(0.0));
  gx11 -= sw11 * (step(0.0, gx11) - 0.5);
  gy11 -= sw11 * (step(0.0, gy11) - 0.5);

  vec4 g0000 = vec4(gx00.x,gy00.x,gz00.x,gw00.x);
  vec4 g1000 = vec4(gx00.y,gy00.y,gz00.y,gw00.y);
  vec4 g0100 = vec4(gx00.z,gy00.z,gz00.z,gw00.z);
  vec4 g1100 = vec4(gx00.w,gy00.w,gz00.w,gw00.w);
  vec4 g0010 = vec4(gx10.x,gy10.x,gz10.x,gw10.x);
  vec4 g1010 = vec4(gx10.y,gy10.y,gz10.y,gw10.y);
  vec4 g0110 = vec4(gx10.z,gy10.z,gz10.z,gw10.z);
  vec4 g1110 = vec4(gx10.w,gy10.w,gz10.w,gw10.w);
  vec4 g0001 = vec4(gx01.x,gy01.x,gz01.x,gw01.x);
  vec4 g1001 = vec4(gx01.y,gy01.y,gz01.y,gw01.y);
  vec4 g0101 = vec4(gx01.z,gy01.z,gz01.z,gw01.z);
  vec4 g1101 = vec4(gx01.w,gy01.w,gz01.w,gw01.w);
  vec4 g0011 = vec4(gx11.x,gy11.x,gz11.x,gw11.x);
  vec4 g1011 = vec4(gx11.y,gy11.y,gz11.y,gw11.y);
  vec4 g0111 = vec4(gx11.z,gy11.z,gz11.z,gw11.z);
  vec4 g1111 = vec4(gx11.w,gy11.w,gz11.w,gw11.w);

  vec4 norm00 = taylorInvSqrt(vec4(dot(g0000, g0000), dot(g0100, g0100), dot(g1000, g1000), dot(g1100, g1100)));
  g0000 *= norm00.x;
  g0100 *= norm00.y;
  g1000 *= norm00.z;
  g1100 *= norm00.w;

  vec4 norm01 = taylorInvSqrt(vec4(dot(g0001, g0001), dot(g0101, g0101), dot(g1001, g1001), dot(g1101, g1101)));
  g0001 *= norm01.x;
  g0101 *= norm01.y;
  g1001 *= norm01.z;
  g1101 *= norm01.w;

  vec4 norm10 = taylorInvSqrt(vec4(dot(g0010, g0010), dot(g0110, g0110), dot(g1010, g1010), dot(g1110, g1110)));
  g0010 *= norm10.x;
  g0110 *= norm10.y;
  g1010 *= norm10.z;
  g1110 *= norm10.w;

  vec4 norm11 = taylorInvSqrt(vec4(dot(g0011, g0011), dot(g0111, g0111), dot(g1011, g1011), dot(g1111, g1111)));
  g0011 *= norm11.x;
  g0111 *= norm11.y;
  g1011 *= norm11.z;
  g1111 *= norm11.w;

  float n0000 = dot(g0000, Pf0);
  float n1000 = dot(g1000, vec4(Pf1.x, Pf0.yzw));
  float n0100 = dot(g0100, vec4(Pf0.x, Pf1.y, Pf0.zw));
  float n1100 = dot(g1100, vec4(Pf1.xy, Pf0.zw));
  float n0010 = dot(g0010, vec4(Pf0.xy, Pf1.z, Pf0.w));
  float n1010 = dot(g1010, vec4(Pf1.x, Pf0.y, Pf1.z, Pf0.w));
  float n0110 = dot(g0110, vec4(Pf0.x, Pf1.yz, Pf0.w));
  float n1110 = dot(g1110, vec4(Pf1.xyz, Pf0.w));
  float n0001 = dot(g0001, vec4(Pf0.xyz, Pf1.w));
  float n1001 = dot(g1001, vec4(Pf1.x, Pf0.yz, Pf1.w));
  float n0101 = dot(g0101, vec4(Pf0.x, Pf1.y, Pf0.z, Pf1.w));
  float n1101 = dot(g1101, vec4(Pf1.xy, Pf0.z, Pf1.w));
  float n0011 = dot(g0011, vec4(Pf0.xy, Pf1.zw));
  float n1011 = dot(g1011, vec4(Pf1.x, Pf0.y, Pf1.zw));
  float n0111 = dot(g0111, vec4(Pf0.x, Pf1.yzw));
  float n1111 = dot(g1111, Pf1);

  vec4 fade_xyzw = fade(Pf0);
  vec4 n_0w = mix(vec4(n0000, n1000, n0100, n1100), vec4(n0001, n1001, n0101, n1101), fade_xyzw.w);
  vec4 n_1w = mix(vec4(n0010, n1010, n0110, n1110), vec4(n0011, n1011, n0111, n1111), fade_xyzw.w);
  vec4 n_zw = mix(n_0w, n_1w, fade_xyzw.z);
  vec2 n_yzw = mix(n_zw.xy, n_zw.zw, fade_xyzw.y);
  float n_xyzw = mix(n_yzw.x, n_yzw.y, fade_xyzw.x);
  return 2.2 * n_xyzw;
}
`;t.classicNoise4D=i;const o=`
//
// GLSL textureless classic 2D noise "cnoise",
// with an RSL-style periodic variant "pnoise".
// Author:  Stefan Gustavson (stefan.gustavson@liu.se)
// Version: 2011-08-22
//
// Many thanks to Ian McEwan of Ashima Arts for the
// ideas for permutation and gradient selection.
//
// Copyright (c) 2011 Stefan Gustavson. All rights reserved.
// Distributed under the MIT license. See LICENSE file.
// https://github.com/ashima/webgl-noise
//

vec4 mod289(vec4 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x)
{
  return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

vec2 fade(vec2 t) {
  return t*t*t*(t*(t*6.0-15.0)+10.0);
}

// Classic Perlin noise, periodic variant
float periodicNoise2D(vec2 P, vec2 rep)
{
  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
  Pi = mod(Pi, rep.xyxy); // To create noise with explicit period
  Pi = mod289(Pi);        // To avoid truncation effects in permutation
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;

  vec4 i = permute(permute(ix) + iy);

  vec4 gx = fract(i * (1.0 / 41.0)) * 2.0 - 1.0 ;
  vec4 gy = abs(gx) - 0.5 ;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;

  vec2 g00 = vec2(gx.x,gy.x);
  vec2 g10 = vec2(gx.y,gy.y);
  vec2 g01 = vec2(gx.z,gy.z);
  vec2 g11 = vec2(gx.w,gy.w);

  vec4 norm = taylorInvSqrt(vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11)));
  g00 *= norm.x;
  g01 *= norm.y;
  g10 *= norm.z;
  g11 *= norm.w;

  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));

  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
  return 2.3 * n_xy;
}
`;t.periodicNoise2D=o;const n=`
//
// GLSL textureless classic 3D noise "cnoise",
// with an RSL-style periodic variant "pnoise".
// Author:  Stefan Gustavson (stefan.gustavson@liu.se)
// Version: 2011-10-11
//
// Many thanks to Ian McEwan of Ashima Arts for the
// ideas for permutation and gradient selection.
//
// Copyright (c) 2011 Stefan Gustavson. All rights reserved.
// Distributed under the MIT license. See LICENSE file.
// https://github.com/ashima/webgl-noise
//

vec3 mod289(vec3 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x)
{
  return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

vec3 fade(vec3 t) {
  return t*t*t*(t*(t*6.0-15.0)+10.0);
}

// Classic Perlin noise, periodic variant
float periodicNoise3D(vec3 P, vec3 rep)
{
  vec3 Pi0 = mod(floor(P), rep); // Integer part, modulo period
  vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period
  Pi0 = mod289(Pi0);
  Pi1 = mod289(Pi1);
  vec3 Pf0 = fract(P); // Fractional part for interpolation
  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = ixy0 * (1.0 / 7.0);
  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 * (1.0 / 7.0);
  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  g000 *= norm0.x;
  g010 *= norm0.y;
  g100 *= norm0.z;
  g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
  g001 *= norm1.x;
  g011 *= norm1.y;
  g101 *= norm1.z;
  g111 *= norm1.w;

  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
  float n111 = dot(g111, Pf1);

  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
  return 2.2 * n_xyz;
}
`;t.periodicNoise3D=n;const s=`
//
// GLSL textureless classic 4D noise "cnoise",
// with an RSL-style periodic variant "pnoise".
// Author:  Stefan Gustavson (stefan.gustavson@liu.se)
// Version: 2011-08-22
//
// Many thanks to Ian McEwan of Ashima Arts for the
// ideas for permutation and gradient selection.
//
// Copyright (c) 2011 Stefan Gustavson. All rights reserved.
// Distributed under the MIT license. See LICENSE file.
// https://github.com/ashima/webgl-noise
//

vec4 mod289(vec4 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x)
{
  return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

vec4 fade(vec4 t) {
  return t*t*t*(t*(t*6.0-15.0)+10.0);
}

// Classic Perlin noise, periodic version
float periodicNoise4D(vec4 P, vec4 rep)
{
  vec4 Pi0 = mod(floor(P), rep); // Integer part modulo rep
  vec4 Pi1 = mod(Pi0 + 1.0, rep); // Integer part + 1 mod rep
  Pi0 = mod289(Pi0);
  Pi1 = mod289(Pi1);
  vec4 Pf0 = fract(P); // Fractional part for interpolation
  vec4 Pf1 = Pf0 - 1.0; // Fractional part - 1.0
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = vec4(Pi0.zzzz);
  vec4 iz1 = vec4(Pi1.zzzz);
  vec4 iw0 = vec4(Pi0.wwww);
  vec4 iw1 = vec4(Pi1.wwww);

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);
  vec4 ixy00 = permute(ixy0 + iw0);
  vec4 ixy01 = permute(ixy0 + iw1);
  vec4 ixy10 = permute(ixy1 + iw0);
  vec4 ixy11 = permute(ixy1 + iw1);

  vec4 gx00 = ixy00 * (1.0 / 7.0);
  vec4 gy00 = floor(gx00) * (1.0 / 7.0);
  vec4 gz00 = floor(gy00) * (1.0 / 6.0);
  gx00 = fract(gx00) - 0.5;
  gy00 = fract(gy00) - 0.5;
  gz00 = fract(gz00) - 0.5;
  vec4 gw00 = vec4(0.75) - abs(gx00) - abs(gy00) - abs(gz00);
  vec4 sw00 = step(gw00, vec4(0.0));
  gx00 -= sw00 * (step(0.0, gx00) - 0.5);
  gy00 -= sw00 * (step(0.0, gy00) - 0.5);

  vec4 gx01 = ixy01 * (1.0 / 7.0);
  vec4 gy01 = floor(gx01) * (1.0 / 7.0);
  vec4 gz01 = floor(gy01) * (1.0 / 6.0);
  gx01 = fract(gx01) - 0.5;
  gy01 = fract(gy01) - 0.5;
  gz01 = fract(gz01) - 0.5;
  vec4 gw01 = vec4(0.75) - abs(gx01) - abs(gy01) - abs(gz01);
  vec4 sw01 = step(gw01, vec4(0.0));
  gx01 -= sw01 * (step(0.0, gx01) - 0.5);
  gy01 -= sw01 * (step(0.0, gy01) - 0.5);

  vec4 gx10 = ixy10 * (1.0 / 7.0);
  vec4 gy10 = floor(gx10) * (1.0 / 7.0);
  vec4 gz10 = floor(gy10) * (1.0 / 6.0);
  gx10 = fract(gx10) - 0.5;
  gy10 = fract(gy10) - 0.5;
  gz10 = fract(gz10) - 0.5;
  vec4 gw10 = vec4(0.75) - abs(gx10) - abs(gy10) - abs(gz10);
  vec4 sw10 = step(gw10, vec4(0.0));
  gx10 -= sw10 * (step(0.0, gx10) - 0.5);
  gy10 -= sw10 * (step(0.0, gy10) - 0.5);

  vec4 gx11 = ixy11 * (1.0 / 7.0);
  vec4 gy11 = floor(gx11) * (1.0 / 7.0);
  vec4 gz11 = floor(gy11) * (1.0 / 6.0);
  gx11 = fract(gx11) - 0.5;
  gy11 = fract(gy11) - 0.5;
  gz11 = fract(gz11) - 0.5;
  vec4 gw11 = vec4(0.75) - abs(gx11) - abs(gy11) - abs(gz11);
  vec4 sw11 = step(gw11, vec4(0.0));
  gx11 -= sw11 * (step(0.0, gx11) - 0.5);
  gy11 -= sw11 * (step(0.0, gy11) - 0.5);

  vec4 g0000 = vec4(gx00.x,gy00.x,gz00.x,gw00.x);
  vec4 g1000 = vec4(gx00.y,gy00.y,gz00.y,gw00.y);
  vec4 g0100 = vec4(gx00.z,gy00.z,gz00.z,gw00.z);
  vec4 g1100 = vec4(gx00.w,gy00.w,gz00.w,gw00.w);
  vec4 g0010 = vec4(gx10.x,gy10.x,gz10.x,gw10.x);
  vec4 g1010 = vec4(gx10.y,gy10.y,gz10.y,gw10.y);
  vec4 g0110 = vec4(gx10.z,gy10.z,gz10.z,gw10.z);
  vec4 g1110 = vec4(gx10.w,gy10.w,gz10.w,gw10.w);
  vec4 g0001 = vec4(gx01.x,gy01.x,gz01.x,gw01.x);
  vec4 g1001 = vec4(gx01.y,gy01.y,gz01.y,gw01.y);
  vec4 g0101 = vec4(gx01.z,gy01.z,gz01.z,gw01.z);
  vec4 g1101 = vec4(gx01.w,gy01.w,gz01.w,gw01.w);
  vec4 g0011 = vec4(gx11.x,gy11.x,gz11.x,gw11.x);
  vec4 g1011 = vec4(gx11.y,gy11.y,gz11.y,gw11.y);
  vec4 g0111 = vec4(gx11.z,gy11.z,gz11.z,gw11.z);
  vec4 g1111 = vec4(gx11.w,gy11.w,gz11.w,gw11.w);

  vec4 norm00 = taylorInvSqrt(vec4(dot(g0000, g0000), dot(g0100, g0100), dot(g1000, g1000), dot(g1100, g1100)));
  g0000 *= norm00.x;
  g0100 *= norm00.y;
  g1000 *= norm00.z;
  g1100 *= norm00.w;

  vec4 norm01 = taylorInvSqrt(vec4(dot(g0001, g0001), dot(g0101, g0101), dot(g1001, g1001), dot(g1101, g1101)));
  g0001 *= norm01.x;
  g0101 *= norm01.y;
  g1001 *= norm01.z;
  g1101 *= norm01.w;

  vec4 norm10 = taylorInvSqrt(vec4(dot(g0010, g0010), dot(g0110, g0110), dot(g1010, g1010), dot(g1110, g1110)));
  g0010 *= norm10.x;
  g0110 *= norm10.y;
  g1010 *= norm10.z;
  g1110 *= norm10.w;

  vec4 norm11 = taylorInvSqrt(vec4(dot(g0011, g0011), dot(g0111, g0111), dot(g1011, g1011), dot(g1111, g1111)));
  g0011 *= norm11.x;
  g0111 *= norm11.y;
  g1011 *= norm11.z;
  g1111 *= norm11.w;

  float n0000 = dot(g0000, Pf0);
  float n1000 = dot(g1000, vec4(Pf1.x, Pf0.yzw));
  float n0100 = dot(g0100, vec4(Pf0.x, Pf1.y, Pf0.zw));
  float n1100 = dot(g1100, vec4(Pf1.xy, Pf0.zw));
  float n0010 = dot(g0010, vec4(Pf0.xy, Pf1.z, Pf0.w));
  float n1010 = dot(g1010, vec4(Pf1.x, Pf0.y, Pf1.z, Pf0.w));
  float n0110 = dot(g0110, vec4(Pf0.x, Pf1.yz, Pf0.w));
  float n1110 = dot(g1110, vec4(Pf1.xyz, Pf0.w));
  float n0001 = dot(g0001, vec4(Pf0.xyz, Pf1.w));
  float n1001 = dot(g1001, vec4(Pf1.x, Pf0.yz, Pf1.w));
  float n0101 = dot(g0101, vec4(Pf0.x, Pf1.y, Pf0.z, Pf1.w));
  float n1101 = dot(g1101, vec4(Pf1.xy, Pf0.z, Pf1.w));
  float n0011 = dot(g0011, vec4(Pf0.xy, Pf1.zw));
  float n1011 = dot(g1011, vec4(Pf1.x, Pf0.y, Pf1.zw));
  float n0111 = dot(g0111, vec4(Pf0.x, Pf1.yzw));
  float n1111 = dot(g1111, Pf1);

  vec4 fade_xyzw = fade(Pf0);
  vec4 n_0w = mix(vec4(n0000, n1000, n0100, n1100), vec4(n0001, n1001, n0101, n1101), fade_xyzw.w);
  vec4 n_1w = mix(vec4(n0010, n1010, n0110, n1110), vec4(n0011, n1011, n0111, n1111), fade_xyzw.w);
  vec4 n_zw = mix(n_0w, n_1w, fade_xyzw.z);
  vec2 n_yzw = mix(n_zw.xy, n_zw.zw, fade_xyzw.y);
  float n_xyzw = mix(n_yzw.x, n_yzw.y, fade_xyzw.x);
  return 2.2 * n_xyzw;
}
`;t.periodicNoise4D=s;const d=`
//
// Description : Array and textureless GLSL 2D simplex noise function.
//      Author : Ian McEwan, Ashima Arts.
//  Maintainer : ijm
//     Lastmod : 20110822 (ijm)
//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
//               Distributed under the MIT License. See LICENSE file.
//               https://github.com/ashima/webgl-noise
//

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec2 mod289(vec2 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec3 permute(vec3 x) {
  return mod289(((x*34.0)+1.0)*x);
}

float simplexNoise2D(vec2 v)
  {
  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                     -0.577350269189626,  // -1.0 + 2.0 * C.x
                      0.024390243902439); // 1.0 / 41.0
// First corner
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);

// Other corners
  vec2 i1;
  //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0
  //i1.y = 1.0 - i1.x;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  // x0 = x0 - 0.0 + 0.0 * C.xx ;
  // x1 = x0 - i1 + 1.0 * C.xx ;
  // x2 = x0 - 1.0 + 2.0 * C.xx ;
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;

// Permutations
  i = mod289(i); // Avoid truncation effects in permutation
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));

  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;

// Gradients: 41 points uniformly over a line, mapped onto a diamond.
// The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;

// Normalise gradients implicitly by scaling m
// Approximation of: m *= inversesqrt( a0*a0 + h*h );
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );

// Compute final noise value at P
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
`;t.simplexNoise2D=d;const l=`
//
// Description : Array and textureless GLSL 2D/3D/4D simplex
//               noise functions.
//      Author : Ian McEwan, Ashima Arts.
//  Maintainer : ijm
//     Lastmod : 20110822 (ijm)
//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
//               Distributed under the MIT License. See LICENSE file.
//               https://github.com/ashima/webgl-noise
//

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
     return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

float simplexNoise3D(vec3 v)
  {
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

// First corner
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

// Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  //   x0 = x0 - 0.0 + 0.0 * C.xxx;
  //   x1 = x0 - i1  + 1.0 * C.xxx;
  //   x2 = x0 - i2  + 2.0 * C.xxx;
  //   x3 = x0 - 1.0 + 3.0 * C.xxx;
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

// Permutations
  i = mod289(i);
  vec4 p = permute( permute( permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

// Gradients: 7x7 points over a square, mapped onto an octahedron.
// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
  float n_ = 0.142857142857; // 1.0/7.0
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

//Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

// Mix final noise value
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                dot(p2,x2), dot(p3,x3) ) );
  }
`;t.simplexNoise3D=l;const c=`
//
// Description : Array and textureless GLSL 2D/3D/4D simplex
//               noise functions.
//      Author : Ian McEwan, Ashima Arts.
//  Maintainer : ijm
//     Lastmod : 20110822 (ijm)
//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
//               Distributed under the MIT License. See LICENSE file.
//               https://github.com/ashima/webgl-noise
//

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0; }

float mod289(float x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0; }

vec4 permute(vec4 x) {
     return mod289(((x*34.0)+1.0)*x);
}

float permute(float x) {
     return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

float taylorInvSqrt(float r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

vec4 grad4(float j, vec4 ip)
  {
  const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);
  vec4 p,s;

  p.xyz = floor( fract (vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;
  p.w = 1.5 - dot(abs(p.xyz), ones.xyz);
  s = vec4(lessThan(p, vec4(0.0)));
  p.xyz = p.xyz + (s.xyz*2.0 - 1.0) * s.www;

  return p;
  }

// (sqrt(5) - 1)/4 = F4, used once below
#define F4 0.309016994374947451

float simplexNoise4D(vec4 v)
  {
  const vec4  C = vec4( 0.138196601125011,  // (5 - sqrt(5))/20  G4
                        0.276393202250021,  // 2 * G4
                        0.414589803375032,  // 3 * G4
                       -0.447213595499958); // -1 + 4 * G4

// First corner
  vec4 i  = floor(v + dot(v, vec4(F4)) );
  vec4 x0 = v -   i + dot(i, C.xxxx);

// Other corners

// Rank sorting originally contributed by Bill Licea-Kane, AMD (formerly ATI)
  vec4 i0;
  vec3 isX = step( x0.yzw, x0.xxx );
  vec3 isYZ = step( x0.zww, x0.yyz );
//  i0.x = dot( isX, vec3( 1.0 ) );
  i0.x = isX.x + isX.y + isX.z;
  i0.yzw = 1.0 - isX;
//  i0.y += dot( isYZ.xy, vec2( 1.0 ) );
  i0.y += isYZ.x + isYZ.y;
  i0.zw += 1.0 - isYZ.xy;
  i0.z += isYZ.z;
  i0.w += 1.0 - isYZ.z;

  // i0 now contains the unique values 0,1,2,3 in each channel
  vec4 i3 = clamp( i0, 0.0, 1.0 );
  vec4 i2 = clamp( i0-1.0, 0.0, 1.0 );
  vec4 i1 = clamp( i0-2.0, 0.0, 1.0 );

  //  x0 = x0 - 0.0 + 0.0 * C.xxxx
  //  x1 = x0 - i1  + 1.0 * C.xxxx
  //  x2 = x0 - i2  + 2.0 * C.xxxx
  //  x3 = x0 - i3  + 3.0 * C.xxxx
  //  x4 = x0 - 1.0 + 4.0 * C.xxxx
  vec4 x1 = x0 - i1 + C.xxxx;
  vec4 x2 = x0 - i2 + C.yyyy;
  vec4 x3 = x0 - i3 + C.zzzz;
  vec4 x4 = x0 + C.wwww;

// Permutations
  i = mod289(i);
  float j0 = permute( permute( permute( permute(i.w) + i.z) + i.y) + i.x);
  vec4 j1 = permute( permute( permute( permute (
             i.w + vec4(i1.w, i2.w, i3.w, 1.0 ))
           + i.z + vec4(i1.z, i2.z, i3.z, 1.0 ))
           + i.y + vec4(i1.y, i2.y, i3.y, 1.0 ))
           + i.x + vec4(i1.x, i2.x, i3.x, 1.0 ));

// Gradients: 7x7x6 points over a cube, mapped onto a 4-cross polytope
// 7*7*6 = 294, which is close to the ring size 17*17 = 289.
  vec4 ip = vec4(1.0/294.0, 1.0/49.0, 1.0/7.0, 0.0) ;

  vec4 p0 = grad4(j0,   ip);
  vec4 p1 = grad4(j1.x, ip);
  vec4 p2 = grad4(j1.y, ip);
  vec4 p3 = grad4(j1.z, ip);
  vec4 p4 = grad4(j1.w, ip);

// Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  p4 *= taylorInvSqrt(dot(p4,p4));

// Mix contributions from the five corners
  vec3 m0 = max(0.6 - vec3(dot(x0,x0), dot(x1,x1), dot(x2,x2)), 0.0);
  vec2 m1 = max(0.6 - vec2(dot(x3,x3), dot(x4,x4)            ), 0.0);
  m0 = m0 * m0;
  m1 = m1 * m1;
  return 49.0 * ( dot(m0*m0, vec3( dot( p0, x0 ), dot( p1, x1 ), dot( p2, x2 )))
               + dot(m1*m1, vec2( dot( p3, x3 ), dot( p4, x4 ) ) ) ) ;

  }
`;t.simplexNoise4D=c},function(e,t){'use strict';const r=`
	vec3 packNormalToRGB(const in vec3 normal) {
	  return normalize(normal) * 0.5 + 0.5;
	}
`;t.a={packNormalToRGB:r}},function(e,t){'use strict';Object.defineProperty(t,'__esModule',{value:!0});const r=`
	vec3 tonemapReinhard(vec3 color) {
	  return color / (color + vec3(1.0));
	}
`;t.tonemapReinhard=r},function(e,t){'use strict';t.a=`
	float transpose(float m) {
	  return m;
	}

	mat2 transpose(mat2 m) {
	  return mat2(m[0][0], m[1][0],
	              m[0][1], m[1][1]);
	}

	mat3 transpose(mat3 m) {
	  return mat3(m[0][0], m[1][0], m[2][0],
	              m[0][1], m[1][1], m[2][1],
	              m[0][2], m[1][2], m[2][2]);
	}

	mat4 transpose(mat4 m) {
	  return mat4(m[0][0], m[1][0], m[2][0], m[3][0],
	              m[0][1], m[1][1], m[2][1], m[3][1],
	              m[0][2], m[1][2], m[2][2], m[3][2],
	              m[0][3], m[1][3], m[2][3], m[3][3]);
	}
`},function(e,t,r){'use strict';var a=r(90),i=r.n(a),o=r(92),n=r.n(o),s=r(2),d=r(14),l=r(8),c=r(9),u=r(37),p=r(38);class m{constructor(e,t,r=50){this.origin=e,this.lookat=t;let a=[],o=[];e.forEach((e)=>{a=a.concat(e)}),t.forEach((e)=>{o=o.concat(e)}),this.curves={origin:new i.a(a),lookat:new i.a(o)}}get(e=0){const t=this.curves.origin.get(e),r=this.curves.lookat.get(e);return{origin:t,lookat:r}}rebuild(){this.curves.origin.update(),this.curves.lookat.update()}destroy(){this.curves.origin=null,this.curves.lookat=null}}class _ extends d.a{constructor(e,t,r,a=50,i=100,o=!1,s=!1,d=!1){super(),this._rebuild=()=>{this.dolly.rebuild(),this.updateLine('origin',this.dolly.curves.origin.getLUT(this.steps)),this.updateLine('lookat',this.dolly.curves.lookat.getLUT(this.steps)),this.updatePoints('origin',this.dolly.curves.origin.points),this.updatePoints('lookat',this.dolly.curves.lookat.points),this.emit('rebuild')},this.id=n()(),this.dolly=e,this.scene=t,this.gui=r.addFolder(`Dolly ${this.id}`),o&&this.gui.open(),this.steps=a,this.range=i,this.lines={origin:null,lookat:null},this.points={origin:[],lookat:[]},this.createPoints('origin',this.dolly.origin),this.createPoints('lookat',this.dolly.lookat),this.createLine('origin',this.dolly.curves.origin.getLUT(this.steps)),this.createLine('lookat',this.dolly.curves.lookat.getLUT(this.steps)),this.guiOrigin=this.gui.addFolder(`origin`),this.guiLookat=this.gui.addFolder(`lookat`),s&&this.guiOrigin.open(),d&&this.guiLookat.open(),this.guiLookat.open(),this.dolly.curves.origin.points.forEach((e,t)=>{const r=this.guiOrigin.addFolder(`${t}`);r.open(),r.add(e,'x',-this.range,this.range).onChange(this._rebuild),r.add(e,'y',-this.range,this.range).onChange(this._rebuild),r.add(e,'z',-this.range,this.range).onChange(this._rebuild)}),this.dolly.curves.lookat.points.forEach((e,t)=>{const r=this.guiLookat.addFolder(`${t}`);r.open(),r.add(e,'x',-this.range,this.range).onChange(this._rebuild),r.add(e,'y',-this.range,this.range).onChange(this._rebuild),r.add(e,'z',-this.range,this.range).onChange(this._rebuild)})}flatten(e){let t=[];return e.forEach((e)=>{t=t.concat([e.x,e.y,e.z])}),t}createPoints(e,t){t.forEach((t,r)=>{this.points[e][r]=new l.a(new p.a(0.2,4,5),new c.a({drawType:s.DRAW_LINES})),this.points[e][r].position.set(t.x,t.y,t.z),this.scene.add(this.points[e][r])})}updatePoints(e,t){t.forEach((t,r)=>{this.points[e][r].position.set(t.x,t.y,t.z)})}updateLine(e,t){const r=this.lines[e].geometry.vertices.length/2;let a=0,o,n;for(let s=0;s<r;s+=1)a=2*s,s<r&&(o=t[s],n=t[s+1],this.lines[e].geometry.vertices[a].set(o.x,o.y,o.z),this.lines[e].geometry.vertices[a+1].set(n.x,n.y,n.z));this.lines[e].geometry.updateVertices()}createLine(e,t){const r=new Float32Array(this.flatten(t));this.lines[e]=new l.a(new u.a(r),new c.a({drawType:s.DRAW_LINES})),this.scene.add(this.lines[e])}destroy(){Object.keys(this.lines).forEach((e)=>{this.scene.remove(this.lines[e],!0)}),Object.keys(this.points).forEach((e)=>{this.points[e].forEach((e)=>{this.scene.remove(e,!0)})}),this.scene=null}}t.a=class{constructor(e){this.update=()=>{const{origin:e,lookat:t}=this.dollies[this.dolly].get(this.time);this.camera.position.set(e.x,e.y,e.z),this.camera.lookAt(t.x,t.y,t.z)},this.id=n()(),Object.assign(this,e),this.dollies=[],this.helpers=[],this.dolly='',this.time=0,this.gui&&(this.guiFolder=this.gui.addFolder(`Camera Dolly ${this.id}`),this.guiFolder.open(),this.guiFolder.add(this,'export'))}add(e,t){this.dollies[e]=new m(t.origin,t.lookat,this.curveSteps),this.set(e),this.guiFolder&&(this.helpers[e]=new _(this.dollies[e],this.scene,this.gui,this.curveSteps,this.guiSliderRange,this.guiOpen,this.guiOpenOrigin,this.guiOpenLookat),this.helpers[e].on('rebuild',this.update))}export(){const e=JSON.stringify({origin:this.dollies[this.dolly].curves.origin.points,lookat:this.dollies[this.dolly].curves.lookat.points},void 0,2);window.prompt('Copy to clipboard: Ctrl+C, Enter',e)}set(e){this.dolly=e}destroy(){Object.keys(this.dollies).forEach((e)=>{this.dollies[e].destroy()}),Object.keys(this.helpers).forEach((e)=>{this.helpers[e].destroy()})}}},function(e,t,r){e.exports=r(39)},function(e,t,r){(function(){'use strict';var t=r(40),a=function(e){this.curves=[],this._3d=!1,!e||(this.curves=e,this._3d=this.curves[0]._3d)};a.prototype={valueOf:function(){return this.toString()},toString:function(){return'['+this.curves.map(function(e){return t.pointsToString(e.points)}).join(', ')+']'},addCurve:function(e){this.curves.push(e),this._3d=this._3d||e._3d},length:function(){return this.curves.map(function(e){return e.length()}).reduce(function(e,t){return e+t})},curve:function(e){return this.curves[e]},bbox:function(){for(var e=this.curves,r=e[0].bbox(),a=1;a<e.length;a++)t.expandbox(r,e[a].bbox());return r},offset:function(e){var t=[];return this.curves.forEach(function(r){t=t.concat(r.offset(e))}),new a(t)}},e.exports=a})()},function(e,t,r){var a=r(93),o=r(95),i=a(),s=[1|i[0],i[1],i[2],i[3],i[4],i[5]],d=16383&(i[6]<<8|i[7]),l=0,c=0;e.exports=function(e,t,r){var a=t&&r||0,i=t||[];e=e||{};var u=void 0===e.clockseq?d:e.clockseq,p=void 0===e.msecs?new Date().getTime():e.msecs,m=void 0===e.nsecs?c+1:e.nsecs,_=p-l+(m-c)/1e4;if(0>_&&void 0===e.clockseq&&(u=16383&u+1),(0>_||p>l)&&void 0===e.nsecs&&(m=0),1e4<=m)throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');l=p,c=m,d=u,p+=1.22192928e13;var f=(1e4*(268435455&p)+m)%4294967296;i[a++]=255&f>>>24,i[a++]=255&f>>>16,i[a++]=255&f>>>8,i[a++]=255&f;var g=268435455&1e4*(p/4294967296);i[a++]=255&g>>>8,i[a++]=255&g,i[a++]=16|15&g>>>24,i[a++]=255&g>>>16,i[a++]=128|u>>>8,i[a++]=255&u;for(var h=e.node||s,b=0;6>b;++b)i[a+b]=h[b];return t?t:o(i)}},function(e,t,r){(function(t){var r=t.crypto||t.msCrypto,a;if(r&&r.getRandomValues){var i=new Uint8Array(16);a=function(){return r.getRandomValues(i),i}}if(!a){var o=Array(16);a=function(){for(var e=0,t;16>e;e++)0==(3&e)&&(t=4294967296*Math.random()),o[e]=255&t>>>((3&e)<<3);return o}}e.exports=a}).call(t,r(94))},function(e){var t=function(){return this}();try{t=t||Function('return this')()||(1,eval)('this')}catch(r){'object'==typeof window&&(t=window)}e.exports=t},function(e){for(var t=[],r=0;256>r;++r)t[r]=(r+256).toString(16).substr(1);e.exports=function(e,r){var a=r||0,i=t;return i[e[a++]]+i[e[a++]]+i[e[a++]]+i[e[a++]]+'-'+i[e[a++]]+i[e[a++]]+'-'+i[e[a++]]+i[e[a++]]+'-'+i[e[a++]]+i[e[a++]]+'-'+i[e[a++]]+i[e[a++]]+i[e[a++]]+i[e[a++]]+i[e[a++]]+i[e[a++]]}},function(e,t){'use strict';let r,a;const i=window.performance||Date;t.a=class{constructor(e=!1){this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.isRunning=e}start(){this.startTime=i.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.isRunning=!0}stop(){this.getElapsedTime(),this.isRunning=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){return r=0,this.autoStart&&!this.isRunning&&this.start(),this.isRunning&&(a=i.now(),r=(a-this.oldTime)/1e3,this.oldTime=a,this.elapsedTime+=r),r}}},function(e){(function(){'use strict';var t={};e.exports=t,t.Mesh=function(e){var t=[],r=[],a=[],o={};o.verts=[],o.norms=[],o.textures=[],o.hashindices={},o.indices=[],o.index=0;for(var n=e.split('\n'),s=/^v\s/,d=/^vn\s/,l=/^vt\s/,c=/^f\s/,u=/\s+/,p=0;p<n.length;p++){var i=n[p].trim(),m=i.split(u);if(m.shift(),s.test(i))t.push.apply(t,m);else if(d.test(i))r.push.apply(r,m);else if(l.test(i))a.push.apply(a,m);else if(c.test(i))for(var _=!1,f=0,g=m.length;f<g;f++){if(3!==f||_||(f=2,_=!0),m[f]in o.hashindices)o.indices.push(o.hashindices[m[f]]);else{var h=m[f].split('/');o.verts.push(+t[3*(h[0]-1)+0]),o.verts.push(+t[3*(h[0]-1)+1]),o.verts.push(+t[3*(h[0]-1)+2]),a.length&&(o.textures.push(+a[2*(h[1]-1)+0]),o.textures.push(+a[2*(h[1]-1)+1])),o.norms.push(+r[3*(h[2]-1)+0]),o.norms.push(+r[3*(h[2]-1)+1]),o.norms.push(+r[3*(h[2]-1)+2]),o.hashindices[m[f]]=o.index,o.indices.push(o.index),o.index+=1}3===f&&_&&o.indices.push(o.hashindices[m[0]])}}this.vertices=o.verts,this.vertexNormals=o.norms,this.textures=o.textures,this.indices=o.indices};var r=function(){var e=this;this.xmlhttp=new XMLHttpRequest,this.get=function(t,r){e.xmlhttp.onreadystatechange=function(){4===e.xmlhttp.readyState&&r(e.xmlhttp.responseText,e.xmlhttp.status)},e.xmlhttp.open('GET',t,!0),e.xmlhttp.send()}};t.downloadMeshes=function(e,a,i){var o=Object.keys(e).length,n=!1;for(var s in void 0===i&&(i={}),e)e.hasOwnProperty(s)&&new r().get(e[s],function(e){return function(r,s){if(200===s?i[e]=new t.Mesh(r):(n=!0,console.error('An error has occurred and the mesh "'+e+'" could not be downloaded.')),o--,0===o){if(n)throw console.error('An error has occurred and one or meshes has not been downloaded. The execution of the script has terminated.'),'';a(i)}}}(s))};var a=function(e,t,r,a){var i=e.createBuffer(),o=t===e.ARRAY_BUFFER?Float32Array:Uint16Array;return e.bindBuffer(t,i),e.bufferData(t,new o(r),e.STATIC_DRAW),i.itemSize=a,i.numItems=r.length/a,i};t.initMeshBuffers=function(e,t){t.normalBuffer=a(e,e.ARRAY_BUFFER,t.vertexNormals,3),t.textureBuffer=a(e,e.ARRAY_BUFFER,t.textures,2),t.vertexBuffer=a(e,e.ARRAY_BUFFER,t.vertices,3),t.indexBuffer=a(e,e.ELEMENT_ARRAY_BUFFER,t.indices,1)},t.deleteMeshBuffers=function(e,t){e.deleteBuffer(t.normalBuffer),e.deleteBuffer(t.textureBuffer),e.deleteBuffer(t.vertexBuffer),e.deleteBuffer(t.indexBuffer)}})()},function(e,t,r){'use strict';var a=Math.atan2,i=Math.cos,o=Math.sin,n=Math.max,s=Math.abs,d=Math.PI,l=r(11),c=r(3);const u='MODE_DRAG',p='MODE_PAN',m='MODE_ZOOM',_=new c.a(0,1,0),f=1e-4;t.a=class{constructor(e,t){this._onTouchStart=(e)=>{if(e.preventDefault(),e.touches)switch(e.touches.length){case 1:this._mode=u,this._offsetY=this._rotationY,this._offsetX=this._rotationX;break;case 2:{this._mode=m,this._radiusOffset=this._radius;break}default:this._mode=p,this._offsetY=this.target.y,this._offsetX=this.target.x;}else switch(e.which){case 3:this._mode=p,this._offsetY=this.target.y,this._offsetX=this.target.x;break;default:this._mode=u,this._offsetY=this._rotationY,this._offsetX=this._rotationX;}this._startY=e.pageX/this._width,this._startX=e.pageY/this._height,this._targetOffset.copy(this.target),this._radiusOffset=this._radius,this.isDown=!0},this._onTouchMove=(e)=>{if(this.isDown){switch(this._mode){case p:{if(!this.pan)return;const t=e.pageX/this._width,r=e.pageY/this._height;this._direction.copy(this._camera.position).subtract(this.target).normalize();const a=this._direction.cross(_),i=this._targetOffset.x+-(this._startY-t)*this.panSpeed*a.x,o=this._targetOffset.y+-(this._startX-r)*this.panSpeed,n=this._targetOffset.z+-(this._startY-t)*this.panSpeed*a.z;this.target.set(i,o,n);break}case m:{if(!this.zoom)return;const t=e.touches[0].pageX-e.touches[1].pageX,r=e.touches[0].pageY-e.touches[1].pageY,a=Math.sqrt(t*t+r*r),i=this._lastZoomDistance>a?1:-1;this._zoomConstraint(100*i),this._lastZoomDistance=a;break}default:{const t=e.pageX/this._width,r=e.pageY/this._height;this._rotationX=this._offsetX+-(this._startX-r)*this.rotationSpeed,this._rotationY=this._offsetY+(this._startY-t)*this.rotationSpeed,this._rotationX=Object(l.clamp)(this._rotationX,-d/2,d/2)}}this.update()}},this._onTouchEnd=()=>{this.isDown=!1},this._onContextMenu=(e)=>{e.preventDefault()},this._onMouseWheel=(e)=>{let t=0;e.wheelDelta?t=e.wheelDelta:e.detail&&(t=e.detail),this._zoomConstraint(-t)},this._onKeypress=(e)=>{switch(e.keyCode){case 114:this.reset();break;default:}},this.rotationSpeed=5,this.panSpeed=10,this.zoom=!0,this.pan=!0,this.smoothing=!1,this.easing=0.1,this._camera=e,this._element=t,this._zoomMin=0.1,this._zoomMax=Infinity,this._radius=n(e.position.x,e.position.z),this._radiusOffset=0,this._defaultRadius=n(e.position.x,e.position.z),this._rotationX=a(e.position.y-0,+this._radius-0),this._rotationY=a(e.position.z-0,e.position.x-0),this._defaultRotationX=a(e.position.y-0,+this._radius-0),this._defaultRotationY=a(e.position.z-0,e.position.x-0);const s=this._radius*o(this._rotationX),f=this._radius*i(this._rotationX),r=o(this._rotationY)*f,g=i(this._rotationY)*f;this._x=r,this._y=s,this._z=g,this._offsetX=0,this._offsetY=0,this._offsetPanX=0,this._offsetPanY=0,this.target=new c.a,this._targetOffset=new c.a,this._direction=new c.a,this._lastZoomDistance=0,this._width=window.innerWidth,this._height=window.innerHeight,this._element.addEventListener('mousedown',this._onTouchStart,!1),this._element.addEventListener('mousemove',this._onTouchMove,!1),this._element.addEventListener('mouseup',this._onTouchEnd,!1),this._element.addEventListener('touchstart',this._onTouchStart,!1),this._element.addEventListener('touchmove',this._onTouchMove,!1),this._element.addEventListener('touchend',this._onTouchEnd,!1),this._element.addEventListener('contextmenu',this._onContextMenu,!1),window.addEventListener('mousewheel',this._onMouseWheel,!1),window.addEventListener('keypress',this._onKeypress,!1)}_zoomConstraint(e){if(this.zoom){this._radius+=e/1e3*3,this._radius=Object(l.clamp)(this._radius,this._zoomMin,this._zoomMax),this.update()}}update(){const e=this._radius*o(this._rotationX),t=this._radius*i(this._rotationX),r=o(this._rotationY)*t,a=i(this._rotationY)*t;this.smoothing?(this._x+=(r-this._x)*this.easing,this._y+=(e-this._y)*this.easing,this._z+=(a-this._z)*this.easing,s(this._x-r)<f&&(this._x=r),s(this._y-e)<f&&(this._y=e),s(this._z-a)<f&&(this._z=a)):(this._x=r,this._y=e,this._z=a),this._camera.position.set(this._x,this._y,this._z).add(this.target),this._camera.lookAt(this.target.x,this.target.y,this.target.z)}reset(){this.target.set(0,0,0),this._rotationY=this._defaultRotationY,this._rotationX=this._defaultRotationX,this._radius=this._defaultRadius,this.update()}dispose(){this._element.removeEventListener('mousedown',this._onTouchStart),this._element.removeEventListener('mousemove',this._onTouchMove),this._element.removeEventListener('mouseup',this._onTouchEnd),this._element.removeEventListener('touchstart',this._onTouchStart),this._element.removeEventListener('touchmove',this._onTouchMove),this._element.removeEventListener('touchend',this._onTouchEnd),this._element.removeEventListener('contextmenu',this._onContextMenu),window.removeEventListener('mousewheel',this._onMouseWheel),window.removeEventListener('keypress',this._onKeypress),this._camera=null,this._element=null}}},function(e,t,r){'use strict';var a=r(26);t.a=function(e){return new Promise((t,r)=>{Object(a.a)(e).then((e)=>{const r=JSON.parse(e);t(r)}).catch(r)})}},function(e,t,r){'use strict';var a=r(41),i=r(26);t.a=function(e){return new Promise((t,r)=>{Object(i.a)(e).then((e)=>{const r=Object(a.a)(e);t(r)}).catch(r)})}},function(e,t,r){'use strict';function a(e){return e&&e.__esModule?e:{default:e}}function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var o=r(102),n=a(o),s=r(105),d=a(s),l=new n.default.GUI;e.exports=function(e){var t=void 0===e?['webgl2','webgl']:e,r=d.default.parse(location.search),a=function(e){return r[e]},o=function(e,t){var a=Object.assign({},r,i({},e,t)),o=d.default.stringify(a),n=window.location.pathname+'?'+o;window.location.href=n},n={context:a('context')||t[0]};return l.add(n,'context',t).onChange(function(e){o('context',e)}),{gui:l,guiController:n,getQuery:a,setQuery:o}}},function(e,t,r){e.exports=r(103),e.exports.color=r(104)},function(e){var t=Math.round,r=Math.floor,a=Math.pow,i=e.exports=i||{};i.gui=i.gui||{},i.utils=i.utils||{},i.controllers=i.controllers||{},i.dom=i.dom||{},i.color=i.color||{},i.utils.css=function(){return{load:function(e,t){t=t||document;var r=t.createElement('link');r.type='text/css',r.rel='stylesheet',r.href=e,t.getElementsByTagName('head')[0].appendChild(r)},inject:function(e,t){t=t||document;var r=document.createElement('style');r.type='text/css',r.innerHTML=e,t.getElementsByTagName('head')[0].appendChild(r)}}}(),i.utils.common=function(){var e=Array.prototype.forEach,t=Array.prototype.slice;return{BREAK:{},extend:function(e){return this.each(t.call(arguments,1),function(t){for(var r in t)this.isUndefined(t[r])||(e[r]=t[r])},this),e},defaults:function(e){return this.each(t.call(arguments,1),function(t){for(var r in t)this.isUndefined(e[r])&&(e[r]=t[r])},this),e},compose:function(){var e=t.call(arguments);return function(){for(var r=t.call(arguments),a=e.length-1;0<=a;a--)r=[e[a].apply(this,r)];return r[0]}},each:function(t,r,a){if(e&&t.forEach===e)t.forEach(r,a);else if(t.length===t.length+0){for(var i=0,o=t.length;i<o;i++)if(i in t&&r.call(a,t[i],i)===this.BREAK)return;}else for(var i in t)if(r.call(a,t[i],i)===this.BREAK)return},defer:function(e){setTimeout(e,0)},toArray:function(e){return e.toArray?e.toArray():t.call(e)},isUndefined:function(e){return e===void 0},isNull:function(e){return null===e},isNaN:function(e){return e!==e},isArray:Array.isArray||function(e){return e.constructor===Array},isObject:function(e){return e===Object(e)},isNumber:function(e){return e===e+0},isString:function(e){return e===e+''},isBoolean:function(e){return!1===e||!0===e},isFunction:function(e){return'[object Function]'===Object.prototype.toString.call(e)}}}(),i.controllers.Controller=function(e){var t=function(e,t){this.initialValue=e[t],this.domElement=document.createElement('div'),this.object=e,this.property=t,this.__onChange=void 0,this.__onFinishChange=void 0};return e.extend(t.prototype,{onChange:function(e){return this.__onChange=e,this},onFinishChange:function(e){return this.__onFinishChange=e,this},setValue:function(e){return this.object[this.property]=e,this.__onChange&&this.__onChange.call(this,e),this.updateDisplay(),this},getValue:function(){return this.object[this.property]},updateDisplay:function(){return this},isModified:function(){return this.initialValue!==this.getValue()}}),t}(i.utils.common),i.dom.dom=function(e){function t(t){if('0'===t||e.isUndefined(t))return 0;var r=t.match(a);return e.isNull(r)?0:parseFloat(r[1])}var r={};e.each({HTMLEvents:['change'],MouseEvents:['click','mousemove','mousedown','mouseup','mouseover'],KeyboardEvents:['keydown']},function(t,a){e.each(t,function(t){r[t]=a})});var a=/(\d+(\.\d+)?)px/,i={makeSelectable:function(e,t){void 0===e||void 0===e.style||(e.onselectstart=t?function(){return!1}:function(){},e.style.MozUserSelect=t?'auto':'none',e.style.KhtmlUserSelect=t?'auto':'none',e.unselectable=t?'on':'off')},makeFullscreen:function(t,r,a){e.isUndefined(r)&&(r=!0),e.isUndefined(a)&&(a=!0),t.style.position='absolute',r&&(t.style.left=0,t.style.right=0),a&&(t.style.top=0,t.style.bottom=0)},fakeEvent:function(t,a,i,o){i=i||{};var n=r[a];if(!n)throw new Error('Event type '+a+' not supported.');var s=document.createEvent(n);switch(n){case'MouseEvents':var d=i.x||i.clientX||0,l=i.y||i.clientY||0;s.initMouseEvent(a,i.bubbles||!1,i.cancelable||!0,window,i.clickCount||1,0,0,d,l,!1,!1,!1,!1,0,null);break;case'KeyboardEvents':var c=s.initKeyboardEvent||s.initKeyEvent;e.defaults(i,{cancelable:!0,ctrlKey:!1,altKey:!1,shiftKey:!1,metaKey:!1,keyCode:void 0,charCode:void 0}),c(a,i.bubbles||!1,i.cancelable,window,i.ctrlKey,i.altKey,i.shiftKey,i.metaKey,i.keyCode,i.charCode);break;default:s.initEvent(a,i.bubbles||!1,i.cancelable||!0);}e.defaults(s,o),t.dispatchEvent(s)},bind:function(e,t,r,a){return a=a||!1,e.addEventListener?e.addEventListener(t,r,a):e.attachEvent&&e.attachEvent('on'+t,r),i},unbind:function(e,t,r,a){return a=a||!1,e.removeEventListener?e.removeEventListener(t,r,a):e.detachEvent&&e.detachEvent('on'+t,r),i},addClass:function(e,t){if(e.className===void 0)e.className=t;else if(e.className!==t){var r=e.className.split(/ +/);-1==r.indexOf(t)&&(r.push(t),e.className=r.join(' ').replace(/^\s+/,'').replace(/\s+$/,''))}return i},removeClass:function(e,t){if(!t)e.className=void 0;else if(void 0===e.className);else if(e.className===t)e.removeAttribute('class');else{var r=e.className.split(/ +/),a=r.indexOf(t);-1!=a&&(r.splice(a,1),e.className=r.join(' '))}return i},hasClass:function(e,t){return new RegExp('(?:^|\\s+)'+t+'(?:\\s+|$)').test(e.className)||!1},getWidth:function(e){var r=getComputedStyle(e);return t(r['border-left-width'])+t(r['border-right-width'])+t(r['padding-left'])+t(r['padding-right'])+t(r.width)},getHeight:function(e){var r=getComputedStyle(e);return t(r['border-top-width'])+t(r['border-bottom-width'])+t(r['padding-top'])+t(r['padding-bottom'])+t(r.height)},getOffset:function(e){var t={left:0,top:0};if(e.offsetParent)do t.left+=e.offsetLeft,t.top+=e.offsetTop;while(e=e.offsetParent);return t},isActive:function(e){return e===document.activeElement&&(e.type||e.href)}};return i}(i.utils.common),i.controllers.OptionController=function(e,t,r){var a=function(e,i,o){a.superclass.call(this,e,i);var n=this;if(this.__select=document.createElement('select'),r.isArray(o)){var s={};r.each(o,function(e){s[e]=e}),o=s}r.each(o,function(e,t){var r=document.createElement('option');r.innerHTML=t,r.setAttribute('value',e),n.__select.appendChild(r)}),this.updateDisplay(),t.bind(this.__select,'change',function(){var e=this.options[this.selectedIndex].value;n.setValue(e)}),this.domElement.appendChild(this.__select)};return a.superclass=e,r.extend(a.prototype,e.prototype,{setValue:function(e){var t=a.superclass.prototype.setValue.call(this,e);return this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue()),t},updateDisplay:function(){return this.__select.value=this.getValue(),a.superclass.prototype.updateDisplay.call(this)}}),a}(i.controllers.Controller,i.dom.dom,i.utils.common),i.controllers.NumberController=function(e,i){function o(e){return e=e.toString(),-1<e.indexOf('.')?e.length-e.indexOf('.')-1:0}var n=function(e,t,s){n.superclass.call(this,e,t),s=s||{},this.__min=s.min,this.__max=s.max,this.__step=s.step,this.__impliedStep=i.isUndefined(this.__step)?0==this.initialValue?1:a(10,r(Math.log(this.initialValue)/Math.LN10))/10:this.__step,this.__precision=o(this.__impliedStep)};return n.superclass=e,i.extend(n.prototype,e.prototype,{setValue:function(e){return void 0!==this.__min&&e<this.__min?e=this.__min:void 0!==this.__max&&e>this.__max&&(e=this.__max),void 0!==this.__step&&0!=e%this.__step&&(e=t(e/this.__step)*this.__step),n.superclass.prototype.setValue.call(this,e)},min:function(e){return this.__min=e,this},max:function(e){return this.__max=e,this},step:function(e){return this.__step=e,this}}),n}(i.controllers.Controller,i.utils.common),i.controllers.NumberControllerBox=function(e,r,i){function o(e,r){var i=a(10,r);return t(e*i)/i}var n=function(e,t,a){function o(){var e=parseFloat(l.__input.value);i.isNaN(e)||l.setValue(e)}function s(t){var e=c-t.clientY;l.setValue(l.getValue()+e*l.__impliedStep),c=t.clientY}function d(){r.unbind(window,'mousemove',s),r.unbind(window,'mouseup',d)}this.__truncationSuspended=!1,n.superclass.call(this,e,t,a);var l=this,c;this.__input=document.createElement('input'),this.__input.setAttribute('type','text'),r.bind(this.__input,'change',o),r.bind(this.__input,'blur',function(){o(),l.__onFinishChange&&l.__onFinishChange.call(l,l.getValue())}),r.bind(this.__input,'mousedown',function(t){r.bind(window,'mousemove',s),r.bind(window,'mouseup',d),c=t.clientY}),r.bind(this.__input,'keydown',function(t){13===t.keyCode&&(l.__truncationSuspended=!0,this.blur(),l.__truncationSuspended=!1)}),this.updateDisplay(),this.domElement.appendChild(this.__input)};return n.superclass=e,i.extend(n.prototype,e.prototype,{updateDisplay:function(){return this.__input.value=this.__truncationSuspended?this.getValue():o(this.getValue(),this.__precision),n.superclass.prototype.updateDisplay.call(this)}}),n}(i.controllers.NumberController,i.dom.dom,i.utils.common),i.controllers.NumberControllerSlider=function(e,t,r,a,i){function o(e,t,r,a,i){return a+(i-a)*((e-t)/(r-t))}var n=function(e,r,a,i,s){function d(r){r.preventDefault();var e=t.getOffset(c.__background),a=t.getWidth(c.__background);return c.setValue(o(r.clientX,e.left,e.left+a,c.__min,c.__max)),!1}function l(){t.unbind(window,'mousemove',d),t.unbind(window,'mouseup',l),c.__onFinishChange&&c.__onFinishChange.call(c,c.getValue())}n.superclass.call(this,e,r,{min:a,max:i,step:s});var c=this;this.__background=document.createElement('div'),this.__foreground=document.createElement('div'),t.bind(this.__background,'mousedown',function(r){t.bind(window,'mousemove',d),t.bind(window,'mouseup',l),d(r)}),t.addClass(this.__background,'slider'),t.addClass(this.__foreground,'slider-fg'),this.updateDisplay(),this.__background.appendChild(this.__foreground),this.domElement.appendChild(this.__background)};return n.superclass=e,n.useDefaultStyles=function(){r.inject(i)},a.extend(n.prototype,e.prototype,{updateDisplay:function(){var e=(this.getValue()-this.__min)/(this.__max-this.__min);return this.__foreground.style.width=100*e+'%',n.superclass.prototype.updateDisplay.call(this)}}),n}(i.controllers.NumberController,i.dom.dom,i.utils.css,i.utils.common,'.slider {\n  box-shadow: inset 0 2px 4px rgba(0,0,0,0.15);\n  height: 1em;\n  border-radius: 1em;\n  background-color: #eee;\n  padding: 0 0.5em;\n  overflow: hidden;\n}\n\n.slider-fg {\n  padding: 1px 0 2px 0;\n  background-color: #aaa;\n  height: 1em;\n  margin-left: -0.5em;\n  padding-right: 0.5em;\n  border-radius: 1em 0 0 1em;\n}\n\n.slider-fg:after {\n  display: inline-block;\n  border-radius: 1em;\n  background-color: #fff;\n  border:  1px solid #aaa;\n  content: \'\';\n  float: right;\n  margin-right: -1em;\n  margin-top: -1px;\n  height: 0.9em;\n  width: 0.9em;\n}'),i.controllers.FunctionController=function(e,t,r){var a=function(e,r,i){a.superclass.call(this,e,r);var o=this;this.__button=document.createElement('div'),this.__button.innerHTML=void 0===i?'Fire':i,t.bind(this.__button,'click',function(t){return t.preventDefault(),o.fire(),!1}),t.addClass(this.__button,'button'),this.domElement.appendChild(this.__button)};return a.superclass=e,r.extend(a.prototype,e.prototype,{fire:function(){this.__onChange&&this.__onChange.call(this),this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue()),this.getValue().call(this.object)}}),a}(i.controllers.Controller,i.dom.dom,i.utils.common),i.controllers.BooleanController=function(e,t,r){var a=function(e,r){a.superclass.call(this,e,r);var i=this;this.__prev=this.getValue(),this.__checkbox=document.createElement('input'),this.__checkbox.setAttribute('type','checkbox'),t.bind(this.__checkbox,'change',function(){i.setValue(!i.__prev)},!1),this.domElement.appendChild(this.__checkbox),this.updateDisplay()};return a.superclass=e,r.extend(a.prototype,e.prototype,{setValue:function(e){var t=a.superclass.prototype.setValue.call(this,e);return this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue()),this.__prev=this.getValue(),t},updateDisplay:function(){return!0===this.getValue()?(this.__checkbox.setAttribute('checked','checked'),this.__checkbox.checked=!0):this.__checkbox.checked=!1,a.superclass.prototype.updateDisplay.call(this)}}),a}(i.controllers.Controller,i.dom.dom,i.utils.common),i.color.toString=function(e){return function(r){if(1==r.a||e.isUndefined(r.a)){for(var a=r.hex.toString(16);6>a.length;)a='0'+a;return'#'+a}return'rgba('+t(r.r)+','+t(r.g)+','+t(r.b)+','+r.a+')'}}(i.utils.common),i.color.interpret=function(e,t){var r=[{litmus:t.isString,conversions:{THREE_CHAR_HEX:{read:function(e){var t=e.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);return null!==t&&{space:'HEX',hex:parseInt('0x'+t[1].toString()+t[1].toString()+t[2].toString()+t[2].toString()+t[3].toString()+t[3].toString())}},write:e},SIX_CHAR_HEX:{read:function(e){var t=e.match(/^#([A-F0-9]{6})$/i);return null!==t&&{space:'HEX',hex:parseInt('0x'+t[1].toString())}},write:e},CSS_RGB:{read:function(e){var t=e.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);return null!==t&&{space:'RGB',r:parseFloat(t[1]),g:parseFloat(t[2]),b:parseFloat(t[3])}},write:e},CSS_RGBA:{read:function(e){var t=e.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\,\s*(.+)\s*\)/);return null!==t&&{space:'RGB',r:parseFloat(t[1]),g:parseFloat(t[2]),b:parseFloat(t[3]),a:parseFloat(t[4])}},write:e}}},{litmus:t.isNumber,conversions:{HEX:{read:function(e){return{space:'HEX',hex:e,conversionName:'HEX'}},write:function(e){return e.hex}}}},{litmus:t.isArray,conversions:{RGB_ARRAY:{read:function(e){return!(3!=e.length)&&{space:'RGB',r:e[0],g:e[1],b:e[2]}},write:function(e){return[e.r,e.g,e.b]}},RGBA_ARRAY:{read:function(e){return!(4!=e.length)&&{space:'RGB',r:e[0],g:e[1],b:e[2],a:e[3]}},write:function(e){return[e.r,e.g,e.b,e.a]}}}},{litmus:t.isObject,conversions:{RGBA_OBJ:{read:function(e){return t.isNumber(e.r)&&t.isNumber(e.g)&&t.isNumber(e.b)&&t.isNumber(e.a)&&{space:'RGB',r:e.r,g:e.g,b:e.b,a:e.a}},write:function(e){return{r:e.r,g:e.g,b:e.b,a:e.a}}},RGB_OBJ:{read:function(e){return t.isNumber(e.r)&&t.isNumber(e.g)&&t.isNumber(e.b)&&{space:'RGB',r:e.r,g:e.g,b:e.b}},write:function(e){return{r:e.r,g:e.g,b:e.b}}},HSVA_OBJ:{read:function(e){return t.isNumber(e.h)&&t.isNumber(e.s)&&t.isNumber(e.v)&&t.isNumber(e.a)&&{space:'HSV',h:e.h,s:e.s,v:e.v,a:e.a}},write:function(e){return{h:e.h,s:e.s,v:e.v,a:e.a}}},HSV_OBJ:{read:function(e){return t.isNumber(e.h)&&t.isNumber(e.s)&&t.isNumber(e.v)&&{space:'HSV',h:e.h,s:e.s,v:e.v}},write:function(e){return{h:e.h,s:e.s,v:e.v}}}}}],a,i;return function(){i=!1;var e=1<arguments.length?t.toArray(arguments):arguments[0];return t.each(r,function(r){if(r.litmus(e))return t.each(r.conversions,function(r,o){if(a=r.read(e),!1===i&&!1!==a)return i=a,a.conversionName=o,a.conversion=r,t.BREAK}),t.BREAK}),i}}(i.color.toString,i.utils.common),i.GUI=i.gui.GUI=function(e,t,r,a,i,o,n,s,d,l,c,u,p,m,_){function f(e,t,r,o){if(void 0===t[r])throw new Error('Object '+t+' has no property "'+r+'"');var n;if(o.color)n=new c(t,r);else{var s=[t,r].concat(o.factoryArgs);n=a.apply(e,s)}o.before instanceof i&&(o.before=o.before.__li),b(e,n),m.addClass(n.domElement,'c');var d=document.createElement('span');m.addClass(d,'property-name'),d.innerHTML=n.property;var l=document.createElement('div');l.appendChild(d),l.appendChild(n.domElement);var u=g(e,l,o.before);return m.addClass(u,U.CLASS_CONTROLLER_ROW),m.addClass(u,typeof n.getValue()),h(e,u,n),e.__controllers.push(n),n}function g(e,t,r){var a=document.createElement('li');return t&&a.appendChild(t),r?e.__ul.insertBefore(a,params.before):e.__ul.appendChild(a),e.onResize(),a}function h(e,t,a){if(a.__li=t,a.__gui=e,_.extend(a,{options:function(t){return 1<arguments.length?(a.remove(),f(e,a.object,a.property,{before:a.__li.nextElementSibling,factoryArgs:[_.toArray(arguments)]})):_.isArray(t)||_.isObject(t)?(a.remove(),f(e,a.object,a.property,{before:a.__li.nextElementSibling,factoryArgs:[t]})):void 0},name:function(e){return a.__li.firstElementChild.firstElementChild.innerHTML=e,a},listen:function(){return a.__gui.listen(a),a},remove:function(){return a.__gui.remove(a),a}}),a instanceof d){var i=new s(a.object,a.property,{min:a.__min,max:a.__max,step:a.__step});_.each(['updateDisplay','onChange','onFinishChange'],function(e){var t=a[e],r=i[e];a[e]=i[e]=function(){var e=Array.prototype.slice.call(arguments);return t.apply(a,e),r.apply(i,e)}}),m.addClass(t,'has-slider'),a.domElement.insertBefore(i.domElement,a.domElement.firstElementChild)}else if(a instanceof s){var l=function(t){return _.isNumber(a.__min)&&_.isNumber(a.__max)?(a.remove(),f(e,a.object,a.property,{before:a.__li.nextElementSibling,factoryArgs:[a.__min,a.__max,a.__step]})):t};a.min=_.compose(l,a.min),a.max=_.compose(l,a.max)}else a instanceof o?(m.bind(t,'click',function(){m.fakeEvent(a.__checkbox,'click')}),m.bind(a.__checkbox,'click',function(t){t.stopPropagation()})):a instanceof n?(m.bind(t,'click',function(){m.fakeEvent(a.__button,'click')}),m.bind(t,'mouseover',function(){m.addClass(a.__button,'hover')}),m.bind(t,'mouseout',function(){m.removeClass(a.__button,'hover')})):a instanceof c&&(m.addClass(t,'color'),a.updateDisplay=_.compose(function(e){return t.style.borderLeftColor=a.__color.toString(),e},a.updateDisplay),a.updateDisplay());a.setValue=_.compose(function(t){return e.getRoot().__preset_select&&a.isModified()&&S(e.getRoot(),!0),t},a.setValue)}function b(e,t){var r=e.getRoot(),a=r.__rememberedObjects.indexOf(t.object);if(-1!=a){var i=r.__rememberedObjectIndecesToControllers[a];if(void 0===i&&(i={},r.__rememberedObjectIndecesToControllers[a]=i),i[t.property]=t,r.load&&r.load.remembered){var o=r.load.remembered,n;if(o[e.preset])n=o[e.preset];else if(o[I])n=o[I];else return;if(n[a]&&void 0!==n[a][t.property]){var s=n[a][t.property];t.initialValue=s,t.setValue(s)}}}}function x(e,t){return document.location.href+'.'+t}function v(e){var t=e.__save_row=document.createElement('li');m.addClass(e.domElement,'has-save'),e.__ul.insertBefore(t,e.__ul.firstChild),m.addClass(t,'save-row');var r=document.createElement('span');r.innerHTML='&nbsp;',m.addClass(r,'button gears');var a=document.createElement('span');a.innerHTML='Save',m.addClass(a,'button'),m.addClass(a,'save');var i=document.createElement('span');i.innerHTML='New',m.addClass(i,'button'),m.addClass(i,'save-as');var o=document.createElement('span');o.innerHTML='Revert',m.addClass(o,'button'),m.addClass(o,'revert');var n=e.__preset_select=document.createElement('select');if(e.load&&e.load.remembered?_.each(e.load.remembered,function(t,r){A(e,r,r==e.preset)}):A(e,I,!1),m.bind(n,'change',function(){for(var t=0;t<e.__preset_select.length;t++)e.__preset_select[t].innerHTML=e.__preset_select[t].value;e.preset=this.value}),t.appendChild(n),t.appendChild(r),t.appendChild(a),t.appendChild(i),t.appendChild(o),O){function t(){d.style.display=e.useLocalStorage?'block':'none'}var s=document.getElementById('dg-save-locally'),d=document.getElementById('dg-local-explain');s.style.display='block';var l=document.getElementById('dg-local-storage');'true'===localStorage.getItem(x(e,'isLocal'))&&l.setAttribute('checked','checked'),t(),m.bind(l,'change',function(){e.useLocalStorage=!e.useLocalStorage,t()})}var c=document.getElementById('dg-new-constructor');m.bind(c,'keydown',function(t){t.metaKey&&(67===t.which||67==t.keyCode)&&D.hide()}),m.bind(r,'click',function(){c.innerHTML=JSON.stringify(e.getSaveObject(),void 0,2),D.show(),c.focus(),c.select()}),m.bind(a,'click',function(){e.save()}),m.bind(i,'click',function(){var t=prompt('Enter a new preset name.');t&&e.saveAs(t)}),m.bind(o,'click',function(){e.revert()})}function E(t){function e(o){return o.preventDefault(),i=o.clientX,m.addClass(t.__closeButton,U.CLASS_DRAG),m.bind(window,'mousemove',r),m.bind(window,'mouseup',a),!1}function r(r){return r.preventDefault(),t.width+=i-r.clientX,t.onResize(),i=r.clientX,!1}function a(){m.removeClass(t.__closeButton,U.CLASS_DRAG),m.unbind(window,'mousemove',r),m.unbind(window,'mouseup',a)}t.__resize_handle=document.createElement('div'),_.extend(t.__resize_handle.style,{width:'6px',marginLeft:'-3px',height:'200px',cursor:'ew-resize',position:'absolute'});var i;m.bind(t.__resize_handle,'mousedown',e),m.bind(t.__closeButton,'mousedown',e),t.domElement.insertBefore(t.__resize_handle,t.domElement.firstElementChild)}function y(e,t){e.domElement.style.width=t+'px',e.__save_row&&e.autoPlace&&(e.__save_row.style.width=t+'px'),e.__closeButton&&(e.__closeButton.style.width=t+'px')}function T(e,t){var r={};return _.each(e.__rememberedObjects,function(a,i){var o={},n=e.__rememberedObjectIndecesToControllers[i];_.each(n,function(e,r){o[r]=t?e.initialValue:e.getValue()}),r[i]=o}),r}function A(e,t,r){var a=document.createElement('option');a.innerHTML=t,a.value=t,e.__preset_select.appendChild(a),r&&(e.__preset_select.selectedIndex=e.__preset_select.length-1)}function R(e){for(var t=0;t<e.__preset_select.length;t++)e.__preset_select[t].value==e.preset&&(e.__preset_select.selectedIndex=t)}function S(e,t){var r=e.__preset_select[e.__preset_select.selectedIndex];r.innerHTML=t?r.value+'*':r.value}function w(e){0!=e.length&&u(function(){w(e)}),_.each(e,function(e){e.updateDisplay()})}e.inject(r);var C='dg',L=72,N=20,I='Default',O=function(){try{return'localStorage'in window&&null!==window.localStorage}catch(t){return!1}}(),P=!0,k=!1,M=[],U=function(e){function t(){localStorage.setItem(x(r,'gui'),JSON.stringify(r.getSaveObject()))}var r=this;this.domElement=document.createElement('div'),this.__ul=document.createElement('ul'),this.domElement.appendChild(this.__ul),m.addClass(this.domElement,C),this.__folders={},this.__controllers=[],this.__rememberedObjects=[],this.__rememberedObjectIndecesToControllers=[],this.__listening=[],e=e||{},e=_.defaults(e,{autoPlace:!0,width:U.DEFAULT_WIDTH}),e=_.defaults(e,{resizable:e.autoPlace,hideable:e.autoPlace}),_.isUndefined(e.load)?e.load={preset:I}:e.preset&&(e.load.preset=e.preset),_.isUndefined(e.parent)&&e.hideable&&M.push(this),e.resizable=_.isUndefined(e.parent)&&e.resizable,e.autoPlace&&_.isUndefined(e.scrollable)&&(e.scrollable=!0);var a=O&&'true'===localStorage.getItem(x(this,'isLocal'));if(Object.defineProperties(this,{parent:{get:function(){return e.parent}},scrollable:{get:function(){return e.scrollable}},autoPlace:{get:function(){return e.autoPlace}},preset:{get:function(){return r.parent?r.getRoot().preset:e.load.preset},set:function(t){r.parent?r.getRoot().preset=t:e.load.preset=t,R(this),r.revert()}},width:{get:function(){return e.width},set:function(t){e.width=t,y(r,t)}},name:{get:function(){return e.name},set:function(t){e.name=t,o&&(o.innerHTML=e.name)}},closed:{get:function(){return e.closed},set:function(t){e.closed=t,e.closed?m.addClass(r.__ul,U.CLASS_CLOSED):m.removeClass(r.__ul,U.CLASS_CLOSED),this.onResize(),r.__closeButton&&(r.__closeButton.innerHTML=t?U.TEXT_OPEN:U.TEXT_CLOSED)}},load:{get:function(){return e.load}},useLocalStorage:{get:function(){return a},set:function(e){O&&(a=e,e?m.bind(window,'unload',t):m.unbind(window,'unload',t),localStorage.setItem(x(r,'isLocal'),e))}}}),_.isUndefined(e.parent)){if(e.closed=!1,m.addClass(this.domElement,U.CLASS_MAIN),m.makeSelectable(this.domElement,!1),O&&a){r.useLocalStorage=!0;var i=localStorage.getItem(x(this,'gui'));i&&(e.load=JSON.parse(i))}this.__closeButton=document.createElement('div'),this.__closeButton.innerHTML=U.TEXT_CLOSED,m.addClass(this.__closeButton,U.CLASS_CLOSE_BUTTON),this.domElement.appendChild(this.__closeButton),m.bind(this.__closeButton,'click',function(){r.closed=!r.closed})}else{void 0===e.closed&&(e.closed=!0);var o=document.createTextNode(e.name);m.addClass(o,'controller-name');var n=g(r,o),s=function(t){return t.preventDefault(),r.closed=!r.closed,!1};m.addClass(this.__ul,U.CLASS_CLOSED),m.addClass(n,'title'),m.bind(n,'click',s),e.closed||(this.closed=!1)}e.autoPlace&&(_.isUndefined(e.parent)&&(P&&(B=document.createElement('div'),m.addClass(B,C),m.addClass(B,U.CLASS_AUTO_PLACE_CONTAINER),document.body.appendChild(B),P=!1),B.appendChild(this.domElement),m.addClass(this.domElement,U.CLASS_AUTO_PLACE)),!this.parent&&y(r,e.width)),m.bind(window,'resize',function(){r.onResize()}),m.bind(this.__ul,'webkitTransitionEnd',function(){r.onResize()}),m.bind(this.__ul,'transitionend',function(){r.onResize()}),m.bind(this.__ul,'oTransitionEnd',function(){r.onResize()}),this.onResize(),e.resizable&&E(this);r.getRoot();e.parent||function(){var e=r.getRoot();e.width+=1,_.defer(function(){e.width-=1})}()},D,B;return U.toggleHide=function(){k=!k,_.each(M,function(e){e.domElement.style.zIndex=k?-999:999,e.domElement.style.opacity=k?0:1})},U.CLASS_AUTO_PLACE='a',U.CLASS_AUTO_PLACE_CONTAINER='ac',U.CLASS_MAIN='main',U.CLASS_CONTROLLER_ROW='cr',U.CLASS_TOO_TALL='taller-than-window',U.CLASS_CLOSED='closed',U.CLASS_CLOSE_BUTTON='close-button',U.CLASS_DRAG='drag',U.DEFAULT_WIDTH=245,U.TEXT_CLOSED='Close Controls',U.TEXT_OPEN='Open Controls',m.bind(window,'keydown',function(t){'text'!==document.activeElement.type&&(t.which===L||t.keyCode==L)&&U.toggleHide()},!1),_.extend(U.prototype,{add:function(e,t){return f(this,e,t,{factoryArgs:Array.prototype.slice.call(arguments,2)})},addColor:function(e,t){return f(this,e,t,{color:!0})},remove:function(e){this.__ul.removeChild(e.__li),this.__controllers.slice(this.__controllers.indexOf(e),1);var t=this;_.defer(function(){t.onResize()})},destroy:function(){this.autoPlace&&B.removeChild(this.domElement)},addFolder:function(e){if(void 0!==this.__folders[e])throw new Error('You already have a folder in this GUI by the name "'+e+'"');var t={name:e,parent:this};t.autoPlace=this.autoPlace,this.load&&this.load.folders&&this.load.folders[e]&&(t.closed=this.load.folders[e].closed,t.load=this.load.folders[e]);var r=new U(t);this.__folders[e]=r;var a=g(this,r.domElement);return m.addClass(a,'folder'),r},open:function(){this.closed=!1},close:function(){this.closed=!0},onResize:function(){var e=this.getRoot();if(e.scrollable){var t=m.getOffset(e.__ul).top,r=0;_.each(e.__ul.childNodes,function(t){e.autoPlace&&t===e.__save_row||(r+=m.getHeight(t))}),window.innerHeight-t-N<r?(m.addClass(e.domElement,U.CLASS_TOO_TALL),e.__ul.style.height=window.innerHeight-t-N+'px'):(m.removeClass(e.domElement,U.CLASS_TOO_TALL),e.__ul.style.height='auto')}e.__resize_handle&&_.defer(function(){e.__resize_handle.style.height=e.__ul.offsetHeight+'px'}),e.__closeButton&&(e.__closeButton.style.width=e.width+'px')},remember:function(){if(_.isUndefined(D)&&(D=new p,D.domElement.innerHTML=t),this.parent)throw new Error('You can only call remember on a top level GUI.');var e=this;_.each(Array.prototype.slice.call(arguments),function(t){0==e.__rememberedObjects.length&&v(e),-1==e.__rememberedObjects.indexOf(t)&&e.__rememberedObjects.push(t)}),this.autoPlace&&y(this,this.width)},getRoot:function(){for(var e=this;e.parent;)e=e.parent;return e},getSaveObject:function(){var e=this.load;return e.closed=this.closed,0<this.__rememberedObjects.length&&(e.preset=this.preset,!e.remembered&&(e.remembered={}),e.remembered[this.preset]=T(this)),e.folders={},_.each(this.__folders,function(t,r){e.folders[r]=t.getSaveObject()}),e},save:function(){this.load.remembered||(this.load.remembered={}),this.load.remembered[this.preset]=T(this),S(this,!1)},saveAs:function(e){this.load.remembered||(this.load.remembered={},this.load.remembered[I]=T(this,!0)),this.load.remembered[e]=T(this),this.preset=e,A(this,e,!0)},revert:function(e){_.each(this.__controllers,function(t){this.getRoot().load.remembered?b(e||this.getRoot(),t):t.setValue(t.initialValue)},this),_.each(this.__folders,function(e){e.revert(e)}),e||S(this.getRoot(),!1)},listen:function(e){var t=0==this.__listening.length;this.__listening.push(e),t&&w(this.__listening)}}),U}(i.utils.css,'<div id="dg-save" class="dg dialogue">\n\n  Here\'s the new load parameter for your <code>GUI</code>\'s constructor:\n\n  <textarea id="dg-new-constructor"></textarea>\n\n  <div id="dg-save-locally">\n\n    <input id="dg-local-storage" type="checkbox"/> Automatically save\n    values to <code>localStorage</code> on exit.\n\n    <div id="dg-local-explain">The values saved to <code>localStorage</code> will\n      override those passed to <code>dat.GUI</code>\'s constructor. This makes it\n      easier to work incrementally, but <code>localStorage</code> is fragile,\n      and your friends may not see the same values you do.\n      \n    </div>\n    \n  </div>\n\n</div>','.dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity 0.1s linear;-o-transition:opacity 0.1s linear;-moz-transition:opacity 0.1s linear;transition:opacity 0.1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity 0.1s linear;-o-transition:opacity 0.1s linear;-moz-transition:opacity 0.1s linear;transition:opacity 0.1s linear;border:0;position:absolute;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-x:hidden}.dg.a.has-save ul{margin-top:27px}.dg.a.has-save ul.closed{margin-top:0}.dg.a .save-row{position:fixed;top:0;z-index:1002}.dg li{-webkit-transition:height 0.1s ease-out;-o-transition:height 0.1s ease-out;-moz-transition:height 0.1s ease-out;transition:height 0.1s ease-out}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;overflow:hidden;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li > *{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .c{float:left;width:60%}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:9px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px \'Lucida Grande\', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2fa1d6}.dg .cr.number input[type=text]{color:#2fa1d6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2fa1d6}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}\n',i.controllers.factory=function(e,t,r,a,i,o,n){return function(s,d){var l=s[d];return n.isArray(arguments[2])||n.isObject(arguments[2])?new e(s,d,arguments[2]):n.isNumber(l)?n.isNumber(arguments[2])&&n.isNumber(arguments[3])?new r(s,d,arguments[2],arguments[3]):new t(s,d,{min:arguments[2],max:arguments[3]}):n.isString(l)?new a(s,d):n.isFunction(l)?new i(s,d,''):n.isBoolean(l)?new o(s,d):void 0}}(i.controllers.OptionController,i.controllers.NumberControllerBox,i.controllers.NumberControllerSlider,i.controllers.StringController=function(e,t,r){var a=function(e,r){function i(){o.setValue(o.__input.value)}a.superclass.call(this,e,r);var o=this;this.__input=document.createElement('input'),this.__input.setAttribute('type','text'),t.bind(this.__input,'keyup',i),t.bind(this.__input,'change',i),t.bind(this.__input,'blur',function(){o.__onFinishChange&&o.__onFinishChange.call(o,o.getValue())}),t.bind(this.__input,'keydown',function(t){13===t.keyCode&&this.blur()}),this.updateDisplay(),this.domElement.appendChild(this.__input)};return a.superclass=e,r.extend(a.prototype,e.prototype,{updateDisplay:function(){return t.isActive(this.__input)||(this.__input.value=this.getValue()),a.superclass.prototype.updateDisplay.call(this)}}),a}(i.controllers.Controller,i.dom.dom,i.utils.common),i.controllers.FunctionController,i.controllers.BooleanController,i.utils.common),i.controllers.Controller,i.controllers.BooleanController,i.controllers.FunctionController,i.controllers.NumberControllerBox,i.controllers.NumberControllerSlider,i.controllers.OptionController,i.controllers.ColorController=function(e,t,r,a,o){function n(e,t,r,a){e.style.background='',o.each(d,function(i){e.style.cssText+='background: '+i+'linear-gradient('+t+', '+r+' 0%, '+a+' 100%); '})}function i(e){e.style.background='',e.style.cssText+='background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);',e.style.cssText+='background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);',e.style.cssText+='background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);',e.style.cssText+='background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);',e.style.cssText+='background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);'}var s=function(e,d){function l(r){m(r),t.bind(window,'mousemove',m),t.bind(window,'mouseup',c)}function c(){t.unbind(window,'mousemove',m),t.unbind(window,'mouseup',c)}function u(){var e=a(this.value);!1===e?this.value=f.__color.toString():(f.__color.__state=e,f.setValue(f.__color.toOriginal()))}function p(){t.unbind(window,'mousemove',_),t.unbind(window,'mouseup',p)}function m(r){r.preventDefault();var e=t.getWidth(f.__saturation_field),a=t.getOffset(f.__saturation_field),i=(r.clientX-a.left+document.body.scrollLeft)/e,o=1-(r.clientY-a.top+document.body.scrollTop)/e;return 1<o?o=1:0>o&&(o=0),1<i?i=1:0>i&&(i=0),f.__color.v=o,f.__color.s=i,f.setValue(f.__color.toOriginal()),!1}function _(r){r.preventDefault();var e=t.getHeight(f.__hue_field),a=t.getOffset(f.__hue_field),i=1-(r.clientY-a.top+document.body.scrollTop)/e;return 1<i?i=1:0>i&&(i=0),f.__color.h=360*i,f.setValue(f.__color.toOriginal()),!1}s.superclass.call(this,e,d),this.__color=new r(this.getValue()),this.__temp=new r(0);var f=this;this.domElement=document.createElement('div'),t.makeSelectable(this.domElement,!1),this.__selector=document.createElement('div'),this.__selector.className='selector',this.__saturation_field=document.createElement('div'),this.__saturation_field.className='saturation-field',this.__field_knob=document.createElement('div'),this.__field_knob.className='field-knob',this.__field_knob_border='2px solid ',this.__hue_knob=document.createElement('div'),this.__hue_knob.className='hue-knob',this.__hue_field=document.createElement('div'),this.__hue_field.className='hue-field',this.__input=document.createElement('input'),this.__input.type='text',this.__input_textShadow='0 1px 1px ',t.bind(this.__input,'keydown',function(t){13===t.keyCode&&u.call(this)}),t.bind(this.__input,'blur',u),t.bind(this.__selector,'mousedown',function(){t.addClass(this,'drag').bind(window,'mouseup',function(){t.removeClass(f.__selector,'drag')})});var g=document.createElement('div');o.extend(this.__selector.style,{width:'122px',height:'102px',padding:'3px',backgroundColor:'#222',boxShadow:'0px 1px 3px rgba(0,0,0,0.3)'}),o.extend(this.__field_knob.style,{position:'absolute',width:'12px',height:'12px',border:this.__field_knob_border+(.5>this.__color.v?'#fff':'#000'),boxShadow:'0px 1px 3px rgba(0,0,0,0.5)',borderRadius:'12px',zIndex:1}),o.extend(this.__hue_knob.style,{position:'absolute',width:'15px',height:'2px',borderRight:'4px solid #fff',zIndex:1}),o.extend(this.__saturation_field.style,{width:'100px',height:'100px',border:'1px solid #555',marginRight:'3px',display:'inline-block',cursor:'pointer'}),o.extend(g.style,{width:'100%',height:'100%',background:'none'}),n(g,'top','rgba(0,0,0,0)','#000'),o.extend(this.__hue_field.style,{width:'15px',height:'100px',display:'inline-block',border:'1px solid #555',cursor:'ns-resize'}),i(this.__hue_field),o.extend(this.__input.style,{outline:'none',textAlign:'center',color:'#fff',border:0,fontWeight:'bold',textShadow:this.__input_textShadow+'rgba(0,0,0,0.7)'}),t.bind(this.__saturation_field,'mousedown',l),t.bind(this.__field_knob,'mousedown',l),t.bind(this.__hue_field,'mousedown',function(r){_(r),t.bind(window,'mousemove',_),t.bind(window,'mouseup',p)}),this.__saturation_field.appendChild(g),this.__selector.appendChild(this.__field_knob),this.__selector.appendChild(this.__saturation_field),this.__selector.appendChild(this.__hue_field),this.__hue_field.appendChild(this.__hue_knob),this.domElement.appendChild(this.__input),this.domElement.appendChild(this.__selector),this.updateDisplay()};s.superclass=e,o.extend(s.prototype,e.prototype,{updateDisplay:function(){var e=a(this.getValue());if(!1!==e){var t=!1;o.each(r.COMPONENTS,function(r){if(!o.isUndefined(e[r])&&!o.isUndefined(this.__color.__state[r])&&e[r]!==this.__color.__state[r])return t=!0,{}},this),t&&o.extend(this.__color.__state,e)}o.extend(this.__temp.__state,this.__color.__state),this.__temp.a=1;var i=.5>this.__color.v||.5<this.__color.s?255:0,s=255-i;o.extend(this.__field_knob.style,{marginLeft:100*this.__color.s-7+'px',marginTop:100*(1-this.__color.v)-7+'px',backgroundColor:this.__temp.toString(),border:this.__field_knob_border+'rgb('+i+','+i+','+i+')'}),this.__hue_knob.style.marginTop=100*(1-this.__color.h/360)+'px',this.__temp.s=1,this.__temp.v=1,n(this.__saturation_field,'left','#fff',this.__temp.toString()),o.extend(this.__input.style,{backgroundColor:this.__input.value=this.__color.toString(),color:'rgb('+i+','+i+','+i+')',textShadow:this.__input_textShadow+'rgba('+s+','+s+','+s+',.7)'})}});var d=['-moz-','-o-','-webkit-','-ms-',''];return s}(i.controllers.Controller,i.dom.dom,i.color.Color=function(e,t,r,a){function i(e,t,r){Object.defineProperty(e,t,{get:function(){return'RGB'===this.__state.space?this.__state[t]:(n(this,t,r),this.__state[t])},set:function(e){'RGB'!==this.__state.space&&(n(this,t,r),this.__state.space='RGB'),this.__state[t]=e}})}function o(e,t){Object.defineProperty(e,t,{get:function(){return'HSV'===this.__state.space?this.__state[t]:(s(this),this.__state[t])},set:function(e){'HSV'!==this.__state.space&&(s(this),this.__state.space='HSV'),this.__state[t]=e}})}function n(e,r,i){if('HEX'===e.__state.space)e.__state[r]=t.component_from_hex(e.__state.hex,i);else if('HSV'===e.__state.space)a.extend(e.__state,t.hsv_to_rgb(e.__state.h,e.__state.s,e.__state.v));else throw'Corrupted color state'}function s(e){var r=t.rgb_to_hsv(e.r,e.g,e.b);a.extend(e.__state,{s:r.s,v:r.v}),a.isNaN(r.h)?a.isUndefined(e.__state.h)&&(e.__state.h=0):e.__state.h=r.h}var d=function(){if(this.__state=e.apply(this,arguments),!1===this.__state)throw'Failed to interpret color arguments';this.__state.a=this.__state.a||1};return d.COMPONENTS=['r','g','b','h','s','v','hex','a'],a.extend(d.prototype,{toString:function(){return r(this)},toOriginal:function(){return this.__state.conversion.write(this)}}),i(d.prototype,'r',2),i(d.prototype,'g',1),i(d.prototype,'b',0),o(d.prototype,'h'),o(d.prototype,'s'),o(d.prototype,'v'),Object.defineProperty(d.prototype,'a',{get:function(){return this.__state.a},set:function(e){this.__state.a=e}}),Object.defineProperty(d.prototype,'hex',{get:function(){return'HEX'!==!this.__state.space&&(this.__state.hex=t.rgb_to_hex(this.r,this.g,this.b)),this.__state.hex},set:function(e){this.__state.space='HEX',this.__state.hex=e}}),d}(i.color.interpret,i.color.math=function(){var e;return{hsv_to_rgb:function(e,a,i){var o=r(e/60)%6,n=e/60-r(e/60),s=i*(1-a),d=i*(1-n*a),l=i*(1-(1-n)*a),t=[[i,l,s],[d,i,s],[s,i,l],[s,d,i],[l,s,i],[i,s,d]][o];return{r:255*t[0],g:255*t[1],b:255*t[2]}},rgb_to_hsv:function(e,t,r){var a=Math.min(e,t,r),i=Math.max(e,t,r),o=i-a,n,d;if(0!=i)d=o/i;else return{h:NaN,s:0,v:0};return n=e==i?(t-r)/o:t==i?2+(r-e)/o:4+(e-t)/o,n/=6,0>n&&(n+=1),{h:360*n,s:d,v:i/255}},rgb_to_hex:function(e,t,r){var a=this.hex_with_component(0,2,e);return a=this.hex_with_component(a,1,t),a=this.hex_with_component(a,0,r),a},component_from_hex:function(e,t){return 255&e>>8*t},hex_with_component:function(t,r,a){return a<<(e=8*r)|t&~(255<<e)}}}(),i.color.toString,i.utils.common),i.color.interpret,i.utils.common),i.utils.requestAnimationFrame=function(){return window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}(),i.dom.CenteredDiv=function(e,t){var r=function(){this.backgroundElement=document.createElement('div'),t.extend(this.backgroundElement.style,{backgroundColor:'rgba(0,0,0,0.8)',top:0,left:0,display:'none',zIndex:'1000',opacity:0,WebkitTransition:'opacity 0.2s linear'}),e.makeFullscreen(this.backgroundElement),this.backgroundElement.style.position='fixed',this.domElement=document.createElement('div'),t.extend(this.domElement.style,{position:'fixed',display:'none',zIndex:'1001',opacity:0,WebkitTransition:'-webkit-transform 0.2s ease-out, opacity 0.2s linear'}),document.body.appendChild(this.backgroundElement),document.body.appendChild(this.domElement);var r=this;e.bind(this.backgroundElement,'click',function(){r.hide()})};return r.prototype.show=function(){var e=this;this.backgroundElement.style.display='block',this.domElement.style.display='block',this.domElement.style.opacity=0,this.domElement.style.webkitTransform='scale(1.1)',this.layout(),t.defer(function(){e.backgroundElement.style.opacity=1,e.domElement.style.opacity=1,e.domElement.style.webkitTransform='scale(1)'})},r.prototype.hide=function(){var t=this,r=function(){t.domElement.style.display='none',t.backgroundElement.style.display='none',e.unbind(t.domElement,'webkitTransitionEnd',r),e.unbind(t.domElement,'transitionend',r),e.unbind(t.domElement,'oTransitionEnd',r)};e.bind(this.domElement,'webkitTransitionEnd',r),e.bind(this.domElement,'transitionend',r),e.bind(this.domElement,'oTransitionEnd',r),this.backgroundElement.style.opacity=0,this.domElement.style.opacity=0,this.domElement.style.webkitTransform='scale(1.1)'},r.prototype.layout=function(){this.domElement.style.left=window.innerWidth/2-e.getWidth(this.domElement)/2+'px',this.domElement.style.top=window.innerHeight/2-e.getHeight(this.domElement)/2+'px'},r}(i.dom.dom,i.utils.common),i.dom.dom,i.utils.common)},function(e){var t=Math.round,r=Math.floor,a=e.exports=a||{};a.color=a.color||{},a.utils=a.utils||{},a.utils.common=function(){var e=Array.prototype.forEach,t=Array.prototype.slice;return{BREAK:{},extend:function(e){return this.each(t.call(arguments,1),function(t){for(var r in t)this.isUndefined(t[r])||(e[r]=t[r])},this),e},defaults:function(e){return this.each(t.call(arguments,1),function(t){for(var r in t)this.isUndefined(e[r])&&(e[r]=t[r])},this),e},compose:function(){var e=t.call(arguments);return function(){for(var r=t.call(arguments),a=e.length-1;0<=a;a--)r=[e[a].apply(this,r)];return r[0]}},each:function(t,r,a){if(e&&t.forEach===e)t.forEach(r,a);else if(t.length===t.length+0){for(var i=0,o=t.length;i<o;i++)if(i in t&&r.call(a,t[i],i)===this.BREAK)return;}else for(var i in t)if(r.call(a,t[i],i)===this.BREAK)return},defer:function(e){setTimeout(e,0)},toArray:function(e){return e.toArray?e.toArray():t.call(e)},isUndefined:function(e){return e===void 0},isNull:function(e){return null===e},isNaN:function(e){return e!==e},isArray:Array.isArray||function(e){return e.constructor===Array},isObject:function(e){return e===Object(e)},isNumber:function(e){return e===e+0},isString:function(e){return e===e+''},isBoolean:function(e){return!1===e||!0===e},isFunction:function(e){return'[object Function]'===Object.prototype.toString.call(e)}}}(),a.color.toString=function(e){return function(r){if(1==r.a||e.isUndefined(r.a)){for(var a=r.hex.toString(16);6>a.length;)a='0'+a;return'#'+a}return'rgba('+t(r.r)+','+t(r.g)+','+t(r.b)+','+r.a+')'}}(a.utils.common),a.Color=a.color.Color=function(e,t,r,a){function i(e,t,r){Object.defineProperty(e,t,{get:function(){return'RGB'===this.__state.space?this.__state[t]:(n(this,t,r),this.__state[t])},set:function(e){'RGB'!==this.__state.space&&(n(this,t,r),this.__state.space='RGB'),this.__state[t]=e}})}function o(e,t){Object.defineProperty(e,t,{get:function(){return'HSV'===this.__state.space?this.__state[t]:(s(this),this.__state[t])},set:function(e){'HSV'!==this.__state.space&&(s(this),this.__state.space='HSV'),this.__state[t]=e}})}function n(e,r,i){if('HEX'===e.__state.space)e.__state[r]=t.component_from_hex(e.__state.hex,i);else if('HSV'===e.__state.space)a.extend(e.__state,t.hsv_to_rgb(e.__state.h,e.__state.s,e.__state.v));else throw'Corrupted color state'}function s(e){var r=t.rgb_to_hsv(e.r,e.g,e.b);a.extend(e.__state,{s:r.s,v:r.v}),a.isNaN(r.h)?a.isUndefined(e.__state.h)&&(e.__state.h=0):e.__state.h=r.h}var d=function(){if(this.__state=e.apply(this,arguments),!1===this.__state)throw'Failed to interpret color arguments';this.__state.a=this.__state.a||1};return d.COMPONENTS=['r','g','b','h','s','v','hex','a'],a.extend(d.prototype,{toString:function(){return r(this)},toOriginal:function(){return this.__state.conversion.write(this)}}),i(d.prototype,'r',2),i(d.prototype,'g',1),i(d.prototype,'b',0),o(d.prototype,'h'),o(d.prototype,'s'),o(d.prototype,'v'),Object.defineProperty(d.prototype,'a',{get:function(){return this.__state.a},set:function(e){this.__state.a=e}}),Object.defineProperty(d.prototype,'hex',{get:function(){return'HEX'!==!this.__state.space&&(this.__state.hex=t.rgb_to_hex(this.r,this.g,this.b)),this.__state.hex},set:function(e){this.__state.space='HEX',this.__state.hex=e}}),d}(a.color.interpret=function(e,t){var r=[{litmus:t.isString,conversions:{THREE_CHAR_HEX:{read:function(e){var t=e.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);return null!==t&&{space:'HEX',hex:parseInt('0x'+t[1].toString()+t[1].toString()+t[2].toString()+t[2].toString()+t[3].toString()+t[3].toString())}},write:e},SIX_CHAR_HEX:{read:function(e){var t=e.match(/^#([A-F0-9]{6})$/i);return null!==t&&{space:'HEX',hex:parseInt('0x'+t[1].toString())}},write:e},CSS_RGB:{read:function(e){var t=e.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);return null!==t&&{space:'RGB',r:parseFloat(t[1]),g:parseFloat(t[2]),b:parseFloat(t[3])}},write:e},CSS_RGBA:{read:function(e){var t=e.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\,\s*(.+)\s*\)/);return null!==t&&{space:'RGB',r:parseFloat(t[1]),g:parseFloat(t[2]),b:parseFloat(t[3]),a:parseFloat(t[4])}},write:e}}},{litmus:t.isNumber,conversions:{HEX:{read:function(e){return{space:'HEX',hex:e,conversionName:'HEX'}},write:function(e){return e.hex}}}},{litmus:t.isArray,conversions:{RGB_ARRAY:{read:function(e){return!(3!=e.length)&&{space:'RGB',r:e[0],g:e[1],b:e[2]}},write:function(e){return[e.r,e.g,e.b]}},RGBA_ARRAY:{read:function(e){return!(4!=e.length)&&{space:'RGB',r:e[0],g:e[1],b:e[2],a:e[3]}},write:function(e){return[e.r,e.g,e.b,e.a]}}}},{litmus:t.isObject,conversions:{RGBA_OBJ:{read:function(e){return t.isNumber(e.r)&&t.isNumber(e.g)&&t.isNumber(e.b)&&t.isNumber(e.a)&&{space:'RGB',r:e.r,g:e.g,b:e.b,a:e.a}},write:function(e){return{r:e.r,g:e.g,b:e.b,a:e.a}}},RGB_OBJ:{read:function(e){return t.isNumber(e.r)&&t.isNumber(e.g)&&t.isNumber(e.b)&&{space:'RGB',r:e.r,g:e.g,b:e.b}},write:function(e){return{r:e.r,g:e.g,b:e.b}}},HSVA_OBJ:{read:function(e){return t.isNumber(e.h)&&t.isNumber(e.s)&&t.isNumber(e.v)&&t.isNumber(e.a)&&{space:'HSV',h:e.h,s:e.s,v:e.v,a:e.a}},write:function(e){return{h:e.h,s:e.s,v:e.v,a:e.a}}},HSV_OBJ:{read:function(e){return t.isNumber(e.h)&&t.isNumber(e.s)&&t.isNumber(e.v)&&{space:'HSV',h:e.h,s:e.s,v:e.v}},write:function(e){return{h:e.h,s:e.s,v:e.v}}}}}],a,i;return function(){i=!1;var e=1<arguments.length?t.toArray(arguments):arguments[0];return t.each(r,function(r){if(r.litmus(e))return t.each(r.conversions,function(r,o){if(a=r.read(e),!1===i&&!1!==a)return i=a,a.conversionName=o,a.conversion=r,t.BREAK}),t.BREAK}),i}}(a.color.toString,a.utils.common),a.color.math=function(){var e;return{hsv_to_rgb:function(e,a,i){var o=r(e/60)%6,n=e/60-r(e/60),s=i*(1-a),d=i*(1-n*a),l=i*(1-(1-n)*a),t=[[i,l,s],[d,i,s],[s,i,l],[s,d,i],[l,s,i],[i,s,d]][o];return{r:255*t[0],g:255*t[1],b:255*t[2]}},rgb_to_hsv:function(e,t,r){var a=Math.min(e,t,r),i=Math.max(e,t,r),o=i-a,n,d;if(0!=i)d=o/i;else return{h:NaN,s:0,v:0};return n=e==i?(t-r)/o:t==i?2+(r-e)/o:4+(e-t)/o,n/=6,0>n&&(n+=1),{h:360*n,s:d,v:i/255}},rgb_to_hex:function(e,t,r){var a=this.hex_with_component(0,2,e);return a=this.hex_with_component(a,1,t),a=this.hex_with_component(a,0,r),a},component_from_hex:function(e,t){return 255&e>>8*t},hex_with_component:function(t,r,a){return a<<(e=8*r)|t&~(255<<e)}}}(),a.color.toString,a.utils.common)},function(e,t,r){'use strict';function a(e){switch(e.arrayFormat){case'index':return function(t,r,a){return null===r?[o(t,e),'[',a,']'].join(''):[o(t,e),'[',o(a,e),']=',o(r,e)].join('')};case'bracket':return function(t,r){return null===r?o(t,e):[o(t,e),'[]=',o(r,e)].join('')};default:return function(t,r){return null===r?o(t,e):[o(t,e),'=',o(r,e)].join('')};}}function i(e){var t;switch(e.arrayFormat){case'index':return function(e,r,a){return t=/\[(\d*)\]$/.exec(e),e=e.replace(/\[\d*\]$/,''),t?void(void 0===a[e]&&(a[e]={}),a[e][t[1]]=r):void(a[e]=r)};case'bracket':return function(e,r,a){return(t=/(\[\])$/.exec(e),e=e.replace(/\[\]$/,''),!t)?void(a[e]=r):void 0===a[e]?void(a[e]=[r]):void(a[e]=[].concat(a[e],r))};default:return function(e,t,r){return void 0===r[e]?void(r[e]=t):void(r[e]=[].concat(r[e],t))};}}function o(e,t){return t.encode?t.strict?s(e):encodeURIComponent(e):e}function n(e){if(Array.isArray(e))return e.sort();return'object'==typeof e?n(Object.keys(e)).sort(function(e,t){return+e-+t}).map(function(t){return e[t]}):e}var s=r(106),d=r(107),l=r(108);t.extract=function(e){return e.split('?')[1]||''},t.parse=function(e,t){t=d({arrayFormat:'none'},t);var r=i(t),a=Object.create(null);return'string'==typeof e?(e=e.trim().replace(/^(\?|#|&)/,''),!e)?a:(e.split('&').forEach(function(e){var t=e.replace(/\+/g,' ').split('='),i=t.shift(),o=0<t.length?t.join('='):void 0;o=void 0===o?null:l(o),r(l(i),o,a)}),Object.keys(a).sort().reduce(function(e,t){var r=a[t];return e[t]=!r||'object'!=typeof r||Array.isArray(r)?r:n(r),e},Object.create(null))):a},t.stringify=function(e,t){t=d({encode:!0,strict:!0,arrayFormat:'none'},t);var r=a(t);return e?Object.keys(e).sort().map(function(a){var i=e[a];if(i===void 0)return'';if(null===i)return o(a,t);if(Array.isArray(i)){var n=[];return i.slice().forEach(function(e){void 0===e||n.push(r(a,e,n.length))}),n.join('&')}return o(a,t)+'='+o(i,t)}).filter(function(e){return 0<e.length}).join('&'):''}},function(e){'use strict';e.exports=function(e){return encodeURIComponent(e).replace(/[!'()*]/g,function(e){return'%'+e.charCodeAt(0).toString(16).toUpperCase()})}},function(e){'use strict';/*
object-assign
(c) Sindre Sorhus
@license MIT
*/function t(e){if(null===e||e===void 0)throw new TypeError('Object.assign cannot be called with null or undefined');return Object(e)}var r=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable;e.exports=function(){try{if(!Object.assign)return!1;var e=new String('abc');if(e[5]='de','5'===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},r=0;10>r;r++)t['_'+String.fromCharCode(r)]=r;var a=Object.getOwnPropertyNames(t).map(function(e){return t[e]});if('0123456789'!==a.join(''))return!1;var i={};return['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t'].forEach(function(e){i[e]=e}),'abcdefghijklmnopqrst'===Object.keys(Object.assign({},i)).join('')}catch(e){return!1}}()?Object.assign:function(e){for(var n=t(e),d=1,s,l;d<arguments.length;d++){for(var c in s=Object(arguments[d]),s)a.call(s,c)&&(n[c]=s[c]);if(r){l=r(s);for(var u=0;u<l.length;u++)o.call(s,l[u])&&(n[l[u]]=s[l[u]])}}return n}},function(e){'use strict';function t(e,r){try{return decodeURIComponent(e.join(''))}catch(e){}if(1===e.length)return e;r=r||1;var a=e.slice(0,r),i=e.slice(r);return Array.prototype.concat.call([],t(a),t(i))}function r(e){try{return decodeURIComponent(e)}catch(i){for(var r=e.match(o),a=1;a<r.length;a++)e=t(r,a).join(''),r=e.match(o);return e}}function a(e){for(var t={"%FE%FF":'\uFFFD\uFFFD',"%FF%FE":'\uFFFD\uFFFD'},a=i.exec(e);a;){try{t[a[0]]=decodeURIComponent(a[0])}catch(e){var o=r(a[0]);o!==a[0]&&(t[a[0]]=o)}a=i.exec(e)}t['%C2']='\uFFFD';for(var n=Object.keys(t),s=0,d;s<n.length;s++)d=n[s],e=e.replace(new RegExp(d,'g'),t[d]);return e}var o=/%[a-f0-9]{2}/gi,i=/(%[a-f0-9]{2})+/gi;e.exports=function(e){if('string'!=typeof e)throw new TypeError('Expected `encodedURI` to be of type `string`, got `'+typeof e+'`');try{return e=e.replace(/\+/g,' '),decodeURIComponent(e)}catch(t){return a(e)}}},,,,,,function(e,t,r){'use strict';function a(){var e=window.innerWidth,t=window.innerHeight;d.setSize(e,t),c.ratio=e/t,c.updateProjectionMatrix()}function i(){requestAnimationFrame(i),c.updateMatrixWorld(),d.render(l,c)}var o=r(42),n=r(101)(),s=n.guiController,d=new o.Renderer({ratio:window.innerWidth/window.innerHeight,prefferedContext:s.context});d.setDevicePixelRatio(window.devicePixelRatio),document.body.appendChild(d.canvas);var l=new o.Scene,c=new o.OrthographicCamera;c.position.set(0,0,1),c.lookAt();var u=new o.PlaneGeometry(2,2),p=new o.Shader({name:'Plane',hookFragmentEnd:'outgoingColor = vec4(vUv, 1.0, 1.0);'}),m=new o.Mesh(u,p);l.add(m),a(),window.addEventListener('resize',a),i()}]);
//# sourceMappingURL=fullscreen.js.map