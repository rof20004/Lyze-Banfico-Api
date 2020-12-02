// @flow

import config from 'config';
import log from 'server/logger';
import express from 'express';
import bodyParser from 'body-parser';

import cors from 'server/cors';
import status from 'server/status';
import api from 'server/api';
import notFound from 'server/api/404';


log.info ({config}, 'server config');

express ()
    .use (cors)
    .use ('/status', status)

    .use (bodyParser.json ())

    .use ('/api', api)
    .use (notFound)

    .listen (config.port, () =>
        log.info (`server started on port ${config.port}`)
    );