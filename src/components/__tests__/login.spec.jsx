import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import Login, { LOGIN_QUERY } from '../login';

test('Username and password is required', async () => {
	const { container, getByText } = render((
		<MockedProvider>
			<Login />
		</MockedProvider>
	));
	fireEvent.click(getByText('Login'));
	await waitFor(() => !!document.querySelector('.text-danger'));
	expect(container.querySelector('.col-sm-6:first-of-type .text-danger'))
		.toHaveTextContent('Required');
	expect(container.querySelector('.col-sm-6:last-of-type .text-danger'))
		.toHaveTextContent('Required');
});
