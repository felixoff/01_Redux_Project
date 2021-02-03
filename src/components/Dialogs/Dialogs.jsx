import React from 'react'
import s from './Dialogs.module.css'
import Dialog from "./Dialog/Dialog";
import Message from "./Message/Message";
import {Redirect} from "react-router-dom"
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../commons/FormControls/FormControls";
import {maxLengthCreator, required} from "../../validators/validators";
const Dialogs = (props) => {

	let dialogsElements = props.dialogsPage.dialogsData.map( d => <Dialog name={d.name} id={d.id} /> )
	let messagesElements = props.dialogsPage.messagesData.map( m =><Message message={m.message} /> )


	let addMessage=(values)=>{
		props.sendMessage(values.newMessageBody);
	}

	return 	(
	<div className={s.dialogs}>
		<div className={s.dialogItems}>
			{dialogsElements}
		</div>
		<div className={s.messages}>
			<div>{messagesElements}</div>
		</div>
		<DialogsReduxForm onSubmit={addMessage}/>
	</div>
	)
}
const maxLength50= maxLengthCreator(50);
const DialogsForm=(props) => {
	return(<form onSubmit={props.handleSubmit}>
		<div>
			<Field component={Textarea}  validate={[required,maxLength50]} name={"newMessageBody"} placeholder={'Enter your message'}/>
		</div>
		<div>
			<button >Send Message</button>
		</div>
	</form>)
}

const DialogsReduxForm=reduxForm({form:"dialogs"})(DialogsForm);

export default Dialogs;