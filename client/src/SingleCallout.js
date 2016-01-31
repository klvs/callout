import React, { Component } from 'react';
import * as constants from './constants';
import { Row, Col, Image } from 'react-bootstrap'
import moment from 'moment'

export default class SingleCallout extends Component {
	constructor(props){
		super(props)
		this.state = {
			callout: {
				desc: {
					title:''
				}
			}
		}
	}
	componentWillMount(){
		fetch(constants.API_ROOT + 'callouts/' + this.props.params.id).then((request)=>{
				return request.json()
			}).then((response=>{
				console.log(response)
				this.setState({
					callout: response
				})
			})).catch((error)=>{
				console.warn(error)
		})		
	}
  render() {
    return (
    	<div className="container">
	    	<Row>
	    		<Col xs={12} className="text-center">
			      <h1>
			      	{this.state.callout.desc.title}
			      </h1>
			      	<small>{moment(this.state.callout.time).fromNow()}</small>
	      	</Col>
	    	</Row>
	    	<Row>
	    		<Col xs={12} className="text-center">
			      <Image className="img-responsive" src={this.state.callout.url}/>
	      	</Col>
	    	</Row>
	    	<Row>
	    		<Col xs={6} className="">
			      <div className="text-mute">
			      	{this.state.callout.desc.desc}
			      </div>
	      	</Col>
	    		<Col xs={6} className="">
			      <div className="text-mute">
			      	{moment(this.state.callout.time).format('MM Do YYYY')}
			      </div>
	      	</Col>
	    	</Row>
    	</div>
    );
  }
}
