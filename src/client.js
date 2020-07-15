import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import gql from 'graphql-tag';
import pkg from '../package.json';

export default function createClient() {
	// Setup local cache
	const cache = new InMemoryCache();
	cache.writeData({
		data: {
			isLoggedIn: !!localStorage.getItem('authToken'),
		},
	});

	// HTTP middleware
	const httpLink = createHttpLink({
		uri: 'http://localhost:4000/',
		headers: {
			'client-name': 'factorio-manager-amdin',
			'client-version': pkg.version,
		},
	});

	const authLink = setContext((_, { headers }) => {
		const sessionToken = localStorage.getItem('authToken');
		return {
			headers: !sessionToken ? headers : {
				...headers,
				authorization: `Bearer ${sessionToken}`,
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
