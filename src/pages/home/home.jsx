import '../../assets/styles/index.css';
import colors from '../../assets/styles/colors';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const DivButton = styled.div`
	padding: 30px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: stretch;

	@media (max-width: 425px) {
		padding: 15px;
	}
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
		color: ${colors.dark};
	}

	@media (max-width: 768px) {
		margin: 50px 15%;
	}
	@media (max-width: 425px) {
		margin: 30px 0;
	}
`;

function Home() {
	return (
		<div className='container'>
			<h1>Welcome to my site</h1>
			<h3>Are you ready to rate the app?</h3>
			<DivButton>
				<MyButton data-testid='newFeedback' to='/feedback'>
					Give us your feedback
				</MyButton>
				<MyButton data-testid='feedbackList' to='/feedbackList'>
					See the list of feedbacks
				</MyButton>
				<MyButton data-testid='dashboard' to='/dashboard'>
					Show the Dashboard
				</MyButton>
			</DivButton>
		</div>
	);
}

export default Home;
