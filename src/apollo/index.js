import { ApolloClient } from 'apollo-client';
import { typeDefs, resolvers } from './schema';
import link from './link';
import cache from './cache';

export default function createClient() {
	return new ApolloClient({
		typeDefs,
		resolvers,
		link,
		cache,
	});
}
