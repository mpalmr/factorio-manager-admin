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
		'react/jsx-indent-props': 0,
		'react/jsx-props-no-spreading': 0,
	},
	overrides: [
		{
			files: [
				'**/__tests__/*.js',
				'**/__tests__/*.jsx',
				'**/__mocks__/*.js',
				'**/__mocks__/*.jsx',
			],
			plugins: ['jest'],
			env: { jest: true },
			rules: {
				'import/no-extraneous-dependencies': [2, {
					devDependencies: true,
				}],
			},
		},
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
	],
};
