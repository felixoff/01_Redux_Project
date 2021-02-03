import {usersAPI,profileAPI} from "../api/api";
import {acceptFollow, toggleFollowingInProcess} from "./users-reducer";

const ADD_POST= 'ADD-POST'
const SET_USER_PROFILE='SET_USER_PROFILE'
const SET_USER_STATUS='SET_USER_STATUS'
const DELETE_POST='DELETE_POST'

let initialState = {
    posts: [
        {id: 0, message: 'Nikita', likeCount: 3},
        {id: 1, message: 'Sasha', likeCount: 5},
        {id: 2, message: 'Katya', likeCount: 5},
        {id: 3, message: 'Elena', likeCount: 8},
        {id: 4, message: 'Oleg', likeCount: 5},
    ],
    profile: null,
    status: ''
}

const profileReducer= (state = initialState, action) => {
    if (action.type === ADD_POST) {
        {
            let NewPost = {
                id: 0,
                message: action.postText,
                likeCount: 5
            };
            let stateCopy = {...state};
            stateCopy.posts = [...state.posts];
            stateCopy.posts.push(NewPost);
            stateCopy.newPosText = '';
            return (stateCopy);
        }
    } else if (action.type === SET_USER_PROFILE) {
        {
            let stateCopy = {...state};
            stateCopy.profile = action.profile;
            return (stateCopy);
        }
    } else if (action.type === SET_USER_STATUS) {
        {
            let stateCopy = {...state};
            stateCopy.status = action.status;
            return (stateCopy);
        }
    } else if (action.type === DELETE_POST) {
        {
            let stateCopy = {...state};
            stateCopy.posts = [...state.posts];
            stateCopy.posts.filter( p=> (p.id != action.postId));
            return (stateCopy);
        }
    } else {
        return (state);
    }
}
export const getUserProfile=(userId) => (dispatch) => {
    profileAPI.getUser(userId).then(response => {
        dispatch(setUserProfile(response.data));
    })
}
export const setUserProfile = (profile) =>({type:SET_USER_PROFILE, profile});
export const addPostActionCreator= (postText) => ({type: ADD_POST, postText});
export const setUserStatus = (status) => ({type: SET_USER_STATUS, status});
export const deletePost = (postId) => ({type: DELETE_POST, postId});

export const updateUserStatus=(status) => (dispatch) => {
    profileAPI.updateStatus(status).then(response => {
        if (response.data.resultCode === 0) {
        dispatch(setUserStatus(status));
        }
    });
}

export const getUserStatus=(userId) => (dispatch) => {
    profileAPI.getStatus(userId)
        .then(response => {
            dispatch(setUserStatus(response.data));
        });
}

export default profileReducer;