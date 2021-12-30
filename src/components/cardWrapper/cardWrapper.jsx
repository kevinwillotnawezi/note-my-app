import styled from 'styled-components';
import colors from '../../assets/styles/colors';

export const CardWrapper = styled.div`
	max-width: 1000px;
	margin-left: auto;
	margin-right: auto;
	padding-left: 10px;
	padding-right: 10px;

	.table-header {
		background-color: ${colors.grey_blue};
		font-size: 14px;
		text-transform: uppercase;
		letter-spacing: 0.03em;
	}
	.table-row {
		background-color: #ffffff;
		box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
		align-items: center;
	}

	li {
		border-radius: 3px;
		padding: 25px 30px;
		display: flex;
		justify-content: space-between;
		margin-bottom: 25px;
	}

	.col-1 {
		flex-basis: 10%;
	}
	.col-2 {
		flex-basis: 40%;
	}
	.col-3 {
		flex-basis: 25%;
	}
	.col-4 {
		flex-basis: 25%;
	}
	.col-5 {
		flex-basis: 25%;
	}
	.col-6 {
		flex-basis: 25%;
	}
`;
