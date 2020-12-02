// @flow

const matcher = /secret|password|(^pass$)/i;

export default (key: string, value: string) => {
	if (key.match (/^authorization/i)) {
		return value && value.match (/^basic\s/i)
			? 'Basic ***' : value;
	}

    return key.match (matcher) ? '***' : value;
}
