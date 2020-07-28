import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = createContext({ username: null });

function AuthProvider({ children }) {
	const [username, setUsername] = useState(localStorage.getItem('username'));

	return (
		<AuthContext.Provider
			value={{
				username,

				login(authToken, loginUsername) {
					localStorage.setItem('authToken', authToken);
					localStorage.setItem('username', loginUsername);
					setUsername(loginUsername);
				},

				logout() {
					localStorage.clear();
					setUsername(null);
				},
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

AuthProvider.propTypes = { children: PropTypes.node.isRequired };

export default AuthProvider;
