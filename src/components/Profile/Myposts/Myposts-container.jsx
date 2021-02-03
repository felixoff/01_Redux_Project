import React from 'react'
import {addPostActionCreator} from "../../../state/profile-reducer"
import Myposts from "./Myposts";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
	return {
		posts: state.profilePage.posts,
		newPosText: state.profilePage.newPosText
	}
}
let mapDispatchToProps = (dispatch) => {
	return {
		addPost: (postText) => {
			dispatch(addPostActionCreator(postText));
		}
	}
}

const MypostsContainer = connect(mapStateToProps, mapDispatchToProps)(Myposts);

export default MypostsContainer;