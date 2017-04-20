import Obj from 'webgl-obj-loader';

export default function (data) {
	const mesh = new Obj.Mesh(data);
	return {
		vertices: mesh.vertices,
		normals: mesh.vertexNormals,
		indices: mesh.indices,
		uvs: mesh.textures,
	};
}
