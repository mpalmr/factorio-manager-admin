import React from 'react';
import { render } from '@testing-library/react';
import GameTable from '../game-table';

test('show notice if there are no games', () => {
	const { container } = render(<GameTable />);
	expect(container.querySelectorAll('tbody tr')).toHaveLength(1);
	expect(container.querySelectorAll('tbody td')).toHaveLength(1);
	expect(container.querySelector('tbody td'))
		.toHaveTextContent('There are no games currently active.');
	expect(parseInt(container.querySelector('tbody td').getAttribute('colspan'), 10))
		.toBe(container.querySelectorAll('thead th').length);
});
