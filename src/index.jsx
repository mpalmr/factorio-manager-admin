import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import './styles.scss';
import client from './client';
import Routes from './routes';

document.addEventListener('DOMContentLoaded', () => {
	render(
		<StrictMode>
			<ApolloProvider client={client}>
				<Routes />
			</ApolloProvider>
		</StrictMode>,
		document.getElementById('root'),
	);
});
