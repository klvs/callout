import React, { Component } from 'react';
import * as constants from './constants';
import { Row, Col, Image, Button } from 'react-bootstrap'
import moment from 'moment'
import CommentBox from './CommentBox'

import SocialButtons from './SocialButtons'

import {
  ShareButtons,
  ShareCounts,
  generateShareIcon
} from 'react-share';

const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton
} = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const GooglePlusIcon = generateShareIcon('google');
const LinkedinIcon = generateShareIcon('linkedin');

const containerLg = {
	marginRight: 'auto',
	marginLeft: 'auto',
	paddingLeft: '10%',
	paddingRight: '10%',
}

const containerInner = {
	background: '#3e3f3a',
	marginTop: '30px',
	marginBottom: '30px',
	borderRadius: '10px'
}

const titleText = {
	color:'#fff',
	marginLeft: '10px',
	textAlign: 'center'
}

const subtitle = {
	marginLeft: '10px',
	color: '#fff',
	fontSize: '0.8em'
}

const imgContainer = {
	marginRight: 'auto',
	marginLeft: 'auto',
	paddingLeft: '10%',
	paddingRight: '10%',
}

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
	}

	upvoteCallout(e) {
		fetch(constants.API_ROOT + 'callouts/upvote', {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({id: this.state.callout.id})
		}).then(res=> {
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
				this.setState({
					callout: response,
					voteCount:response.voteCount
				})
			})).catch((error)=>{
				console.warn(error)
		})

	}


  render() {
    return (
    	<div style={containerLg}>
    		<div style={containerInner}>
		    	<Row style={{height: '50px', marginTop: '1em'}}>
		    		<Col xs={12}>
				      	<h3 style={titleText}>{this.state.callout.desc.title}</h3>
		      		</Col>
				</Row>
				<Row style={{height: '50px', marginBottom: '0.5em', paddingTop: '-0.5em', textAlign: 'center'}}>
		    		<Col xs={12}>
				      	<h3 style={subtitle}>{this.state.callout.desc.desc}</h3>
		      		</Col>
				</Row>
		    	<Row style={{height: '50px', margin: '1em', marginTop: '-1em'}}>
		    		<Col xs={4} className="text-center">
			    		<Button onClick={this.upvoteCallout} style={{float: 'right', height: '100%'}}>
			    			<i className="fa fa-3x fa-thumbs-up"/>
			    		</Button>
					</Col>
					<Col xs={4} className="text-center">
						<p style={{color:'white', paddingTop: '0.5em', fontSize: '1.5em', height: '100%'}}>{this.state.voteCount}</p>
					</Col>
					<Col xs={4} className="text-center">
			    		<Button onClick={this.downvoteCallout} style={{float: 'left', height: '100%'}}>
			    			<i className="fa fa-3x fa-thumbs-down"/>
			    		</Button>
		    		</Col>
		    	</Row>

		    	<Row>
		    		<Col xs={12}  className="text-center">
				      <Image style={imgContainer} className="img-responsive" src={this.state.callout.url}/>
		      		</Col>
		    	</Row>
				<Row style={{height: '50px', padding: '0.5em', textAlign: 'center'}}>
		    		<Col xs={12}>
				      <span style={subtitle}>{moment(this.state.callout.time).format('MM/DD/YYYY HH:MM:SS')} - {moment(this.state.callout.time).fromNow()}</span>
		      		</Col>
		    	</Row>
				<Row style={{padding: '2em'}}>
				<Col xs={6} style={{color: '#fff'}}><span style={{float: 'right'}}>Share this Callout to: </span></Col>
				<Col xs={3}><FacebookShareButton
					url = {"http://callout.city/callouts/"+this.state.callout.id}
					title = "CallOut"
					className = "FacebookShareButton"
					style={{float: 'right'}}>
					<FacebookIcon
						size={24}
						round={true} />
				</FacebookShareButton></Col>
				<Col xs={3}><TwitterShareButton
				url = {"http://callout.city/callouts/"+this.state.callout.id}
				  title = "CallOut"
				  className = "TwitterShareButton"
				  style={{float: 'left'}}>
				  <TwitterIcon
					  size={24}
					  round={true} />
				</TwitterShareButton></Col>
				</Row>
    		</div>
	    	<CommentBox calloutId={this.props.params.id}/>
    	</div>
    );
  }
}
