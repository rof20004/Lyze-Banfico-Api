// @flow

const levels: {[string]: string} = {
	'10': 'trace',
	'20': 'debug',
	'30': 'info',
	'40': 'warn',
	'50': 'error',
	'60': 'fatal'
};

export default (chunk: {
	level: number | string,
	[string]: string
}) => {
	if (
		chunk.level &&
		levels [chunk.level.toString ()]
	) {
		chunk.level = levels [
			chunk.level.toString ()
		];
	}

	return chunk;
};