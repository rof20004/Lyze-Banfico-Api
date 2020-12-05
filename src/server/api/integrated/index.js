// @flow

import log from 'server/logger';
import express from 'express';

import reqCtx from 'server/lib/req-ctx';

import {
	spendings,
	integrated
} from 'server/providers/platform';


import provider from './provider';
import accounts from './accounts';
import transactions from './transactions';


import type {
	$Request,
	$Response
} from 'express';


export default express.Router ({mergeParams: true})

	// custom spendings endpoint
	.get ('/spendings', async (
		req: $Request,
		res: $Response
	) => {
		try {
			res.json (
				await spendings.fromDateRange (
					reqCtx (req)
				)
			);
		} catch (e) {
			log.warn (e, 'get spendings error');

			res.status (e.statusCode || 400).json ({
				message: e.message
			});
		}
	})

	.use ('/accounts', accounts)
	.use ('/transactions', transactions)


	.use ('/:providerId', provider)

	.get ('/', async (
		req: $Request,
		res: $Response
	) => {
		try {
			res.json (
				await integrated.list (
					reqCtx (req)
				)
			);
		} catch (e) {
			log.warn (e, 'get integrated providers error');

			res.status (e.statusCode || 400).json ({
				message: e.message
			});
		}
	})