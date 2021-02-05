import {authAPI, captchaAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_PAGE= 'sjennett/auth/SET_USER_PAGE'
const SET_CAPTCHA_URL_SUCCESS= 'sjennett/auth/SET_CAPTCHA_URL_SUCCESS'

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaURL: null

}

let authReducer= (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_PAGE:
        case SET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}
export const setUserPage = (userId, email, login, isAuth) => ({type: SET_USER_PAGE, payload:{userId, email, login, isAuth}});
export const setCaptchaURLSuccess = (captchaURL) => ({type: SET_CAPTCHA_URL_SUCCESS, payload:{captchaURL}});

export const getUserPage=() => async(dispatch) => {
    let response = await authAPI.me();
        if (response.data.resultCode === 0) {
            let {email, id, login} = response.data.data;
            dispatch(setUserPage(id, email, login, true));
        }
}

export const login=(email,password, rememberMe, captcha) => async (dispatch) => {

    let response = await authAPI.login(email,password, rememberMe,captcha);
        if (response.data.resultCode === 0) {
            dispatch(getUserPage())
        } else {
            if (response.data.resultCode === 10) {
                dispatch(readCaptcha());
            }
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

export const readCaptcha=() => async (dispatch) => {

    let response = await captchaAPI.getCaptcha();
    const captchaURL = response.data.url;
    dispatch(setCaptchaURLSuccess(captchaURL));
}


export default authReducer;