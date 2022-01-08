import styled from 'styled-components';
import colors from '../../../assets/styles/colors';

export const MyForm = styled.form`
	margin: 0 10vw;
	display: flex;
	flex-direction: column;

	*:not(span) {
		padding: 10px;
	}

	input[type='submit'] {
		background-color: ${colors.green};
		color: white;
		padding: 12px 20px;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		margin: 20px auto;
	}

	@media (max-width: 425px) {
		margin: 0;
	}
`;

export const MyTextArea = styled.textarea`
	height: 200px;
`;
