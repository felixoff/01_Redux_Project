import React from "react";
import s from './ProfileInfo.module.css'
import {createField, Input, Textarea} from "../../commons/FormControls/FormControls";
import {reduxForm} from "redux-form";

const ProfileDataForm = ({handleSubmit,profile, error}) => {
    return <form onSubmit={handleSubmit}>
        <div><button>save</button></div>
        {error && <div className={s.formError}>
            {error}
        </div> }
        <div>
            <b>Full Name</b>:{createField(Input, [], "fullName", "Name")}
        </div>
        <div>
            <b>Looking for a job</b>:{createField(Input, [], "lookingForAJob", "", {type:"checkbox"})}
        </div>
        <div>
            <b>My skills</b>:{createField(Textarea, [], "lookingForAJobDescription", "My skills")}
        </div>
        <div>
            <b>About me</b>:{createField(Textarea, [], "aboutMe", "About me")}
        </div>
        <div>
              <b>Contacts</b>:{Object.keys(profile.contacts).map(key => {
            return <div key={key} className={s.contact}>
                <b>{key}:{createField(Input,[],"contacts."+key,key)}</b>
                    </div>
        })}
        </div>

    </form>
}

const ProfileReduxForm = reduxForm({form:"profileForm"})(ProfileDataForm);
export default ProfileReduxForm