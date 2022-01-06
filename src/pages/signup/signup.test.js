import React from 'react';
import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { urlApiFeedbacks } from '../../util/constants';
import Signup from './signup';

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
		render(<Signup />);
		expect(screen.getByTestId('email')).toBeInTheDocument();
		expect(screen.getByTestId('password')).toBeInTheDocument();
		expect(screen.getByTestId('repeat-password')).toBeInTheDocument();
		expect(screen.queryByTestId('error-email')).toBeFalsy();
		expect(screen.queryByTestId('error-pwd')).toBeFalsy();
		expect(screen.queryByTestId('error-repeat-pwd')).toBeFalsy();
	});

	it('should display an error message when a field is missing', async () => {
		render(<Signup />);

		const submitButton = screen.getByTestId('submit');
		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(screen.getByTestId('error-email')).toBeInTheDocument();
		});
		expect(screen.getByTestId('error-email')).toBeInTheDocument();
		expect(screen.getByTestId('error-pwd')).toBeInTheDocument();
		expect(screen.getByTestId('error-repeat-pwd')).toBeInTheDocument();
		expect(screen.getAllByText('This field is required')).toHaveLength(3);
	});

	it('should display an error message when email is not valid', async () => {
		render(<Signup />);

		const submitButton = screen.getByTestId('submit');
		const email = screen.getByTestId('email');
		fireEvent.change(email, { target: { value: 'abc' } });
		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(screen.getByTestId('error-email')).toBeInTheDocument();
		});
		expect(screen.getByText('Invalid email')).toBeInTheDocument();
	});

	it('should display an error when password and repeat password are note the same', async () => {
		render(<Signup />);

		const submitButton = screen.getByTestId('submit');
		const password = screen.getByTestId('password');
		const repeat = screen.getByTestId('repeat-password');
		fireEvent.change(password, { target: { value: 'abcefghijklmnop' } });
		fireEvent.change(repeat, { target: { value: 'abc' } });
		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(screen.getByTestId('error-repeat-pwd')).toBeInTheDocument();
		});
		expect(screen.getByText('Passwords are not matching')).toBeInTheDocument();
	});

	it('should display an error when password is too small', async () => {
		render(<Signup />);

		const submitButton = screen.getByTestId('submit');
		const password = screen.getByTestId('password');
		fireEvent.change(password, { target: { value: 'abc' } });
		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(screen.getByTestId('error-pwd')).toBeInTheDocument();
		});
		expect(screen.getByText('Password must contain at least 8 characters')).toBeInTheDocument();
	});

	//uncomment this part and the part at the top of the file to test error message
	// it('should display an error when email is already used', async () => {
	// 	render(<Signup />);

	// 	const submitButton = screen.getByTestId('submit');
	// 	const email = screen.getByTestId('email');
	// 	fireEvent.change(email, { target: { value: 'test@test' } });
	// 	const password = screen.getByTestId('password');
	// 	fireEvent.change(password, { target: { value: '12345678' } });
	// 	const repeat = screen.getByTestId('repeat-password');
	// 	fireEvent.change(repeat, { target: { value: '12345678' } });
	// 	fireEvent.click(submitButton);

	// 	await waitFor(() => {
	// 		expect(screen.getByText('This user already exists')).toBeInTheDocument();
	// 	});
	// 	//TODO => forgot password
	// });

	//uncomment this part and the part at the top of the file to test error message
	// it('should display an error when error is encountered', async () => {
	// 	render(<Signup />);

	// 	const submitButton = screen.getByTestId('submit');
	// 	const email = screen.getByTestId('email');
	// 	fireEvent.change(email, { target: { value: 'test@test' } });
	// 	const password = screen.getByTestId('password');
	// 	fireEvent.change(password, { target: { value: '12345678' } });
	// 	const repeat = screen.getByTestId('repeat-password');
	// 	fireEvent.change(repeat, { target: { value: '12345678' } });
	// 	fireEvent.click(submitButton);

	// 	await waitFor(() => {
	// 		expect(screen.getByText('An error occured')).toBeInTheDocument();
	// 	});
	// });

	// TODO go to home
	it('should display a message when the user is created', async () => {
		render(<Signup />);

		const submitButton = screen.getByTestId('submit');
		const email = screen.getByTestId('email');
		fireEvent.change(email, { target: { value: 'test@test' } });
		const password = screen.getByTestId('password');
		fireEvent.change(password, { target: { value: '12345678' } });
		const repeat = screen.getByTestId('repeat-password');
		fireEvent.change(repeat, { target: { value: '12345678' } });
		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(screen.getByText('User created')).toBeInTheDocument();
		});
	});
});
