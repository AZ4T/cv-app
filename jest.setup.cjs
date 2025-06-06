// jest.setup.js
require('@testing-library/jest-dom');

// 1. Polyfill TextEncoder/TextDecoder for React Router (and other libraries).
//    Without this, you'll see "ReferenceError: TextEncoder is not defined".
const { TextEncoder, TextDecoder } = require('util');
if (typeof global.TextEncoder === 'undefined') {
	global.TextEncoder = TextEncoder;
}
if (typeof global.TextDecoder === 'undefined') {
	global.TextDecoder = TextDecoder;
}

// 2. Mock IntersectionObserver (used by Navigation).
class IntersectionObserverMock {
	constructor(callback, options) {}
	observe() {}
	unobserve() {}
	disconnect() {}
}
Object.defineProperty(window, 'IntersectionObserver', {
	writable: true,
	configurable: true,
	value: IntersectionObserverMock,
});
