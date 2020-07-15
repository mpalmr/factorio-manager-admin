import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import pkg from '../package.json';

const typeDefs = gql`
	extend type Query {
		isLoggedIn: Boolean!
	}
`;

export default function createClient() {
	const authToken = localStorage.getItem('authToken');

	// Get initial local state
	const cache = new InMemoryCache();
	cache.writeQuery({
		query: gql`
			query IsLoggedIn {
				isloggedIn @client
			}
		`,
		data: {	isLoggedIn: !!authToken },
	});

	return new ApolloClient({
		typeDefs,
		cache,
		uri: 'http://localhost:4000/',
		headers: {
			authorization: authToken ? `Bearer ${authToken}` : '',
			'client-name': 'factorio-manager-amdin',
			'client-version': pkg.version,
		},
	});
}
