import '../../assets/styles/index.css';
import { useFetch } from '../../util/useFetch';
import { urlApiFeedbacks } from './../../util/constants';
import { Loader, LoaderWrapper } from '../../components/styledComponents/loader/loader';
import { CardWrapper } from '../../components/styledComponents/cardWrapper/cardWrapper';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../assets/styles/colors';
import Notation from '../../components/notation/notation';
import TableLine from '../../components/tableLine/tableLine';

const StyledLink = styled(Link)`
	text-align: center;
	color: ${colors.grey_blue};
	&:hover {
		cursor: pointer;
		color: ${colors.dark};
		text-decoration: underline;
	}
`;

function FeedbackList() {
	const { data, isLoading, error } = useFetch(urlApiFeedbacks);

	if (error) {
		return <div className='container error'>An error occurred</div>;
	}

	return (
		<div className='container'>
			<h1>List of feedbacks</h1>

			{isLoading ? (
				<LoaderWrapper>
					<Loader data-testid='loader' />
				</LoaderWrapper>
			) : (
				<CardWrapper>
					<ul data-testid='content' className='responsive-table'>
						<TableLine isHeader={true} data={['Notation', 'Note', 'Rating', 'User', 'Comments']} />
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
								]}
								label={['Notation', 'Note', 'Rating', 'User', 'Comments']}
							/>
						))}
					</ul>
				</CardWrapper>
			)}
		</div>
	);
}

export default FeedbackList;
