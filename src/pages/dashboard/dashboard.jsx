import styled from 'styled-components';
import '../../assets/styles/index.css';
import colors from './../../assets/styles/colors';
import { useFetch, useFetch2 } from './../../util/useFetch';
import { urlApiFeedbacks, urlApiFeedbacksStatus } from './../../util/constants';
import { useForm } from 'react-hook-form';
import { LoaderWrapper } from '../../components/styledComponents/loader/loader';
import { Loader } from '../../components/styledComponents/loader/loader';
import { Link } from 'react-router-dom';
import Notation from '../../components/notation/notation';
import { useState } from 'react';

const Header = styled.div`
	display: grid;
	grid-template-columns: auto auto auto auto;
	border-top: 1px solid ${colors.dark};
	border-bottom: 1px solid ${colors.dark};
	padding: 20px;
`;

//TODO component
const StyledLink = styled(Link)`
	text-align: center;
	color: ${colors.grey_blue};
	&:hover {
		cursor: pointer;
		color: ${colors.dark};
		text-decoration: underline;
	}
`;

const Cells = styled.div`
	display: grid;
	grid-template-columns: auto auto auto auto;
	padding: 20px;
	row-gap: 20px;
	grid-auto-rows: 1fr;
`;

const Cell = styled.div`
	margin: 10px;
	width: 20vw;
	min-height: 30vh;
	background-color: gainsboro;
	display: grid;
	grid-template-columns: 20% 80%;
	align-items: center;
	padding: 10px;
	border-radius: 10px;

	* {
		padding: 5px;
	}

	.label {
		color: ${colors.grey_blue};
	}

	&.filled {
		background-color: white;
		box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
	}
`;

const Panel = styled.div`
	padding: 0px !important;
	display: none;

	overflow: hidden;
	transition: max-height 0.2s ease-out;

	form {
		padding: 0px;
	}
`;

function Dashboard() {
	const [value, setValue] = useState(0); // integer state
	const { data, isLoading, error, setData } = useFetch(urlApiFeedbacks);
	const Status = { BACKLOG: 0, OPEN: 1, CLOSED: 2, REJECTED: 3 };

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	if (error) {
		return <div className='container error'>An error occurred</div>;
	}

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

	function allowDrop(ev) {
		ev.preventDefault();
	}

	function drag(ev) {
		ev.dataTransfer.setData('id', ev.target.id);
	}

	async function drop(ev, newStatus) {
		ev.preventDefault();
		const body = {
			status: '',
		};
		const feedbackId = ev.dataTransfer.getData('id');
		const elementToMove = document.getElementById(feedbackId);

		if (elementToMove.compareDocumentPosition(ev.target) === Node.DOCUMENT_POSITION_PRECEDING) {
			ev.target.parentNode.insertBefore(elementToMove, ev.target);
		} else {
			ev.target.parentNode.insertBefore(elementToMove, ev.target.nextSibling);
		}

		switch (newStatus) {
			case Status.BACKLOG:
				body.status = 'backlog';
				break;
			case Status.OPEN:
				body.status = 'open';
				break;
			case Status.CLOSED:
				body.status = 'closed';
				break;
			default:
				body.status = 'rejected';
				break;
		}

		const requestOptions = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body),
		};
		try {
			const response = await fetch(urlApiFeedbacks + feedbackId, requestOptions);
			const data = await response.json();
			console.log(data);
		} catch (err) {
			//TODO
			// setError({ message: err.message });
			console.log(err);
		} finally {
			//TODO
			// setLoading(false);
		}
	}

	function dropFusion(ev, newStatus) {
		//TODO
		console.log('fusion');
	}

	function getFeedbacksSorted() {
		const feedbacks = [
			data.filter((feedback) => feedback.status === 'backlog'),
			data.filter((feedback) => feedback.status === 'open'),
			data.filter((feedback) => feedback.status === 'closed'),
			data.filter((feedback) => feedback.status === 'rejected'),
		];
		const feedbacksLength = [
			data.filter((feedback) => feedback.status === 'backlog').length,
			data.filter((feedback) => feedback.status === 'open').length,
			data.filter((feedback) => feedback.status === 'closed').length,
			data.filter((feedback) => feedback.status === 'rejected').length,
		];

		const newFeedbacks = [];
		const maxIndex = feedbacksLength.indexOf(Math.max(...feedbacksLength));

		for (let index = 0; index < feedbacks[maxIndex].length; index++) {
			const backlog = feedbacks[0][index] ? feedbacks[0][index] : undefined;
			const open = feedbacks[1][index] ? feedbacks[1][index] : undefined;
			const closed = feedbacks[2][index] ? feedbacks[2][index] : undefined;
			const rejected = feedbacks[3][index] ? feedbacks[3][index] : undefined;

			newFeedbacks.push(backlog);
			newFeedbacks.push(open);
			newFeedbacks.push(closed);
			newFeedbacks.push(rejected);
		}

		return newFeedbacks;
	}

	return (
		<div className='container'>
			<h1>Dashboard</h1>
			<Header>
				<span>Backlog</span>
				<span>Open</span>
				<span>Closed</span>
				<span>Rejected</span>
			</Header>
			{isLoading ? (
				<LoaderWrapper>
					<Loader data-testid='loader' />
				</LoaderWrapper>
			) : (
				<Cells>
					{getFeedbacksSorted().map((feedback, index) =>
						feedback ? (
							<Cell
								key={index}
								id={feedback._id}
								className='filled'
								draggable='true'
								onDragStart={(e) => drag(e, feedback)}
								onDrop={(e) => dropFusion(e, index % 4)}
								onDragOver={allowDrop}
							>
								<div className='label'>Notation</div>
								<Notation feedbackId={feedback._id} />
								<div className='label'>Note</div>
								<div>{feedback.note}</div>
								<div className='label'>Rating</div>
								<div>{feedback.rating}</div>
								<div className='label'>User</div>
								<div>{feedback.userId}</div>
								<div className='label'></div>
								<StyledLink to={`/feedbackWithComments/${feedback._id}`} state={{ ...feedback }}>
									See all comments
								</StyledLink>
							</Cell>
						) : (
							<Cell key={index} onDrop={(e) => drop(e, index % 4)} onDragOver={allowDrop}></Cell>
						)
					)}
				</Cells>
			)}
		</div>
	);
}

export default Dashboard;
