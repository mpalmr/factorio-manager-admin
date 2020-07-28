'use strict';

module.exports = {
	setupFiles: [
		'core-js/stable',
		'regenerator-runtime/runtime',
		'jest-localstorage-mock',
	],
	setupFilesAfterEnv: [
		'@testing-library/jest-dom/extend-expect',
		'<rootDir>/jest.setup.js',
	],
	moduleNameMapper: {
		'\\.s?css': '<rootDir>/__mocks__/style.js',
	},
};
