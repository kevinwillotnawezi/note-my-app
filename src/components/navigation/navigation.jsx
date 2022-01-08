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

	@media screen and (max-width: 768px) {
		.links {
			display: none;
		}
		#hamburger {
			float: right;
			display: block;
			cursor: pointer;

			.bar1,
			.bar2,
			.bar3 {
				width: 35px;
				height: 5px;
				background-color: white;
				margin: 6px 0;
				transition: 0.4s;
			}
		}
	}

	.change .bar1 {
		-webkit-transform: rotate(-45deg) translate(-9px, 6px);
		transform: rotate(-45deg) translate(-9px, 6px);
	}

	.change .bar2 {
		opacity: 0;
	}

	.change .bar3 {
		-webkit-transform: rotate(45deg) translate(-8px, -8px);
		transform: rotate(45deg) translate(-8px, -8px);
	}

	.sidenav {
		height: 100%;
		width: 0;
		position: fixed;
		z-index: 1;
		top: 0;
		left: 0;
		background-color: ${colors.grey_blue};
		overflow-x: hidden;
		transition: 0.5s;
		padding-top: 60px;
		display: flex;
		flex-direction: column;
		align-items: flex-start;

		a {
			padding: 20px;
			color: ${colors.dark} !important;
		}
	}

	@media screen and (max-height: 768px) {
		.sidenav {
			padding-top: 15px;
		}
	}
`;

const StyledLink = styled(NavLink)`
	padding: 0px 30px;
	text-decoration: none;
	font-size: 18px;
	text-align: center;
	color: white;
	transition: 0.3s;
	&:hover {
		cursor: pointer;
		color: ${colors.grey};
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

const Hamburger = styled.div`
	display: none;
`;

function Navigation() {
	function toogleHamburger() {
		const hamburger = document.getElementById('hamburger');
		hamburger.classList.toggle('change');

		const sideNav = document.getElementById('mySidenav');
		sideNav.style.width = sideNav.offsetWidth === 0 ? '250px' : '0px';
		const background = window.getComputedStyle(document.body, null).getPropertyValue('background-color');
		document.body.style.backgroundColor = background === 'rgba(0, 0, 0, 0)' ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0)';
	}

	window.addEventListener('click', () => {
		const sideNav = document.getElementById('mySidenav');
		if (sideNav.offsetWidth === 250) {
			const hamburger = document.getElementById('hamburger');
			hamburger.classList.remove('change');
			sideNav.style.width = '0px';
			document.body.style.backgroundColor = 'rgba(0,0,0,0)';
		}
	});

	return (
		<NavContainer>
			<NavLink to='/note-my-app'>
				<Logo src={logo} alt='logo' />
			</NavLink>
			<div className='links'>
				<StyledLink to='/feedback'>New feedback</StyledLink>
				<StyledLink to='/feedbackList'>List of feedbacks</StyledLink>
				<StyledLink to='/dashboard'>Dashboard</StyledLink>
			</div>
			<Dropdown className='links'>
				<User src={user} alt='logo' />
				<div className='dropdown-content'>
					<StyledLink to='/login'>Login</StyledLink>
					<StyledLink to='/signup'>Signup</StyledLink>
					{/* TODO logout before */}
					{/* TODO SEE THAT ONLY IF LOGGED IN */}
					<StyledLink to='/note-my-app'>Logout</StyledLink>
				</div>
			</Dropdown>

			<div id='mySidenav' className='sidenav'>
				<StyledLink to='/note-my-app'>Home</StyledLink>
				<StyledLink to='/feedback'>New feedback</StyledLink>
				<StyledLink to='/feedbackList'>List of feedbacks</StyledLink>
				<StyledLink to='/dashboard'>Dashboard</StyledLink>
				<StyledLink to='/login'>Login</StyledLink>
				<StyledLink to='/signup'>Signup</StyledLink>
				<StyledLink to='/note-my-app'>Logout</StyledLink>
			</div>

			<Hamburger id='hamburger' onClick={toogleHamburger}>
				<div className='bar1'></div>
				<div className='bar2'></div>
				<div className='bar3'></div>
			</Hamburger>
		</NavContainer>
	);
}
export default Navigation;
