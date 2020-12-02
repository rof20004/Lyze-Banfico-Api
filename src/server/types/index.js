// @flow

export type RequestCtx = {
	userId: string,
	requestId: string
};

export type AccessTokenResponse = {
	access_token: string,
	expires_in: number,
	refresh_expires_in: number,
	refresh_token: string,
	token_type: string,
	id_token: string,
	session_state: string,
	scope: string
};