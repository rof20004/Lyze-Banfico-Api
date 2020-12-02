// @flow

import log from 'server/logger';
import express from 'express';

import {integrated} from 'server/providers/platform';
import reqCtx from 'server/lib/req-ctx';


import type {
	$Request,
	$Response
} from 'express';


export default express.Router ({mergeParams: true})

	.get ('/:accountId/transactions', async (
		req: $Request,
		res: $Response
	) => {
		const {params} = req;

		try {
			res.json (
				await integrated.getTransactions (
					reqCtx (req),
					params.providerId,
					params.accountId
				)
			);
		} catch (e) {
			log.warn (e, 'get integrated account transactions error');

			res.status (e.statusCode || 400).json ({
				message: e.message
			});
		}
	})

	.get ('/:accountId/balances', async (
		req: $Request,
		res: $Response
	) => {
		const {params} = req;

		try {
			res.json (
				await integrated.getBalances (
					reqCtx (req),
					params.providerId,
					params.accountId
				)
			);
		} catch (e) {
			log.warn (e, 'get integrated account balances error');

			res.status (e.statusCode || 400).json ({
				message: e.message
			});
		}
	})

	.get ('/:accountId', async (
		req: $Request,
		res: $Response
	) => {
		const {params} = req;

		try {
			res.json (
				await integrated.getAccount (
					reqCtx (req),
					params.providerId,
					params.accountId
				)
			);
		} catch (e) {
			log.warn (e, 'get integrated account error');

			res.status (e.statusCode || 400).json ({
				message: e.message
			});
		}
	})