import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import PropTypes from "prop-types";
import { createProfile, getCurrentProfile } from "../../actions/profileAction";
import isEmpty from "../../validation/is-empty";
import { Link } from "react-router-dom";
class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: "",
      company: "",
      location: "",
      website: "",
      status: "",
      skills: "",
      githubUserName: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedIn: "",
      youtube: "",
      instagram: "",
      errors: {}
    };
  }
  static propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired
  };
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    const profile = {
      handle: this.state.handle,
      company: this.state.company,
      location: this.state.location,
      website: this.state.website,
      status: this.state.status,
      skills: this.state.skills,
      githubUserName: this.state.githubUserName,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedIn: this.state.linkedIn,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };
    this.props.createProfile(profile, this.props.history);
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;
      // bring skills to  csv
      const skillsCSV = profile.skills.join(",");
      profile.company = !isEmpty(profile.company) ? profile.company : "";
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.githubUserName = !isEmpty(profile.githubUserName)
        ? profile.githubUserName
        : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : "";
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : "";
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : "";
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : "";
      profile.linkedIn = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : "";

      this.setState({
        handle: profile.handle,
        company: profile.company,
        location: profile.location,
        website: profile.website,
        status: profile.status,
        skills: skillsCSV,
        githubUserName: profile.githubUserName,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedIn: profile.linkedIn,
        youtube: profile.youtube,
        instagram: profile.instagram
      });
    }
  }
  render() {
    const { errors, displaySocialInputs } = this.state;
    let SocialInputs;
    if (displaySocialInputs) {
      SocialInputs = (
        <div className="">
          <InputGroup
            placeholder="FaceBook Profile URL"
            name="facebook"
            value={this.state.facebook}
            icon="fab fa-facebook"
            onChange={this.handleChange}
            error={errors.facebook}
          />
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            value={this.state.twitter}
            icon="fab fa-twitter"
            onChange={this.handleChange}
            error={errors.twitter}
          />
          <InputGroup
            placeholder="LinkedIn Profile URL"
            name="linkedIn"
            value={this.state.linkedIn}
            icon="fab fa-linkedin"
            onChange={this.handleChange}
            error={errors.linkedIn}
          />
          <InputGroup
            placeholder="Instagram Profile URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.handleChange}
            error={errors.instagram}
          />
          <InputGroup
            placeholder="Youtube Profile URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.handleChange}
            error={errors.youtube}
          />
        </div>
      );
    }
    const options = [
      { label: "* Select Professional Status", value: 0 },
      { label: "Developer", value: "Developer" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Manager", value: "Manager" },
      { label: "Student or Learner", value: "Student or Learner" },
      { label: "Instructor", value: "Instructor" },
      { label: "Intern", value: "Intern" },
      { label: "Other", value: "Other" }
    ];
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Let's get some info to make your profile stand out
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.handleSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.handleChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL. Your full name, company name, nickname, etc "
                />
                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.handleChange}
                  error={errors.status}
                  options={options}
                  info="Give us and idea of where you are at your career "
                />
                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.handleChange}
                  error={errors.company}
                  info="Could be your own company or one you work for. "
                />
                <TextFieldGroup
                  placeholder="http://example.com"
                  name="website"
                  value={this.state.website}
                  onChange={this.handleChange}
                  error={errors.website}
                  info=" "
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.handleChange}
                  error={errors.location}
                  info=""
                />
                <TextFieldGroup
                  placeholder="Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.handleChange}
                  error={errors.skills}
                  info="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP) with no spaces."
                />
                <TextFieldGroup
                  placeholder="Github Username"
                  name="githubUserName"
                  value={this.state.githubUserName}
                  onChange={this.handleChange}
                  error={errors.githubUserName}
                  info="If you want your latest github repos to appear on your profile, include your github username"
                />
                <TextAreaFieldGroup
                  placeholder="Short Bio .."
                  name="bio"
                  value={this.state.bio}
                  onChange={this.handleChange}
                  error={errors.bio}
                  info="Tell us little bit about yourself. "
                />

                <div className="mb-3">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                  >
                    Add Social Networks Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {SocialInputs}
                <input
                  type="submit"
                  value="Submit"
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

const mapStateToProps = ({ profile, errors }) => {
  return {
    profile,
    errors
  };
};

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(EditProfile));
