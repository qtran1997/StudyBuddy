import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class Register extends Component {
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

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push("/login");
		}
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
			<div className="register content-wrapper">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Sign Up</h1>
							<p className="lead text-center">
								Create your Study Buddy account
							</p>
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
		);
	}
}

Register.propTypes = {
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
)(withRouter(Register));
