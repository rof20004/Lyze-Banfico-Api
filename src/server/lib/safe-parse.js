// @flow

export default (input: ?Object | ?string): Object => {
	if (input && (typeof input === 'object')) {
		return input;
	}

	try {
		return typeof input === 'string'
			? JSON.parse (input)
			: null
	} catch (e) {
		return null;
	}
};