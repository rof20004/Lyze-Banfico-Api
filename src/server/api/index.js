// @flow

import express from 'express';

import available from './available';
import integrated from './integrated';


export default express.Router ()

	.use ('/providers/available', available)
	.use ('/providers/integrated', integrated);
