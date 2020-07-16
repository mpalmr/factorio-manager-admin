import {
	ApolloClient,
	InMemoryCache,
	createHttpLink,
	gql,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import pkg from '../package.json';

export default function createClient() {
	// Set initial local state
	const cache = new InMemoryCache({
		typePolicies: {
			fields: {
				Query: {
					isLoggedIn: {
						read() {
							return !!localStorage.getItem('authToken');
						},
					},
				},
			},
		},
	});

	cache.writeQuery({
		query: gql`
			query IsLoggedIn {
				isLoggedIn @client
			}
		`,
		data: {	isLoggedIn: !!authToken },
	});

	// Setup HTTP link
	const httpLink = createHttpLink({ uri: 'http://localhost:4000/api' });
	const authLink = setContext((_, { headers }) => {
		const authToken = localStorage.getItem('authToken');
		return {
			headers: {
				...headers,
				authorization: authToken ? `Bearer ${authToken}` : '',
			},
		};
	});

	return new ApolloClient({
		cache,
		link: authLink.concat(httpLink),
		typeDefs: gql`
			extend type Query {
				isLoggedIn: Boolean!
			}
		`,
	});
}
