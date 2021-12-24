import '../../styles/index.css';
import colors from '../../styles/colors';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const DivButton = styled.div`
	padding: 30px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: stretch;
`;

const MyButton = styled(Link)`
	font-size: 18px;
	background-color: ${colors.dark};
	color: white;
	margin: 50px 30%;
	padding: 15px;
	border-radius: 50px;
	text-decoration: none;

	&:hover {
		cursor: pointer;
		background-color: ${colors.secondary};
	}
`;

function Home() {
	return (
		<div className='container'>
			<h1>Welcome to my site</h1>
			<h3>Are you ready to rate the app?</h3>
			<DivButton>
				<MyButton to='/rating'>Add new rating</MyButton>
				<MyButton to='/ratingList'>List of ratings</MyButton>
				<MyButton to='/dashboard'>Dashboard</MyButton>
			</DivButton>
		</div>
	);
}

export default Home;
