import pump from 'pump';
import split from 'split2';
import through from 'through2';

import mask from './mask';
import levels from './levels';
import safeParse from './parse';


pump (process.stdin, split (safeParse), through.obj ((
	chunk,
	encoding,
	callback
) => {
	let updated = levels (chunk);

	updated = JSON.stringify (updated, mask);
	console.log (updated);

	callback ();
}));
