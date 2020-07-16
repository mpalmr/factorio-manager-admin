import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import CreateGame from '../create-game';

describe('Validation', () => {
	test('Name is required', async () => {
		const { container, getByText } = render((
			<MockedProvider>
				<CreateGame />
			</MockedProvider>
		));
		fireEvent.click(getByText('Create Game'));
		await waitFor(() => !!container.querySelector('.text-danger'));
		expect(container.querySelector('.text-danger')).toHaveTextContent('Required');
	});

	test('Name must be at least 3 characers', async () => {
		const { container, getByLabelText, getByText } = render((
			<MockedProvider>
				<CreateGame />
			</MockedProvider>
		));
		fireEvent.change(getByLabelText('Name'), {
			target: { value: 'ay' },
		});
		fireEvent.click(getByText('Create Game'));
		await waitFor(() => !!container.querySelector('.text-danger'));
		expect(container.querySelector('.text-danger'))
			.toHaveTextContent('Name must be at least three characters');
	});
});
