// @flow

import express from 'express';
import config from 'config';


import type {
	$Request,
	$Response
} from 'express';


const {appName: name} = config;
const started = new Date ().toISOString ();

export default express.Router ()

	.use ('/', async (req: $Request, res: $Response) =>
		res.json ({status: 'ok', name, started})
	);