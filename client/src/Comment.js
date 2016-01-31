import React, { Component } from 'react';
import * as constants from './constants';
import { Panel } from 'react-bootstrap'

export default class Comment extends Component {
	constructor(props){
		super(props)
	}


	render() {
		return (
			<Panel header={this.props.name}>
			{this.props.comment}
			</Panel>
		)
	}
}