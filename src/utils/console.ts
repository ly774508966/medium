const enabled = true;

export const log = (function log() {
	if (!window.console || !console.log) {
		return function () {return; };
	}
	if (!enabled) return function () {return; };
	return Function.prototype.bind.call(console.log, console);
}());

export const clear = (function clear() {
	if (!window.console || !console.clear) {
		return function () {return; };
	}
	if (!enabled) return function () {return; };
	return Function.prototype.bind.call(console.clear, console);
}());

export const debug = (function debug() {
	if (!window.console || !console.debug) {
		return function () {return; };
	}
	if (!enabled) return function () {return; };
	return Function.prototype.bind.call(console.debug, console);
}());

export const info = (function info() {
	if (!window.console || !console.info) {
		return function () {return; };
	}
	if (!enabled) return function () {return; };
	return Function.prototype.bind.call(console.info, console);
}());

export const warn = (function warn() {
	if (!window.console || !console.warn) {
		return function () {return; };
	}
	if (!enabled) return function () {return; };
	return Function.prototype.bind.call(console.warn, console);
}());

export const error = (function error() {
	if (!window.console || !console.error) {
		return function () {return; };
	}
	if (!enabled) return function () {return; };
	return Function.prototype.bind.call(console.error, console);
}());
