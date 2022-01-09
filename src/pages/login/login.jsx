import '../../assets/styles/index.css';
import { LoaderWrapper } from '../../components/styledComponents/loader/loader';
import { usePost } from '../../util/useFetch';
import { MyForm } from './../../components/styledComponents/form/form';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { urlApiLogin } from '../../util/constants';

function Login() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	// TODO see again data et error return
	const [error, setError] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const [submit, setSubmit] = useState(false);

	async function onSubmit(user) {
		const body = {
			email: user.email,
			password: user.password,
		};
		setSubmit(true);
		setError(false);
		setLoading(true);

		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body),
		};
		try {
			const response = await fetch(urlApiLogin, requestOptions);
			const data = await response.json();
			if (data.message) {
				throw new Error(data.message);
			}
			localStorage.setItem('user_id', data?._id);
		} catch (err) {
			setError({ message: err.message });
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className='container'>
			<h1>Login</h1>
			<MyForm onSubmit={handleSubmit(onSubmit)}>
				<label>Email :</label>
				{errors.email && (
					<p className='error' data-testid='error-email'>
						{errors.email.message}
					</p>
				)}
				{/* TODO add messages to constants */}
				<input
					data-testid='email'
					type='text'
					placeholder='Enter email'
					{...register('email', { required: 'This field is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
				/>
				<label>Password :</label>
				{errors.password && (
					<p className='error' data-testid='error-pwd'>
						{errors.password.message}
					</p>
				)}
				{/* TODO use pattern to validate password? */}
				<input
					data-testid='password'
					type='password'
					placeholder='Enter password'
					{...register('password', {
						required: 'This field is required',
						// minLength: { value: 8, message: 'Password must contain at least 8 characters' }, //TODO remove?
					})}
				/>
				<input data-testid='submit' type='submit' value='Submit' />
			</MyForm>
			{/* TODO create component below */}
			{
				submit &&
					(isLoading ? (
						<LoaderWrapper>
							<LoaderWrapper data-testid='loader' />
						</LoaderWrapper>
					) : error ? (
						// errorMessage
						<div className='error'>{error.message || 'An error occurred'}</div>
					) : (
						// error?.message
						<div>Login successful</div>
					))
				// TODO go to home page
			}
		</div>
	);
}

export default Login;
