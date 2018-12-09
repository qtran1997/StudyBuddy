import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { changeSettingsUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class ChangeSettings extends Component {
    constructor() {
        super();
        this.state = {
            username: ``,
            fname: ``,
            lname: ``,
            email: ``,
            password: ``,
            password2: ``,
            errors: {},
            successes: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {}

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
        if (nextProps.successes) {
            this.setState({ successes: nextProps.successes });
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

        this.props.changeSettingsUser(newUser);
    }

    render() {
        const { errors } = this.state;
        const { successes } = this.state;

        console.log(successes);

        if (successes.errors) {
        } else {
            dsfsdfdsfdsd;
        }

        return (
            <div className="register content-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-8 text-center">
                                Change your settings and information.
                            </h1>
                            <hr />
                            <form noValidate onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="Username"
                                    name="username"
                                    type="text"
                                    value={this.state.username}
                                    onChange={this.onChange}
                                    error={errors.username}
                                    success={
                                        successes.successes.username
                                            ? successes.successes.username
                                            : ""
                                    }
                                />

                                <TextFieldGroup
                                    placeholder="First Name"
                                    name="fname"
                                    type="text"
                                    value={this.state.fname}
                                    onChange={this.onChange}
                                    error={errors.fname}
                                    success={successes.fname}
                                />

                                <TextFieldGroup
                                    placeholder="Last Name"
                                    name="lname"
                                    type="text"
                                    value={this.state.lname}
                                    onChange={this.onChange}
                                    error={errors.lname}
                                    success={successes.lname}
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

ChangeSettings.propTypes = {
    changeSettingsUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    successes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    successes: state.successes
});

export default connect(
    mapStateToProps,
    { changeSettingsUser }
)(withRouter(ChangeSettings));
