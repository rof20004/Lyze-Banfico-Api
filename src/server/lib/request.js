// @flow

import log from 'server/logger';
import request from 'request';

import safeParse from 'server/lib/safe-parse';


const checkSuccess = (
	err?: Error,
	response,
	body
) => {
	if (err) {
		log.warn (err, 'external response');

		return {
			statusCode: 500,
			message: err.message
		};
	}

	const {
		headers,
		statusCode,
		statusMessage,
		request: {uri, method}
	} = response;

	log.info ({response: {
		uri: uri.href,
		method,
		statusCode,
		statusMessage,
		headers,
		body
	}}, 'external response');

	if (!((/^2/).test (statusCode.toString ()))) {
		return {
			statusCode,
			message: body || statusMessage
		};
	}
}

export default <T> (
	{json = true, ...params}: Object = {}
): Promise <T>  => {
	log.info ({request: params}, 'external request');

	return new Promise ((resolve, reject) =>
		request ({...params, json}, (err, res, body) => {
			const failure = checkSuccess (err, res, body);

			if (failure) {
				return reject (failure);
			}

			resolve (safeParse (body));
		})
	);
}