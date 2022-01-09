import colors from '../../assets/styles/colors';
import { MyForm, MyTextArea } from '../styledComponents/form/form';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import useFetch from 'use-http';
import { urlApiComments } from '../../util/constants';
import { userId } from './../../util/constants';
import { useState } from 'react';
import { LoaderWrapper } from '../styledComponents/loader/loader';
import { Loader } from './../styledComponents/loader/loader';

const Accordion = styled.button`
	background-color: ${colors.green};
	color: white;
	cursor: pointer;
	padding: 18px;
	text-align: left;
	border: none;
	outline: none;
	transition: 0.4s;

	&:hover,
	&:active {
		background-color: ${colors.grey_blue};
		color: ${colors.dark};
	}
`;

const Panel = styled.div`
	padding: 0 18px;
	display: none;
	overflow: hidden;
	transition: max-height 0.2s ease-out;
`;

function handleAccordion() {
	const accordion = document.getElementById('Accordion');
	accordion?.classList.toggle('active');
	const panel = document.getElementById('Panel');
	if (panel?.style.display === 'block') {
		panel.style.display = 'none';
	} else {
		panel.style.display = 'block';
	}
}

function Comment({ feedbackId, data, setData }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const { post, response, error } = useFetch(urlApiComments);
	const [submit, setSubmit] = useState(false);
	const [isLoading, setLoading] = useState(false);

	async function onSubmit(comment) {
		const body = {
			...comment,
			userId,
			feedbackId,
		};
		setSubmit(true);
		setLoading(true);
		await post('', body);
		handleAccordion();
		if (response.ok) {
			const newData = [
				...data,
				{
					...comment,
					userId,
					feedbackId,
				},
			];
			setData(newData);
		}
		setLoading(false);
		//TODO check error in test
	}

	return (
		<div>
			<Accordion data-testid='accordionButton' onClick={handleAccordion}>
				Add new Comment
			</Accordion>
			<Panel id='Panel' data-testid='panel'>
				<MyForm onSubmit={handleSubmit(onSubmit)}>
					<label>Comment :</label>
					{errors.description && (
						<p className='error' data-testid='error'>
							This field is required
						</p>
					)}
					<MyTextArea data-testid='text-area' placeholder='Write something..' {...register('description', { required: true })} />
					<input data-testid='submitButton' type='submit' value='Submit' />
				</MyForm>
			</Panel>
			{submit &&
				(isLoading ? (
					<LoaderWrapper>
						<Loader data-testid='loader' />
					</LoaderWrapper>
				) : error ? (
					<div className='error'>An error occurred</div>
				) : (
					<div>Comment submitted</div>
				))}
		</div>
	);
}

export default Comment;
