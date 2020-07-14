import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import pkg from '../../package.json';

const httpLink = createHttpLink({
	uri: 'http://localhost:4000/',
	headers: {
		'client-name': 'factorio-manager-admin',
		'client-version': pkg.version,
	},
});

const authLink = setContext((_, { headers }) => {
	const sessionToken = localStorage.getItem('sessionToken');
	return {
		headers: !sessionToken ? headers : {
			...headers,
			Authorization: `Bearer ${sessionToken}`,
		},
	};
});

export default authLink.concat(httpLink);
