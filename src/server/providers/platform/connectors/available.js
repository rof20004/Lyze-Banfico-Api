// @flow

import BaseApi from './base';

import type {
	RequestCtx
} from 'server/types';


const handle404 = (err) => {
	const {statusCode} = err || {};

	if (statusCode === 404) {
		return Promise.reject ({
			statusCode,
			message: 'The requested provider is not available'
		});
	}

	return Promise.reject (err);
};

export default class DeveloperApi extends BaseApi {

	constructor (...args: any) {
		super (...args);

		this.baseUri = `${
			this.baseUri
		}/api/providers/available`;
	}

	list (ctx: RequestCtx) {
		return this.request (ctx, {
			uri: this.baseUri,
			method: 'GET'
		});
	}

	get (
		ctx: RequestCtx,
		providerId: string
	) {
		return this.request (ctx, {
			uri: `${this.baseUri}/${providerId}`,
			method: 'GET'
		})
			.catch (handle404);
	}
}