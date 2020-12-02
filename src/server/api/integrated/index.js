// @flow

import log from 'server/logger';
import express from 'express';

import {integrated} from 'server/providers/platform';
import reqCtx from 'server/lib/req-ctx';

import provider from './provider';


import type {
	$Request,
	$Response
} from 'express';


export default express.Router ({mergeParams: true})

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