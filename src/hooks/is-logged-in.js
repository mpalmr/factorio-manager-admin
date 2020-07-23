import { gql, useApolloClient } from '@apollo/client';

const IS_LOGGED_IN = gql`
	query IsLoggedIn {
		isLoggedIn @client
	}
`;

export default function useAuthentication() {
	return useApolloClient().cache.readQuery({ query: IS_LOGGED_IN }).isLoggedIn;
}
