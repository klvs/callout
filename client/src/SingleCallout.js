import React, { Component } from 'react';
import * as constants from './constants';
import { Row, Col, Image, Button } from 'react-bootstrap'
import moment from 'moment'
import CommentBox from './CommentBox'

export default class SingleCallout extends Component {
	constructor(props){
		super(props)
		this.state = {
			callout: {
				desc: {
					title:'',
					desc:''
				},
			},
			voteCount:0

		}
		this.upvoteCallout = this.upvoteCallout.bind(this);
		this.downvoteCallout = this.downvoteCallout.bind(this);
		// this.render = this.render.bind(this)
	}

	upvoteCallout(e) {
		//console.log(this.state.callout.desc.title)
		fetch(constants.API_ROOT + 'callouts/upvote', {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({id: this.state.callout.id})
		}).then(res=> {
			console.log("upvoted")
		}).catch(err=> {
			console.log(err)
		});

		this.setState({
				voteCount: this.state.voteCount+1
		})
	}
	downvoteCallout(e) {
		fetch(constants.API_ROOT + 'callouts/downvote', {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({id: this.state.callout.id})
		}).then(res=> {
			console.log("downvoted")
		}).catch(err=> {
			console.log(err)
		});


		this.setState({
				voteCount: this.state.voteCount-1
		})
	}

	componentWillMount(){
		fetch(constants.API_ROOT + 'callouts/' + this.props.params.id).then((request)=>{
				return request.json()
			}).then((response=>{
				console.log("response")
				console.log(response)
				this.setState({
					callout: response,
					voteCount:response.voteCount
				})
				//console.log(response.desc.title)
			})).catch((error)=>{
				console.warn(error)
		})

	}
  render() {
  	console.log(this.state.callout.id)
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
	    		<Col xs={12} className="text-center"> <Button onClick={this.upvoteCallout}>UP</Button></Col>
	    		<Col xs={12} className="text-center">
			      <h1>{this.state.voteCount}</h1>
	      		</Col>
	      		<Col xs={12}className="text-center"> <Button onClick={this.downvoteCallout}>DOWN</Button></Col>
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
	    	<CommentBox calloutId={this.state.callout.id}/>
    	</div>
    );
  }
}
