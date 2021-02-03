import React from 'react'
import Profile from "./Profile";
import {getUserProfile, getUserStatus, updateUserStatus} from './../../state/profile-reducer'
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
class ProfileContainer extends React.Component  {
	componentDidMount() {
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
	render() {
		return (
			<Profile  {...this.props} profile={this.props.profile} status={this.props.status} updateUserStatus={this.props.updateUserStatus}/>
		)
	}
}

let mapToProps = (state) =>({
	profile: state.profilePage.profile,
	status: state.profilePage.status,
	authorizedUserId:state.auth.userId,
	isAuth:state.auth.isAuth
})
export default  compose(
	connect(mapToProps,{getUserProfile, getUserStatus, updateUserStatus}),
	withRouter
)(ProfileContainer)