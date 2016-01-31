import React, { Component } from 'react';
import * as constants from './constants';
import { Input, ButtonInput } from 'react-bootstrap'

export default class CommentForm extends Component {
	constructor(props){
		super(props)
		this.state = {
			name:'',
			comment:''
		}
		this.handleNameChange = this.handleNameChange.bind(this)
		this.handleCommentChange = this.handleCommentChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleNameChange(e) {
		this.setState({
			name: e.target.value
		})
	}
	handleCommentChange(e) {
		this.setState({
			comment: e.target.value
		})
	}

	handleSubmit(e) {
		e.preventDefault();
		if (!this.state.name || !this.state.comment) {
			return;
		}
		this.props.submitHandler(this.state)
		this.setState({
			name:'',
			comment:''
		})
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<Input onChange={this.handleNameChange} type="text" label="Name" placeholder="Enter Name" value={this.state.name}/>
				<Input onChange={this.handleCommentChange}type="textarea" label="Comment" placeholder="Enter Comment" value={this.state.comment}/>
				<ButtonInput type="submit" value="Submit Button" />
			</form>
		)
	}
}