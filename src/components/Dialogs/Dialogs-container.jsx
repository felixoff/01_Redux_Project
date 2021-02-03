import React from 'react'
import {sendMessageActionCreator} from "../../state/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "./../../hoc/withAuthRedirect"
import {compose} from "redux";
import {getUserProfile} from "../../state/profile-reducer";
let mapStateToProps = (state) =>{
	return{
		dialogsPage: state.dialogsPage
	}
}
let mapDispatchToProps= (dispatch) =>{
	return{
		sendMessage: (newMessageBody) => {
			dispatch(sendMessageActionCreator(newMessageBody));
		}
	}
}

export default compose(connect(mapStateToProps,mapDispatchToProps),
	withAuthRedirect
)(Dialogs)