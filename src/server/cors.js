// @flow

import express from 'express';
import log from 'server/logger';

import type {
    $Request,
    $Response,
    NextFunction
} from 'express';


const methods = [
    'GET',
    'PUT',
    'POST',
    'DELETE'
];

const headers = [
    'x-http-method-override',
    'x-requested-with',
    'content-type',
    'accept'
];

export default express.Router ()

    .all ('*', (
        req: $Request,
        res: $Response,
        next: NextFunction
    ) => {
        res.header ('Access-Control-Allow-Origin', '*');
        res.header ('Access-Control-Allow-Credentials', 'true');
        res.header ('Access-Control-Allow-Methods', methods.join ());
        res.header ('Access-Control-Allow-Headers', headers.join ());

        if (req.method === 'OPTIONS') {
            return res.sendStatus (200);
        }
        if (req.originalUrl !== '/status') {
            log.info (req, 'incoming request');
        }

        next ();
    });