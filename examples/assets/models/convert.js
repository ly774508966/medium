const threeOBJ = require('three-obj')();

threeOBJ.convert('./mass.obj', './mass.json', function(response) {
	console.log("DATA:", response);
});
