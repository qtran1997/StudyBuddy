import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
// import { capitalize } from "../../actions/functions";
import profilePicture from "../../img/earth.png";

class Dashboard extends Component {
    componentDidMount() {
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push("/login");
        }
    }

    render() {
        // const { user } = this.props.auth;
        const { profile, loading } = this.props.profile;

        let dashboardContent;

        if (profile === null || loading) {
            dashboardContent = <h4>Loading...</h4>;
        } else {
            dashboardContent = <h1>Hello</h1>;
        }

        return (
            <div id="dashboard-container">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <p className="page-header">Your Dashboard</p>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3 text-center">
                            <img
                                className="profile-picture"
                                src={profilePicture}
                                alt="Your Profile Picture"
                            />
                            <br />
                        </div>
                        {dashboardContent}
                        <p>
                            <b>Name:</b>
                            {/* {profile.handle} */}
                        </p>
                        <br />
                        <p>Hello2</p>
                        <br />
                        <p>Hello3</p>
                        <br />
                    </div>
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <p className="page-header">Your Dashboard</p>
                            <hr />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
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
)(Dashboard);
