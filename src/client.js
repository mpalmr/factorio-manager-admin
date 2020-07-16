import {
	ApolloClient,
	InMemoryCache,
	createHttpLink,
	gql,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import pkg from '../package.json';

console.log(!!localStorage.getItem('authToken'));

// Set initial local state
const cache = new InMemoryCache();
cache.writeQuery({
	query: gql`
		query IsLoggedIn {
			isLoggedIn @client
		}
	`,
	data: {	isLoggedIn: !!localStorage.getItem('authToken') },
});

// Setup HTTP link
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

export default new ApolloClient({
	cache,
	link: authLink.concat(httpLink),
	typeDefs: gql`
		extend type Query {
			isLoggedIn: Boolean!
		}
	`,
});
