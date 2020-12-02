const path = require ('path');
const env = require ('process-env');
const PRODUCTION = env.get ('NODE_ENV') === 'production';

require ('dotenv').config ({
	path: path.resolve (process.cwd (), `.env${
		PRODUCTION ? '' : `.${env.get ('NODE_ENV')}`
	}`)
});

env.set ('NODE_TLS_REJECT_UNAUTHORIZED', '0');


function translateKey (key) {
	return key
		.toLowerCase ()
		.replace (/_([a-z])/g,
			function (input) {
				return input [1].toUpperCase ();
			}
		);
}

function translateValue (value) {
	if (value && typeof value === 'string') {
		if (value.toLowerCase () === 'true') {
			return true;
		}
		if (value.toLowerCase () === 'false') {
			return false;
		}
	}

	return value;
}

module.exports = function (variables) {
	return variables.reduce (function (result, key) {
		result [translateKey (key)] =
			translateValue (env.get (key));

		return result;
	}, {});
}