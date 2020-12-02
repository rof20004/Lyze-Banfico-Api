// @flow

import config from 'config';

import Authenticator from './connectors/auth';
import AvailableProviders from './connectors/available';
import IntegratedProviders from './connectors/integrated';


const {auth, platform} = config;
const authenticator = new Authenticator (auth);

export const available = new AvailableProviders (platform, authenticator);
export const integrated = new IntegratedProviders (platform, authenticator);
