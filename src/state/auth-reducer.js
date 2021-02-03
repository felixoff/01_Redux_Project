import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_PAGE= 'sjennett/auth/SET_USER_PAGE'

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false

}

let authReducer= (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_PAGE:
            return {
            ...state,
            ...action.payload
            }
        default:
            return state;
    }
}
export const setUserPage = (userId, email, login, isAuth) => ({type: SET_USER_PAGE, payload:{userId, email, login, isAuth}});

export const getUserPage=() => async(dispatch) => {
    let response = await authAPI.me();
        if (response.data.resultCode === 0) {
            let {email, id, login} = response.data.data;
            dispatch(setUserPage(id, email, login, true));
        }
}

export const login=(email,password, rememberMe) => async (dispatch) => {

    let response = await authAPI.login(email,password, rememberMe);
        if (response.data.resultCode === 0) {
            dispatch(getUserPage())
        } else {
            let kindError = response.data.messages.length > 0 ? response.data.messages[0] : "Some Error"
            dispatch(stopSubmit("login",{_error: kindError}));
        }
}

export const logout=() => async (dispatch) => {
    let response = await authAPI.logout();
        if (response.data.resultCode === 0) {
            dispatch(setUserPage(null, null, null, false));
        }
}

export default authReducer;