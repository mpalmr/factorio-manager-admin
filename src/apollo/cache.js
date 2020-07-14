import { InMemoryCache } from 'apollo-cache-inmemory';

const cache = new InMemoryCache();

cache.writeData({
	data: {
		isLoggedIn: !!localStorage.getItem('authToken'),
	},
});

export default cache;
