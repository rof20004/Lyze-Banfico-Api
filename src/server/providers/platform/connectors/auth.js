// @flow

import config from 'config';
import request from 'server/lib/request';


import type {
	AccessTokenResponse
} from 'server/types';

type ApiParams = $PropertyType <typeof config, 'auth'>;


const now = () =>
	new Date ().getTime ();

const getToken = ({
	tokenUri,
	clientId,
	clientSecret
}: AuthApi) =>
	request <AccessTokenResponse> ({
		uri: tokenUri,
		method: 'POST',
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		form: {
			client_id: clientId,
			client_secret: clientSecret,
			grant_type: 'client_credentials'
		}
	});


export default class AuthApi {

	tokenUri: string;
	clientId: string;
	clientSecret: string;

	tokenRequest: ?Promise <string>;
	accessToken: ?{token: string, expires: number};

	constructor ({
		tokenUri,
		clientId,
		clientSecret
	}: ApiParams) {
		this.tokenUri = tokenUri;
		this.clientId = clientId;
		this.clientSecret = clientSecret;

		this.tokenRequest = null;
	}

	setToken ({
		access_token: token,
		expires_in: expires
	}: AccessTokenResponse) {
		this.accessToken = {
			token: `Bearer ${token}`,
			expires: now () + (Number (expires) * 1000)
		};

		return this.accessToken.token;
	}

	getToken () {
		const {accessToken} = this;

		if (
			accessToken &&
			accessToken.expires > now ()
		) {
			return Promise.resolve (
				accessToken.token
			);
		}

		if (this.tokenRequest) {
			return this.tokenRequest;
		}

		return this.tokenRequest = getToken (this)
			.then ((result) =>
				this.setToken (result)
			)
			.finally (() =>
				this.tokenRequest = null
			);
	}
}