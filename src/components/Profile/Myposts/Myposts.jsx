import React from 'react'
import s from './Myposts.module.css'
import Post from './Post/Post'
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../validators/validators";
import {Textarea} from "../../commons/FormControls/FormControls";

/*	componentDidMount() {
setTimeout(() =>{
this.setState({a:12});
},3000)
}

shouldComponentUpdate(nextProps, nextState) {
nextProps != this.props || nextState != this.state;
}*/


const Myposts=React.memo((props)=> {
	let postsElements = props.posts.map(p => <Post key={p.id} message={p.message} like={p.likeCount}/>);
	let addPost = (values) => {
		props.addPost(values.postText);
	}
	return <div className={s.postsBlock}>
		<h3>Posts</h3>
		<ProfilePostsReduxForm onSubmit={addPost}/>
		<div className={s.posts}>
			{postsElements}
		</div>
	</div>;
});

const maxLength10=maxLengthCreator(10);
const ProfilePostsForm=(props) => {
	return (<form onSubmit={props.handleSubmit}>
			<div>
				<Field component={Textarea} name={"postText"} placeholder={"Enter Post Text"} validate={[required,maxLength10]}/>
			</div>
			<div>
				<button>Add Post</button>
			</div>
		</form>
	)
}

const ProfilePostsReduxForm=reduxForm({form:"posts"})(ProfilePostsForm);

export default Myposts;