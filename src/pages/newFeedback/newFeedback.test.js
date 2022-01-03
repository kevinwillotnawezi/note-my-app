import React from 'react';
import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Feedback from './newFeedback';
import colors from '../../assets/styles/colors';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { urlApiFeedbacks } from '../../util/constants';

//to test error message uncomment below
// const server = setupServer(
// 	rest.post(urlApiFeedbacks, (req, res, ctx) => {
// 		return res(ctx.status(400));
// 	})
// );

//to test error message comment below
const server = setupServer(
	rest.get(urlApiFeedbacks, (req, res, ctx) => {
		return res(
			ctx.json({
				message: 'Feedback created successfully',
			})
		);
	})
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Feedback', () => {
	it('should render the all the inputs', () => {
		render(<Feedback />);
		for (let index = 1; index <= 5; index++) {
			expect(screen.getByTestId('radio' + index)).toBeInTheDocument();
		}
		expect(screen.getByTestId('text-area')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'submit-button' })).toBeInTheDocument();
	});

	it('should change style of the button when clicked', () => {
		render(<Feedback />);
		const button1 = screen.getByText('1');
		const button2 = screen.getByText('2');
		//before click
		expect(button1).toHaveStyle(`background-color: ${colors.white}`);
		expect(button1).toHaveStyle(`color: ${colors.dark}`);
		expect(button2).toHaveStyle(`background-color: ${colors.white}`);
		expect(button2).toHaveStyle(`color: ${colors.dark}`);

		//after click on button1
		fireEvent.click(button1);
		expect(button1).toHaveStyle(`background-color: ${colors.green}`);
		expect(button1).toHaveStyle(`color: white`);
		expect(button2).toHaveStyle(`background-color: ${colors.white}`);
		expect(button2).toHaveStyle(`color: ${colors.dark}`);

		//after click on button2
		fireEvent.click(button2);
		expect(button1).toHaveStyle(`background-color: ${colors.white}`);
		expect(button1).toHaveStyle(`color: ${colors.dark}`);
		expect(button2).toHaveStyle(`background-color: ${colors.green}`);
		expect(button2).toHaveStyle(`color: white`);
	});

	it('should display error when trying to submit when fields missing', async () => {
		render(<Feedback />);
		const submit = screen.getByRole('button', { name: 'submit-button' });

		//before click on submit
		expect(screen.queryByTestId('error1')).toBeFalsy();
		expect(screen.queryByTestId('error2')).toBeFalsy();

		//after click on submit
		fireEvent.click(submit);
		await waitFor(() => {
			const error1 = screen.getByTestId('error1');
			expect(error1).toBeInTheDocument();
		});
		await waitFor(() => {
			const error2 = screen.getByTestId('error2');
			expect(error2).toBeInTheDocument();
		});
	});

	// to test error message uncomment below

	// it('should display message when submit has error', async () => {
	// 	render(<Feedback />);
	// 	const submit = screen.getByRole('button', { name: 'submit-button' });
	// 	const button1 = screen.getByText('1');
	// 	const textArea = screen.getByTestId('text-area');

	// 	//before click on submit
	// 	expect(screen.queryByTestId('An error occured')).toBeFalsy();

	// 	//after click on submit
	// 	fireEvent.click(button1);
	// 	fireEvent.change(textArea, { target: { value: 'abc' } });
	// 	fireEvent.click(submit);

	// 	await waitFor(() => {
	// 		const errorMessage = screen.queryByText('An error occured');
	// 		expect(errorMessage).toBeInTheDocument();
	// 	});
	// });

	it('should display message when submit is successful', async () => {
		render(<Feedback />);
		const submit = screen.getByRole('button', { name: 'submit-button' });
		const button1 = screen.getByText('1');
		const textArea = screen.getByTestId('text-area');

		//before click on submit
		expect(screen.queryByTestId('Feedback submitted')).toBeFalsy();

		//after click on submit
		fireEvent.click(button1);
		fireEvent.change(textArea, { target: { value: 'abc' } });
		fireEvent.click(submit);
		await waitFor(() => {
			const successMessage = screen.queryByText('Feedback submitted');
			expect(successMessage).toBeInTheDocument();
		});
	});
});
