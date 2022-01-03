import { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Loader, LoaderWrapper } from '../styledComponents/loader/loader';
import { urlApiNotations, urlApiNotationsComments, urlApiNotationsFeedback } from '../../util/constants';
import arrowUp from '../../assets/images/arrow-up.png';
import arrowDown from '../../assets/images/arrow-down.png';
import { userId } from './../../util/constants';

const Arrow = styled.button`
	background: url(${(props) => (props.up ? arrowUp : arrowDown)}) no-repeat;
	height: 24px;
	width: 24px;
	border: none;
	&:hover {
		cursor: pointer;
	}
`;

const NotationDiv = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

class Notation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			totalNotations: 0,
			isLoading: true,
			errorGet: '',
			errorPost: '',
			nbClick: 0,
			alreadyGivenNotation: false,
			postMessage: '',
		};
		this.handleAddNotation = this.handleAddNotation.bind(this);
	}

	async handleAddNotation(isPositive) {
		const value = isPositive ? 1 : -1;
		const body = {
			value,
			userId,
			feedbackId: this.props.feedbackId ? this.props.feedbackId : null,
			commentId: this.props.commentId ? this.props.commentId : null,
		};
		this.setState({ isLoading: true });
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body),
		};
		try {
			const response = await fetch(urlApiNotations, requestOptions);
			const data = await response.json();

			if (data.message !== 'Existing feedback/comment') {
				if (isPositive) {
					this.setState({ totalNotations: this.state.totalNotations + 1 });
				} else {
					this.setState({ totalNotations: this.state.totalNotations - 1 });
				}
			} else {
				this.setState({ alreadyGivenNotation: true });
			}
		} catch (err) {
			this.setState({ error: err });
		} finally {
			this.setState({ isLoading: false });
		}

		this.setState({ nbClick: this.state.nbClick + 1 });
	}

	async componentDidMount() {
		try {
			const response = await fetch(
				this.props.feedbackId ? urlApiNotationsFeedback + this.props.feedbackId : urlApiNotationsComments + this.props.commentId
			);
			const data = await response.json();
			this.setState({ totalNotations: data });
		} catch (err) {
			this.setState({ error: err });
		} finally {
			this.setState({ isLoading: false });
		}
	}

	render() {
		if (this.state.error) {
			return <div className='container'>An error occured</div>;
		}

		return (
			<div>
				{this.state.isLoading ? (
					<LoaderWrapper>
						<Loader data-testid='loader' />
					</LoaderWrapper>
				) : (
					<NotationDiv>
						<Arrow data-testid='arrowUp' up onClick={() => this.handleAddNotation(true)} />
						<span data-testid='total'>{this.state.totalNotations}</span>
						<Arrow data-testid='arrowDown' down onClick={() => this.handleAddNotation(false)} />
						{this.state.errorPost && <span className='error'>An error occured</span>}
						{(this.state.nbClick > 1 || this.state.alreadyGivenNotation) && (
							<span className='error' data-testid='error'>
								You already gave a notation for this feedback/comment
							</span>
						)}
					</NotationDiv>
				)}
			</div>
		);
	}
}

Notation.propTypes = {
	feedbackId: PropTypes.string,
	commentId: PropTypes.string,
};

export default Notation;
