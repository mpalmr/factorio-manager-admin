import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import DeleteGameButton, { DELETE_GAME_MUTATION } from '../delete-game-button';

test('Clicking on button shows modal', async () => {
	const setDisabled = jest.fn();
	const { getByText, queryByText } = render((
		<MockedProvider>
			<DeleteGameButton
				gameId="mockGameId"
				name="mockGameName"
				disabled={false}
				setDisabled={setDisabled}
			/>
		</MockedProvider>
	));

	expect(queryByText('Confirm')).not.toBeInTheDocument();
	fireEvent.click(getByText('Delete'));
	return waitFor(() => expect(queryByText('Confirm')).toBeInTheDocument());
});

test('Cancel closes modal', async () => {
	const setDisabled = jest.fn();
	const { getByText, queryByText } = render((
		<MockedProvider>
			<DeleteGameButton
				gameId="mockGameId"
				name="mockGameName"
				disabled={false}
				setDisabled={setDisabled}
			/>
		</MockedProvider>
	));

	fireEvent.click(getByText('Delete'));
	await waitFor(() => expect(queryByText('Confirm')).toBeInTheDocument());
	fireEvent.click(getByText('Cancel'));
	return waitFor(() => expect(queryByText('Confirm')).not.toBeInTheDocument());
});

test('Successful deletion', async () => {
	const setDisabled = jest.fn();
	const { getByText, queryByText } = render((
		<MockedProvider
			mocks={[{
				request: {
					query: DELETE_GAME_MUTATION,
					variables: { gameId: 'mockGameId' },
				},
				result: { deleteGame: null },
			}]}
		>
			<DeleteGameButton
				gameId="mockGameId"
				name="mockGameName"
				disabled={false}
				setDisabled={setDisabled}
			/>
		</MockedProvider>
	));

	fireEvent.click(getByText('Delete'));
	await waitFor(() => expect(queryByText('Confirm')).toBeInTheDocument());
	fireEvent.click(getByText('Confirm'));
	expect(setDisabled).not.toHaveBeenCalled();
	await waitFor(() => expect(queryByText('Confirm')).not.toBeInTheDocument());
	expect(setDisabled).toHaveBeenCalledWith(false);
});
