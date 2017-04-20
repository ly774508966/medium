const fs = require('fs');
const Obj = require('webgl-obj-loader');

fs.readFile('./mass.obj', 'utf8', (error, data) => {
	const mesh = new Obj.Mesh(data);
	const json = JSON.stringify({
		vertices: mesh.vertices,
		normals: mesh.vertexNormals,
		indices: mesh.indices,
		uvs: mesh.textures,
	});
	fs.writeFile('./mass.json', json, error => {
		if (error) throw error;
	});
});
