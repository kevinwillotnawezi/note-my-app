import React from 'react';
import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { urlApiComments } from '../../util/constants';
import Comment from './comment';

describe('Comment', () => {
	const server = setupServer(
		rest.post(urlApiComments, (req, res, ctx) => {
			return res(
				ctx.json({
					message: 'Comment created successfully',
				})
			);
		})
	);
	beforeAll(() => server.listen());
	afterEach(() => server.resetHandlers());
	afterAll(() => server.close());

	it('should render the all the inputs', () => {
		render(<Comment />);
		const accordion = screen.getByTestId('accordionButton');

		//before click on accordion
		expect(accordion).toBeInTheDocument();
		expect(screen.queryByTestId('panel')).toHaveStyle('display: none');

		//after click on accordion
		fireEvent.click(accordion);
		expect(screen.queryByTestId('panel')).toHaveStyle('display: block');

		//after second click on accordion
		fireEvent.click(accordion);
		expect(screen.queryByTestId('panel')).toHaveStyle('display: none');
	});

	it('should display error when trying to submit when field missing', async () => {
		render(<Comment />);
		const submit = screen.getByTestId('submitButton');

		//before click on submit
		expect(screen.queryByText('This field is required')).toBeFalsy();

		//after click on submit
		fireEvent.click(submit);
		await waitFor(() => {
			const error = screen.getByText('This field is required');
			expect(error).toBeInTheDocument();
		});
	});

	it('should display message when submit is successful', async () => {
		render(<Comment />);
		const submit = screen.getByTestId('submitButton');
		const textArea = screen.getByTestId('text-area');

		//before click on submit
		expect(screen.queryByTestId('Comment submitted')).toBeFalsy();

		//after click on submit
		fireEvent.change(textArea, { target: { value: 'abc' } });
		fireEvent.click(submit);

		await waitFor(async () => {
			const loader = screen.queryByTestId('loader');
			expect(loader).toBeInTheDocument();
		});
	});
});

describe('Comments errors', () => {
	const server = setupServer(
		rest.post(urlApiComments, (req, res, ctx) => {
			return res(ctx.status(400));
		})
	);
	beforeAll(() => server.listen());
	afterEach(() => server.resetHandlers());
	afterAll(() => server.close());

	it('should display message when submit has error', async () => {
		render(<Comment />);
		const submit = screen.getByTestId('submitButton');
		const textArea = screen.getByTestId('text-area');

		//before click on submit
		expect(screen.queryByTestId('An error occured')).toBeFalsy();

		//after click on submit
		fireEvent.change(textArea, { target: { value: 'abc' } });
		fireEvent.click(submit);

		await waitFor(() => {
			const errorMessage = screen.queryByText('An error occured');
			expect(errorMessage).toBeInTheDocument();
		});
	});
});
