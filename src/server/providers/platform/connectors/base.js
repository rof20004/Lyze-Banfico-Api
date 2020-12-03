// @flow

import config from 'config';
import request from 'server/lib/request';

import Authenticator from './auth';


import type {
	RequestCtx
} from 'server/types';


type BaseApiParams = $PropertyType <typeof config, 'platform'>;

const mapEror = (e: Object) => {
	if (!e) {
		return;
	}

	const {
		message = {},
		statusCode
	} = e;

	return {
		statusCode,
		message: message.message ||
			message.error ||
			message
	};
}


export default class BaseApi {

	baseUri: string;

	appId: string;
	appId: string;
	appIdHeader: string;
	appUserHeader: string;

	authenticator: Authenticator;

	constructor ({
		apiUri,
		appId,
		appIdHeader,
		appUserHeader
	}: BaseApiParams, authenticator: Authenticator) {
		this.baseUri = apiUri;

		this.appId = appId;
		this.appIdHeader = appIdHeader;
		this.appUserHeader = appUserHeader;

		this.authenticator = authenticator;
	}

	request (
		ctx: RequestCtx,
		params: Object
	) {
		const {headers = {}} = params;
		const {query, userId, requestId} = ctx;

		params.uri = `${params.uri}${query ? `?${query}` : ''}`;

		headers ['x-user-id'] = userId;
		headers ['x-app-id'] = this.appId;
		headers ['x-request-id'] = requestId;

		return this.authenticator.getToken ()
			.then ((authorization) => {
				headers.authorization = authorization;

				return request ({...params, headers});
			})
			.catch ((e: Error) =>
				Promise.reject (mapEror (e))
			);
	}
}