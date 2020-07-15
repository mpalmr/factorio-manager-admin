'use strict';

module.exports = function babelConfig(api) {
	api.cache(process.env.NODE_ENV !== 'production');

	return {
		presets: [
			['@babel/preset-env', process.env.NODE_ENV !== 'test' ? undefined : {
				targets: { node: 'current' },
			}],
			'@babel/preset-react',
		],
	};
};
