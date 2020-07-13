import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import createClient from './apollo';
import App from './components/app';

document.addEventListener('DOMContentLoaded', () => {
	render(
		<ApolloProvider client={createClient()}>
			<App />
		</ApolloProvider>,
		document.getElementById('root'),
	);
});
