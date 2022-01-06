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
	const { isLoading, error, setBody } = usePost(urlApiLogin);
	const [submit, setSubmit] = useState(false);

	function onSubmit(data) {
		const body = {
			email: data.email,
			password: data.password,
			privilege: 'user',
		};
		setBody(body);
		setSubmit(true);
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
				{/* TODO add cancell button and improve style */}
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
						<div className='error'>{error.message || 'An error occured'}</div>
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
