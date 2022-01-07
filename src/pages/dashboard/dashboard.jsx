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
`;

function Dashboard() {
	const { data, isLoading, error, setData } = useFetch(urlApiFeedbacks);
	const [first, setFirst] = useState(true);
	const [allData, setAllData] = useState([]);

	if (error) {
		return <div className='container error'>An error occured</div>;
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

	return (
		<DashboardContainer>
			<div className='sideNav'>
				<h2>Catégories</h2>
				<div>
					<button className='tabLinks'>Amélioration</button>
					<button className='tabLinks'>Positif</button>
					<button className='tabLinks'>Négatif</button>
					<button className='tabLinks'>Pistes</button>
					<button className='tabLinks'>
						<svg width='25px' height='25px' viewBox='0 0 24 24'>
							<path
								d='M17 13h-4v4h-2v-4H7v-2h4V7h2v4h4m-5-9A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2z'
								fill='currentColor'
							></path>
						</svg>
					</button>
				</div>
			</div>
			<div className='container'>
				<h1>Dashboard</h1>

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

				{isLoading ? (
					<LoaderWrapper>
						<Loader data-testid='loader' />
					</LoaderWrapper>
				) : (
					<CardWrapper>
						<ul data-testid='content' className='responsive-table'>
							<TableLine isHeader={true} data={['Notation', 'Rating', 'Note', 'User', 'Comments', 'Status', 'Category', 'Update']} />
							{data?.map((feedback) => (
								<TableLine
									data-testid={feedback._id}
									key={feedback._id}
									isHeader={false}
									data={[
										<Notation feedbackId={feedback._id} />,
										feedback.rating,
										feedback.note,
										feedback.userId,
										<StyledLink to={`/feedbackWithComments/${feedback._id}`} state={{ ...feedback }}>
											See all comments
										</StyledLink>,
										//TODO select box
										feedback.status,
										//TODO select box
										feedback.category ? feedback.category : 'null',
										<button>Update</button>,
									]}
								/>
							))}
						</ul>
					</CardWrapper>
				)}
			</div>
		</DashboardContainer>
	);
}

export default Dashboard;
