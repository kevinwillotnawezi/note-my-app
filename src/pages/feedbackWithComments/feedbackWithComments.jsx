import '../../assets/styles/index.css';
import { useLocation } from 'react-router';
import { Loader, LoaderWrapper } from '../../components/styledComponents/loader/loader';
import { CardWrapper } from '../../components/styledComponents/cardWrapper/cardWrapper';
import { useFetch } from '../../util/useFetch';
import { urlApiCommentsFeedback } from './../../util/constants';
import Notation from '../../components/notation/notation';
import TableLine from '../../components/tableLine/tableLine';
import Comment from '../../components/comment/comment';
import { useState } from 'react';

function FeedbackWithComments() {
	const { state } = useLocation();
	const feedback = state;
	const feedbackId = feedback._id;
	const { data, isLoading, error, setData } = useFetch(urlApiCommentsFeedback + feedbackId);
	const [errorPost, setErrorPost] = useState();

	if (error || errorPost) {
		return <div className='container'>An error occured</div>;
	}

	return (
		<div className='container'>
			<h1>List of comments</h1>

			<h2>Feedback</h2>
			<CardWrapper data-testId='feedback-div'>
				<ul className='responsive-table'>
					<TableLine isHeader={true} data={['Notation', 'Rating', 'Note', 'User']} />
					<TableLine isHeader={false} data={[<Notation feedbackId={feedbackId}></Notation>, feedback.rating, feedback.note, feedback.user]} />
				</ul>
			</CardWrapper>

			<h2>Comments</h2>
			<Comment feedbackId={feedbackId} data={data} setData={setData} setErrorPost={setErrorPost}></Comment>

			{isLoading ? (
				<LoaderWrapper>
					<Loader data-testid='loader' />
				</LoaderWrapper>
			) : (
				<CardWrapper data-testId='comments-div'>
					<ul className='responsive-table'>
						<TableLine isHeader={true} data={['Notation', 'Description', 'User']} />
						{data?.map((comment) => (
							<TableLine
								key={comment._id}
								isHeader={false}
								data={[<Notation commentId={comment._id}></Notation>, comment.description, comment.userId]}
							/>
						))}
					</ul>
				</CardWrapper>
			)}
		</div>
	);
}

export default FeedbackWithComments;
