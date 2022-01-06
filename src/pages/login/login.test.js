import React from 'react';
import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { urlApiLogin } from '../../util/constants';
import Login from './login';

describe('Login', () => {
	const server = setupServer(
		rest.post(urlApiLogin, (req, res, ctx) => {
			return res(
				ctx.status(200),
				ctx.json({
					message: 'Login successful',
				})
			);
		})
	);
	beforeAll(() => server.listen());
	afterEach(() => server.resetHandlers());
	afterAll(() => server.close());

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
			expect(screen.getByText('Login successful')).toBeInTheDocument();
		});
	});
});

describe('Login invalid password', () => {
	const server = setupServer(
		rest.post(urlApiLogin, (req, res, ctx) => {
			return res(
				ctx.status(401),
				ctx.json({
					message: 'Invalid password',
				})
			);
		})
	);
	beforeAll(() => server.listen());
	afterEach(() => server.resetHandlers());
	afterAll(() => server.close());

	it('should display an error message when password is not valid', async () => {
		render(<Login />);
		const submitButton = screen.getByTestId('submit');
		const email = screen.getByTestId('email');
		fireEvent.change(email, { target: { value: 'abc@abc' } });
		const password = screen.getByTestId('password');
		fireEvent.change(password, { target: { value: '12345678' } });
		fireEvent.click(submitButton);
		await waitFor(() => {
			expect(screen.getByText('Invalid password')).toBeInTheDocument();
		});
	});
});

describe('Login unknonw user', () => {
	const server = setupServer(
		rest.post(urlApiLogin, (req, res, ctx) => {
			return res(
				ctx.status(404),
				ctx.json({
					message: 'User not found ',
				})
			);
		})
	);
	beforeAll(() => server.listen());
	afterEach(() => server.resetHandlers());
	afterAll(() => server.close());

	it('should display an error when email is unknown', async () => {
		render(<Login />);

		const submitButton = screen.getByTestId('submit');
		const email = screen.getByTestId('email');
		fireEvent.change(email, { target: { value: 'test@test' } });
		const password = screen.getByTestId('password');
		fireEvent.change(password, { target: { value: '12345678' } });
		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(screen.getByText('User not found')).toBeInTheDocument();
		});
		//TODO => forgot password
	});
});

describe('Login unknonw error', () => {
	const server = setupServer(
		rest.post(urlApiLogin, (req, res, ctx) => {
			return res(ctx.status(500));
		})
	);
	beforeAll(() => server.listen());
	afterEach(() => server.resetHandlers());
	afterAll(() => server.close());

	it('should display an unknown error appears', async () => {
		render(<Login />);

		const submitButton = screen.getByTestId('submit');
		const email = screen.getByTestId('email');
		fireEvent.change(email, { target: { value: 'test@test' } });
		const password = screen.getByTestId('password');
		fireEvent.change(password, { target: { value: '12345678' } });
		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(screen.getByText('An error occured')).toBeInTheDocument();
		});
	});
});
