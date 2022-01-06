import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import '../../assets/styles/index.css';
import { MyForm } from '../../components/styledComponents/form/form';
import { LoaderWrapper } from '../../components/styledComponents/loader/loader';
import { usePost } from '../../util/useFetch';
import { urlApiSignUp } from './../../util/constants';

function Signup() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm();
	// TODO revoir data et error return
	const { isLoading, error, setBody } = usePost(urlApiSignUp);
	const [submit, setSubmit] = useState(false);
	const password = useRef({});
	const errorMessage = error?.message?.includes('expected `email` to be unique') ? (
		<div className='error'>This user already exists</div>
	) : (
		<div className='error'>An error occured</div>
	);
	password.current = watch('password', '');

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
			<h1>Sign Up</h1>
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
				{/* TODO use pattern to validate password */}
				<input
					data-testid='password'
					type='password'
					placeholder='Enter password'
					{...register('password', {
						required: 'This field is required',
						minLength: { value: 8, message: 'Password must contain at least 8 characters' },
					})}
				/>
				<label>Repeat password :</label>
				{errors.repeatPassword && (
					<p className='error' data-testid='error-repeat-pwd'>
						{errors.repeatPassword.message}
					</p>
				)}
				<input
					data-testid='repeat-password'
					type='password'
					placeholder='Repeat password'
					{...register('repeatPassword', {
						required: 'This field is required',
						validate: (value) => value === password.current || 'Passwords are not matching',
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
						errorMessage
					) : (
						<div>User created</div>
					))
				// TODO go to home page
			}
		</div>
	);
}

export default Signup;
