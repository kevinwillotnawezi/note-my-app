import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';
import user from '../../assets/images/user.png';
import './navigation.css';
import colors from '../../assets/styles/colors';

const NavContainer = styled.nav`
	padding: 30px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: ${colors.dark};
	font-size: calc(10px + 2vmin);
	color: white;
`;

export const StyledLink = styled(NavLink)`
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

export const Logo = styled.img`
	height: 50px;
	animation: App-logo-spin infinite 20s linear;
	&:hover {
		cursor: pointer;
		animation: none;
	}
`;

export const User = styled.img`
	height: 50px;
`;

function Navigation() {
	return (
		<NavContainer>
			<NavLink to='/'>
				<Logo src={logo} alt='logo' />
			</NavLink>
			<div>
				<StyledLink exact to='/feedback' activeClassName='selected'>
					New feedback
				</StyledLink>
				<StyledLink to='/feedbackList'>List of feedbacks</StyledLink>
				<StyledLink to='/dashboard'>Dashboard</StyledLink>
			</div>
			<NavLink to='/login'>
				<User src={user} alt='logo' />
			</NavLink>
		</NavContainer>
	);
}
export default Navigation;
