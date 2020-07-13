import React from 'react';
import PropTypes from 'prop-types';
import Header from './header';

function App({ children }) {
	return (
		<>
			<Header />
			<main>
				{children}
			</main>
		</>
	);
}

App.propTypes = { children: PropTypes.node.isRequired };

export default App;
