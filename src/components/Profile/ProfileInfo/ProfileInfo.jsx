import React, {useState} from 'react'
import s from './ProfileInfo.module.css'
import Preloader from "../../commons/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ava from '../../../avatar/football-tiger-mascot-png-transparent-images-4483-pngio-tiger-mascot-png-1200_1238.png'
import ProfileReduxForm from "./ProfileDataForm";
const ProfileInfo = (props) => {
	let [editMode,setEditMode] = useState(false);
	if (!props.profile) {
		return <Preloader />
	}
	const loadNewPhoto = (e) => {
		if (e.target.files.length) {
			props.savePhoto(e.target.files[0])
		}
	}

	const onSubmit=  (formData) =>{
		 props.saveProfile(formData).then(
			 () =>{
			setEditMode(false);
		}
		 )
	}

	return 	(
		<div>
			<div className={s.userPhoto}>
				<img src={props.profile.photos.large || ava}/>
				{props.isOwner && <input onChange={loadNewPhoto} type={"file"}/>}
				{editMode
					?<ProfileReduxForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit} />
					:<ProfileData isOwner={props.isOwner} goToEditMode={()=>{setEditMode(true)}} profile={props.profile} />}
			</div>
		<ProfileStatusWithHooks status={props.status} updateUserStatus={props.updateUserStatus}/>

		</div>
	)
}

const ProfileData = ({profile,isOwner,goToEditMode}) => {
	return <div>
		{isOwner && <div><button onClick={goToEditMode}>edit</button></div>}
		<div>
			<b>Full Name</b>:profile.fullName}
		</div>
		<div>
			<b>Looking for a job</b>:{profile.fullName ? "yes" : "no"}
		</div>
		<div>
			<b>My skills</b>:{profile.lookingForAJobDescription}
		</div>
		<div>
			<b>About me</b>:{profile.aboutMe}
		</div>
		<div>
			<b>Contacts</b>:{Object.keys(profile.contacts).map(key => {
			return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
		})}
		</div>
	</div>
}


const Contact = ({contactTitle,contactValue}) => {
	return <div className={s.contact}><b>{contactTitle}</b>:{contactValue}</div>
}

export default ProfileInfo;