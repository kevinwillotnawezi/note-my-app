import styled from 'styled-components';
import colors from '../../../assets/styles/colors';

export const CardWrapper = styled.div`
	max-width: 1200px;
	margin-left: auto;
	margin-right: auto;
	padding-left: 10px;
	padding-right: 10px;

	ul {
		padding-inline-start: 0px;
	}

	.table-header {
		background-color: ${colors.grey_blue};
		font-size: 14px;
		text-transform: uppercase;
		letter-spacing: 0.03em;
		align-items: center;
	}

	.table-row {
		background-color: #ffffff;
		box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
		display: flex;
		align-items: center;
	}

	li {
		border-radius: 3px;
		padding: 25px 30px;
		display: flex;
		justify-content: space-between;
		margin-bottom: 25px;
	}

	.col-0 {
		flex-basis: 20%;
	}
	.col-1 {
		flex-basis: 50%;
	}
	.col-2 {
		flex-basis: 20%;
	}
	.col-3 {
		flex-basis: 20%;
	}
	.col-4 {
		flex-basis: 20%;
	}
	.col-5 {
		flex-basis: 20%;
	}
	.col-6 {
		flex-basis: 20%;
	}
	.col-7 {
		flex-basis: 20%;
	}
`;
