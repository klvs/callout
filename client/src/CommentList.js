import React, { Component } from 'react';
import * as constants from './constants';
import Comment from './Comment'

export default class CommentList extends Component {
	constructor(props){
		super(props)
	}


	render() {
		if (this.props.data)
			var comments = this.props.data.map((comment)=>{
				return <Comment name={comment.name} comment={comment.text}/> 
			})
		return (
			<div>
			<h2>comments</h2>
			{comments}
			</div>
			)
	}
}