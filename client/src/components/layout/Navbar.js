import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { loginUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";
import { capitalize } from "../../actions/functions";

class Navbar extends Component {
	onLogoutClick(e) {
		e.preventDefault();
		this.props.logoutUser();
		this.props.clearCurrentProfile();
		this.props.history.push("/");
	}

	constructor() {
		super();
		this.state = {
			username: ``,
			password: ``,
			errors: {}
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push("/dashboard");
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.isAuthenticated) {
			if (!nextProps.auth.user.registeredProfile) {
				this.props.history.push("/profile-register");
			} else {
				this.props.history.push("/dashboard");
			}
		}

		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmit(e) {
		e.preventDefault();

		const userData = {
			username: this.state.username,
			password: this.state.password
		};

		this.props.loginUser(userData);
	}

	render() {
		const { isAuthenticated, user } = this.props.auth;

		const authLinks = (
			<ul className="navbar-nav ml-auto">
				<li className="nav-item">
					<Link className="nav-link" to="/messages">
						{" "}
						Messages
					</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/profiles">
						{" "}
						Study
					</Link>
				</li>
				<li className="nav-item">
					<div className="dropdown show">
						<a
							className="dropdown-toggle nav-link"
							href=""
							role="button"
							data-toggle="dropdown"
							aria-haspopup="true"
							aria-expanded="false"
						>
							<img
								className="rounded-circle d-inline-block mr-2"
								src={user.avatar}
								alt={user.fname}
								style={{
									width: "25px",
									marginRight: "5px"
								}}
								title="You must have a Gravatar connected to your email to display an image"
							/>
							{capitalize(user.fname)}
						</a>

						<div
							className="dropdown-menu dropdown-menu-right"
							aria-labelledby="dropdownMenuLink"
						>
							<Link
								className="text-dark dropdown-item"
								to="/profile"
							>
								Your Profile
							</Link>
							<Link
								className="text-dark dropdown-item"
								to="/dashboard"
							>
								Dashboard
							</Link>
							<a
								href=""
								onClick={this.onLogoutClick.bind(this)}
								className="text-dark dropdown-item"
							>
								Logout
							</a>
						</div>
					</div>
				</li>
			</ul>
		);

		const guestLinks = (
			<ul className="navbar-nav ml-auto">
				<form onSubmit={this.onSubmit}>
					<li className="nav-item d-inline-block m-1">
						<label for="username">Username or Email</label>
						<input name="fp" value="1" type="hidden" />
						<input
							className="text-dark d-block p-1"
							name="username"
							type="text"
							value={this.state.username}
							onChange={this.onChange}
						/>
					</li>
					<li className="nav-item d-inline-block m-1">
						<label for="password">Password</label>
						<input
							className="text-dark d-block p-1"
							name="password"
							type="text"
							value={this.state.password}
							onChange={this.onChange}
						/>
					</li>
					<li className="nav-item d-inline-block m-1">
						<input
							value="Log In"
							type="submit"
							className="d-inline-block login-button p-1"
						/>
					</li>
				</form>
			</ul>
		);

		return (
			<nav className="navbar navbar-expand-sm navbar-dark bg-color">
				<div className="container">
					<Link className="navbar-brand" to="/">
						Study Buddy
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#mobile-nav"
					>
						<span className="navbar-toggler-icon" />
					</button>

					<div className="collapse navbar-collapse" id="mobile-nav">
						{isAuthenticated ? authLinks : guestLinks}
					</div>
				</div>
			</nav>
		);
	}
}

Navbar.propTypes = {
	loginUser: PropTypes.func.isRequired,
	logoutUser: PropTypes.func.isRequired,
	clearCurrentProfile: PropTypes.func.isRequired,
	registeredAccount: PropTypes.bool.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ logoutUser, clearCurrentProfile, loginUser }
)(withRouter(Navbar));
