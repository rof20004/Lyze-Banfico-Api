// @flow

import os from 'os';

const buildEntry = (input) => ({
	level: 20,
	time: new Date ().getTime (),
	pid: process.pid,
	hostname: os.hostname (),
	msg: input,
	details: 'unparsable data passed',
	v: 1
});


export default (input: ?string) => {
	try {
		return typeof input === 'string'
			? JSON.parse (input)
			: buildEntry (input);
	} catch (e) {
		return buildEntry (input);
	}
};