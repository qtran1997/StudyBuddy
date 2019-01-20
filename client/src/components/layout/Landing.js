import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class Landing extends Component {
	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push("/login");
		}
	}

	constructor() {
		super();
		this.state = {
			username: ``,
			fname: ``,
			lname: ``,
			email: ``,
			password: ``,
			password2: ``,
			errors: {}
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmit(e) {
		e.preventDefault();

		const newUser = {
			username: this.state.username,
			fname: this.state.fname,
			lname: this.state.lname,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2
		};

		this.props.registerUser(newUser, this.props.history);
	}

	render() {
		const { errors } = this.state;

		return (
			<div className="landing">
				<div className="landing-inner text-dark">
					<div className="container">
						<div className="row">
							<div className="col-md-6 text-center">
								<h1 className="display-3 mb-4">Study Buddy</h1>
								<p className="lead">
									{" "}
									Connecting peers throughout San Diego State
									University in order to get ahead in courses.
								</p>
							</div>
							<div className="col-md-6 text-center">
								<h3 className="display-4 text-left">Sign Up</h3>
								<h5 className="text-left">
									Exclusive to students at San Diego State
									University
								</h5>
								<form noValidate onSubmit={this.onSubmit}>
									<TextFieldGroup
										placeholder="Username"
										name="username"
										type="text"
										value={this.state.username}
										onChange={this.onChange}
										error={errors.username}
									/>

									<TextFieldGroup
										placeholder="First Name"
										name="fname"
										type="text"
										value={this.state.fname}
										onChange={this.onChange}
										error={errors.fname}
									/>

									<TextFieldGroup
										placeholder="Last Name"
										name="lname"
										type="text"
										value={this.state.lname}
										onChange={this.onChange}
										error={errors.lname}
									/>

									<TextFieldGroup
										placeholder="Email Address"
										name="email"
										type="email"
										value={this.state.email}
										onChange={this.onChange}
										error={errors.email}
										info="This site uses Gravatar so if you want a
                                        profile image, use a Gravatar email"
									/>

									<TextFieldGroup
										placeholder="New Password"
										name="password"
										type="password"
										value={this.state.password}
										onChange={this.onChange}
										error={errors.password}
									/>

									<TextFieldGroup
										placeholder="Confirm Password"
										name="password2"
										type="password"
										value={this.state.password2}
										onChange={this.onChange}
										error={errors.password2}
									/>

									<input
										type="submit"
										className="btn btn-info btn-block mt-4"
									/>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Landing.propTypes = {
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ registerUser }
)(withRouter(Landing));
