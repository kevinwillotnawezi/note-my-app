import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './assets/styles/index.css';
import Navigation from './components/navigation/navigation';
import Home from './pages/home/home';
import Dashboard from './pages/dashboard/dashboard';
import Login from './pages/login/login';
import Signup from './pages/signup/signup';
import Feedback from './pages/newFeedback/newFeedback';
import FeedbackList from './pages/feedbackList/feedbackList';
import FeedbackWithComments from './pages/feedbackWithComments/feedbackWithComments';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<Navigation />
			<Routes>
				<Route exact path='/' element={<Home />} />
				<Route path='/note-my-app' element={<Home />} />
				<Route path='/dashboard' element={<Dashboard />} />
				<Route path='/login' element={<Login />} />
				<Route path='/signup' element={<Signup />} />
				<Route path='/feedback' element={<Feedback />} />
				<Route path='/feedbackWithComments/:id' element={<FeedbackWithComments />} />
				<Route path='/feedbackList' element={<FeedbackList />} />
			</Routes>
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
