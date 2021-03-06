module.exports = {
	env: {
		browser: true,
		es6: true,
	},
	extends: [
		'airbnb-base',
	],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parserOptions: {
		ecmaVersion: 2018,
	},
	rules: {
		"import/extensions":[
			"error",
			"ignorePackages", 
			{
				"js": "always"
			}
		],
		"class-methods-use-this": [0]
	},
};
