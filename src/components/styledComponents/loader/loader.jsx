import colors from '../../../assets/styles/colors';
import styled from 'styled-components';
import rotate from '../rotate/rotate';

export const Loader = styled.div`
	padding: 10px;
	border: 6px solid ${colors.green};
	border-bottom-color: transparent;
	border-radius: 22px;
	animation: ${rotate} 1s infinite linear;
	height: 0;
	width: 0;
`;

export const LoaderWrapper = styled.div`
	display: flex;
	justify-content: center;
`;
