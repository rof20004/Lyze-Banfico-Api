// @flow

import log from 'server/logger';
import express from 'express';

import {integrated} from 'server/providers/platform';
import reqCtx from 'server/lib/req-ctx';

import accounts from './accounts';


import type {
	$Request,
	$Response
} from 'express';


export default express.Router ({mergeParams: true})

	.use ('/accounts', accounts)

	.get ('/', async (
		req: $Request,
		res: $Response
	) => {
		try {
			res.json (
				await integrated.get (
					reqCtx (req),
					req.params.providerId
				)
			);
		} catch (e) {
			log.warn (e, 'get integrated provider error');

			res.status (e.statusCode || 400).json ({
				message: e.message
			});
		}
	})

	.post ('/', async (
		req: $Request,
		res: $Response
	) => {
		try {
			res.json (
				await integrated.add (
					reqCtx (req),
					req.params.providerId
				)
			);
		} catch (e) {
			log.warn (e, 'get integrated provider error');

			res.status (e.statusCode || 400).json ({
				message: e.message
			});
		}
	})

	.delete ('/', async (
		req: $Request,
		res: $Response
	) => {
		try {
			res.json (
				await integrated.add (
					reqCtx (req),
					req.params.providerId
				)
			);
		} catch (e) {
			log.warn (e, 'delete integrated provider error');

			res.status (e.statusCode || 400).json ({
				message: e.message
			});
		}
	})