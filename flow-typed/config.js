declare module 'config' {
  declare export default {

  	PRODUCTION: boolean,

	port: string,
	appName: string,

	auth: {
		tokenUri: string,
		clientId: string,
		clientSecret: string
	},

	platform: {
		apiUri: string,
		appId: string,
		appIdHeader: string,
		appUserHeader: string
	},

	util: {
		loadFileConfigs (dir: string): Object,
		setModuleDefaults (name: string, config: Object): void
	}

  };
}