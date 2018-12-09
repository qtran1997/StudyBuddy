import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";
import { setupProfile } from "../../actions/authActions";

class ProfileSetup extends Component {
    constructor() {
        super();
        this.state = {
            company: ``,
            website: ``,
            location: ``,
            bio: ``,
            status: ``,
            githubusername: ``,
            skills: [],
            youtube: ``,
            twitter: ``,
            facebook: ``,
            linkedin: ``,
            instagram: ``,
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {}

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

        const profileData = {
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            bio: this.state.bio,
            status: this.state.status,
            githubusername: this.state.githubusername,
            skills: this.state.skills,
            youtube: this.state.youtube,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            instagram: this.state.instagram
        };

        this.props.setupProfile(profileData, this.props.history);
    }

    render() {
        const { errors } = this.state;

        const { user } = this.props.auth;

        let title = (
            <div>
                <h1 className="display-4 text-center">
                    Before you can start...
                </h1>
                <p className="lead text-center">
                    Please provide information so that we can set up your
                    profile.
                </p>
            </div>
        );

        if (user.registeredProfile) {
            title = (
                <div>
                    <h1 className="display-4 text-center">
                        Changing your information
                    </h1>
                    <p className="lead text-center">
                        Change the fields that you want (you do not have to
                        change them all).
                    </p>
                </div>
            );
        }

        return (
            <div className="profile-setup content-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            {title}
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="Company"
                                    name="company"
                                    type="text"
                                    value={this.state.company}
                                    onChange={this.onChange}
                                    error={errors.company}
                                />

                                <TextFieldGroup
                                    placeholder="Website"
                                    name="website"
                                    type="text"
                                    value={this.state.website}
                                    onChange={this.onChange}
                                    error={errors.website}
                                />

                                <TextFieldGroup
                                    placeholder="Location"
                                    name="location"
                                    type="text"
                                    value={this.state.location}
                                    onChange={this.onChange}
                                    error={errors.location}
                                />

                                <TextFieldGroup
                                    placeholder="Biography"
                                    name="bio"
                                    type="text"
                                    value={this.state.bio}
                                    onChange={this.onChange}
                                    error={errors.bio}
                                />

                                <TextFieldGroup
                                    placeholder="Status"
                                    name="status"
                                    type="text"
                                    value={this.state.status}
                                    onChange={this.onChange}
                                    error={errors.status}
                                />

                                <TextFieldGroup
                                    placeholder="GitHub"
                                    name="githubusername"
                                    type="text"
                                    value={this.state.githubusername}
                                    onChange={this.onChange}
                                    error={errors.githubusername}
                                />

                                <TextFieldGroup
                                    placeholder="Skills"
                                    name="skills"
                                    type="text"
                                    value={this.state.skills}
                                    onChange={this.onChange}
                                    error={errors.skills}
                                />

                                <h5 class="text-center">Social Media</h5>

                                <TextFieldGroup
                                    placeholder="Youtube"
                                    name="youtube"
                                    type="text"
                                    value={this.state.youtube}
                                    onChange={this.onChange}
                                    error={errors.youtube}
                                />

                                <TextFieldGroup
                                    placeholder="Twitter"
                                    name="twitter"
                                    type="text"
                                    value={this.state.twitter}
                                    onChange={this.onChange}
                                    error={errors.twitter}
                                />

                                <TextFieldGroup
                                    placeholder="Facebook"
                                    name="facebook"
                                    type="text"
                                    value={this.state.facebook}
                                    onChange={this.onChange}
                                    error={errors.facebook}
                                />

                                <TextFieldGroup
                                    placeholder="LinkedIn"
                                    name="linkedin"
                                    type="text"
                                    value={this.state.linkedin}
                                    onChange={this.onChange}
                                    error={errors.linkedin}
                                />

                                <TextFieldGroup
                                    placeholder="Instagram"
                                    name="instagram"
                                    type="text"
                                    value={this.state.instagram}
                                    onChange={this.onChange}
                                    error={errors.instagram}
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

ProfileSetup.propTypes = {
    setupProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    user: state.user,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { setupProfile }
)(withRouter(ProfileSetup));
