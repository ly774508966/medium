import dat from 'dat-gui';
import queryString from 'query-string';

const gui = new dat.GUI();
// dat.GUI.toggleHide();

module.exports = function (modes) {
	const options = modes !== undefined ? modes : ['webgl2', 'webgl'];

	const queries = queryString.parse(location.search);

	const guiController = {
		context: queries.context || options[0],
	};

	gui.add(guiController, 'context', options).onChange(val => {
		const url = `${window.location.pathname}?context=${val}`;
		window.location.href = url;
	});

	return {
		gui,
		guiController,
	};
}
