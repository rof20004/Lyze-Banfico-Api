// @flow

import config from 'config';

import Authenticator from './connectors/auth';
import AvailableProviders from './connectors/available';
import IntegratedProviders from './connectors/integrated';
import SpendigsConnector from './extension/spendings';


const {auth, platform} = config;
const authenticator = new Authenticator (auth);

export const available = new AvailableProviders (platform, authenticator);
export const integrated = new IntegratedProviders (platform, authenticator);
export const spendings = new SpendigsConnector (platform, authenticator);
