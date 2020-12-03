import log from 'server/logger';
import IntegratedASPSPsApi from '../connectors/integrated';

import type {
	RequestCtx
} from 'server/types';


// helpers

const getProvidersIds = ({providers}) =>
	providers.map (({id}) => id);

const getAccountsIds = ({accounts}) =>
	accounts.map (({resourceId}) => resourceId);


// extend existings class to reuse methods

export default class SpendingsApi extends IntegratedASPSPsApi {

	async fromDateRange (
		ctx: RequestCtx
	) {
		// eslint-disable-next-line no-unused-vars
		const {query, ...noQueryCtx} = ctx;

		const providersIds = await this.list (noQueryCtx)
			.then (getProvidersIds);

		const providerEntries = (await Promise.all (
			providersIds.map ((providerId) =>
				this.getAccounts (noQueryCtx, providerId)
					.then (getAccountsIds)
					.then ((accountsIds) => ({
						providerId,
						accountsIds
					}))
			)
		)).flat ();

		// -> [{providerId: <id>, accountsIds: [...]}, {providerId: <id>, accountsIds: [...]}]

		const transactions = (await Promise.all (
			providerEntries.map (({
				providerId,
				accountsIds
			}) =>
				Promise.all (
					accountsIds.map ((accountId) =>
						this.getAccountTransactions (
							ctx,
							providerId,
							accountId
						)
							// pick only booked
							.then (({transactions}) =>
								transactions.booked
							)
				)
			)
		))).flat ();

		log.info ({transactions}, 'aggregated transactions list');

		// TODO: check debit / credit, sum the debit transactions
	}

}