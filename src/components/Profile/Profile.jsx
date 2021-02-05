import React from 'react'
import s from './Profile.module.css'
import MypostsContainer from './Myposts/Myposts-container'
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {

	return (
	<div>
		<ProfileInfo saveProfile={props.saveProfile} savePhoto={props.savePhoto} isOwner={props.isOwner} profile={props.profile} status={props.status} updateUserStatus={props.updateUserStatus} />
		<MypostsContainer />
	</div>
	)
}

export default Profile;