import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = createContext({ isLoggedIn: false });

function AuthProvider({ children }) {
	const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn,

				login(authToken) {
					localStorage.setItem('authToken', authToken);
					setIsLoggedIn(true);
				},

				logout() {
					localStorage.clear();
					setIsLoggedIn(false);
				},
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

AuthProvider.propTypes = { children: PropTypes.node.isRequired };

export default AuthProvider;
