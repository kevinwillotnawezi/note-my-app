import React from 'react';
import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { urlApiFeedbacks } from '../../util/constants';
import Login from './login';

//to test existing email uncomment below
//TODO check below
// const server = setupServer(
// 	rest.post(urlApiFeedbacks, (req, res, ctx) => {
// 		return res(
// 			ctx.status(400),
// 			ctx.json({
// 				message: 'User validation failed: email: Error, expected `email` to be unique. Value: `admin@admin`',
// 			})
// 		);
// 	})
// );

// const server = setupServer(
// 	rest.post(urlApiFeedbacks, (req, res, ctx) => {
// 		return res(ctx.status(500));
// 	})
// );

//to test error message comment below
//TODO see test here (and in other files)
const server = setupServer(
	rest.post(urlApiFeedbacks, (req, res, ctx) => {
		return res(
			ctx.status(201),
			ctx.json({
				message: 'User created successfully',
			})
		);
	})
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Signup', () => {
	it('should only render all the inputs and buttons', () => {
		render(<Login />);
		expect(screen.getByTestId('email')).toBeInTheDocument();
		expect(screen.getByTestId('password')).toBeInTheDocument();
		expect(screen.getByTestId('submit')).toBeInTheDocument();
		expect(screen.queryByTestId('error-email')).toBeFalsy();
		expect(screen.queryByTestId('error-pwd')).toBeFalsy();
	});

	it('should display an error message when a field is missing', async () => {
		render(<Login />);

		const submitButton = screen.getByTestId('submit');
		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(screen.getByTestId('error-email')).toBeInTheDocument();
		});
		expect(screen.getByTestId('error-email')).toBeInTheDocument();
		expect(screen.getByTestId('error-pwd')).toBeInTheDocument();
		expect(screen.getAllByText('This field is required')).toHaveLength(2);
	});

	it('should display an error message when email is not valid', async () => {
		render(<Login />);

		const submitButton = screen.getByTestId('submit');
		const email = screen.getByTestId('email');
		fireEvent.change(email, { target: { value: 'abc' } });
		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(screen.getByTestId('error-email')).toBeInTheDocument();
		});
		expect(screen.getByText('Invalid email')).toBeInTheDocument();
	});

	//uncomment this part and the part at the top of the file to test error message
	it('should display an error when email is unknown', async () => {
		render(<Login />);

		const submitButton = screen.getByTestId('submit');
		const email = screen.getByTestId('email');
		fireEvent.change(email, { target: { value: 'test@test' } });
		const password = screen.getByTestId('password');
		fireEvent.change(password, { target: { value: '12345678' } });
		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(screen.getByText('Unknown user')).toBeInTheDocument();
		});
		//TODO => forgot password
	});

	it('should display a message when the user is created', async () => {
		render(<Login />);

		const submitButton = screen.getByTestId('submit');
		const email = screen.getByTestId('email');
		fireEvent.change(email, { target: { value: 'test@test' } });
		const password = screen.getByTestId('password');
		fireEvent.change(password, { target: { value: '12345678' } });
		fireEvent.click(submitButton);

		//TODO check when we change pages?
		await waitFor(() => {
			expect(screen.getByText('Login sucessful')).toBeInTheDocument();
		});
	});
});
