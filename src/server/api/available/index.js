// @flow

import log from 'server/logger';
import express from 'express';

import {available} from 'server/providers/platform';
import reqCtx from 'server/lib/req-ctx';


import type {
	$Request,
	$Response
} from 'express';


export default express.Router ()

	.get ('/', async (
		req: $Request,
		res: $Response
	) => {
		try {
			res.json (
				await available.list (
					reqCtx (req)
				)
			);
		} catch (e) {
			log.warn (e, 'get available providers error');

			res.status (e.statusCode || 400).json ({
				message: e.message
			});
		}
	})

	.get ('/:providerId', async (
		req: $Request,
		res: $Response
	) => {
		try {
			res.json (
				await available.get (
					reqCtx (req),
					req.params.providerId
				)
			);
		} catch (e) {
			log.warn (e, 'get available provider error');

			res.status (e.statusCode || 400).json ({
				message: e.message
			});
		}
	});