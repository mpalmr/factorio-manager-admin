'use strict';

module.exports = {
	setupFiles: ['jest-localstorage-mock'],
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
	moduleNameMapper: { '\\.s?css$': 'identity-obj-proxy' },
};
