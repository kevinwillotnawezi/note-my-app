import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import user from '../../assets/user.png';
import './navigation.css';

const NavContainer = styled.nav`
	padding: 30px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: #282c34;
	font-size: calc(10px + 2vmin);
	color: white;
`;

//TODO
//hover & active
// border-radius: 30px;
export const StyledLink = styled(Link)`
	padding: 0px 30px;
	text-decoration: none;
	font-size: 18px;
	text-align: center;
	color: white;
`;

export const Logo = styled.img`
	height: 50px;
	animation: App-logo-spin infinite 20s linear;
`;

export const User = styled.img`
	height: 50px;
`;

function Navigation() {
	return (
		<NavContainer>
			<Link to='/'>
				<Logo src={logo} alt='logo' />
			</Link>
			<div>
				<StyledLink to='/rating'>New Rating</StyledLink>
				<StyledLink to='/ratingList'>Lits of Rating</StyledLink>
				<StyledLink to='/dashboard'>Dashboard</StyledLink>
			</div>
			<Link to='/login'>
				<User src={user} alt='logo' />
			</Link>
		</NavContainer>
	);
}
export default Navigation;
