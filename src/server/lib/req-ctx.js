// @flow

import type {
	$Request
} from 'express';

import type {
	RequestCtx
} from 'server/types';


export default (
	{headers}: $Request
): RequestCtx => {
	const userId = headers ['x-user-id'];
	const requestId = headers ['x-request-id'];

	return {userId, requestId};
}