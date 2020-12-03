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
			message: 'The requested connection is not created'
		});
	}

	return Promise.reject (err);
};

export default class IntegratedASPSPsApi extends BaseApi {

	constructor (...args: any) {
		super (...args);

		this.baseUri = `${
			this.baseUri
		}/api/providers/integrated`;
	}

	list (
		ctx: RequestCtx
	) {
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

	add (
		ctx: RequestCtx,
		providerId: string
	) {
		return this.request (ctx, {
			uri: `${this.baseUri}/${providerId}`,
			method: 'POST'
		})
			.catch (handle404);
	}

	delete (
		ctx: RequestCtx,
		providerId: string
	) {
		return this.request (ctx, {
			uri: `${this.baseUri}/${providerId}`,
			method: 'DELETE'
		})
			.catch (handle404);
	}

	getAccounts (
		ctx: RequestCtx,
		providerId: string
	) {
		return this.request (ctx, {
			uri: `${this.baseUri}/${
				providerId
			}/accounts`,
			method: 'GET'
		})
			.catch (handle404);
	}

	getAccount (
		ctx: RequestCtx,
		providerId: string,
		accountId: string
	) {
		return this.request (ctx, {
			uri: `${this.baseUri}/${
				providerId
			}/accounts/${
				accountId
			}`,
			method: 'GET'
		})
			.catch (handle404);
	}

	getAccountBalances (
		ctx: RequestCtx,
		providerId: string,
		accountId: string
	) {
		return this.request (ctx, {
			uri: `${this.baseUri}/${
				providerId
			}/accounts/${
				accountId
			}/balances`,
			method: 'GET'
		})
			.catch (handle404);
	}

	getAccountTransactions (
		ctx: RequestCtx,
		providerId: string,
		accountId: string
	) {
		return this.request (ctx, {
			uri: `${this.baseUri}/${
				providerId
			}/accounts/${
				accountId
			}/transactions`,
			method: 'GET'
		})
			.catch (handle404);
	}
}