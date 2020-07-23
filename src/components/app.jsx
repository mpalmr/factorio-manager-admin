import React from 'react';
import PropTypes from 'prop-types';
import AuthProvider from '../providers/authentication';
import Header from './header';

function App({ children }) {
	return (
		<AuthProvider>
			<Header />
			<main>
				{children}
			</main>
		</AuthProvider>
	);
}

App.propTypes = { children: PropTypes.node.isRequired };

export default App;
