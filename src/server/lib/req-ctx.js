// @flow

import type {
	$Request
} from 'express';

import type {
	RequestCtx
} from 'server/types';


export default (
	{_parsedUrl, headers}: $Request
): RequestCtx => {
	const {query} = _parsedUrl;
	const userId = headers ['x-user-id'];
	const requestId = headers ['x-request-id'];

	return {query, userId, requestId};
}