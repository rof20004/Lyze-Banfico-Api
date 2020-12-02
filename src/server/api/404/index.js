import log from 'server/logger';

// eslint-disable-next-line no-unused-vars
export default [(err, req, res, next) => {
	log.warn (err);

	res
		.status (500)
		.json ({error: 'internal server error'});
}, (req, res) => {
	res
		.status (404)
		.json ({error: `${req.url} not found`});
}]