import log from 'server/logger';
import IntegratedASPSPsApi from '../connectors/integrated';

import type {
	RequestCtx
} from 'server/types';



// extend existings class to reuse methods

export default class SpendingsApi extends IntegratedASPSPsApi {

	async fromDateRange (
		ctx: RequestCtx
	) {
		// eslint-disable-next-line no-unused-vars
		const {transactions} = await this.getTransactions (ctx);

		log.info ({transactions}, 'aggregated transactions list');

		// TODO: check debit / credit, sum the debit transactions

		return transactions;
	}

}