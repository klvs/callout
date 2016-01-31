import React, { Component } from 'react';
import { Modal, Button, Input, ButtonInput, Image } from 'react-bootstrap'
import * as constants from './constants';


export default class SubmitButton extends Component {
	constructor(props){
		super(props);
		this.state = {
			showModal: false,
			title: '',
			desc: '',
			data_uri: '',
			imageName: '',
			imageUrl: ''
		};
		this.close = this.close.bind(this);
		this.open = this.open.bind(this);
		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleFileSelect = this.handleFileSelect.bind(this);
		this.render = this.render.bind(this);
	}

	open() {
		this.setState({showModal: true});
	}

	close() {
		this.setState({showModal: false});
	}

	handleTitleChange(e) {
		this.setState({title: e.target.value})
	}

	handleDescriptionChange(e) {
		this.setState({desc: e.target.value})
	}


	handleFileSelect(e) {
		var formData = new FormData()
		formData.append('image', e.target.files[0])
		fetch(constants.API_ROOT + 'images/callout-imgs/upload', {
			method: 'post',
			body: formData
		}).then(req=> {
			return req.json()
			//this.getCallouts();
		}).then(res=> {
			console.log(res);
			this.setState({
				imageName: res.result.files.image[0].name,
				imageUrl: 'http://callout-imgs.s3.amazonaws.com/'+res.result.files.image[0].name
			})
			this.open();
		}).catch(err=> {
			console.log(err)
		});


	}

	handleSubmit(e) {
		e.preventDefault();
		var title = this.state.title.trim();
		var desc = this.state.desc.trim();
		if (!title || !desc) {
			return;
		}

		this.props.submitHandler({
			title: title,
			desc: desc,
			imageUrl: this.state.imageUrl
		});
		this.setState({
			title: '',
			desc: '',
			imageUrl: ''
		});
		this.close();
	}
	handleClick(e) {
		$("input[id=fileselector]").trigger('click');
	}


	render() {
		return (
			<div>
				<Button bsStyle="primary" bsSize="large" id="uploadButton" onClick={this.handleClick} block>UPLOAD IMAGE</Button>
    			<form id="upload" onSubmit={this.handleSubmit} action="/api/images/callout-imgs/upload">
    			<input id="fileselector" type="file" accept="image/*" capture="camera" onChange={this.handleFileSelect} style={{display: 'none'}}/>
				</form>

				<Modal show={this.state.showModal} onHide={this.close}>
				<Modal.Header closeButton>
					<Modal.Title> Submit an issue </Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Image src={this.state.imageUrl} responsive/>
					<form className="SubmitIssueForm" encType="multipart/form-data" onSubmit={this.handleSubmit}>
					<Input type="text" onChange={this.handleTitleChange} label="Title" placeholder="Enter title" value={this.state.title}/>
					<Input type="text" onChange={this.handleDescriptionChange} label="Description" placeholder="Enter description" value={this.state.desc}/>
					<ButtonInput type="submit" value="Submit" />
					</form>
				</Modal.Body>
			</Modal>

			</div>
		)
	}

}
