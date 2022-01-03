import React from 'react';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import TableLine from './tableLine';

describe('FeedbackList', () => {
	it('should render a table header', async () => {
		render(<TableLine isHeader={true} data={['Notation', 'Rating', 'Note', 'User', 'Comments']} />);
		expect(screen.getByText('Notation')).toBeInTheDocument();
		expect(screen.getByText('Rating')).toBeInTheDocument();
		expect(screen.getByText('Note')).toBeInTheDocument();
		expect(screen.getByText('User')).toBeInTheDocument();
		expect(screen.getByTestId('li')).toHaveClass('table-header');
	});

	it('should render a table row', async () => {
		render(<TableLine isHeader={false} data={[5, 'note', 'id']} />);
		expect(screen.getByText('5')).toBeInTheDocument();
		expect(screen.getByText('note')).toBeInTheDocument();
		expect(screen.getByText('id')).toBeInTheDocument();
		expect(screen.getByTestId('li')).toHaveClass('table-row');
	});
});
