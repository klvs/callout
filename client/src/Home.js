import React, { Component } from 'react';
import Location from './Location';
import BSNav from './BSNav'
import { Row } from 'react-bootstrap'
import SubmitButton from './SubmitButton'
import './geo';
import CalloutThumbs from './CalloutThumbs'
import * as constants from './constants';
import * as callout from './CalloutController'

export default class Home extends Component {

	constructor(props){
		super(props);
		this.state = {
			center: {
		      position: {
		        lat: 25.0112183,
		        lng: 121.52067570000001,
		      },
		      key: "Taiwan",
		      defaultAnimation: 2,
	    	},
	    	callouts: [],
	    	markers:[] // empty to start
	  	}
		this.render = this.render.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.getCallouts = this.getCallouts.bind(this);
	}
	componentDidMount() {
		// console.log(navigator.location.getCurrentPosition());
		navigator.geolocation.getAccurateCurrentPosition(position=> {
			this.setState({				
				center: {
			      position: {
			        lat: position.coords.latitude,
			        lng: position.coords.longitude,
			      },
			      key: "You",
			      defaultAnimation: 2,
		    	},
	  		})
		}, err=>{console.log(err)},
		intermediatePosition=>{
			this.setState({				
				center: {
			      position: {
			        lat: intermediatePosition.coords.latitude,
			        lng: intermediatePosition.coords.longitude,
			      },
			      key: "You",
			      defaultAnimation: 2,
		    	},
	  		})
		})
		// get the data
		this.getCallouts();
	}

	getCallouts() {
	fetch(constants.API_ROOT + 'callouts?filter[order]=time desc').then((request)=>{
			return request.json()
		}).then((response=>{
			this.setState({
				callouts: response,
				markers: this.state.markers.concat(callout.transformToMarker(response))
			})
		}))		
	}

	handleSubmit(item) {
		var submission = {
			geo: {
				lat: this.state.center.position.lat,
				lng: this.state.center.position.lng
			},
			url: item.imageUrl,
			desc: {
				title: item.title,
				desc: item.desc
			}
		}
		fetch(constants.API_ROOT + 'callouts', {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(submission)
		}).then(res=> {
			console.log("submit success")
			this.getCallouts();
		}).catch(err=> {
			console.log(err)
		});
		
	}

  render() {
    return (
	    	<div className="container">
	    	<BSNav/>
		    <Location center={this.state.center} value={this.state.markers}/>
		    //<SocialButtons url="callout.city" title="Callout your city"/>
		    <SubmitButton submitHandler={this.handleSubmit}/>
		    <CalloutThumbs thumbs={this.state.callouts}/>
	    	</div>
    );
  }
}
