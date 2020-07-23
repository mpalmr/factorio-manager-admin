import { createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import pkg from '../package.json';

const httpLink = createHttpLink({ uri: 'http://localhost:4000/api' });

const authLink = setContext((_, { headers }) => {
	const authToken = localStorage.getItem('authToken');
	return {
		headers: {
			...headers,
			'client-name': 'factorio-manager-admin',
			'client-version': pkg.version,
			authorization: authToken ? `Bearer ${authToken}` : '',
		},
	};
});

const logoutLink = onError(({ networkError }) => {
	if (networkError.statusCode === 401) {
		localStorage.clear();
	}
});

export default logoutLink.concat(authLink.concat(httpLink));
