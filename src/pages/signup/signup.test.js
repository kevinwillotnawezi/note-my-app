import React from 'react';
import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { urlApiSignUp } from '../../util/constants';
import Signup from './signup';

describe('Signup', () => {
	const server = setupServer(
		rest.post(urlApiSignUp, (req, res, ctx) => {
			return res(
				ctx.status(201),
				ctx.json({
					message: 'User created',
				})
			);
		})
	);
	beforeAll(() => server.listen());
	afterEach(() => server.resetHandlers());
	afterAll(() => server.close());

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

describe('Signup unknonw error', () => {
	const server = setupServer(
		rest.post(urlApiSignUp, (req, res, ctx) => {
			return res(ctx.status(500));
		})
	);
	beforeAll(() => server.listen());
	afterEach(() => server.resetHandlers());
	afterAll(() => server.close());

	it('should display an error when error is encountered', async () => {
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
			expect(screen.getByText('An error occurred')).toBeInTheDocument();
		});
	});
});

describe('Signup existing email', () => {
	const server = setupServer(
		rest.post(urlApiSignUp, (req, res, ctx) => {
			return res(
				ctx.status(400),
				ctx.json({
					message: 'User validation failed: email: Error, expected `email` to be unique. Value: `admin@admin`',
				})
			);
		})
	);
	beforeAll(() => server.listen());
	afterEach(() => server.resetHandlers());
	afterAll(() => server.close());

	it('should display an error when email is already used', async () => {
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
			expect(screen.getByText('This user already exists')).toBeInTheDocument();
		});
	});
});
