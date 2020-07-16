import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import './styles.scss';
import client from './client';
import Routes from './routes';

document.addEventListener('DOMContentLoaded', () => {
	render(
		<ApolloProvider client={client}>
			<Routes />
		</ApolloProvider>,
		document.getElementById('root'),
	);
});
