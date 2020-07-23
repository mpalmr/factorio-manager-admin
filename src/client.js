import { ApolloClient, InMemoryCache } from '@apollo/client';
import link from './link';

export default new ApolloClient({
	link,
	cache: new InMemoryCache(),
});
