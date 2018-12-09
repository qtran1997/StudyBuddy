import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import { capitalize } from "../../actions/functions";

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            handle: ``,
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
    }

    componentDidMount() {
        this.props.getCurrentProfile();
    }

    render() {
        const userPicture = this.props.auth.user.avatar;
        const { user } = this.props.auth;
        const { profile, loading } = this.props.profile;

        let profileContent;
        let leftPanel;

        if (profile === null || loading) {
            profileContent = <h4>Loading...</h4>;
            leftPanel = <h6>Loading...</h6>;
        } else {
            profileContent = (
                <div id="profile-content">
                    <div id="profile-tutor-container">
                        <h4 className="text-center">Your Past Buddies</h4>
                        <div id="profile-tutor-list">
                            <div className="profile-tutors text-center">
                                <img
                                    className="tutors-picture"
                                    src={userPicture}
                                    alt="Tutor Name Here"
                                />
                                <h6>
                                    @handle
                                    <br />
                                    Quang Tran
                                </h6>
                                <div className="rating-star">
                                    <span>&#9733;</span>
                                </div>
                                <div className="rating-star">
                                    <span>&#9733;</span>
                                </div>
                                <div className="rating-star">
                                    <span>&#9733;</span>
                                </div>
                                <div className="rating-star">
                                    <span>&#9733;</span>
                                </div>
                                <div className="rating-star">
                                    <span>&#9733;</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="profile-class-container">
                        <h4 className="text-center">Your Classes</h4>
                        <div id="profile-class-list">
                            <div className="profile-classes text-center">
                                <h2>CS596</h2>
                                <div className="profile-classes-title">
                                    <h6>Wireless Networks</h6>
                                </div>
                                <h6>Section Number:</h6>
                                <div className="rating-star">
                                    <span>&#9733;</span>
                                </div>
                                <div className="rating-star">
                                    <span>&#9733;</span>
                                </div>
                                <div className="rating-star">
                                    <span>&#9733;</span>
                                </div>
                                <div className="rating-star">
                                    <span>&#9733;</span>
                                </div>
                                <div className="rating-star">
                                    <span>&#9733;</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );

            leftPanel = (
                <div id="profile-information-content">
                    {/* // Picture */}
                    <img
                        className="profile-picture"
                        src={userPicture}
                        alt="Your Profile Picture"
                    />
                    {/* // Handle */}
                    <h5>@{profile.username}</h5>
                    <hr className="white-line" />
                    {/* // Name */}
                    <p className="profile-title">
                        Name: {profile.user.fname + " " + profile.user.lname}
                    </p>
                    <hr className="white-line" />
                    {/* // Creation Date */}
                    <p className="profile-title">
                        Creation Date: {profile.date.substring(0, 10)}
                    </p>
                    <hr className="white-line" />
                    {/* // Ratings */}
                    <p className="profile-title">Rating: </p>
                    <div className="rating-star">
                        <span>&#9733;</span>
                        {/* rated = .rated-star */}
                    </div>
                    <div className="rating-star">
                        <span>&#9733;</span>
                    </div>
                    <div className="rating-star">
                        <span>&#9733;</span>
                    </div>
                    <div className="rating-star">
                        <span>&#9733;</span>
                    </div>
                    <div className="rating-star">
                        <span>&#9733;</span>
                    </div>
                    <br />
                    <br />
                    {/* // Change Settings */}
                    <Link to="change-settings">Change Settings</Link>
                </div>
            );
        }

        return (
            <div id="profile-container">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <p className="page-header">Your Profile</p>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 text-center profile-left-panel">
                            {leftPanel}
                        </div>
                        <div className="col-md-8 text-center profile-right-panel">
                            {profileContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Profile.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { getCurrentProfile }
)(Profile);
