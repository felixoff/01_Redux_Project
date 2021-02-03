import React from 'react'
import s from './ProfileInfo.module.css'
import Preloader from "../../commons/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
const ProfileInfo = (props) => {
	if (!props.profile) {
		return <Preloader />
	}
	return 	(
		<div>
			{/*<div>
			<img src= 'https://i1.wallbox.ru/wallpapers/main/201615/2f58e3fb55d5340.jpg'/>
		</div>*/}
		<ProfileStatusWithHooks status={props.status} updateUserStatus={props.updateUserStatus}/>
		<div className={s.descriptionBlock}>
			<img src={props.profile.photos.large}/>
		</div>
		</div>
	)
}

export default ProfileInfo;