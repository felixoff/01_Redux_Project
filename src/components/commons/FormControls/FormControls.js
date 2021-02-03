import React from 'react';
import styles from "./FormControls.module.css";
import {Field} from "redux-form";
import {required} from "../../../validators/validators";
export const FormControls = ({input,meta:{touched, error}, ...props}) => {
    const hasError= touched && error;
    return (
        <div className={styles.formControl + " " +(hasError ? styles.error : "")}>
            <div>
                {props.children}
            </div>
            <div>
                {hasError && <span >{error}</span>}
            </div>
        </div>
    )
}

export const Textarea = (props) => {
    const {input,meta, ...restProps}= props;
    return (
            <FormControls {...props}><textarea {...input} {...restProps} /></FormControls>
    )
}

export const Input = (props) => {
    const {input,meta, ...restProps}= props;
    return (
        <FormControls {...props}><input {...input} {...restProps} /></FormControls>
    )
}

export const createField = (input, validator=[], name, placeholder, props={}, text="") => (
    <div>
        <Field component={input} validate={validator} name={name} placeholder={placeholder} {...props}/>{text}
    </div>
)