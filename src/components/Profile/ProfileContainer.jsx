import React from 'react'
import Profile from "./Profile";
import {getUserProfile, getUserStatus, savePhoto, saveProfile, updateUserStatus} from './../../state/profile-reducer'
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
class ProfileContainer extends React.Component  {
	refreshProfile() {
		let userId = this.props.match.params.userId
		if (!userId) {
			userId = this.props.authorizedUserId;
			if (!userId) {
				this.props.history.push("/login");
			}
		}
		this.props.getUserProfile(userId);
		this.props.getUserStatus(userId);
	}

	componentDidMount() {
			this.refreshProfile();
			}

	componentDidUpdate(prevProps, prevState, snapshot) {
			if (this.props.match.params.userId != prevProps.match.params.userId) {
				this.refreshProfile();
			}
			}

	render() {
		return (
			<Profile  {...this.props}
					  profile={this.props.profile}
					  status={this.props.status}
					  updateUserStatus={this.props.updateUserStatus}
					  isOwner={!this.props.match.params.userId}
					  savePhoto={this.props.savePhoto}
					  saveProfile={this.props.saveProfile}
			/>
		)
	}
}

let mapToProps = (state) =>({
	profile: state.profilePage.profile,
	status: state.profilePage.status,
	authorizedUserId:state.auth.userId,
	isAuth:state.auth.isAuth
})
export default  compose(	withRouter,
	connect(mapToProps,{getUserProfile, getUserStatus, updateUserStatus, savePhoto, saveProfile})
)(ProfileContainer)