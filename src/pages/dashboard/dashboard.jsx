import '../../assets/styles/index.css';
import { LoaderWrapper } from '../../components/styledComponents/loader/loader';
import { Loader } from './../../components/styledComponents/loader/loader';
import { CardWrapper } from './../../components/styledComponents/cardWrapper/cardWrapper';
import TableLine from '../../components/tableLine/tableLine';
import Notation from './../../components/notation/notation';
import { urlApiFeedbacks } from './../../util/constants';
import { useFetch } from '../../util/useFetch';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import colors from './../../assets/styles/colors';
import { useState } from 'react';
import { MyForm } from '../../components/styledComponents/form/form';
import { useForm } from 'react-hook-form';

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

const DashboardContainer = styled.div`
	display: flex;

	.sideNav {
		height: auto;
		min-height: calc(100vh - 100px);
		background-color: ${colors.grey};

		h2 {
			padding-left: 10px;
		}

		div {
			padding-top: 100px;
			display: flex;
			flex-direction: column;

			button {
				padding: 50px;
				background-color: ${colors.grey};
				color: ${colors.dark};
				font-size: 16px;
				border: none;

				&:hover {
					cursor: pointer;
					text-decoration: underline;
				}
			}
		}
	}

	.tab {
		/* padding: 20px; */
		display: flex;
		justify-content: space-around;
		overflow: hidden;
		background-color: #f1f1f1;
		button {
			border: none;
			background-color: inherit;
			float: left;
			border: none;
			outline: none;
			cursor: pointer;
			padding: 14px 16px;
			transition: 0.3s;
			font-size: 17px;

			&:hover {
				background-color: #ddd;
			}
		}
		.active {
			background-color: #ddd;
		}
	}
	svg {
		fill: ${colors.dark};

		&:hover {
			fill: ${colors.grey_blue};
		}
	}
`;

const Button = styled.button`
	background-color: ${colors.green};
	color: white;
	padding: 12px 20px;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	margin: 20px auto;
`;

//TODO new general component?
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
	const { data, isLoading, error, setData } = useFetch(urlApiFeedbacks);
	const [first, setFirst] = useState(true);
	const [allData, setAllData] = useState([]);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	if (error) {
		return <div className='container error'>An error occurred</div>;
	}

	function filterTab(value) {
		if (first) {
			setAllData(data);
			setFirst(false);
		}
		const tablinks = document.getElementsByClassName('tablinks');
		for (let i = 0; i < tablinks.length; i++) {
			tablinks[i].className = tablinks[i].className.replace(' active', '');
		}
		document.getElementById(value).style.display = 'block';
		document.getElementById(value).className += ' active';
		setData(allData.filter((feedback) => feedback.status === value));
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

	async function onSubmit(data) {
		console.log(data);
		// const body = {
		// 	...comment,
		// 	userId,
		// 	feedbackId,
		// };
		// setSubmit(true);
		// setLoading(true);
		// await post('', body);
		// handleAccordion();
		// if (response.ok) {
		// 	const newData = [
		// 		...data,
		// 		{
		// 			...comment,
		// 			userId,
		// 			feedbackId,
		// 		},
		// 	];
		// 	setData(newData);
		// }
		// setLoading(false);
	}

	return (
		<DashboardContainer>
			<div className='sideNav'>
				<h2>Catégories</h2>
				<div>
					{/* TODO create list from backend */}
					<button className='tabLinks'>Improvements</button>
					<button className='tabLinks'>Positive</button>
					<button className='tabLinks'>Negative</button>
					<button className='tabLinks'>To test</button>
					<button id='Accordion' className='tabLinks' onClick={handleAccordion}>
						{/* TODO add to icons */}
						<svg width='25px' height='25px' viewBox='0 0 24 24' className='test'>
							<path d='M17 13h-4v4h-2v-4H7v-2h4V7h2v4h4m-5-9A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2z'></path>
						</svg>
						<Panel id='Panel' data-testid='panel'>
							<form onSubmit={handleSubmit(onSubmit)}>
								{/* {errors.description && (
								<p className='error' data-testid='error'>
									This field is required
								</p>
							)} */}
								<input data-testid='input' placeholder='Write something..' {...register('description', { required: true })} />
								<input data-testid='submitButton' type='submit' value='Submit' />
							</form>
						</Panel>
					</button>
				</div>
			</div>
			<div className='container'>
				<h1>Dashboard</h1>

				<h2>This will completely change</h2>

				<div className='tab'>
					<button className='tablinks' id='all' onClick={() => filterTab('all')}>
						All
					</button>
					<button className='tablinks' id='open' onClick={() => filterTab('open')}>
						Open
					</button>
					<button className='tablinks' id='backlog' onClick={() => filterTab('backlog')}>
						Backlog
					</button>
					<button className='tablinks' id='closed' onClick={() => filterTab('closed')}>
						Closed
					</button>
					<button className='tablinks' id='rejected' onClick={() => filterTab('rejected')}>
						Rejected
					</button>
				</div>

				{/* {isLoading ? (
					<LoaderWrapper>
						<Loader data-testid='loader' />
					</LoaderWrapper>
				) : (
					<CardWrapper>
						<ul data-testid='content' className='responsive-table'>
							<TableLine isHeader={true} data={['Notation', 'Note', 'Rating', 'User', 'Comments', 'Status', 'Category', 'Update']} />
							{data?.map((feedback) => (
								<TableLine
									data-testid={feedback._id}
									key={feedback._id}
									isHeader={false}
									data={[
										<Notation feedbackId={feedback._id} />,
										feedback.note,
										feedback.rating,
										feedback.userId,
										<StyledLink to={`/feedbackWithComments/${feedback._id}`} state={{ ...feedback }}>
											See all comments
										</StyledLink>,
										//TODO select box
										feedback.status,
										//TODO select box
										feedback.category ? feedback.category : 'null',
										<Button>Update</Button>,
									]}
								/>
							))}
						</ul>
					</CardWrapper>
				)} */}
			</div>
		</DashboardContainer>
	);
}

export default Dashboard;
