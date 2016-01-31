import React, { Component } from 'react';
import * as constants from './constants';
import Comment from './Comment'

export default class CommentList extends Component {
	constructor(props){
		super(props)
	}


	render() {
		var header = ''
		var comments = []
		if (this.props.data) {
			var comments = this.props.data.map((comment)=>{
				return <Comment name={comment.name} comment={comment.text}/> 
			})
			header = "comments"
		}
		return (
			<div>
			<h2>{header}</h2>
			{comments}
			</div>
			)
	}
}