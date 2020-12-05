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
		const {transactions} = await this.getTransactions (ctx);

		log.info ({transactions}, 'aggregated transactions list');

		const {booked = []} = transactions;
		const value = booked.reduce ((res, {
			transactionAmount: entry
		}) => res + ((entry && entry.amount) || 0), 0);


		return {value};
	}

}