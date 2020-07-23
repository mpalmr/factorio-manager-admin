import { ApolloClient, gql } from '@apollo/client';
import cache from './cache';
import link from './link';

export default new ApolloClient({
	cache,
	link,
	typeDefs: gql`
		extend type Query {
			isLoggedIn: Boolean!
		}
	`,
});
