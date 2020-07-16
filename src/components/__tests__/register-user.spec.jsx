import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import RegisterUser, { REGISTRATION_MUTATION } from '../register-user';

const mocks = [{
	request: {
		query: REGISTRATION_MUTATION,
		variables: {
			username: 'SuperMan',
			password: 'P@ssw0rd',
		},
	},
	result: {
		data: { createUser: 'mockAuthToken' },
	},
}];

describe('Validation', () => {
	describe('Username', () => {
		test('Required', async () => {
			const { container, getByText } = render((
				<MockedProvider mocks={mocks}>
					<RegisterUser />
				</MockedProvider>
			));
			fireEvent.click(getByText('Register'));
			await waitFor(() => !!document.querySelector('.text-danger'));
			expect(container.querySelector('.text-danger')).toHaveTextContent('Required');
		});

		test('Must be 3 or more characters', async () => {
			const { container, getByLabelText, getByText } = render((
				<MockedProvider mocks={mocks}>
					<RegisterUser />
				</MockedProvider>
			));
			fireEvent.change(getByLabelText('Username'), {
				target: { value: 'a' },
			});
			fireEvent.click(getByText('Register'));
			await waitFor(() => !!document.querySelector('.text-danger'));
			expect(container.querySelector('.text-danger'))
				.toHaveTextContent('Username must be at least three characters');
		});
	});

	describe('Password', () => {
		test('Required', async () => {
			const { container, getByText } = render((
				<MockedProvider mocks={mocks}>
					<RegisterUser />
				</MockedProvider>
			));
			fireEvent.click(getByText('Register'));
			await waitFor(() => !!document.querySelector('.text-danger'));
			expect(container.querySelectorAll('.text-danger')[1]).toHaveTextContent('Required');
		});

		test('Must be at least 6 characters', async () => {
			const { container, getByLabelText, getByText } = render((
				<MockedProvider mocks={mocks}>
					<RegisterUser />
				</MockedProvider>
			));
			fireEvent.change(getByLabelText('Password'), {
				target: { value: 'fivve' },
			});
			fireEvent.click(getByText('Register'));
			await waitFor(() => !!document.querySelector('.text-danger'));
			expect(container.querySelectorAll('.text-danger')[1])
				.toHaveTextContent('Must be at least 6 characters');
		});

		test('Confirm password is required', async () => {
			const { container, getByLabelText, getByText } = render((
				<MockedProvider mocks={mocks}>
					<RegisterUser />
				</MockedProvider>
			));
			fireEvent.change(getByLabelText('Password'), {
				target: { value: 'P@ssw0rd' },
			});
			fireEvent.click(getByText('Register'));
			await waitFor(() => !!document.querySelector('.text-danger'));
			expect(container.querySelector('.row:nth-child(2) .col-sm-6:last-child .text-danger'))
				.toHaveTextContent('Required');
		});

		test('Passwords must match', async () => {
			const { container, getByLabelText, getByText } = render((
				<MockedProvider mocks={mocks}>
					<RegisterUser />
				</MockedProvider>
			));
			fireEvent.change(getByLabelText('Password'), {
				target: { value: 'P@ssw0rd' },
			});
			fireEvent.change(getByLabelText('Confirm Password'), {
				target: { value: 'Passw0rd' },
			});
			fireEvent.click(getByText('Register'));
			await waitFor(() => !!document.querySelector('.text-danger'));
			expect(container.querySelector('.row:nth-child(2) .col-sm-6:last-child .text-danger'))
				.toHaveTextContent('Passwords do not match');
		});
	});
});

// TODO: Make work
// test('Successful registration sets authToken in localStorage', async () => {
// 	const { getByLabelText, getByText } = render((
// 		<MockedProvider mocks={mocks}>
// 			<RegisterUser />
// 		</MockedProvider>
// 	));
// 	fireEvent.change(getByLabelText('Username'), {
// 		target: { value: 'SuperMan' },
// 	});
// 	fireEvent.change(getByLabelText('Password'), {
// 		target: { value: 'P@ssw0rd' },
// 	});
// 	fireEvent.change(getByLabelText('Confirm Password'), {
// 		target: { value: 'P@ssw0rd' },
// 	});
// 	fireEvent.click(getByText('Register'));
// 	await new Promise(resolve => setTimeout(resolve, 0));

// 	expect(localStorage.setItem).toHaveBeenCalledWith('authToken', 'mockAuthToken');
// });
