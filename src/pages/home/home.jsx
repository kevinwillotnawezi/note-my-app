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
