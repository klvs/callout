import React, { Component } from 'react';
import { Modal, Button, Input, ButtonInput, Image } from 'react-bootstrap'
import * as constants from './constants';

const styles = {
	"padding-top": "1em"
};

const imgStyles = {
	"padding": "1em",
	"border": "1px solid black"
}

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
			isUploading: true
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

			var dataURL = upload.target.result;
			var base64 = dataURL.split(',')[1];

			var img = document.createElement('img');
			img.src = dataURL;

			img.onload = function() {
				var canvas = document.createElement('canvas');
				canvas.width = img.naturalWidth;
				canvas.height = img.naturalHeight;
				var ctx = canvas.getContext('2d');
				ctx.drawImage(img, 0, 0);
				var modifiedDataURL = canvas.toDataURL(file.type, 0.5);
				var modifiedBase64 = modifiedDataURL.split(',')[1];

				_that.setState({
					data_uri: modifiedDataURL
				});

				var byteString = atob(modifiedBase64);

				var ia = new Uint8Array(byteString.length);
				for (var i = 0; i < byteString.length; i++) {
					ia[i] = byteString.charCodeAt(i);
				}

				var blob = new Blob([ia], {type: file.type});

				var modified = new File([blob], file.name, {type: file.type});

				_that.open();

				var formData = new FormData()
				formData.append('image', modified)
				fetch(constants.API_ROOT + 'images/callout-imgs/upload', {
					method: 'post',
					body: formData
				}).then(req=> {
					return req.json()
					//this.getCallouts();
				}).then(res=> {
					console.log(res);
					_that.setState({
						imageName: res.result.files.image[0].name,
						imageUrl: 'http://callout-imgs.s3.amazonaws.com/'+res.result.files.image[0].name,
						isUploading: false
					})
				}).catch(err=> {
					console.log(err)
				});

			}
		}
		reader.readAsDataURL(file);
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
					<Image style={imgStyles} src={this.state.data_uri} responsive/>
					<form style={styles} className="SubmitIssueForm" encType="multipart/form-data" onSubmit={this.handleSubmit}>
					<Input type="text" onChange={this.handleTitleChange} label="Title" placeholder="Enter title" value={this.state.title}/>
					<Input type="text" onChange={this.handleDescriptionChange} label="Description" placeholder="Enter description" value={this.state.desc}/>
					<ButtonInput type="submit" value={this.state.isUploading ? 'Uploading...' : 'Submit'} disabled={this.state.isUploading} block/>
					</form>
				</Modal.Body>
			</Modal>

			</div>
		)
	}

}
