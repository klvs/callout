import React, { Component } from 'react';
import * as constants from './constants';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

export default class CommentBox extends Component {
	constructor(props){
		super(props)
		this.state = {
			calloutId:'',
			data: []
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			calloutId: nextProps.calloutId
		})
		this.loadComments();
	}

	loadComments() {
		fetch(constants.API_ROOT + 'callouts/' + this.state.calloutId +'/comments').then((request)=>{
			return request.json()
		}).then(req=>{
			console.log('')
		}).then(response=>{
			this.setState({
				data: response
			})
		}).catch(err=>{
			console.log(err)
		})

	}

	submitComment(item) {
		var submission = {
			text: item.comment,
			name: item.name
		}
		fetch(constants.API_ROOT + 'callouts/'+this.state.calloutId+'/comments', {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(submission)
		}).then(res=> {
			console.log("submit success")
			this.loadComments();
		}).catch(err=> {
			console.log(err)
		});
		console.log("submit comments")
	}

	render() {
		return (
			<div className="CommentBox">
				<CommentForm submitHandler={this.submitComment}/>
				<CommentList data={this.state.data}/>
			</div>
		)
	}

}