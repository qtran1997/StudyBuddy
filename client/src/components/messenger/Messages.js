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
            text: ``,
            messageCount: 12,
            maxMessages: false,
            insideChat: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.viewMore = this.viewMore.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);
        this.enterChat = this.enterChat.bind(this);
        this.exitChat = this.exitChat.bind(this);
    }

    scrollToBottom() {
        if (this.state.insideChat)
            this.messagesEnd.scrollIntoView({ behavior: "instant" }, false);
    }

    componentDidMount() {
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push("/login");
        }

        this.props.getRecentMessages();
    }

    componentWillUnmount() {
        clearCurrentMessages();
    }

    componentDidUpdate() {
        this.scrollToBottom();
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

            this.props.sendMessages("5b4cd73b539b1425748b809e", newMessage);
            this.setState({ messageCount: this.state.messageCount + 1 }); // Adds space for new message
            this.setState({ text: `` }); // Resets text inside of input field
            document.getElementsByClassName("messenger-input")[0].focus(); // Focus on input box after pressing send
        }
    }

    exitChat() {
        this.setState({ insideChat: false });
        clearCurrentMessages();
    }

    enterChat(userid) {
        this.setState({ insideChat: true });
        this.props.getMessages("5b4cd73b539b1425748b809e");
    }

    viewMore() {
        const { messages } = this.props.messages;
        let messagesSize = this.state.messageCount + 9;
        if (messages.messages[messagesSize] == null) {
            messagesSize = messages.messages.length - 1;
            this.setState({ maxMessages: true });
        }
        this.setState({ messageCount: messagesSize });
    }

    render() {
        const { user } = this.props.auth;
        const { messages, loading } = this.props.messages;
        const { recentMessages } = this.props.messages;

        let TESTING;

        if (recentMessages === null || loading) {
        } else {
            const recentMessageSize = recentMessages.length;
            var orderedRecentMessages = [];
            for (var j = 0; j < recentMessageSize; j++) {
                console
                    .log
                    // new Date(recentMessages[j].messages[0].date).getTime()
                    ();
            }
        }

        let messengerMessages = [];
        let messagesSize;
        let loadingtest;

        var viewMoreButton = ( // Conditional View More Button
            <button className="view-more-messages" onClick={this.viewMore}>
                View More
            </button>
        );

        if (this.state.maxMessages) viewMoreButton = "";

        if (messages === null || loading) {
            // Loading screen before messages have fully loaded
            loadingtest = <h1 className="text-center">Loading...</h1>;
        } else {
            // Adding messages into array to push to react
            messagesSize = this.state.messageCount;

            if (messages.messages[messagesSize] == null) {
                messagesSize = messages.messages.length - 1;
            }
            let otheruser;
            if (user.id === messages.user1) {
                otheruser = messages.user2;
            } else {
                otheruser = messages.user1;
            }

            for (var i = messagesSize; i >= 0; i--) {
                if (messages.messages.length === 0) {
                    viewMoreButton = "";
                    messengerMessages.unshift(
                        <h1 className="text-center">
                            You have no messages with this user.
                        </h1>
                    );
                } else if (messages.messages[i] != null) {
                    if (user.id === messages.messages[i].user) {
                        messengerMessages.unshift(
                            <div className="right-message message">
                                <p className="message-text">
                                    {messages.messages[i].text}
                                </p>
                            </div>
                        );
                    } else if (otheruser === messages.messages[i].user) {
                        messengerMessages.unshift(
                            <div className="left-message message">
                                <p className="message-text">
                                    {messages.messages[i].text}
                                </p>
                            </div>
                        );
                    } else {
                        messengerMessages.unshift(
                            <h4 className="text-center">FATAL ERROR.</h4>
                        );
                    }
                }
            }
        }

        let messengerContent;

        if (this.state.insideChat) {
            // Inside of a chat with someone
            messengerContent = (
                <div className="messenger-container text-center">
                    <div className="messenger-settings">
                        <div className="messenger-settings-item exit-chat">
                            <button
                                className="messages-settings-buttons"
                                onClick={this.exitChat}
                            >
                                &#x274C;
                            </button>
                        </div>
                        <div className="messenger-settings-item chat-name">
                            <p className="messages-settings-buttons">
                                name here
                            </p>
                        </div>
                        <div className="messenger-settings-item chat-settings">
                            <button className="messages-settings-buttons">
                                &#9881;
                            </button>
                        </div>
                    </div>
                    <div className="messages-container">
                        {viewMoreButton}
                        {messengerMessages
                            .slice(0)
                            .reverse()
                            .map((text, i) => {
                                const j = messagesSize - i;
                                if (messages.messages.length === 0) {
                                    return (
                                        <h1 className="text-center">
                                            You have no messages with this user.
                                        </h1>
                                    );
                                } else if (
                                    user.id === messages.messages[j].user
                                ) {
                                    return (
                                        <div
                                            className="message-wrapper text-right"
                                            key={j}
                                        >
                                            {text}
                                            <img
                                                className="user-image"
                                                alt="Current User"
                                                src={
                                                    messages.messages[j].avatar
                                                }
                                            />
                                            <p className="message-date">
                                                {messages.messages[
                                                    j
                                                ].date.substr(0, 10) +
                                                    " " +
                                                    messages.messages[
                                                        j
                                                    ].date.substr(11, 16)}
                                            </p>
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div
                                            className="message-wrapper text-left"
                                            key={j}
                                        >
                                            <img
                                                className="user-image"
                                                alt="Other User"
                                                src={
                                                    messages.messages[j].avatar
                                                }
                                            />
                                            {text}

                                            <p className="message-date">
                                                {messages.messages[
                                                    j
                                                ].date.substr(0, 10) +
                                                    " " +
                                                    messages.messages[
                                                        j
                                                    ].date.substr(11, 16)}
                                            </p>
                                        </div>
                                    );
                                }
                            })}
                        <div
                            ref={el => {
                                this.messagesEnd = el;
                            }}
                        />
                    </div>
                    <form onSubmit={this.onSubmit}>
                        <textarea
                            className="messenger-input"
                            name="text"
                            type="text"
                            value={this.state.text}
                            onChange={this.onChange}
                            placeholder="Send a Message..."
                        />
                        <button id="send-message" type="submit">
                            Send
                        </button>
                    </form>
                </div>
            );
        } else {
            // Selecting a person to chat with
            messengerContent = (
                <div className="messenger-container text-center">
                    {TESTING}
                    <button onClick={this.enterChat}>test</button>
                </div>
            );
        }

        return <div>{messengerContent}</div>;
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
