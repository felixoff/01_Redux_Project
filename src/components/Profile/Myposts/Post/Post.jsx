import React from 'react'
import s from './Post.module.css'

const Post = (props) => {
	return  <div className={s.item}>
				<img src = 'https://get.wallhere.com/photo/1600x1200-px-action-adventure-alien-aliens-Avatar-fantasy-fi-fighting-futuristic-sci-warrior-1635355.jpg'/>
				{props.message}
				<div>
					<span>like </span>
					{props.like}
				</div>
			</div>
}

export default Post;