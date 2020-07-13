import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import './styles.scss';
import createClient from './apollo';
import Routes from './routes';

document.addEventListener('DOMContentLoaded', () => {
	render(
		<ApolloProvider client={createClient()}>
			<Routes />
		</ApolloProvider>,
		document.getElementById('root'),
	);
});
