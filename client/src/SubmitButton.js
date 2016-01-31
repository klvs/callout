import React, { Component } from 'react';
import { Modal, Button, Input, ButtonInput, Image } from 'react-bootstrap'
import * as constants from './constants';

const styles = {
	"padding-top": "1em"
};

export default class SubmitButton extends Component {
	constructor(props){
		super(props);
		this.state = {
			showModal: false,
			title: '',
			desc: '',
			data_uri: '',
			imageName: '',
			imageUrl: '',
			uploading: true
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
		var reader = new FileReader();
		var file = e.target.files[0];
		console.log(file);
		var _that = this;
		reader.onload = function(upload){
			_that.setState({
				data_uri: upload.target.result
			});
		}
		reader.readAsDataURL(file);
		this.open();

		var formData = new FormData()
		formData.append('image', file)
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
				imageUrl: 'http://callout-imgs.s3.amazonaws.com/'+res.result.files.image[0].name,
				uploading: false
			})
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
			<div style={styles}>
				<Button bsStyle="primary" bsSize="large" id="uploadButton" onClick={this.handleClick} block>UPLOAD IMAGE</Button>
    			<form id="upload" onSubmit={this.handleSubmit} action="/api/images/callout-imgs/upload">
    			<input id="fileselector" type="file" accept="image/*" capture="camera" onChange={this.handleFileSelect} style={{display: 'none'}}/>
				</form>

				<Modal show={this.state.showModal} onHide={this.close}>
				<Modal.Header closeButton>
					<Modal.Title> Submit an issue </Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Image src={this.state.data_uri} responsive/>
					<form className="SubmitIssueForm" encType="multipart/form-data" onSubmit={this.handleSubmit}>
					<Input type="text" onChange={this.handleTitleChange} label="Title" placeholder="Enter title" value={this.state.title}/>
					<Input type="text" onChange={this.handleDescriptionChange} label="Description" placeholder="Enter description" value={this.state.desc}/>
					<ButtonInput type="submit" value="Submit" disabled={this.state.uploading}  />
					</form>
				</Modal.Body>
			</Modal>

			</div>
		)
	}

}
