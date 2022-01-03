import '../../assets/styles/index.css';
import { MyForm, MyTextArea } from '../../components/styledComponents/form/form';
import ButtonGroup from '../../components/buttonGroup/buttonGroup';
import { useForm } from 'react-hook-form';
import { usePost } from '../../util/useFetch';
import { urlApiFeedbacks } from '../../util/constants';
import { Loader, LoaderWrapper } from '../../components/styledComponents/loader/loader';
import { useState } from 'react';
import { userId } from './../../util/constants';

function Feedback() {
	const category = null;
	const status = 'open';
	const [submit, setSubmit] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const { isLoading, error, setBody } = usePost(urlApiFeedbacks);

	function onSubmit(data) {
		const body = {
			...data,
			userId,
			category,
			status,
		};
		setBody(body);
		setSubmit(true);
	}

	return (
		<div className='container'>
			<h1>New Feedback</h1>
			<MyForm onSubmit={handleSubmit(onSubmit)}>
				<label>Rating :</label>
				{errors.rating && (
					<p className='error' data-testid='error1'>
						This field is required
					</p>
				)}
				<ButtonGroup register={register} />
				<label>Note :</label>
				{errors.note && (
					<p className='error' data-testid='error2'>
						This field is required
					</p>
				)}
				<MyTextArea data-testid='text-area' placeholder='Write something..' {...register('note', { required: true, maxLength: 200 })}></MyTextArea>
				<input aria-label='submit-button' type='submit' value='Submit' />
			</MyForm>
			{submit &&
				(isLoading ? (
					<LoaderWrapper>
						<Loader data-testid='loader' />
					</LoaderWrapper>
				) : error ? (
					<div>An error occured</div>
				) : (
					<div>Feedback submitted</div>
				))}
		</div>
	);
}

export default Feedback;