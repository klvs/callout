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
		this.submitComment = this.submitComment.bind(this)
	}

	componentWillMount() {
		fetch(constants.API_ROOT + 'callouts/' + this.props.calloutId +'/comments').then((request)=>{
			return request.json()
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
		fetch(constants.API_ROOT + 'callouts/'+this.props.calloutId+'/comments', {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(submission)
		}).then(res=> {
			this.setState({
				data: this.state.data.concat(submission)
			})
		}).catch(err=> {
			console.log(err)
		});
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