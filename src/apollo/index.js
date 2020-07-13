import { ApolloClient } from 'apollo-client';
import link from './link';
import cache from './cache';

export default function createClient() {
	return new ApolloClient({ link, cache });
}
