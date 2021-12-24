import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/index.css';
import Navigation from './components/navigation/navigation';
import Home from './pages/home/home';
import Dashboard from './pages/dashboard/dashboard';
import Login from './pages/login/login';
import Signup from './pages/signup/signup';
import Rating from './pages/newRating/newRating';
import RatingList from './pages/ratingList/ratingList';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<Navigation />
			<Routes>
				<Route exact path='/' element={<Home />} />
			</Routes>
			<Routes>
				<Route path='/dashboard' element={<Dashboard />} />
			</Routes>
			<Routes>
				<Route path='/login' element={<Login />} />
			</Routes>
			<Routes>
				<Route path='/signup' element={<Signup />} />
			</Routes>
			<Routes>
				<Route path='/rating' element={<Rating />} />
			</Routes>
			<Routes>
				<Route path='/ratingList' element={<RatingList />} />
			</Routes>
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
