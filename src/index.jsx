import React, { Strict } from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import './styles.scss';
import client from './client';
import Routes from './routes';

document.addEventListener('DOMContentLoaded', () => {
	render(
		<Strict>
			<ApolloProvider client={client}>
				<Routes />
			</ApolloProvider>
		</Strict>,
		document.getElementById('root'),
	);
});
