import React, { Component } from 'react';
import { Modal, Button, Input, ButtonInput } from 'react-bootstrap'


export default class SubmitButton extends Component {
	constructor(props){
		super(props);
		this.state = {
			showModal: false,
			title: '',
			desc: '',
			data_uri: ''
		};
		this.close = this.close.bind(this);
		this.open = this.open.bind(this);
		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleFile = this.handleFile.bind(this);
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

	handleFile(e) {
		var reader = new FileReader();
		var file = e.target.files[0];
		console.log(file);
		var _that = this;
		reader.onload = function(upload){
			_that.setState({
				data_uri: btoa(upload.target.result)
			});
			console.log(btoa(upload.target.result))
		}
		reader.readAsBinaryString(file);
	}

	handleSubmit(e) {
		e.preventDefault();
		var title = this.state.title.trim();
		var desc = this.state.desc.trim();
		var data_uri = this.state.data_uri;
		if (!title || !desc || !data_uri) {
			return;
		}

		this.props.submitHandler({
			title: title,
			desc: desc,
			data_uri: data_uri
		});
		this.setState({
			title: '',
			desc: '',
			data_uri: ''
		});
		this.close();
	}

	render() {
		return (
			<div>
			<Button bsStyle="primary" bsSize="large" onClick={this.open} block> 
				Submit 
			</Button>
			<Modal show={this.state.showModal} onHide={this.close}>
				<Modal.Header closeButton>
					<Modal.Title> Submit an issue </Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form className="SubmitIssueForm" encType="multipart/form-data" onSubmit={this.handleSubmit}>
					<Input type="text" onChange={this.handleTitleChange} label="Title" placeholder="Enter title" value={this.state.title}/>
					<Input type="text" onChange={this.handleDescriptionChange} label="Description" placeholder="Enter description" value={this.state.desc}/>
					<Input type="file" onChange={this.handleFile} name="photo" accept="image/*" capture="camera"/>
					<ButtonInput type="submit" value="Submit" />
					</form>
				</Modal.Body>
			</Modal>
			</div>
		)
	}

}