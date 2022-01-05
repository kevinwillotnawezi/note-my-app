import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';
import user from '../../assets/images/user.png';
import colors from '../../assets/styles/colors';
import rotate from './../styledComponents/rotate/rotate';

const NavContainer = styled.nav`
	padding: 30px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: ${colors.dark};
	font-size: calc(10px + 2vmin);
	color: white;
`;

const StyledLink = styled(NavLink)`
	padding: 0px 30px;
	text-decoration: none;
	font-size: 18px;
	text-align: center;
	color: white;
	&:hover {
		cursor: pointer;
		color: ${colors.secondary};
		text-decoration: underline;
	}
`;

const Logo = styled.img`
	height: 50px;
	animation: ${rotate} infinite 20s linear;
	&:hover {
		cursor: pointer;
		animation: none;
	}
`;

const User = styled.img`
	height: 50px;
`;

const Dropdown = styled.div`
	position: relative;
	display: inline-block;

	.dropdown-content {
		display: none;
		position: absolute;
		background-color: ${colors.dark};
		right: -20px;
		box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
		z-index: 1;

		* {
			padding: 20px;
		}
	}

	&:hover .dropdown-content {
		display: flex;
		flex-direction: column;
	}
`;

function Navigation() {
	return (
		<NavContainer>
			<NavLink to='/'>
				<Logo src={logo} alt='logo' />
			</NavLink>
			<div>
				<StyledLink to='/feedback'>New feedback</StyledLink>
				<StyledLink to='/feedbackList'>List of feedbacks</StyledLink>
				<StyledLink to='/dashboard'>Dashboard</StyledLink>
			</div>
			<Dropdown>
				<User src={user} alt='logo' />
				<div class='dropdown-content'>
					<StyledLink to='/login'>Login</StyledLink>
					<StyledLink to='/signup'>Signup</StyledLink>
					{/* TODO logout before */}
					<StyledLink to='/note-my-app'>Logout</StyledLink>
				</div>
			</Dropdown>
		</NavContainer>
	);
}
export default Navigation;
