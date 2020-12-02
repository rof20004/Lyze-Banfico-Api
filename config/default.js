const {

	port,
	appName,

	authClientId,
	authClientSecret,
	authTokenUri,

	platformApi,
	platformAppId,
	platformAppIdHeader,
	platformAppUserHeader

} = require ('./builder') ([
	'PORT',
	'APP_NAME',

	'AUTH_CLIENT_ID',
	'AUTH_CLIENT_SECRET',
	'AUTH_TOKEN_URI',

	'PLATFORM_API',
	'PLATFORM_APP_ID',
	'PLATFORM_APP_ID_HEADER',
	'PLATFORM_APP_USER_HEADER'
]);


module.exports = {

	port,
	appName,

	auth: {
		tokenUri: authTokenUri,
		clientId: authClientId,
		clientSecret: authClientSecret
	},

	platform: {
		apiUri: platformApi,
		appId: platformAppId,
		appIdHeader: platformAppIdHeader,
		appUserHeader: platformAppUserHeader
	}
}