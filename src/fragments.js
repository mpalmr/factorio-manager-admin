import { gql } from '@apollo/client';

// eslint-disable-next-line import/prefer-default-export
export const GAME_COMMON_FRAGMENT = gql`
	fragment GameCommon on Game {
		id
		name
		isOnline
		version
		port
		createdAt
		creator {
			id
			username
		}
	}
`;
