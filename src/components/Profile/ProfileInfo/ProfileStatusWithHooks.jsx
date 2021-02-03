import React , {useState, useEffect} from 'react'
import s from './ProfileInfo.module.css'

const ProfileStatusWithHooks = (props) => {
    let [editMode,setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status)

    const activateEditMode = () => {
        setEditMode(true);
    }

    useEffect( () => {
        setStatus(props.status)
    },[props.status]);


    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateUserStatus(status);
    }
    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    }

    return (
        <div>
            {! editMode &&
            <div>
                <span onDoubleClick={activateEditMode}>{props.status || "NO STATUS"}</span>
            </div>}
            {editMode &&
            <div>
                <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status}/>
            </div>
            }
        </div>
    )
}

export default ProfileStatusWithHooks;