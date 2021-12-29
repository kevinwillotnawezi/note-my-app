import colors from '../../assets/styles/colors';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

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
