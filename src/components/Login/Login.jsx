import React from 'react'
import {Field,reduxForm} from 'redux-form'
import {Input} from "../commons/FormControls/FormControls";
import {required} from "../../validators/validators";
import {login} from "../../state/auth-reducer";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import styles from "./../commons/FormControls/FormControls.module.css";
import {createField} from "./../commons/FormControls/FormControls";
const LoginForm=({handleSubmit, error, captchaURL}) => {

    return (<form onSubmit={handleSubmit}>
        {createField(Input,[required], "email", "Email")}
        {createField(Input,[required], "password", "Password", {type: "password"})}
        {createField(Input,[], "rememberMe", null, {type:"checkbox"}, "rememberMe")}
        {captchaURL && <img src={captchaURL}/>}
        {captchaURL && createField(Input,[required], "captcha", "Enter Symbols from img", {})}
        {error && <div className={styles.formSummaryError}>
            {error};
        </div>}
        <div>
            <button>Login</button>
        </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({form:"login"})(LoginForm);

const Login=(props) => {
    const onSubmit=(formData) =>{
                props.login(formData.email,formData.password,formData.rememberMe, formData.captcha);
    }
    if (props.isAuth) {return <Redirect to={'/profile'} />}
    return <div>
    <h1>LOGIN</h1>
    <LoginReduxForm captchaURL={props.captchaURL} onSubmit={onSubmit}/>
    </div>
}
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaURL: state.auth.captchaURL
})

export default connect(mapStateToProps,{login})(Login);