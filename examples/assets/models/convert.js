const fs = require('fs');
const shell = require('shelljs');
const Obj = require('webgl-obj-loader');
const fileName = require('file-name');

shell.ls('./obj/*.obj').forEach(file => {
  const data = shell.cat(file);
  const mesh = new Obj.Mesh(data);
  const json = JSON.stringify({
    vertices: mesh.vertices,
    normals: mesh.vertexNormals,
    indices: mesh.indices,
    uvs: mesh.textures
  });
  const filename = fileName(file);
  fs.writeFile(`./${filename}.json`, json, error => {
    if (error) throw error;
  });
});
