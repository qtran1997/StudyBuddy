import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import isEmpty from "../../validation/is-empty";
import {
	getMessages,
	getRecentMessages,
	sendMessages,
	clearCurrentMessages
} from "../../actions/messagesActions";

class Messages extends Component {
	constructor() {
		super();
		this.state = {
			name: ``,
			message: ``
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		if (!this.props.auth.isAuthenticated) {
			this.props.history.push("/login");
		}
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmit(e) {
		e.preventDefault();
		if (!isEmpty(this.state.text)) {
			const newMessage = {
				text: this.state.text
			};

			this.setState({ message: `` }); // Resets text inside of input field
		}
	}

	render() {
		const { user } = this.props.auth;
		return (
			<div>
				<div id="chat-container">
					<div id="chat-window">
						<div id="output" />
					</div>
				</div>
				<form onSubmit={this.onSubmit}>
					<input
						id="name"
						name="name"
						type="hidden"
						value={user.fname + " " + user.lname}
					/>
					<input
						id="message"
						name="message"
						type="text"
						placeholder="Message"
						onChange={this.onChange}
						value={this.state.message}
					/>
					<button type="submit" id="send">
						Send
					</button>
				</form>
			</div>
		);
	}
}

Messages.propTypes = {
	getMessages: PropTypes.func.isRequired,
	getRecentMessages: PropTypes.func.isRequired,
	sendMessages: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	recentMessages: state.recentMessages,
	messages: state.messages,
	auth: state.auth,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ getMessages, getRecentMessages, sendMessages }
)(Messages);
