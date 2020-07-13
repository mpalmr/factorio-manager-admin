'use strict';

module.exports = {
	root: true,
	extends: 'airbnb',
	parser: 'babel-eslint',
	env: { browser: true },
	rules: {
		indent: [2, 'tab'],
		'no-tabs': 0,
		'react/jsx-indent': 0,
		'arrow-parens': [2, 'as-needed'],
		'no-console': 0,
		'func-names': 0,
		'consistent-return': 0,
	},
	overrides: [
		{
			files: [
				'.eslintrc.js',
				'*.config.js',
			],
			env: {
				node: true,
				browser: false,
			},
			parserOptions: { sourceType: 'script' },
			rules: {
				strict: [2, 'global'],
			},
		},
		{
			files: [
				'**/__tests__/*.js',
				'**/__mocks__/*.js',
				'tests/**/*.spec.js',
				'jest.setup.js',
			],
			env: { jest: true },
			plugins: ['jest'],
			rules: {
				camelcase: 0,
				'import/no-extraneous-dependencies': [2, {
					devDependencies: true,
				}],
			},
		},
	],
};
