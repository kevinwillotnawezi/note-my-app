import React from 'react';
import { screen, render, fireEvent, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import '@testing-library/jest-dom';
import Notation from './notation';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { urlApiNotations, urlApiNotationsComments, urlApiNotationsFeedback } from '../../util/constants';

const server = setupServer(
	rest.get(urlApiNotationsFeedback + '1', (req, res, ctx) => {
		return res(ctx.json(5));
	}),
	//to test error message comment below
	rest.post(urlApiNotations, (req, res, ctx) => {
		return res(
			ctx.json({
				message: 'Notation created successfully',
			})
		);
	}),
	//to test error message uncomment below
	// rest.post(urlApiNotations, (req, res, ctx) => {
	// 	return res(ctx.status(400), ctx.json({ message: 'Existing feedback/comment' }));
	// }),
	rest.get(urlApiNotationsComments + '1', (req, res, ctx) => {
		return res(ctx.json(5));
	})
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Notation feedback', () => {
	it('should only render the arrows and the total number of notations', async () => {
		render(<Notation feedbackId='1' />);
		await waitForElementToBeRemoved(() => screen.queryByTestId('loader'));
		expect(screen.getByTestId('total')).toBeInTheDocument();
		expect(screen.getByText('5')).toBeInTheDocument();
		expect(screen.getByTestId('arrowUp')).toBeInTheDocument();
		expect(screen.getByTestId('arrowDown')).toBeInTheDocument();
		expect(screen.queryByTestId('error')).toBeFalsy();
	});

	it('should increment notation after click on arrow up only the first time', async () => {
		render(<Notation feedbackId='1' />);
		await waitForElementToBeRemoved(() => screen.queryByTestId('loader'));

		//before click
		expect(screen.getByText('5')).toBeInTheDocument();
		expect(screen.queryByText('6')).toBeFalsy();
		expect(screen.queryByText('7')).toBeFalsy();
		const arrowUp = screen.getByTestId('arrowUp');

		//after first click
		fireEvent.click(arrowUp);
		await waitFor(() => {
			expect(screen.queryByText('5')).toBeFalsy();
		});
		await waitFor(() => {
			expect(screen.getByText('6')).toBeInTheDocument();
		});
		await waitFor(() => {
			expect(screen.queryByText('7')).toBeFalsy();
		});

		//after second click
		fireEvent.click(arrowUp);
		await waitFor(() => {
			expect(screen.queryByText('5')).toBeFalsy();
		});
		await waitFor(() => {
			expect(screen.getByText('6')).toBeInTheDocument();
		});
		await waitFor(() => {
			expect(screen.queryByText('7')).toBeFalsy();
		});
	});

	it('should decrement notation after click on arrow down only the first time', async () => {
		render(<Notation feedbackId='1' />);
		await waitForElementToBeRemoved(() => screen.queryByTestId('loader'));

		//before click
		expect(screen.getByText('5')).toBeInTheDocument();
		expect(screen.queryByText('4')).toBeFalsy();
		expect(screen.queryByText('3')).toBeFalsy();
		const arrowDown = screen.getByTestId('arrowDown');

		//after first click
		fireEvent.click(arrowDown);
		await waitFor(() => {
			expect(screen.queryByText('5')).toBeFalsy();
		});
		await waitFor(() => {
			expect(screen.getByText('4')).toBeInTheDocument();
		});
		await waitFor(() => {
			expect(screen.queryByText('3')).toBeFalsy();
		});

		//after second click
		fireEvent.click(arrowDown);
		await waitFor(() => {
			expect(screen.queryByText('5')).toBeFalsy();
		});
		await waitFor(() => {
			expect(screen.getByText('4')).toBeInTheDocument();
		});
		await waitFor(() => {
			expect(screen.queryByText('3')).toBeFalsy();
		});
	});

	//uncomment below to test when existing feedback
	// it('should not decrement notation after click on arrow down', async () => {
	// 	render(<Notation feedbackId='1' />);
	// 	await waitForElementToBeRemoved(() => screen.queryByTestId('loader'));

	// 	//before click
	// 	expect(screen.getByText('5')).toBeInTheDocument();
	// 	expect(screen.queryByText('4')).toBeFalsy();
	// 	const arrowDown = screen.getByTestId('arrowDown');

	// 	//after click
	// 	fireEvent.click(arrowDown);
	// 	await waitFor(() => {
	// 		expect(screen.queryByText('5')).toBeFalsy();
	// 	});
	// 	await waitFor(() => {
	// 		expect(screen.queryByText('4')).toBeFalsy();
	// 	});
	// 	await waitFor(() => {
	// 		expect(screen.getByTestId('error')).toBeInTheDocument();
	// 	});
	// });

	//uncomment below to test when error backend
	// it('should not increment notation after click on arrow up', async () => {
	// 	render(<Notation feedbackId='1' />);
	// 	await waitForElementToBeRemoved(() => screen.queryByTestId('loader'));

	// 	//before click
	// 	expect(screen.getByText('5')).toBeInTheDocument();
	// 	expect(screen.queryByText('6')).toBeFalsy();
	// 	const arrowUp = screen.getByTestId('arrowUp');

	// 	//after click
	// 	fireEvent.click(arrowUp);
	// 	await waitFor(() => {
	// 		expect(screen.queryByText('5')).toBeFalsy();
	// 	});
	// 	await waitFor(() => {
	// 		expect(screen.queryByText('6')).toBeFalsy();
	// 	});
	// 	await waitFor(() => {
	// 		expect(screen.getByTestId('error')).toBeInTheDocument();
	// 	});
	// });
});
