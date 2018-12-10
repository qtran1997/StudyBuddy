import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";

import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Profile from "./components/layout/Profile";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";

import Dashboard from "./components/user/Dashboard";

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import ProfileSetup from "./components/auth/ProfileSetup";
import ChangeSettings from "./components/auth/ChangeSettings";

import Messenger from "./components/messenger/Messages";

import "./App.css";

// Check for token
if (localStorage.jwtToken) {
	// Set auth token header auth
	setAuthToken(localStorage.jwtToken);
	// Decode token and get user info and expiration
	const decoded = jwt_decode(localStorage.jwtToken);
	// Set user and isAuthenticated
	store.dispatch(setCurrentUser(decoded));

	// Check for expired token
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		// Logout the user
		store.dispatch(logoutUser());
		// TODO clear current profile
		store.dispatch(clearCurrentProfile());
		// Redirect to login
		window.location.href = "/login";
	}
}

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div className="App">
						<Navbar />
						<Route exact path="/" component={Landing} />
						<Route exact path="/dashboard" component={Dashboard} />
						<Route exact path="/messages" component={Messenger} />
						<Route exact path="/profile" component={Profile} />
						<Route
							exact
							path="/change-settings"
							component={ChangeSettings}
						/>
						<Route
							exact
							path="/profile-register"
							component={ProfileSetup}
						/>
						<div className="container">
							<Route
								exact
								path="/register"
								component={Register}
							/>
							<Route exact path="/login" component={Login} />
						</div>
						<Footer />
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
